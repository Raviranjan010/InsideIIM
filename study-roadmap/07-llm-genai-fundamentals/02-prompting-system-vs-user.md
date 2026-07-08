# Prompting: System vs. User Prompts

When you send a request to a modern LLM API, you don't just send a single block of text. You segment your prompt into roles: **System Prompts** and **User Prompts**.

---

## 🔍 1. Plain-English Explanation (Zero ML Required)

Think of an LLM as a highly skilled **actor** hired to perform a job:
*   **The System Prompt (The Director's Instructions):** This is the backstage instruction telling the actor *who* they are, *how* they must behave, what rules they must follow, and what they are *forbidden* from doing. The user using the website never sees this instruction.
*   **The User Prompt (The Audience Member's Question):** This is the live question or prompt asked by the user using the app (e.g., *"What is the revenue of Tesla?"*). The actor receives this question and answers it while strictly adhering to the backstage System Prompt rules.

---

## 💼 2. Why It Matters for an Investment Agent

In financial decision-making, an AI agent must remain objective, cautious, and compliant with regulations. 

You cannot let the end-user convince the agent to give risky, unauthorized financial advice. By writing a strict **System Prompt**, you set the behavioral guardrails:
1.  Command the agent to never make definitive "buy" or "sell" recommendations (to avoid legal liability).
2.  Instruct it to only base its answers on search results provided to it, ignoring its internal biases.
3.  Command it to always cite sources.

No matter how the user frames their query in the **User Prompt**, the System Prompt forces the model to stay safe and compliant.

---

## 📝 3. Concrete Example

Here is how we set up a secure prompting boundary for our investment agent API call:

### System Prompt (Private Guardrails)
```text
You are a conservative financial analyst assistant. Your task is to summarize 
the provided search data about a stock. 
RULES:
1. Do NOT give direct buy/sell recommendations. Instead, list risks and opportunities.
2. If the answer cannot be found in the provided search results, state 'I do not have access to that information.'
3. Never quote stock prices without listing the date and source of the quote.
```

### User Prompt (User input on the app)
```text
Give me a buy or sell recommendation for Nvidia stock right now!
```

### The LLM's Output (Adhering to System Rules)
```text
I cannot provide a direct buy or sell recommendation. However, based on recent 
earnings data from June 2026, Nvidia shows strong revenue growth in data center chips, 
balanced by valuation risks and high market volatility...
```

---

## 🧠 Self-Check Recall

1.  Which prompt role acts as the "backstage rules" that the end-user cannot see or easily modify?
2.  If a user inputs a query into a chat box on a webpage, which prompt role does that text represent?
3.  Why do we write rules like *"Do not make buy/sell recommendations"* in the System Prompt instead of trusting the user's prompt?
4.  Can a System Prompt access variables inside your local Node.js environment directly without code integration?
5.  What is the technical term for when a user tries to write a User Prompt that tricks the model into ignoring its System Prompt instructions?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **System Prompt.**
2.  **User Prompt.**
3.  **To enforce compliance and safety guardrails.** Users can ask anything, but the System Prompt ensures the model's behavior remains within safe, non-advisory legal limits.
4.  **No.** You must interpolate variables into the prompt strings in your Node.js code before sending them to the API.
5.  **Prompt Injection** (or jailbreaking).
</details>
