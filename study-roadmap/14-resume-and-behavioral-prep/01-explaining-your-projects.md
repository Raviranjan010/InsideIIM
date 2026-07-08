# Structuring a 2-Minute Project Walkthrough

In an interview, you will almost always be asked: *"Tell me about a technical project you built."* 

This guide outlines a strict, high-impact template to explain your search-grounded investment agent in under 2 minutes.

---

## ⏱️ The Walkthrough Structure (2 Minutes)

To explain a project effectively, structure it into 4 parts:
1.  **Situation (30s):** What was the problem or business need?
2.  **What You Built (30s):** What is the app and what is the stack?
3.  **Key Decision (45s):** What was the hardest technical challenge and how did you solve it? (This proves you wrote the code).
4.  **Result (15s):** What was the outcome?

---

## 🎙️ Walkthrough Script: The AI Investment Agent

Here is the exact script, customized for this assignment, that you can adapt for your verbal responses:

### 1. Situation (The Hook)
> *"I wanted to build a financial support tool that could evaluate corporate stocks for investment decisions. The challenge was that standard LLMs suffer from knowledge cutoffs and make confident numerical calculations errors, which is unacceptable when dealing with financial data and market metrics."*

### 2. What You Built (The Architecture)
> *"To solve this, I built a search-grounded financial analyst agent. I used Next.js App Router and Node.js for the backend proxy, Tavily for real-time web searches, and LangGraph.js to coordinate the reasoning loops. The app fetches live earnings reports, calculates valuation metrics in code, and uses OpenAI with structured output schemas to return a formatted PDF/JSON investment report to the user."*

### 3. Key Decision (The Engineering Detail)
> *"My key architectural decision was choosing a state-graph loop over a simple linear RAG pipeline. If the initial web search yielded no financial ratios, a linear chain would fail or hallucinate. By using LangGraph.js, I created a self-correcting loop: if the analysis node detects a missing debt-to-equity ratio in the state, a conditional routing edge automatically cycles the flow back to the research node. It runs a revised, targeted search to retrieve the missing metric before moving to the decision node, ensuring data completeness."*

### 4. Result (The Outcome)
> *"The final result is a robust, production-ready server proxy that generates deterministic, grounded reports with zero hallucinations of key metrics, ensuring compliance with my system guardrails forbidding direct investment recommendations."*

---

## 💡 Pro-Tips for Delivering the Walkthrough
*   **Don't read it like a script:** Practice speaking it naturally. Focus on showing excitement about the *architecture* and *trade-offs*.
*   **Emphasize "Why", not just "What":** Explain *why* you chose LangGraph (self-correction loops) and *why* you used temperature 0 (determinism). This shows engineering maturity.
*   **Pause for questions:** At the end, invite them in: *"I'd be happy to dive deeper into the state schema or the API proxy design if you'd like."*
