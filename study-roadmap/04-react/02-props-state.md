# React Basics: Props & State

In React, data flows in two ways: **Props** (data passed *into* a component) and **State** (data managed *inside* a component). Understanding the difference is crucial for building reactive user interfaces.

---

## 1. Props: External Configuration
**Props** (short for properties) are variables passed down from a parent component to a child component, behaving like arguments passed to a function.
*   **Props are Read-Only (Immutable):** A child component must never modify the props it receives. If you need to change the data, the parent must change the prop value and pass it down again.

## 2. State: Internal Memory
**State** is a component's private, internal memory. It is used to store variables that can change over time based on user interactions (like input typing, checkbox clicks, or API fetches).
*   **Triggering Rerenders:** When a state variable updates, React automatically rerenders the component and its children to update the UI on the screen.
*   **The `useState` Hook:** We declare state using the `useState` hook:
    `const [value, setValue] = useState(initialValue);`

---

## 💼 Why It Matters in a Real Product
If you store search input as a regular variable instead of State, the user's typing will update the variable, but the screen will not update to show the text. To trigger React to redraw the screen with the new inputs, you must use State.

---

## 📝 Code Example: Controlled Counter
```jsx
import React, { useState } from 'react';

// Child Component receiving Props
function StockLabel({ symbol, count }) {
  return <p>Analyzing {count} shares of {symbol}</p>;
}

// Parent Component managing State
export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <StockLabel symbol="TSLA" count={count} />
      <button onClick={() => setCount(count + 1)}>Add Share</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

## ⚠️ Common Beginner Mistake: Mutating State Directly
```javascript
// INCORRECT: Direct mutation does not trigger rerender!
const [user, setUser] = useState({ name: "Alice", age: 25 });
const updateAge = () => {
  user.age = 26; // OOPS: Direct mutation!
};
```
*   **Why it fails:** React checks if the object reference changed to trigger a rerender. Mutating the object directly keeps the same reference, so React ignores the change and the UI remains outdated.
*   **The Fix:** Always return a *new* object using the spread operator (`...`):
```javascript
// CORRECT: Creates a new object reference
const updateAge = () => {
  setUser({ ...user, age: 26 });
};
```

---

## 🧠 Self-Check Recall
1.  What is the main difference between Props and State?
2.  Are Props mutable (writable) by the child component that receives them?
3.  Why does updating a standard JavaScript variable (like `let count = 0;`) inside a component fail to update the text on the screen?
4.  Write the command used to initialize a state variable named `query` with an empty string default.
5.  Why must you clone an object or array when updating state in React?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **Props are passed from the outside** (like function arguments) and are read-only. **State is managed internally** and can change over time to trigger rerenders.
2.  **No.** Props are strictly immutable.
3.  **Because it doesn't trigger a rerender.** Only state updates trigger React to redraw the interface.
4.  **`const [query, setQuery] = useState("");`**
5.  **React compares object references** to detect updates. Creating a new reference forces React to register the change and rerender.
</details>