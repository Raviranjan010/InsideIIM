# System Design Interview Q&A: 12 Project-Defense Questions

This guide contains 12 interview questions and model answers designed to help you defend the scalability, cost, and reliability choices of your investment agent.

---

### Q1. If your search API (Tavily) goes down or is extremely slow, how does your system handle it?
**Answer:**
My application implements defensive timeout and fallback handling. We wrap the search fetch request using an `AbortController` set to a 5-second timeout limit. If the API fails to respond within that window, we cancel the fetch, catch the abort exception, and check if we have recently cached research data in our database for that ticker. If no cache is found, the node returns a structured warning state, allowing the graph to complete gracefully by advising the user that live search is offline rather than hanging the server or throwing a blank crash screen.

---

### Q2. How do you prevent a single user query from running in an infinite loop and draining your OpenAI API balance?
**Answer:**
In cyclic graphs, a logical error in routing can send the execution back and forth between nodes indefinitely. To prevent this, I configure a strict `recursionLimit` options parameter when invoking the compiled graph (e.g. `await app.invoke(inputs, { recursionLimit: 10 })`). If the execution transitions between nodes more than 10 times, the LangGraph engine automatically terminates the thread and throws an error, which our Route Handler catches to return a clean error code to the client before excess tokens are spent.

---

### Q3. How would you handle caching stock analysis reports for companies whose financial data changes throughout the day?
**Answer:**
I would implement a multi-tiered cache invalidation strategy using Redis. Highly volatile stock metrics (like current price or day volume) would be cached with a very short Time-To-Live (TTL) of 10 to 15 minutes. In contrast, static reports based on quarterly 10-K earnings releases or balance sheets would be cached with a 24-hour TTL, since corporate numbers do not change mid-day. This balances fast load times with data accuracy.

---

### Q4. Why did you choose to calculate metrics like cash-to-debt ratios in JavaScript code instead of letting the LLM compute them?
**Answer:**
LLMs are language models trained on word probabilities; they do not possess built-in arithmetic calculators and are prone to minor calculations errors. Hardcoding financial formulas in raw JavaScript ensures 100% deterministic mathematical accuracy. I use the LLM solely to synthesize qualitative summaries based on those pre-calculated numbers, ensuring the final report is both mathematically accurate and readable.

---

### Q5. How would you scale this application to support 50,000 active users requesting reports concurrently?
**Answer:**
To scale the app, I rely on the serverless architecture of Next.js on Vercel, which automatically scales Route Handler execution horizontally. To prevent hitting API rate limits on our OpenAI account, I would implement a Redis queue (using a library like BullMQ) to rate-limit outbound LLM calls. If the limit is reached, requests are queued and processed sequentially, and the frontend is updated via polling or WebSockets to keep the user informed.

---

### Q6. If the LLM returns a malformed JSON object that fails to parse on the server, what is your fallback procedure?
**Answer:**
To prevent malformed JSON, I use OpenAI's native `.withStructuredOutput` parser wrapper, which enforces schema compliance at the API layer. However, if the API returns malformed text, my code wraps the parsing in a `try...catch` block. If parsing fails, instead of throwing a 500 error, we can trigger a retry request back to the LLM, passing it the malformed string and the parsing error message, asking the model to fix the syntax and return a valid JSON block.

---

### Q7. Why did you build the backend proxy inside Next.js Route Handlers instead of setting up a separate Express server?
**Answer:**
Building the proxy inside Next.js Route Handlers allowed me to deploy the entire stack as a single serverless project on Vercel, reducing hosting costs and deployment complexity. Furthermore, Next.js Route Handlers support on-demand edge scaling, meaning we do not pay for idle server compute time. Using a separate Express server would require maintaining a continuously running server VM, which is more expensive for a project starting out.

---

### Q8. How would you track and evaluate the accuracy of your agent's reports over a 12-month period?
**Answer:**
I would implement an evaluation pipeline. Every generated report, its source data, and the final decision are logged to a database. I would configure an automated "LLM-as-a-Judge" script to run validation checks on a random 5% sample of logs daily, verifying grounding accuracy. Additionally, I would write a script that runs every 6 months to compare the agent's historical evaluations against the actual real-world performance of the stocks, helping us audit the accuracy of our decisions.

---

### Q9. If you want to add a premium tier to your app, how would you structure the API routing and rate limiting?
**Answer:**
I would integrate an API gateway or middleware inside Next.js. When a request hits `/api/research`, the middleware reads the user's session token and checks their subscription status. Premium users are routed to a fast path with higher rate limits (using Redis token bucket rate-limiting) and premium models (`gpt-4o`). Free users are restricted to a lower rate limit (e.g. 5 requests per day) and cheaper models (`gpt-4o-mini`), protecting our token budget.

---

### Q10. Why did you choose LangGraph's state graph architecture instead of a simpler sequential LangChain pipeline?
**Answer:**
Linear pipelines cannot handle loops or self-correction. If a search query returns empty data, a linear chain passes that empty info to the LLM, leading to hallucinations. LangGraph allows us to define cyclic graphs. If our analysis node detects a data gap, it can write a correction instruction to the state and route the flow back to the research node to search again, ensuring data completeness before making a decision.

---

### Q11. How do you prevent users from injecting malicious prompts that override your system guardrails?
**Answer:**
I enforce strict parameter boundaries when calling the LLM. The system guardrails (like the rule forbidding direct buy/sell advice) are hardcoded in the private **System Prompt** on the server, which the user cannot access. The user's query is treated strictly as data within the **User Prompt** parameter. Modern LLMs are trained to prioritize System instructions over User text, preventing user inputs from overriding safety rules.

---

### Q12. If OpenAI rate-limits your application (429 error) due to high traffic, how does your backend recover?
**Answer:**
My backend implements an exponential backoff retry wrapper around all OpenAI calls. If the API returns a `429 Too Many Requests` status, our catch block delays the next call for a period that increases exponentially (e.g. 1 second, then 3 seconds, then 9 seconds) before trying again. If the retries exceed our limit, we return a `429` status code to the client with a friendly message advising them that the AI engine is busy, ensuring the server doesn't crash.
