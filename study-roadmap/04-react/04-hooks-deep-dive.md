# React Basics: Core Hooks Deep Dive

Beyond `useState` and `useEffect`, React provides specialized hooks to manage DOM elements, cache calculations, and optimize performance. 

This guide covers **`useRef`**, **`useMemo`**, and **`useCallback`**.

---

## 1. `useRef`: Persistent Values Without Rerenders

A **ref** is an object with a single mutable property: `{ current: value }`. It persists across renders but **does not trigger a rerender** when you change its value.

### Use Cases:
*   Accessing raw DOM elements directly (e.g. focusing a text input).
*   Storing interval IDs or trackers that shouldn't redraw the UI.

```javascript
const inputRef = useRef(null);
const focusInput = () => inputRef.current.focus(); // Access DOM directly
```

---

## 2. `useMemo` & `useCallback`: Caching for Performance

Every time a component rerenders, all variables and functions inside it are recreated from scratch. For heavy tasks, this is wasteful.

*   **`useMemo`:** Caches (memoizes) the **value** returned by an expensive calculation.
*   **`useCallback`:** Caches the **function definition** itself, preventing child components from rerendering unnecessarily when a function is passed as a prop.

```javascript
// useMemo: Caches the calculated score value
const memoizedValuation = useMemo(() => {
  return runHeavyCalculations(stockData);
}, [stockData]); // Only recompute if stockData changes

// useCallback: Caches the function definition
const handleSearch = useCallback((query) => {
  console.log("Searching: ", query);
}, []); // Function definition never changes
```

---

## 💼 Why It Matters in a Real Product
In a financial dashboard displaying hundreds of stock rows, recalculating portfolio risk margins on every keystroke in a search box will cause UI lag. By wrapping the risk calculation in `useMemo` and dependency-gating it to only recompute when portfolio assets change, we keep the UI responsive.

---

## 📝 Code Example: Input Focus & Memoized Search Filter
```jsx
import React, { useState, useMemo, useRef } from 'react';

export default function PortfolioFilter({ stocks }) {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  // useMemo: Only filter list when query or stocks change
  const filteredStocks = useMemo(() => {
    console.log("Filtering stocks list...");
    return stocks.filter(s => s.toLowerCase().includes(query.toLowerCase()));
  }, [query, stocks]);

  const handleFocus = () => {
    searchInputRef.current.focus(); // Focus input using DOM ref
  };

  return (
    <div>
      <input 
        ref={searchInputRef}
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Filter stocks..."
      />
      <button onClick={handleFocus}>Focus Box</button>
      <ul>
        {filteredStocks.map(s => <li key={s}>{s}</li>)}
      </ul>
    </div>
  );
}
```

---

## ⚠️ Common Beginner Mistake: Using `useMemo` for Basic Tasks
Beginners often wrap every simple calculation (like string addition) in `useMemo`, thinking it automatically makes their app faster.

```javascript
// INCORRECT: Overusing useMemo for trivial operations
const uppercaseName = useMemo(() => name.toUpperCase(), [name]);
```
*   **Why it's bad:** Caching has an overhead. React must allocate memory for the dependencies array and perform comparison checks on every render. If the operation is cheap, this overhead is actually slower than just recalculating the value directly.
*   **The Fix:** Only use `useMemo` for heavy CPU tasks (like sorting, filtering arrays, or parsing large JSON matrices) or when passing values as dependencies to other hooks.

---

## 🧠 Self-Check Recall
1.  How does updating a `useRef` value differ from updating a `useState` value?
2.  Which hook would you use to cache the output value of a slow calculation?
3.  Which hook would you use to cache a function definition?
4.  Write the syntax to access the DOM node referenced by `const myRef = useRef(null)`.
5.  Why is wrapping a simple addition like `x + y` in `useMemo` bad practice?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **State updates trigger a rerender** and redraw the UI. **Ref updates do not** trigger rerenders.
2.  **`useMemo`**
3.  **`useCallback`**
4.  **`myRef.current`**
5.  **Because of checking overhead.** The performance cost of React checking the dependency array exceeds the cost of performing the simple addition directly.
</details>