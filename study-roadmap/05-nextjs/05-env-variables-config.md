# Environment Variables: Managing Secrets & Config

When building AI applications, you will handle sensitive API keys (e.g., `OPENAI_API_KEY`, `TAVILY_API_KEY`). You must never write these keys directly in your code, as pushing them to GitHub would expose them to the public.

Instead, we use **Environment Variables**. Next.js has built-in support for environment variables, including a strict security model to prevent keys from leaking to the browser.

---

## 1. Setting Up the `.env.local` File

To define variables, create a file named exactly **`.env.local`** at the root of your project directory. 

```env
# Secrets (Accessible ONLY on the Server)
OPENAI_API_KEY=sk-proj-123456789abcde
TAVILY_API_KEY=tvly-987654321

# Public Configurations (Accessible on both Server AND Browser)
NEXT_PUBLIC_API_URL=https://api.mywebsite.com
NEXT_PUBLIC_ANALYTICS_ID=UA-999999-1
```

> [!IMPORTANT]
> **Safety Rule:** Always add `.env.local` to your `.gitignore` file. Never commit it to GitHub.

---

## 2. Server-Side vs. Client-Side Access

By default, all environment variables inside `.env.local` are **private** and accessible **only on the Node.js server**. 

If Next.js allowed the browser to read variables like `OPENAI_API_KEY`, any visitor to your site could open the browser's developer tools, inspect the compiled JavaScript, steal your keys, and run up thousands of dollars of bills on your accounts.

### 1. Server-Side Access (Secure)
You can access all environment variables inside **Route Handlers (`route.ts`)** and **Server Components**:

```typescript
// app/api/test/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // Safe to read private secrets on the server:
  const apiKey = process.env.OPENAI_API_KEY; 
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;

  return NextResponse.json({
    hasKey: !!apiKey,       // Returns true
    url: publicUrl          // Returns "https://api.mywebsite.com"
  });
}
```

### 2. Client-Side Access (Browser Bundle)
If you need to access a variable in the browser (e.g., inside a `"use client"` component), it **must** be prefixed with **`NEXT_PUBLIC_`**. If a variable does not have this prefix, it evaluates to `undefined` in the browser.

```tsx
// app/dashboard/page.tsx
"use client";

import React from "react";

export default function Dashboard() {
  // Accessible (prefixed with NEXT_PUBLIC_):
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // NOT ACCESSIBLE (returns undefined to protect secrets):
  const secretKey = process.env.OPENAI_API_KEY;

  return (
    <div>
      <p>Connecting to: {apiUrl}</p> 
      <p>Secret Key Status: {secretKey ? "Visible (DANGER)" : "Hidden (SAFE)"}</p>
      {/* Renders: "Secret Key Status: Hidden (SAFE)" */}
    </div>
  );
}
```

---

## ⚠️ Common Mistake: Accessing Secrets in Client Components

A very common mistake is attempting to call an LLM API directly from a Client Component using `process.env.OPENAI_API_KEY`.

```tsx
// app/page.tsx
"use client";

import React from "react";

export default function ChatPage() {
  const sendMessage = async () => {
    // OOPS: Inside a client component, this evaluates to undefined!
    const key = process.env.OPENAI_API_KEY; 
    
    // Calling fetch with undefined header crashes or returns unauthorized
    const res = await fetch("https://api.openai.com/v1/...", {
      headers: { Authorization: `Bearer ${key}` }
    });
  };

  return <button onClick={sendMessage}>Send</button>;
}
```
*   **What happens:** The fetch request fails with a `401 Unauthorized` error because `key` is `undefined`.
*   **The Fix:** Never fetch OpenAI directly from client components. Instead, send the user's message to a local Route Handler (`/api/chat/route.ts`), read the secret key safely *on the server*, and have the server handle the OpenAI request.

---

## 🧠 Self-Check Recall

1.  What file name does Next.js look for locally to load environment variables?
2.  If you declare `SECRET_KEY=my_pass` in `.env.local`, what value will it evaluate to in a `"use client"` component?
3.  Why does Next.js hide environment variables from the browser bundle by default?
4.  What prefix must you add to an environment variable name so that React components running in the browser can read it?
5.  Should you add `.env.local` to your git commits?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`.env.local`**
2.  **`undefined`** (because it lacks the `NEXT_PUBLIC_` prefix).
3.  **For security reasons.** It prevents sensitive keys and database passwords from being exposed inside the client browser JavaScript bundle, protecting your accounts from being hijacked.
4.  **`NEXT_PUBLIC_`** (e.g. `NEXT_PUBLIC_MY_VAR`).
5.  **No, never.** It contains private keys and passwords. It must always be included in your `.gitignore` file.
</details>
