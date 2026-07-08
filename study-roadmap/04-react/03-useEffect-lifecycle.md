# React Basics: Side Effects & useEffect

In React, the main render function should be "pure"—meaning it only calculates JSX based on current props and state. Operations that interact with the outside world (like fetching API data, setting up subscriptions, or writing to localStorage) are called **Side Effects**.

We manage side effects using the **`useEffect`** hook.

---

## 1. How `useEffect` Works
The `useEffect` hook takes two arguments: a callback function containing the side effect code, and a **Dependency Array** that controls when that callback runs.

```javascript
useEffect(() => {
  // Side effect code runs here
}, [dependencies]);
```

### The Dependency Array Rules:
1.  **No Dependency Array:** Runs on **every single render** of the component. (Rarely used, bad for performance).
2.  **Empty Array (`[]`):** Runs exactly **once** when the component first mounts (loads) on the screen. (Ideal for initial API fetches).
3.  **Array with variables (`[query]`):** Runs on mount, and then runs again **only if** the variables in the array change.

---

## 2. Cleaning Up Effects
If your effect opens a WebSocket connection or sets a timer, you must close it when the component unmounts to prevent memory leaks. You do this by returning a **cleanup function** from `useEffect`.

---

## 💼 Why It Matters in a Real Product
When a user opens your investment dashboard, you need to fetch stock prices from your Next.js Route Handler. Doing this directly in the render body would trigger a new fetch on every state update, creating an infinite network request loop that crashes your API limits. `useEffect` allows you to fetch data safely once.

---

## 📝 Code Example: Fetching Stock Data safely
```jsx
import React, { useState, useEffect } from 'react';

export default function StockFetcher({ ticker }) {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    async function fetchPrice() {
      const res = await fetch(`/api/price?ticker=${ticker}`);
      const data = await res.json();
      if (active) {
        setPrice(data.price);
        setLoading(false);
      }
    }

    fetchPrice();

    // Cleanup function: runs when ticker changes or component unmounts
    return () => {
      active = false;
    };
  }, [ticker]); // Re-run fetch ONLY if ticker prop changes

  if (loading) return <p>Loading stock data...</p>;
  return <p>Current Price of {ticker}: ${price}</p>;
}
```

---

## ⚠️ Common Beginner Mistake: Creating Infinite Fetch Loops
```javascript
// INCORRECT: Infinite Loop!
useEffect(() => {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => setData(data)); // State update triggers rerender, which runs effect again!
}); // OOPS: Missing dependency array!
```
*   **Why it fails:** Without a dependency array, the effect runs on every render. The effect fetches data and updates state, which triggers a rerender, which runs the effect again, spinning endlessly.
*   **The Fix:** Add an empty dependency array `[]` (if you want it to run once) or pass the specific tracking variables.

---

## 🧠 Self-Check Recall
1.  What is a "Side Effect" in React?
2.  When does a `useEffect` callback run if you provide an empty dependency array `[]`?
3.  What happens if you omit the dependency array completely?
4.  Why is returning a cleanup function from `useEffect` important?
5.  How do you prevent a state update inside `useEffect` from triggering an infinite rendering loop?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **Any operation that interacts with the outside world** (like fetching data, writing to localStorage, or subscribing to sockets) outside the pure rendering cycle.
2.  **Exactly once,** when the component first mounts on the screen.
3.  **It runs on every single render** of the component, which can lead to performance bottlenecks or infinite loops.
4.  **To clear active timers, listeners, or socket connections,** preventing memory leaks when the component unmounts.
5.  **By specifying a proper dependency array** (like `[]` or specific variables) to control when the effect is allowed to run.
</details>