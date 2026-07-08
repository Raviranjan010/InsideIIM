# Cost & Rate-Limit Design: Defensive Agent Architecture

In a coding interview, you must show that you understand the **cost dynamics** of running AI systems. Unlike traditional web services where hosting a database or server costs a flat monthly fee, AI agents incur variable usage fees on every request.

This guide explains how cost structures and API rate-limits shape the architecture of our financial assistant.

---

## 1. The Cost of Agent Actions: Tavily & OpenAI

Every time our agent processes a user request, it calls external APIs that bill per transaction:

*   **Search API (Tavily):** Billed per query (e.g., $0.01 per search).
*   **LLM API (OpenAI):** Billed per token (approx. 750 words). Input tokens (prompts) are cheaper than output tokens (generated text).

### The "Agent Loop" Multiplier
In a cyclic agent framework like LangGraph, the model can execute multiple search queries and reasoning loops before finalizing a report. If a user enters a query and the agent loops 4 times, you pay for:
*   4 Tavily Searches
*   4 Prompt Input Payloads (which get larger on each turn as search history accumulates)
*   4 Model Outputs

If unchecked, a single user query can cost **$0.20 to $0.50**. If 10,000 users run searches daily, your monthly API bill could reach thousands of dollars.

---

## 2. Technical Rate-Limits

API providers restrict the speed of calls to prevent server abuse:
*   **RPM (Requests Per Minute):** Capped number of queries per minute.
*   **TPM (Tokens Per Minute):** Capped volume of text processed per minute.

If your web app scales and many users search at once, OpenAI will reject requests with a `429 Too Many Requests` status code.

---

## 💼 3. Design Decisions to Defend in an Interview

To defend your project against cost and rate-limit constraints, explain these design choices:

### A. Strict Graph Recursion Limits
We set `recursionLimit: 10` on every invocation. This prevents a routing bug from sending the agent into an infinite search loop that drains your budget in seconds.

### B. Size Guardrails on User Input
We block inputs longer than 2,000 characters. This prevents malicious users from copy-pasting entire textbooks into the query, which would spike input token billing.

### C. Fallback Error Handlers
If OpenAI throws a `429 Rate Limit` error, we catch it and return a user-friendly status rather than hanging the server connection.

```typescript
// Concrete check inside Route Handler:
try {
  const result = await app.invoke({ query });
} catch (err: any) {
  if (err.status === 429) {
    return NextResponse.json(
      { error: "Our AI engine is busy. Please try again in a few seconds." },
      { status: 429 }
    );
  }
  return NextResponse.json({ error: "Server error" }, { status: 500 });
}
```

---

## ⚠️ Common Beginner Mistake: Feeding Raw Web Scraping Text to the LLM

When scraping a financial webpage, beginners often copy the entire raw HTML string and paste it into the LLM prompt.

```typescript
// INCORRECT: Spiking token costs with HTML boilerplate
const rawHtml = await fetchHtml(url);
const summary = await callLLM(`Summarize this: ${rawHtml}`);
```
*   **Why it's bad:** A single webpage can contain 50,000 tokens of HTML boilerplate, styles, and script tags, but only 500 tokens of actual financial news. You pay for 49,500 useless tokens, costing 100x more than necessary and risking token limit errors.
*   **The Fix:** Use markdown parsers or scraper filters (like Tavily's extract feature) to strip away HTML markup, passing only the clean text body to the LLM.

---

## 🧠 Self-Check Recall

1.  How do LLM providers calculate usage costs for API calls?
2.  Why do cyclic agent loops (like LangGraph) cost more than simple single-turn LLM prompts?
3.  What do the rate-limit acronyms RPM and TPM stand for?
4.  Why does setting a `recursionLimit` protect your API budget?
5.  What is the performance and cost risk of sending raw HTML scraping results to an LLM?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Based on tokens** (split into input/prompt tokens and output/generated tokens).
2.  **Because they make multiple sequential API calls** (fetching search, calling the LLM to analyze, looping back), accumulating token counts on every turn.
3.  **RPM:** Requests Per Minute. **TPM:** Tokens Per Minute.
4.  **It breaks infinite loops.** It aborts the graph execution if it takes too many steps, preventing endless API calls.
5.  **It wastes token budget.** The model must process thousands of useless layout characters, leading to high bills and potential token limit errors.
</details>
