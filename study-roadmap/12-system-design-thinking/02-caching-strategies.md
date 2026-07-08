# Caching Strategies: Saving Surcharges & Latency

Caching is the single most effective optimization you can make to lower LLM costs and improve response speeds. 

This guide details what data should be cached in our investment agent, how to design the caching layer, and how to configure cache expiration.

---

## 1. What to Cache & Why

In our investment-decision assistant, we cache three levels of data:

### A. Raw Search Results (The Data Layer)
If users frequently search for `"Tesla stock price"`, we run the Tavily API query once and cache the text results.
*   **Why:** Search APIs charge per request. Caching cuts down on external bills.
*   **Expiry (TTL):** Stock prices change quickly, so we set a short expiration (e.g., **15 minutes**).

### B. Final Structured Reports (The Product Layer)
If a user requests a full PDF analysis of Apple's Q2 2026 earnings, we cache the compiled JSON/PDF report.
*   **Why:** Generating the report requires calling the LLM at `temperature: 0` to analyze calculations, which takes 5+ seconds and costs token fees.
*   **Expiry (TTL):** Corporate earnings are static once reported. We can cache these reports for **24 hours** or more.

---

## 2. Concrete Implementation Example: Redis Cache Lookups

We implement caching in our Next.js Route Handler by wrapping the graph execution with a Redis key-value lookup:

```typescript
import { createClient } from "redis";
import { app } from "./examples/agent"; // Import compiled graph

const redis = createClient();

async function getStockAnalysis(ticker: string) {
  const cacheKey = `analysis:${ticker.toLowerCase()}`;
  
  // 1. Check if cached analysis exists in Redis
  const cachedReport = await redis.get(cacheKey);
  if (cachedReport) {
    console.log("[Cache Hit]: Returning cached financial report.");
    return JSON.parse(cachedReport);
  }
  
  console.log("[Cache Miss]: Running Tavily search and LLM graph...");
  
  // 2. Execute expensive LangGraph workflow
  const finalState = await app.invoke({ query: `${ticker} financial metrics` });
  const report = finalState.finalDecision;
  
  // 3. Save to Redis with a Time-To-Live (TTL) of 1 hour (3600 seconds)
  await redis.setEx(cacheKey, 3600, JSON.stringify(report));
  
  return report;
}
```

---

## 💼 Why It Matters in a Real Product
Web users expect page loads under 2 seconds. A cold agent run that searches the web, parses HTML, and runs a structured LLM call takes **5 to 8 seconds** to resolve. 

Serving a cached report takes **under 100 milliseconds**, drastically improving the user experience while reducing token expenses.

---

## ⚠️ Common Beginner Mistake: Permanent Cache States (Infinite Cache)

Beginners often cache stock data in their database without setting a **Time-To-Live (TTL)** expiration parameter.

```typescript
// INCORRECT: Infinite cache without expiration
await redis.set(cacheKey, JSON.stringify(report));
```
*   **Why it's bad:** The cache never updates. If the company reports new earnings next week, or if the stock price drops 20% today, the user will continue to receive the cached stale data, making the analysis useless.
*   **The Fix:** Always specify an expiration limit (using `setEx` or database timestamps) to ensure the cache invalidates and refreshes periodically.

---

## 🧠 Self-Check Recall

1.  How does caching improve both user latency and API billing?
2.  What is the recommended cache expiration limit (TTL) for highly volatile stock prices?
3.  What does the abbreviation TTL stand for?
4.  Write the Redis command to save a value with a 10-minute expiration limit.
5.  What occurs during a "Cache Miss"?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **It bypasses expensive API calls.** Serving data locally from cache takes milliseconds (improving latency) and saves token usage fees.
2.  **A short TTL** (such as 5 to 15 minutes).
3.  **Time-To-Live** (the lifespan of a cache record before it is deleted).
4.  **`redis.setEx(key, 600, value)`** (600 seconds = 10 minutes).
5.  **The requested key is not found in cache.** The server must execute the original search and LLM operations, and then save the new results to cache.
</details>
