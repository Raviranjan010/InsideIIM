# React Interview Q&A: 15 Core Questions

This bank contains 15 interview questions and answers focused on functional component rendering, hooks behavior, state design, and performance optimizations.

---

### Q1. Why does React state update asynchronously instead of updating variables instantly?
**Answer:**
React updates state asynchronously to optimize performance through **batching**. If state updates were synchronous, changing three state variables in a single click handler would force React to rerender the component three times in sequence. By batching updates, React waits for the handler code to finish executing, applies all state changes, and triggers a single rerender, reducing DOM writes.

---

### Q2. Explain the difference between `useState` and `useRef` regarding component rendering.
**Answer:**
Both hooks persist values across renders. However, updating a `useState` variable triggers a component rerender, causing React to recalculate the JSX and update the browser DOM. Modifying a `useRef` value (`ref.current = newValue`) does not trigger a rerender. Use `useState` for values that drive what the user sees, and `useRef` for values that don't affect layout (like timer IDs or DOM references).

---

### Q3. What is the significance of the dependency array in the `useEffect` hook?
**Answer:**
The dependency array controls when the effect runs. If omitted, the effect runs on every render, which can cause performance lag. If set to `[]` (empty), the effect runs once when the component mounts. If it contains variables (`[ticker]`), React compares the current values with their previous values, re-running the effect only if a change is detected.

---

### Q4. What is a memory leak in React, and how does `useEffect` prevent it?
**Answer:**
A memory leak occurs when a component sets up a background task (like a WebSocket subscription or a `setInterval` timer) and unmounts without clearing it. The task continues running in memory, consuming resources. `useEffect` prevents this by allowing you to return a **cleanup function** that clears the timer or closes the subscription when the component unmounts.

---

### Q5. What is the difference between `useMemo` and `useCallback`?
**Answer:**
*   **`useMemo`** caches (memoizes) the **value** returned by an expensive calculation, re-running the calculation only if its dependencies change.
*   **`useCallback`** caches the **function definition** itself, preventing child components from rerendering unnecessarily when a function is passed as a prop.

---

### Q6. What is a "Controlled Component" in React, and why is it preferred for forms?
**Answer:**
A controlled component is an input element whose value is driven by React state (`value={text}`) and updated via an `onChange` listener. This is preferred because it establishes React as the single source of truth, allowing developers to validate input, restrict characters, or update the UI dynamically as the user types.

---

### Q7. Explain "Lifting State Up" and provide a scenario where it is required.
**Answer:**
Lifting State Up is a pattern where you move state to the nearest shared parent component so that sibling components can share the same data. For example, in our dashboard, the `<SearchBar />` component needs to set the ticker, and the `<PriceDisplay />` component needs to read it. Since sibling components cannot share state directly, we lift the state up to the `<Dashboard />` parent.

---

### Q8. What is the React Context API, and what problem does it solve?
**Answer:**
The Context API allows you to share state globally across a component tree without manually passing props down through intermediate components, solving the issue of **prop drilling**. It is ideal for sharing global, low-frequency data like user authentication status or theme configurations.

---

### Q9. Why should you avoid storing high-frequency typing states in React Context?
**Answer:**
Whenever a Context value changes, React forces **all** child components that consume the context to rerender. Storing a high-frequency value (like input text) in context will force multiple components to redraw on every keystroke, causing performance bottlenecks and input lag.

---

### Q10. What is `React.memo`, and how does it prevent unnecessary rerenders?
**Answer:**
`React.memo` is a higher-order component that wraps a functional component. It performs a shallow comparison of the component's props; if the props are unchanged since the last render, React skips rendering the component, saving CPU cycles in large lists or grids.

---

### Q11. Explain how passing inline objects as props can break `React.memo`.
**Answer:**
JavaScript compares objects by reference, not value. An inline object like `style={{ color: 'red' }}` or a new array is recreated with a new memory address on every parent render. Seeing a new reference, `React.memo` assumes the prop changed and rerenders the child, defeating the memoization.

---

### Q12. How do you implement "Lazy Initialization" in `useState`, and when should you use it?
**Answer:**
Lazy initialization is implemented by passing a function as the initial value to `useState`, e.g., `useState(() => getHeavyData())`. This ensures the setup function only runs once on mount. You should use it when the default state calculation is expensive (like parsing a large JSON string from localStorage).

---

### Q13. What is the role of the `key` prop when rendering lists of elements in React?
**Answer:**
The `key` prop helps React identify which items in a list have changed, been added, or been removed. It allows React's reconciliation engine to reorder DOM nodes rather than recreating them from scratch, preventing UI rendering bugs and maintaining component state consistency.

---

### Q14. Why is using array indices as `key` props discouraged for dynamic lists?
**Answer:**
If the list is reordered, sorted, or filtered, the index of each item changes. React will map the state based on the index rather than the item's identity, resulting in rendering bugs where input values or checked boxes appear on the wrong list rows.

---

### Q15. How does React's reconciliation algorithm (Virtual DOM) improve performance?
**Answer:**
Instead of updating the browser DOM on every state change, React creates a lightweight JavaScript representation of the UI called the **Virtual DOM**. When state changes, React builds a new Virtual DOM, compares (diffs) it with the previous version, and applies the minimal set of required changes to the real DOM in a single batched update.