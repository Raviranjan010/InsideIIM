# Resilient API Calls: Timeouts, Retries & Errors

AI APIs are notoriously slow, and networks are inherently unreliable. If OpenAI takes 30 seconds to respond, or if Tavily is down momentarily, your application must handle it gracefully instead of hanging or crashing.

In this guide, you will learn how to enforce timeouts using **`AbortController`** and implement a robust **retry mechanism** for outbound calls within your Next.js Route Handlers.

---

## 1. Handling Timeouts with `AbortController`

By default, native `fetch` will wait indefinitely for a response, which can tie up server resources. To set a strict timeout limit (e.g., 5 seconds), we use the built-in **`AbortController`** object.

### How it works:
1.  We instantiate `new AbortController()`.
2.  We extract its `signal` and pass it inside the `fetch` options.
3.  We set a timer using `setTimeout()`. If the timer expires before the request completes, we call `controller.abort()`, which instantly cancels the network request and throws an error.

```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

try {
  const response = await fetch("https://api.openai.com/v1/...", {
    signal: controller.signal, // Link abort signal to fetch
    method: "POST",
    // ... headers and body ...
  });
} catch (err: any) {
  if (err.name === "AbortError") {
    console.error("Request timed out!");
  } else {
    console.error("Other network error:", err);
  }
} finally {
  clearTimeout(timeoutId); // Critically clean up the timer if it succeeds!
}
```

---

## 2. Implementing Retries with a Delay

If a request fails due to a temporary network blip, retrying the call 1 or 2 seconds later often solves the issue. Here is a reusable, helper function to fetch with retry logic and delays:

```typescript
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  retries = 3, 
  delayMs = 1000
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response; // Success! Return response immediately.
      
      console.warn(`Attempt ${attempt} returned error code ${response.status}.`);
    } catch (err) {
      console.warn(`Attempt ${attempt} network error:`, err);
      if (attempt === retries) throw err; // Out of retries, throw the final crash error.
    }
    
    // Wait for the specified delay before the next attempt
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  throw new Error(`Failed to fetch after ${retries} attempts.`);
}
```

---

## 3. Complete Runnable Example: Next.js Route Handler

Here is how you integrate timeouts and retries together inside a Next.js API route to ensure maximum reliability:

```typescript
import { NextResponse } from "next/server";

// Helper retry function
async function fetchWithRetryAndTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 6000,
  retries = 3,
  delayMs = 1000
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      if (response.ok) {
        clearTimeout(timer);
        return response;
      }
      console.warn(`Attempt ${attempt} failed with status: ${response.status}`);
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.warn(`Attempt ${attempt} timed out after ${timeoutMs}ms.`);
      } else {
        console.warn(`Attempt ${attempt} crashed:`, error);
      }
      if (attempt === retries) {
        clearTimeout(timer);
        throw error;
      }
    } finally {
      clearTimeout(timer); // Prevent timer memory leaks
    }

    // Wait before next attempt
    await new Promise((res) => setTimeout(res, delayMs));
  }
  throw new Error("Out of retries");
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // Call Tavily Search with 5 seconds timeout and 2 retries
    let searchData;
    try {
      const response = await fetchWithRetryAndTimeout(
        "https://api.tavily.com/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: process.env.TAVILY_API_KEY || "mock",
            query
          })
        },
        5000, // 5s timeout
        2,    // 2 retries
        1000  // 1s delay
      );
      searchData = await response.json();
    } catch (err: any) {
      console.error("Search failed after retries:", err);
      return NextResponse.json(
        { error: "Search service unavailable. Please try again later." },
        { status: 504 } // Gateway Timeout
      );
    }

    return NextResponse.json({ success: true, results: searchData.results || [] }, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: "Server error", details: err.message }, { status: 500 });
  }
}
```

---

## ⚠️ Common Mistake: Forgetting to Clear the Timeout Timer

If you don't call `clearTimeout(timeoutId)` inside the `finally` block of your code, the Node.js event loop will keep the timer active in memory until it completes, even if the fetch request succeeds in 200ms.

```typescript
try {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000); // 10s timer
  
  await fetch(url, { signal: controller.signal });
  // OOPS: Forgot to clear the timer here!
} catch (err) {}
```
*   **What happens:** The Node.js process consumes unnecessary memory. On high-traffic servers, this builds up thousands of active timers in memory, causing a memory leak that eventually crashes your server.
*   **The Fix:** Always clear the timer in a `finally` block to guarantee it runs regardless of whether the request succeeded or failed:
```typescript
const controller = new AbortController();
const timerId = setTimeout(() => controller.abort(), 10000);
try {
  await fetch(url, { signal: controller.signal });
} finally {
  clearTimeout(timerId); // Guaranteed to clean up!
}
```

---

## 🧠 Self-Check Recall

1.  What built-in JavaScript object is used to abort or cancel active fetch requests?
2.  If a fetch request is canceled due to a timeout, what is the name of the error thrown?
3.  Why is it important to call `clearTimeout()` if a fetch request completes successfully before the timeout duration?
4.  If a critical upstream API goes down completely, what HTTP status code (e.g. 504 or 400) should your route handler return to indicate a timeout?
5.  What mechanism can you use to pause execution for 2 seconds between retry loops in JavaScript?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`AbortController`**
2.  **`AbortError`** (the error's name property is `"AbortError"`).
3.  **To prevent memory leaks.** Clearing the timer frees up server memory; otherwise, the timer sits in memory until its duration expires.
4.  **`504 Gateway Timeout`** (or `503 Service Unavailable`).
5.  **`await new Promise(resolve => setTimeout(resolve, 2000));`**
</details>
