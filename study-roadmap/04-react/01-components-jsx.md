# React Basics: Components & JSX

For developers who know JavaScript, **React** introduces a new way to build user interfaces. Instead of writing separate HTML files and manipulating them using `document.querySelector()`, React uses **Components** and **JSX** to combine structure and logic in one place.

---

## 1. What is a Component?
A React component is simply a JavaScript function that returns user interface elements. Components allow you to build reusable, isolated building blocks (like buttons, navigation bars, or forms) and combine them to create complex pages.

## 2. What is JSX?
JSX (JavaScript XML) is an HTML-like syntax used inside React components to describe what the UI should look like.
*   **JSX is not HTML:** Under the hood, the compiler converts JSX tags into standard JavaScript objects (`React.createElement()`).
*   **Rules of JSX:**
    1.  **Must return a single root element:** You cannot return two adjacent tags. If you don't want to add a wrapper `<div>`, use a Fragment: `<> ... </\>`.
    2.  **Close all tags:** Self-closing tags like `<img>` must end with a slash: `<img />`.
    3.  **CamelCase properties:** HTML properties like `class` and `onclick` become `className` and `onClick` in JSX.
    4.  **Embed JS expressions:** You can write any JavaScript expression inside curly braces `{}`.

---

## 💼 Why It Matters in a Real Product
In a complex financial dashboard, you want to avoid duplicating code. By separating elements into components (e.g. a `<StockCard />` component), you can render hundreds of different stock cards dynamically by passing different data, maintaining a dry and clean codebase.

---

## 📝 Code Example: A Simple Header Component
```jsx
import React from 'react';

export default function Header() {
  const websiteName = "AI Investment Assistant";
  
  const handleAlert = () => {
    alert("System Online!");
  };

  return (
    <header className="header-nav">
      <h1>{websiteName}</h1>
      <button onClick={handleAlert}>Check Status</button>
    </header>
  );
}
```

---

## ⚠️ Common Beginner Mistake: Returning Multiple Root Tags
```jsx
// INCORRECT: Returning two sibling elements
function Sidebar() {
  return (
    <h2>Menu</h2>
    <p>Links go here</p>
  );
}
```
*   **Why it fails:** JavaScript cannot return two separate values from a function at the same time.
*   **The Fix:** Wrap the sibling tags in a Fragment `<>` or a parent container:
```jsx
// CORRECT: Wrapped in a Fragment
function Sidebar() {
  return (
    <>
      <h2>Menu</h2>
      <p>Links go here</p>
    </>
  );
}
```

---

## 🧠 Self-Check Recall
1.  What is a React component in plain terms?
2.  What does the compiler convert JSX tags into under the hood?
3.  Why can't you return two sibling tags directly from a JSX return statement?
4.  How do you write the standard HTML attribute `class="card"` in JSX?
5.  What syntax is used to embed JavaScript variables or expressions inside JSX?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **A JavaScript function** that returns JSX describing user interface elements.
2.  **Standard JavaScript objects** (`React.createElement()` calls).
3.  **A JavaScript function cannot return two values** simultaneously. They must be wrapped in a single root object or Fragment.
4.  **`className="card"`**
5.  **Curly braces** (`{}`).
</details>