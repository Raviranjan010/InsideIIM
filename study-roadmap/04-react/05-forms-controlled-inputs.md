# React Basics: Controlled Forms & Inputs

In standard HTML forms, input elements manage their own state in the browser DOM. In React, we want our JavaScript code to have complete control over what the user sees and inputs. 

This pattern is called **Controlled Components**.

---

## 1. How Controlled Inputs Work
In a controlled input, the input's current value is bound directly to a React state variable, and any user typing triggers a state setter function via the `onChange` event listener.

```jsx
const [text, setText] = useState("");

// Bound value and listener
<input 
  type="text" 
  value={text} 
  onChange={(e) => setText(e.target.value)} 
/>
```

---

## 💼 Why It Matters in a Real Product
In our investment research assistant, we need to validate queries (such as checking that a stock ticker input doesn't contain numbers or special characters) *before* triggering a web search. Controlled inputs allow us to intercept the user's keystrokes, clean the string, and restrict form submissions if validation rules are violated.

---

## 📝 Code Example: A Search Ticker Form
```jsx
import React, { useState } from 'react';

export default function TickerForm({ onSearch }) {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    
    // Validation: Only allow alphabetical letters
    if (/[^A-Z]/.test(val)) {
      setError("Ticker symbol must contain letters only.");
    } else {
      setError("");
    }
    setTicker(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent standard page reload on submit
    if (!error && ticker.length > 0) {
      onSearch(ticker);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tickerInput">Enter Ticker Symbol:</label>
      <input 
        id="tickerInput"
        type="text" 
        value={ticker} 
        onChange={handleChange} 
        placeholder="e.g. TSLA"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={!!error || ticker.length === 0}>
        Analyze
      </button>
    </form>
  );
}
```

---

## ⚠️ Common Beginner Mistake: Forgetting `e.preventDefault()` in Submit Handlers
When a user clicks a button inside a `<form>`, the default browser behavior is to refresh the entire webpage and append parameters to the URL.

```javascript
// INCORRECT: Page refreshes, losing all state!
const handleSubmit = (e) => {
  callSearchAPI(ticker); // OOPS: Page reloads instantly after this line!
};
```
*   **Why it's bad:** The page reloads, wiping out all active React state and network streams.
*   **The Fix:** Always call `e.preventDefault()` as the very first line inside your form submit handler to cancel the default browser page reload behavior.

---

## 🧠 Self-Check Recall
1.  What is a "Controlled Component" in React?
2.  What HTML event listener is used to track keyboard typing in a React input?
3.  Why is `e.preventDefault()` necessary inside form submit handlers?
4.  Write the input tag parameters required to bind an input to a state variable named `email`.
5.  How do you disable a form submit button if an input state variable is empty?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **An input element whose value is driven by React state** and updated via state setter functions.
2.  **`onChange`**
3.  **To block the default browser page reload** behavior, preserving your active React state.
4.  **`value={email} onChange={(e) => setEmail(e.target.value)}`**
5.  **By passing a boolean expression to the `disabled` property** (e.g. `disabled={query.length === 0}`).
</details>