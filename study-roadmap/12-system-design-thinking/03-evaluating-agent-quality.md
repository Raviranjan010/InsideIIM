# Evaluating Agent Quality: Testing Investment Advice

In traditional web development, testing is simple: if the compiler compiles, the unit tests pass, and the server returns a `200 OK` status, the code works.

With GenAI agents, **correct execution does not guarantee correct outputs**. The code might run without throwing errors, but the agent could still output a bad financial summary. 

This guide details how to evaluate the quality of your agent's investment outputs over time.

---

## 1. The Evaluation Pillars

To measure whether your agent's decisions are actually good, you must implement three tracking layers:

### A. Grounding Audits (Detecting Hallucinations)
We must verify that every number inside the final summary matches the source search text.
*   **How:** We run an automated **LLM-as-a-Judge** evaluation. A secondary model reads the raw search text and the agent's summary, and checks: *"Is every number in the summary present in the source text? Answer YES or NO."* If it returns NO, we log a Hallucination Event.

### B. Human Review Sampling
LLMs cannot replace human expertise entirely.
*   **How:** We set up a dashboard that randomly selects **1% to 5%** of all generated reports. A human financial analyst reviews the reports to check for logical gaps or non-compliant phrasings, scoring them on a quality scale.

### C. Financial Backtesting
Specifically for an investment agent, we must track if the agent's calculations align with real-world outcomes.
*   **How:** We store the agent's extracted metrics (like P/E ratios and growth metrics) in a database. Six months later, we run an automated script to compare the agent's calculated metrics against the company's actual reported performance and stock price movements, measuring our calculations' predictive accuracy.

---

## 2. LLM-as-a-Judge Evaluation Script

Here is an example of an evaluation node script that runs after the agent completes to verify output quality:

```typescript
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// The evaluator model checks the output against the source data
const evaluatorModel = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

const evaluationSchema = z.object({
  isGrounded: z.boolean().describe("True if all numbers in the summary are present in the source data."),
  hallucinatedFields: z.array(z.string()).describe("List of fields or numbers that were invented.")
});

async function evaluateReport(sourceData: string, aiSummary: string) {
  const judge = evaluatorModel.withStructuredOutput(evaluationSchema);
  
  const response = await judge.invoke(`
    Source Data: "${sourceData}"
    AI Summary: "${aiSummary}"
    
    Verify if the AI Summary is grounded in the Source Data. Detect any invented numbers.
  `);
  
  return response;
}
```

---

## ⚠️ Common Beginner Mistake: Relying on User Reviews for Core Metrics

Beginners often rely solely on thumbs-up/thumbs-down buttons in their UI to evaluate their LLM's accuracy.

*   **Why it's bad:** Most users are not financial analysts; they cannot identify if a corporate cash-flow number is slightly incorrect, nor will they notice a subtle math mistake. Thumbs-up metrics only measure user satisfaction with the *UI*, not the accuracy of the *data*.
*   **The Fix:** Use automated Grounding Audits and professional human auditing rather than consumer thumbs-up statistics.

---

## 🧠 Self-Check Recall

1.  Why does a `200 OK` server response not guarantee that an agent is working correctly?
2.  What is the role of an "LLM-as-a-Judge" inside an evaluation pipeline?
3.  How does financial backtesting help verify the quality of the agent's analysis over time?
4.  Why is relying on UI thumbs-up buttons insufficient for verifying financial numbers?
5.  What temperature setting should be configured on judge models to ensure evaluation consistency?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **It only measures code execution stability.** The server can return a success status code even if the LLM's response contains hallucinations or incorrect metrics.
2.  **It automates quality checks.** A secondary model compares the output against source documents to detect hallucinations or non-compliance.
3.  **It compares the agent's predictions against real-world stock performance** months later to check the predictive value of the calculations.
4.  **Because users are not auditors.** They cannot easily detect subtle numerical errors or financial misstatements.
5.  **`0`** (deterministic mode).
</details>
