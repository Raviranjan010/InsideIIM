# AI Product Thinking Interview Q&A: 10 Core Questions

This bank contains 10 product-focused interview questions and answers, designed to show how a software engineer evaluates UX, trust, safety, and trade-offs when building AI systems.

---

### Q1. What distinguishes a true AI product from a simple API wrapper, and how does your project reflect this distinction?
**Answer:**
A simple wrapper is a cosmetic layer that forwards static text to an LLM without changing the application state, creating little unique value. My project is a true AI product because the LLM acts as one engine within a broader system: the AI autonomously decides which tools to call, while the server executes code to calculate financial metrics deterministically and uses a cyclic graph loop (LangGraph) to self-correct and verify data before returning a structured JSON report to the UI.

---

### Q2. How does your investment agent handle scenarios where the retrieved financial data is incomplete or contradictory?
**Answer:**
To handle data gaps, my agent uses conditional routing: if the analysis node detects that a key metric (like the debt-to-equity ratio) is missing, it routes the flow back to the research node to execute a targeted search. If search results contain contradictory opinions, the system prompt instructs the model to act as an objective reporter, presenting both viewpoints with source citations rather than forcing the model to make a binary guess.

---

### Q3. Why did you choose to build a conversational, multi-step agent interface instead of a simple static dashboard showing stock charts?
**Answer:**
A static dashboard is limited to pre-configured charts, whereas a conversational agent allows users to ask open-ended research questions and request custom calculations on demand. By structuring the backend as a multi-step graph, we can perform targeted research on the fly. This provides users with customized, deep-dive reports that a static dashboard could not generate.

---

### Q4. When designing this project, how did you decide which parts of the workflow should be handled by standard code versus the LLM?
**Answer:**
I assigned tasks based on determinism. Standard code is 100% accurate for mathematical calculations (like computing ratios) and basic input validation (like character length checks), so I kept those out of the LLM prompt. I reserved the LLM for tasks that require natural language understanding, context extraction, and qualitative synthesis, where the model's strengths in parsing and summarization could be leveraged.

---

### Q5. How does your application design for "user trust" when displaying financial recommendations?
**Answer:**
We build trust through transparency. The agent does not simply output a recommendation; it details the underlying financial ratios computed by our code and provides clickable source citations linking to the raw financial filings or news articles retrieved. This allows users to verify the figures themselves, showing the AI is not hallucinating.

---

### Q6. If the OpenAI API experiences a 10-second latency spike, how would you design the user experience to prevent users from leaving the page?
**Answer:**
A long loading spinner feels sluggish to users. I would implement two changes: first, I would stream the LLM response tokens to the UI in real-time so the user sees text being generated character-by-character. Second, I would use Server-Sent Events to display active status updates on the agent's progress (e.g. *"Searching financial databases..."*, then *"Calculating ratios..."*), keeping the user engaged.

---

### Q7. Your system prompt explicitly forbids the AI from giving direct investment advice. Why is this a critical product safety decision?
**Answer:**
In many jurisdictions, giving direct investment advice without a license is illegal and exposes the platform to regulatory liabilities. By restricting the agent to outlining objective risks and opportunities based on retrieved data, we protect the business from legal liabilities while still providing users with a valuable, analytical support tool.

---

### Q8. How would you handle a situation where a user complains that the AI's analysis of a stock is outdated?
**Answer:**
I would investigate the caching and retrieval logs. First, I would check if the cache TTL (Time-To-Live) for that stock was set too long, allowing stale data to be served. Second, I would audit the search API queries to verify that the query strings included temporal terms (like the current year) to force the search engine to return recent news, adjusting the prompt if necessary.

---

### Q9. Why did you choose to use `response_format: { type: "json_object" }` rather than letting the LLM output markdown text directly to the UI?
**Answer:**
Exposing raw LLM text directly to the UI makes it difficult to maintain a consistent dashboard layout. By forcing the LLM to return a structured JSON object, we get specific keys like `riskScore` and `summary` that our frontend can safely parse. This allows us to map the values directly to UI elements, such as sentiment meters and charts, maintaining a premium interface.

---

### Q10. If we wanted to launch this app in a market with strict financial compliance laws, what product safeguards would you add to your graph?
**Answer:**
I would implement a human-in-the-loop approval step. By compiling the graph with the `interruptBefore` parameter, I can pause execution right after the analysis node compiles its data. The report is saved to a dashboard where a compliance analyst must review and approve it before the graph is allowed to resume and output the final JSON report to the user, ensuring regulatory compliance.
