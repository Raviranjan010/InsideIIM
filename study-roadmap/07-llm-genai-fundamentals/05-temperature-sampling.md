# Temperature & Sampling: Controlling Randomness

When you send a request to an LLM, you can configure a setting called **Temperature**. This setting dictates how "creative" or "deterministic" the model's text generation will be.

---

## 🔍 1. Plain-English Explanation (Zero ML Required)

Remember that an LLM works by calculating word probabilities (e.g., word A has a 70% chance, word B has a 20% chance). 
*   **Low Temperature (Close to 0):** Tells the model to always pick the absolute safest, highest-probability word (Word A). It behaves like a strict, literal auditor. The output is highly predictable and **deterministic** (running it multiple times yields identical text).
*   **High Temperature (Close to 1 or higher):** Tells the model to take risks and occasionally pick lower-probability words (Word B or C). It behaves like a creative writer. The output is diverse, unexpected, and can vary wildly each time you run it.

---

## 💼 2. Why It Matters for an Investment Agent

In finance, creativity is a liability. You do **not** want your investment-decision agent to be "creative" with a balance sheet, nor do you want it to invent speculative opinions that change every time you refresh the page.

For an investment agent, you must set **`temperature: 0`**.
*   This ensures the model acts as a deterministic parser.
*   If you feed it a search document containing corporate earnings, it will extract the figures literally without embellishing or taking linguistic risks.
*   It ensures consistency: two users requesting an analysis of the same balance sheet will receive the exact same logical breakdown.

---

## 📝 3. Concrete Example

Suppose we ask the model to complete this sentence based on a document: *"The net profit margin for the company is..."*

If the actual number in the document is `12%` (with a tiny typo possibility in spelling):

*   **At Temperature 0:** The model checks the probability distribution. `12%` has a 99% probability, while `twelve percent` has 1%. It will **always** output `12%`.
*   **At Temperature 1.2:** The model might choose to be stylistic. It might choose to write: *"A respectable twelve percent, which represents a solid baseline compared to competitors..."* While the math is the same, the risk of it misinterpreting numbers or adding speculative phrasing increases.

---

## 🧠 Self-Check Recall

1.  What parameter controls the level of randomness and creativity in an LLM's response?
2.  If you want an LLM to generate identical, consistent responses for the same input, should you set the temperature to `0` or `1.5`?
3.  Why is a high temperature dangerous when parsing financial data or balance sheets?
4.  Does setting `temperature: 0` guarantee that the model will never hallucinate, or does it only guarantee consistency in word selection?
5.  What is the typical range of values used for the temperature parameter in LLM APIs?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Temperature.**
2.  **`0`** (deterministic mode).
3.  **It increases randomness.** The model is more likely to select lower-probability words, which can result in distorted financial figures, poetic phrasing instead of precise statistics, or fabricated values.
4.  **It only guarantees consistency.** If the source text is wrong or if the prompt is confusing, the model can still hallucinate, but it will do so consistently every time you run it.
5.  **`0.0` to `2.0`** (with `0` being completely deterministic and values above `1.0` being highly creative).
</details>
