# Calling External APIs: Tavily Search & OpenAI Chat

When building AI workflows, your server acts as an orchestrator. It frequently calls external REST APIs using Node.js's native **`fetch`** method.

In this guide, you will learn how to make outbound `POST` requests, configure headers for authentication, pass data payloads, and handle external JSON responses.

---

## 1. Structuring an Outbound `fetch` Request

To make a request to a modern JSON API, you must provide three things to the `fetch` function:
1.  **The Endpoint URL:** The address of the service (e.g., `https://api.openai.com/v1/...`).
2.  **Headers:** Key-value pairs containing metadata. For JSON APIs, you must specify `Content-Type: application/json` and provide authentication credentials (like a `Bearer` token).
3.  **The Body:** The actual data payload, which must be converted from a JavaScript object into a flat string using `JSON.stringify()`.

---

## 2. Complete Runnable Example: Sequential Outbound Calls

Here is a complete, runnable Next.js Route Handler demonstrating how to call Tavily Search and OpenAI Chat sequentially:

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // --- CALL 1: Tavily Search API ---
    const searchUrl = "https://api.tavily.com/search";
    const searchPayload = {
      api_key: process.env.TAVILY_API_KEY || "mock_key",
      query: query,
      search_depth: "basic"
    };

    const searchResponse = await fetch(searchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Mandate JSON content transfer
      },
      body: JSON.stringify(searchPayload) // Flatten object to string
    });

    // Check if the external search failed
    if (!searchResponse.ok) {
      const errorText = await searchResponse.text();
      console.error("Search API failed:", errorText);
      return NextResponse.json({ error: "Failed to fetch search results" }, { status: 502 });
    }

    const searchData = await searchResponse.json();
    const searchResults = searchData.results || [];

    // --- CALL 2: OpenAI Chat Completions API ---
    const llmUrl = "https://api.openai.com/v1/chat/completions";
    const llmPayload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize the provided search results to answer the user's question."
        },
        {
          role: "user",
          content: `Question: ${query}\nSearch Results: ${JSON.stringify(searchResults)}`
        }
      ]
    };

    const llmResponse = await fetch(llmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY || "mock_key"}` // Bearer token authentication header
      },
      body: JSON.stringify(llmPayload)
    });

    // Check if the external LLM failed
    if (!llmResponse.ok) {
      const errorText = await llmResponse.text();
      console.error("LLM API failed:", errorText);
      return NextResponse.json({ error: "Failed to generate LLM summary" }, { status: 502 });
    }

    const llmData = await llmResponse.json();
    const summary = llmData.choices[0].message.content;

    // Return the combined output
    return NextResponse.json({
      query,
      summary,
      sources: searchResults
    }, { status: 200 });

  } catch (err: any) {
    console.error("Route error:", err);
    return NextResponse.json({ error: "Server crashed", details: err.message }, { status: 500 });
  }
}
```

---

## ⚠️ Common Mistake: Forgetting to Stringify the Request Body

A common beginner mistake is passing a raw JavaScript object directly to the `body` field of a `fetch` request:

```typescript
// INCORRECT: Passing a raw object
const res = await fetch("https://api.openai.com/...", {
  method: "POST",
  body: { model: "gpt-4o-mini", messages: [] } 
});
```
*   **What happens:** The server rejects the request with a `400 Bad Request` or crashes.
*   **Why:** HTTP bodies can only transmit strings or binary streams. Passing an object causes JavaScript to convert it to the string `"[object Object]"`, which is not valid JSON.
*   **The Fix:** Wrap the object in `JSON.stringify()`:
```typescript
// CORRECT: Convert object to JSON string first
const res = await fetch("https://api.openai.com/...", {
  method: "POST",
  body: JSON.stringify({ model: "gpt-4o-mini", messages: [] }) 
});
```

---

## 🧠 Self-Check Recall

1.  What function is used to convert a JavaScript object into a JSON string before sending it in a fetch body?
2.  Which header must you configure to specify that the payload you are sending is formatted as JSON?
3.  What standard format is used in the `Authorization` header to supply API keys (e.g. `Bearer ...` or `Key ...`)?
4.  If a fetch call returns `response.ok = false`, is the promise rejected, or does it resolve successfully?
5.  What function do you call on the fetch `response` object to parse the returned JSON string back into a JavaScript object?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`JSON.stringify()`**
2.  **`Content-Type: application/json`**
3.  **`Authorization: Bearer <API_KEY>`**
4.  **It resolves successfully.** The promise only rejects on network failures. If the server responds with a status code like `404` or `500`, it still returns a resolved response object where `.ok` is `false`.
5.  **`await response.json()`**
</details>
