# Performance & Rerenders: Avoiding Bottlenecks

In React, a **Rerender** occurs when a component recalculates its JSX output to update the screen. Rerenders are normal, but excessive, unnecessary rerenders will slow down your application and create laggy interfaces.

This guide explains why components rerender and how to optimize them.

---

## 1. Why Do Components Rerender?

A component rerenders under three conditions:
1.  **State Changes:** The component's own state updates.
2.  **Parent Rerenders:** The parent component rerenders (which forces **all** its children to rerender recursively, regardless of whether their props changed).
3.  **Prop Changes:** The props passed into the component change.

---

## 2. How to Prevent Unnecessary Rerenders

### A. React.memo
By default, if a parent component rerenders, all its children rerender. You can prevent this by wrapping a child component in **`React.memo`**. This tells React to check the child's props; if the props are identical to the last render, React skips rendering the child entirely.

```jsx
import React from 'react';

// Child component will only rerender if 'ticker' prop changes
const StockDisplay = React.memo(({ ticker }) => {
  return <div>Stock: {ticker}</div>;
});
```

### B. Moving State Down
If a state variable is only used by one small section of a large page, move that state variable down into a dedicated child component. This isolates rerenders to that small component, preventing the entire page from redrawing.

---

## 💼 Why It Matters in a Real Product
In a dashboard displaying a real-time stock ticker stream alongside an interactive calculation input box, typing a number in the input box triggers a state update. If the parent component contains both the input box and a complex stock stream chart, typing will cause the entire chart to recalculate and redraw on every keystroke, causing typing lag. Isolating the input state prevents this.

---

## ⚠️ Common Beginner Mistake: Creating Objects or Functions inside Parent Render Bodies
If you pass a function or object prop to a child component wrapped in `React.memo`, it will still rerender on every parent update unless you cache them.

```jsx
// INCORRECT: Child still rerenders on every parent update!
function Parent() {
  const [count, setCount] = useState(0);
  const handleSelect = () => console.log("Selected"); // Recreated on every render!

  return <MemoizedChild onSelect={handleSelect} />;
}
```
*   **Why it fails:** On every render, a new `handleSelect` function reference is created in memory. React compares references; seeing a new reference, it assumes the prop changed and rerenders the child, defeating `React.memo`.
*   **The Fix:** Cache the function definition using the `useCallback` hook:
```jsx
// CORRECT: Reference remains identical across renders
const handleSelect = useCallback(() => {
  console.log("Selected");
}, []);
```

---

## 🧠 Self-Check Recall
1.  Name the three triggers that cause a React component to rerender.
2.  What wrapper function is used to prevent a child component from rerendering if its props remain unchanged?
3.  How does moving state down to a smaller child component improve performance?
4.  Why does passing a raw function like `() => {}` as a prop break `React.memo`?
5.  What hook should be used to cache function references passed as props to memoized children?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **State updates, parent component rerenders,** and **prop updates**.
2.  **`React.memo`**
3.  **It isolates rerenders.** Only the smaller child component redraws, preventing the parent page from recalculating.
4.  **Because of reference comparison.** The inline function is recreated on every render with a new memory reference, causing React to think the prop changed.
5.  **`useCallback`**
</details>