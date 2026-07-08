# Next.js Route Handlers: Writing API Endpoints

Next.js doesn't just serve user interfaces (HTML). It also acts as a backend server capable of hosting fully functional API endpoints (JSON). These are called **Route Handlers**.

In this guide, you will learn the folder structures Next.js expects for APIs and how to write a handler that parses a `POST` request, calls external search APIs and LLMs, and returns formatted JSON.

---

## 1. Folder Structures: `page.tsx` vs `route.ts`

Just like webpages are defined by `page.tsx`, API endpoints are defined by files named exactly **`route.ts`** (or `route.js`).

### The Mapping Rules
*   An API at `/api/research` must be located at `app/api/research/route.ts`.
*   An API at `/api/chat` must be located at `app/api/chat/route.ts`.

> [!WARNING]
> **No Conflicts Allowed:** You cannot have a `page.tsx` and a `route.ts` file in the same folder (e.g. `app/about/page.tsx` and `app/about/route.ts`). If you do, Next.js will not know whether the user wants HTML or JSON at that URL path, and will throw a build error.

---

## 2. Complete Runnable API Code Example

Here is a complete, production-ready `route.ts` handler that handles a search and LLM summary flow.

Place this code inside `app/api/research/route.ts`:

```typescript
import { NextResponse } from "next/server";

// We export an async function named after the HTTP verb (GET, POST, PUT, DELETE)
export async function POST(request: Request) {
  try {
    // 1. Parse the incoming JSON request body
    const body = await request.json();
    const { query } = body;

    // Validate that the query is provided
    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "A search query is required and must be a string." },
        { status: 400 } // 400 Bad Request
      );
    }

    // 2. Fetch data from an external search API (e.g. Tavily search)
    const searchResponse = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY || "mock_key",
        query: query,
      }),
    });

    if (!searchResponse.ok) {
      return NextResponse.json(
        { error: "Failed to retrieve search results from external API." },
        { status: 502 } // 502 Bad Gateway
      );
    }

    const searchData = await searchResponse.json();

    // 3. Send search data to an LLM provider (OpenAI Chat Completions)
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY || "mock_key"}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a research assistant. Summarize the search results concisely.",
          },
          {
            role: "user",
            content: `User query: ${query}\nSearch data: ${JSON.stringify(searchData)}`,
          },
        ],
      }),
    });

    if (!openaiResponse.ok) {
      return NextResponse.json(
        { error: "Failed to generate summaries from the LLM." },
        { status: 502 }
      );
    }

    const openaiData = await openaiResponse.json();
    const summary = openaiData.choices[0].message.content;

    // 4. Return successful compiled response
    return NextResponse.json(
      {
        success: true,
        query: query,
        summary: summary,
        rawResults: searchData.results || [],
      },
      { status: 200 } // 200 OK
    );

  } catch (error: any) {
    console.error("API Route error:", error);
    // Return standard 500 Internal Server Error if something crashes
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
```

---

## ⚠️ Common Mistake: Reading `request.json()` More Than Once

Inside a route handler, the `Request` object is a readable stream. Once you parse the body with `await request.json()`, the stream is locked and cannot be read again.

```typescript
export async function POST(request: Request) {
  // First read: works fine!
  const firstRead = await request.json(); 
  
  // Second read: will CRASH the route!
  const secondRead = await request.json(); 
}
```
*   **What happens:** The server throws a runtime crash error.
*   **The Error Message:** `TypeError: body stream already read` (or similar stream lock errors).
*   **The Fix:** Read it exactly once and save the parsed object into a variable to be reused throughout the code.

---

## 🧠 Self-Check Recall

1.  To expose an API at `/api/agent/run`, what exact folder and file path must you create under `app/`?
2.  Can you place both `route.ts` and `page.tsx` inside the folder `app/api/user/`?
3.  What function do you import from `next/server` to build JSON responses in Next.js?
4.  Why are external API errors (like OpenAI failing) standardly returned with status code `502` instead of `500`?
5.  What HTTP method is standard for endpoints that receive data to process or write (like a user query) in a request body?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`app/api/agent/run/route.ts`**
2.  **No.** Putting both in the same directory causes a conflict because Next.js cannot resolve whether that URL should serve HTML or JSON, resulting in a build error.
3.  **`NextResponse`** (using `NextResponse.json(...)`).
4.  **`502 Bad Gateway`** indicates that our server, acting as a gateway or proxy, received an invalid or failed response from an upstream server (the external API). `500` is reserved for crashes inside *our* code.
5.  **`POST`**
</details>
