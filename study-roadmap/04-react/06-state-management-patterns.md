# State Management Patterns: Lifting State & Context

As your React application grows, you will need to share data between components that are far apart in the file tree. 

In this guide, you will learn the two primary state sharing patterns: **Lifting State Up** and the **Context API**.

---

## 1. Lifting State Up

React enforces a **one-way data flow** (top-down). If two sibling components need access to the same state variable, you cannot pass the state directly sideways. 

Instead, you must **lift the state up** to their nearest shared parent component, and pass the data down as props.

```text
       [ Parent Component ]  <-- Stores State & Setter Function
      /                      [ Input Child ]      [ Display Child ]
  (Calls Setter Prop)  (Receives Value Prop)
```

---

## 2. The Context API: Avoiding Prop Drilling

If you have a global state variable (like a user authentication token) that is needed by a component 10 layers deep, passing it through 8 intermediate components that don't use it is called **Prop Drilling**. This makes components difficult to reuse.

The **Context API** solves this by creating a global provider. Any child component can subscribe and read this context directly without prop drilling.

```javascript
// 1. Create Context
const UserContext = React.createContext(null);

// 2. Wrap parent with Provider
<UserContext.Provider value={user}>
  <AppLayout />
</UserContext.Provider>

// 3. Consume in deep child
const user = useContext(UserContext);
```

---

## 💼 Why It Matters in a Real Product
In an investment app, you want the selected stock ticker to be visible in both the search header and the detailed analysis card below it. By lifting the `selectedTicker` state up to the parent layout wrapper, the header can write to it and the analysis card can read from it, keeping the UI synchronized.

---

## 📝 Code Example: Lifting State Up
```jsx
import React, { useState } from 'react';

// Sibling A: Writes to state
function SearchBox({ onSearch }) {
  return <button onClick={() => onSearch("TSLA")}>Load Tesla</button>;
}

// Sibling B: Reads state
function PriceCard({ ticker }) {
  return <div>Active Report Ticker: {ticker}</div>;
}

// Shared Parent: Coordinates data flow
export default function Dashboard() {
  const [ticker, setTicker] = useState("AAPL");

  return (
    <div>
      <SearchBox onSearch={setTicker} />
      <PriceCard ticker={ticker} />
    </div>
  );
}
```

---

## ⚠️ Common Beginner Mistake: Overusing Context for Local States
Beginners often create a Context Provider for every small form, thinking it is cleaner than passing props to immediate children.

*   **Why it's bad:** Context triggers a rerender of **all** consumer components whenever the context value changes. Overusing context for high-frequency updates (like input typing) leads to performance lag.
*   **The Fix:** Use local props for simple parent-child relationships, and reserve Context for global, low-frequency variables (like theme settings, auth status, or language).

---

## 🧠 Self-Check Recall
1.  What does the phrase "Lifting State Up" mean?
2.  What is "Prop Drilling" and why is it considered a bad practice?
3.  Which React API helps you share state globally without prop drilling?
4.  Write the hook name used to consume a Context value in a child component.
5.  Why should you avoid using Context to store high-frequency typing states?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **Moving state to the nearest shared parent component** so that sibling components can share and read the same data.
2.  **Passing props through multiple intermediate components** that do not use the data, purely to reach a deep child. It makes code difficult to maintain and reuse.
3.  **The Context API** (using `React.createContext`).
4.  **`useContext`**
5.  **Performance issues.** Every keypress will force all components wrapped by that Context Provider to rerender, causing typing lag.
</details>