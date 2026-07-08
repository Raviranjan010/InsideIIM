# Product Thinking for AI Features: Trust & Uncertainty

Unlike traditional software engineering where outputs are predictable, GenAI features are probabilistic. They can return different phrasings or occasional errors.

A product-minded engineer builds systems that **handle uncertainty gracefully** and **design for user trust**.

---

## 1. Designing for Trust: Showing the Work

In high-stakes domains like finance or healthcare, users will not trust a black-box AI that simply spits out a verdict: *"You should buy Apple stock."* 

To build trust, the application must **show its sources and reasoning**:

*   **Cite Sources:** Every metric or claim in the final report must link to a specific source URL or filing retrieved during the search phase.
*   **Present Key Calculations:** Show the raw mathematical ratios (e.g. *Debt-to-Equity: 1.2*) alongside the LLM's summary, showing that the assessment is backed by hard numbers.
*   **Outline Alternative Perspectives:** If search results contain conflicting opinions, present both sides objectively instead of forcing the model to make a binary guess.

---

## 2. Handling Uncertainty Gracefully

When an API fails or the LLM output is unclear, the application should not display a blank screen or a cryptic error.

*   **Soft Failures:** If the web search fails, return a message saying: *"Live search is currently offline. Here is the cached analysis from yesterday."*
*   **Confidence Levels:** If the data retrieved is sparse, the agent should state its confidence level directly: *"Confidence: Low. Reason: Limited financial reporting available for this ticker."*

---

## 3. Knowing When NOT to Use an LLM

One of the most important product decisions is knowing when to use standard code instead of an LLM.

| Task | Use Code ($O(1)$) | Use LLM ($O(\text{tokens})$) |
| :--- | :--- | :--- |
| **Calculating metrics (P/E ratios)** | ✅ Yes. Code is 100% accurate. | ❌ No. LLMs make math errors. |
| **Checking if a query is too long** | ✅ Yes. Just check `.length`. | ❌ No. Wastes tokens and costs money. |
| **Summarizing 10 news articles** | ❌ No. Hard to code. | ✅ Yes. LLMs excel at synthesis. |
| **Extracting dates from text** | ❌ No. Regex is fragile. | ✅ Yes. LLMs excel at parsing context. |

---

## ⚠️ Common Beginner Mistake: Let the LLM Guess Missing Data

When the web search API returns no financial data for a stock, beginners often write prompts that allow the LLM to make a guess based on its memory.

```text
Prompt: "If the stock price is not in the text, guess the current price based on your memory."
```
*   **Why it's bad:** The model will hallucinate outdated prices, leading to inaccurate analyses and exposing the platform to legal liabilities.
*   **The Fix:** Force a strict refusal rule in the prompt: *"If the required financial metrics are not present in the provided context, state that you do not know. Do not make assumptions or extrapolate."*

---

## 🧠 Self-Check Recall

1.  Why is showing source citations important for user trust in financial applications?
2.  What is a "soft failure" in user experience?
3.  Name one task that should be handled by standard code rather than an LLM.
4.  Why is letting an LLM guess missing financial figures a major liability?
5.  What should the system prompt command the model to do if required data is missing from the search results?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **It provides verification.** Users can click the links to double-check the figures themselves, showing the AI is not fabricating numbers.
2.  **A graceful recovery from an error,** where the system displays a helpful status or cached data instead of crashing or showing a blank page.
3.  **Basic calculations** (like P/E ratios) or input validation checks (like character length checks).
4.  **It leads to hallucinations.** The model will generate outdated numbers from its training weights, undermining the accuracy of the report.
5.  **State that it doesn't know,** and refuse to speculate or estimate.
</details>
