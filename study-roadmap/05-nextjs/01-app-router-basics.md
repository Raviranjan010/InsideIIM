# Next.js App Router: Routing & Folder Structures

If you already know **React**, you are used to building components. However, in standard React, you have to configure library routers (like `react-router-dom`) manually to map URLs to specific components.

**Next.js** handles routing completely differently. It uses a **File-System Router**. This means the folders on your computer *directly* define the web pages (routes) of your application.

---

## 1. How Folder-Based Routing Works

In the Next.js App Router, every URL path corresponds to a folder structure inside a root folder named **`app/`**.

*   `app/page.tsx` represents the homepage: `https://yourwebsite.com/`
*   `app/about/page.tsx` represents: `https://yourwebsite.com/about`
*   `app/blog/page.tsx` represents: `https://yourwebsite.com/blog`

For a folder to become a public webpage, it **must** contain a file named exactly **`page.tsx`** (or `page.js`). If a folder does not have a `page.tsx` file, trying to visit that URL will return a `404 Not Found` error.

---

## 2. Reserved Filenames

Next.js reserves a few specific filenames inside the `app/` directory to build layouts and pages. Here are the two most important:

### 1. `page.tsx` (The Content)
Defines the unique user interface (UI) for that specific route. It is a standard React component that is exported as default.

```tsx
// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>About Our AI System</h1>
      <p>This system utilizes LangGraph to run custom agentic loops.</p>
    </main>
  );
}
```

### 2. `layout.tsx` (The Frame)
Defines the shared UI across multiple pages (like navigation headers, sidebars, or footers). Layouts nest automatically: a layout in the root `app/layout.tsx` wraps every single page in your application.

```tsx
// app/layout.tsx
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Universal navigation bar shared by all pages */}
        <nav style={{ padding: "10px", background: "#f0f0f0" }}>
          <a href="/">Home</a> | <a href="/about">About</a>
        </nav>
        {/* The child page components are rendered here */}
        {children}
      </body>
    </html>
  );
}
```

---

## 3. Server Components vs. Client Components

By default, every file in the Next.js App Router is a **React Server Component (RSC)**.
*   **Server Components** render on the server. They cannot use browser features (like `useState`, `useEffect`, or clicks/events).
*   **Client Components** are traditional React components that run in the browser. To make a file a Client Component, you must add the string `"use client"` at the very top of the file.

---

## ⚠️ Common Mistake: Creating a Folder Without `page.tsx`

Beginners often create a folder and expect it to automatically act as a route, but write a different filename (like `About.tsx` or `index.tsx` instead of `page.tsx`).

Suppose you have this file structure:
```text
app/
└── dashboard/
    └── dashboard.tsx   <-- OOPS! Mismatched filename
```
*   **What happens:** Visiting `https://localhost:3000/dashboard` results in a **`404 Not Found`** page.
*   **The Fix:** Rename the file to `page.tsx`:
```text
app/
└── dashboard/
    └── page.tsx        <-- CORRECT
```

---

## 🧠 Self-Check Recall

1.  If you want to create a page at `/dashboard/settings`, what folder and file path must you create inside the `app/` directory?
2.  Which reserved filename is used to define shared UI headers and footers?
3.  What happens if you try to use `useState` inside a component file that does not have `"use client"` written at the top?
4.  Why does Next.js use a file-system router instead of traditional React router packages?
5.  What is the purpose of the `{ children }` prop in a `layout.tsx` file?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`app/dashboard/settings/page.tsx`**
2.  **`layout.tsx`**
3.  **It will throw a build/runtime error** explaining that React hooks can only be used inside Client Components, and suggesting you add the `"use client"` directive.
4.  **To eliminate routing configuration boilerplate.** It maps the folder structure directly to URLs, making routing automatic and highly structured.
5.  **It acts as a placeholder.** It marks the exact location where the nested child pages or nested layouts will be injected and drawn inside the layout's structural frame.
</details>
