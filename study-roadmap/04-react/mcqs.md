# React Practice: 30 Output & Sizing MCQs

These questions test your understanding of React render behaviors, state updates, hooks dependencies, form handling, and performance optimization patterns.

---

### Q1. What will be logged to the console after clicking the button once?
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const handleAlert = () => {
    setCount(count + 1);
    console.log(count);
  };
  return <button onClick={handleAlert}>Click</button>;
}
```
- [ ] A) `1`
- [ ] B) `0`
- [ ] C) `undefined`
- [ ] D) `count`

**Correct Answer:** B
*   **Why it's correct:** State updates in React are batched and asynchronous. The `count` variable inside the current execution frame retains its initial value (`0`) until the component rerenders.
*   **Why other options are wrong:** A assumes state updates synchronously. C and D are incorrect variable evaluations.

---

### Q2. How many times will the console log run during the component lifecycle?
```jsx
function DataApp() {
  const [val, setVal] = useState("");
  useEffect(() => {
    console.log("Effect Run");
  }, []);
  return <input value={val} onChange={(e) => setVal(e.target.value)} />;
}
```
- [ ] A) On every keystroke in the input box.
- [ ] B) Twice: once on mount and once on unmount.
- [ ] C) Exactly once, when the component mounts.
- [ ] D) Never.

**Correct Answer:** C
*   **Why it's correct:** The dependency array is empty (`[]`), meaning the effect callback is only executed once when the component is first rendered on the screen.
*   **Why other options are wrong:** A describes behavior with no array or when tracking `val`. B describes cleanups. D is incorrect.

---

### Q3. What is the main performance issue with this component?
```jsx
function Dashboard() {
  const [text, setText] = useState("");
  const heavyData = parseLargePortfolioDetails(); 
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Display data={heavyData} />
    </div>
  );
}
```
- [ ] A) The input box will crash the browser.
- [ ] B) The heavy data calculation function runs on every single keystroke, causing typing lag.
- [ ] C) The component will throw a syntax error.
- [ ] D) State cannot be set from inputs.

**Correct Answer:** B
*   **Why it's correct:** Every keystroke updates `text`, triggering a rerender of `Dashboard`. Because `heavyData` is declared inside the render body without caching, the slow calculation runs on every render.
*   **Why other options are wrong:** A is an exaggeration. C and D describe valid React structures.

---

### Q4. Which hook is appropriate to fix the performance issue in Q3?
- [ ] A) `useCallback`
- [ ] B) `useRef`
- [ ] C) `useMemo`
- [ ] D) `useContext`

**Correct Answer:** C
*   **Why it's correct:** `useMemo` is designed to cache the returned value of expensive CPU calculations, recalculating only when dependencies change.
*   **Why other options are wrong:** A caches function definitions. B stores mutable references. D manages global context.

---

### Q5. What is the console output after clicking the "Update" button?
```jsx
function App() {
  const [user, setUser] = useState({ name: "Alice" });
  const handleUpdate = () => {
    user.name = "Bob";
    setUser(user);
  };
  return <button onClick={handleUpdate}>Update</button>;
}
```
- [ ] A) The page rerenders and displays "Bob".
- [ ] B) React throws a type error.
- [ ] C) The UI does not change because the object reference remains identical, so React ignores the state update.
- [ ] D) The state is set to null.

**Correct Answer:** C
*   **Why it's correct:** React performs reference equality checks (`Object.is`). Since `user` points to the same memory object, React skips rerendering.
*   **Why other options are wrong:** A describes correct updater behavior using new object clones. B and D are incorrect.

---

### Q6. How do you fix the state mutation issue in Q5?
- [ ] A) `setUser("Bob")`
- [ ] B) `setUser({ ...user, name: "Bob" })`
- [ ] C) `setUser([ ...user, name: "Bob" ])`
- [ ] D) `delete user.name`

**Correct Answer:** B
*   **Why it's correct:** This uses the spread operator to copy properties into a brand-new object, creating a new reference that triggers a rerender.
*   **Why other options are wrong:** A discards other user properties. C uses array brackets. D is a direct mutation.

---

### Q7. What will happen when this component is rendered?
```jsx
function LoopComponent() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
  return <div>{count}</div>;
}
```
- [ ] A) It displays `1` and stops.
- [ ] B) It causes an infinite rendering loop, crashing the browser or triggering a React limit error.
- [ ] C) It throws a compile-time syntax error.
- [ ] D) It renders nothing.

**Correct Answer:** B
*   **Why it's correct:** The effect runs when `count` changes, updates `count`, which triggers a rerender, which triggers the effect again, looping infinitely.
*   **Why other options are wrong:** A, C, and D do not account for the infinite dependency update cycle.

---

### Q8. What is the purpose of the dependency array in a `useEffect` hook?
- [ ] A) To declare which CSS files to load.
- [ ] B) To specify which local variables the effect depends on, determining when the effect should re-run.
- [ ] C) To fetch database tables.
- [ ] D) To list the child components.

**Correct Answer:** B
*   **Why it's correct:** The array acts as a gatekeeper. React compares the current values of the listed dependencies with their previous values, re-running the effect only if a change is detected.
*   **Why other options are wrong:** A, C, and D describe styling, data, or structural tasks outside the scope of hooks dependencies.

---

### Q9. What does the following code render?
```jsx
const Element = () => {
  const title = "Agent";
  return <h1>{title || "Default"}</h1>;
};
```
- [ ] A) `<h1>Default</h1>`
- [ ] B) `<h1>title</h1>`
- [ ] C) `<h1>Agent</h1>`
- [ ] D) Nothing.

**Correct Answer:** C
*   **Why it's correct:** The logical OR operator (`||`) evaluates to the first truthy value. Since `"Agent"` is a truthy string, it is rendered inside the h1 tag.
*   **Why other options are wrong:** A is evaluated only if the left operand is falsy. B treats it as a literal string. D is incorrect.

---

### Q10. What is logged when the button is clicked?
```jsx
function Tracker() {
  const renderCount = useRef(0);
  const [val, setVal] = useState("");
  const handleClick = () => {
    renderCount.current += 1;
    console.log(renderCount.current);
  };
  return <button onClick={handleClick}>Log</button>;
}
```
- [ ] A) The component crashes.
- [ ] B) The value of `renderCount.current` is printed, but the UI does not rerender.
- [ ] C) The UI rerenders on every click.
- [ ] D) The console logs `undefined`.

**Correct Answer:** B
*   **Why it's correct:** Modifying a `useRef` value does not trigger a rerender. The value updates in memory and is printed, but the UI stays static.
*   **Why other options are wrong:** A and D are wrong. C describes state update behavior, which refs do not mimic.

---

### Q11. Which hook is appropriate for storing the ID of a `setInterval` timer?
- [ ] A) `useState`
- [ ] B) `useRef`
- [ ] C) `useContext`
- [ ] D) `useMemo`

**Correct Answer:** B
*   **Why it's correct:** A timer ID is a mutable value needed across renders that should not trigger a redraw when changed, making `useRef` the ideal choice.
*   **Why other options are wrong:** A causes unnecessary rerenders. C is for global state sharing. D is for caching values.

---

### Q12. Why do we call `e.preventDefault()` inside a React form submit handler?
- [ ] A) To encrypt the payload.
- [ ] B) To prevent the browser from reloading the page, which would wipe out all active React state.
- [ ] C) To download a file.
- [ ] D) To check user authentication.

**Correct Answer:** B
*   **Why it's correct:** By default, HTML forms submit by reloading the page. Calling `e.preventDefault()` cancels this, keeping the React application active.
*   **Why other options are wrong:** A, C, and D describe security, download, or routing tasks unrelated to default event cancellation.

---

### Q13. In a controlled input, how is the value of the input element managed?
- [ ] A) It is read directly from the browser DOM using query selectors.
- [ ] B) It is driven strictly by React state, updating via an `onChange` event listener.
- [ ] C) It is saved in a cookies database.
- [ ] D) It is fetched from a server.

**Correct Answer:** B
*   **Why it's correct:** Controlled components bind their value parameter directly to state, ensuring React is the single source of truth.
*   **Why other options are wrong:** A describes uncontrolled components. C and D describe storage patterns.

---

### Q14. What occurs when you update a React Context value?
- [ ] A) Only the parent component rerenders.
- [ ] B) All component files in the directory are compiled.
- [ ] C) All components that consume the context are forced to rerender.
- [ ] D) The database connection is closed.

**Correct Answer:** C
*   **Why it's correct:** When the value of a context changes, React automatically flags and rerenders all children that call `useContext` on that context.
*   **Why other options are wrong:** A is too narrow. B describes build steps. D is incorrect.

---

### Q15. Why should you avoid using Context to store high-frequency values like input text?
- [ ] A) Because Context cannot store strings.
- [ ] B) Because it forces all consuming descendants to rerender on every keystroke, causing typing lag.
- [ ] C) Because Context is private to Vercel.
- [ ] D) Because it requires a database.

**Correct Answer:** B
*   **Why it's correct:** High-frequency updates trigger cascade rerenders. Every keystroke would force deep component branches to redraw, creating noticeable lag.
*   **Why other options are wrong:** A, C, and D are factually incorrect claims.

---

### Q16. What is "Prop Drilling"?
- [ ] A) Storing props in a database.
- [ ] B) Passing props through multiple layout components that do not need them, simply to reach a deep child component.
- [ ] C) Deleting props during compilation.
- [ ] D) Renaming props inside a child component.

**Correct Answer:** B
*   **Why it's correct:** Prop drilling is the manual passing of parameters down a component hierarchy, cluttering code and making component reuse difficult.
*   **Why other options are wrong:** A, C, and D describe storage or compilation tasks unrelated to prop propagation.

---

### Q17. How does `React.memo` optimize performance?
- [ ] A) It compiles the component into WebAssembly.
- [ ] B) It checks incoming props; if they are identical to the previous render, it skips rerendering the child component.
- [ ] C) It deletes the local variables.
- [ ] D) It caches database queries.

**Correct Answer:** B
*   **Why it's correct:** `React.memo` is a higher-order component that memoizes the rendering result, skipping redraws if props are unchanged.
*   **Why other options are wrong:** A, C, and D describe compilation or caching tasks outside the scope of React component rendering.

---

### Q18. Why does passing an inline function `onSelect={() => {}}` break `React.memo`?
- [ ] A) Because inline functions are illegal in JSX.
- [ ] B) Because the inline function is recreated on every parent render with a new memory reference, causing the child's prop check to fail.
- [ ] C) Because inline functions cannot be compiled.
- [ ] D) Because it requires typescript.

**Correct Answer:** B
*   **Why it's correct:** JavaScript uses reference comparison (`===`) for functions. An inline function has a new memory address on every parent render, forcing the child to rerender.
*   **Why other options are wrong:** A is incorrect. C and D are wrong.

---

### Q19. What hook is used to resolve the reference issue described in Q18?
- [ ] A) `useMemo`
- [ ] B) `useCallback`
- [ ] C) `useRef`
- [ ] D) `useState`

**Correct Answer:** B
*   **Why it's correct:** `useCallback` returns a memoized version of the callback function that only changes if one of the dependencies has updated.
*   **Why other options are wrong:** A caches values. C handles non-rendering references. D stores state values.

---

### Q20. What is logged when the button is clicked?
```jsx
function DoubleApp() {
  const [val, setVal] = useState(1);
  const handleDouble = () => {
    setVal(val * 2);
    setVal(val * 2);
  };
  return <button onClick={handleDouble}>{val}</button>;
}
```
- [ ] A) The button displays `4` after one click.
- [ ] B) The button displays `2` after one click.
- [ ] C) The button displays `1` after one click.
- [ ] D) The button displays `undefined`.

**Correct Answer:** B
*   **Why it's correct:** Because state updates are batched and asynchronous, `val` is evaluated as `1` in both calls. Both resolve to `setVal(2)`, resulting in a value of `2`.
*   **Why other options are wrong:** A assumes synchronous execution where the second call uses the output of the first. C and D are incorrect.

---

### Q21. How do you run an effect cleanup only when a component is unmounted?
- [ ] A) By calling `useEffect` without a dependency array.
- [ ] B) By returning a function from a `useEffect` that has an empty dependency array `[]`.
- [ ] C) By deleting the state variable.
- [ ] D) By calling `useLayoutEffect`.

**Correct Answer:** B
*   **Why it's correct:** The cleanup function is returned. If the dependency array is `[]`, the effect runs once on mount, and its cleanup runs once on unmount.
*   **Why other options are wrong:** A runs cleanup on every render. C and D are incorrect.

---

### Q22. What is the console output of this code snippet?
```jsx
const Info = ({ user }) => {
  console.log("Info Rendered");
  return <p>{user.name}</p>;
};
const MemoInfo = React.memo(Info);

// Parent updates count state, user prop is { name: "Alice" }
```
If the parent component rerenders due to a counter update, and passes a new object literal `{ name: "Alice" }` to `MemoInfo`:
- [ ] A) "Info Rendered" is logged, because a new object reference is created.
- [ ] B) "Info Rendered" is not logged, because the names are identical.
- [ ] C) The component crashes.
- [ ] D) None of the above.

**Correct Answer:** A
*   **Why it's correct:** Passing an object literal (`user={{ name: "Alice" }}`) creates a new object in memory on every render, causing the props comparison check to fail.
*   **Why other options are wrong:** B fails to account for reference comparison in JavaScript object types.

---

### Q23. How do you declare a default value for a prop in a functional component?
- [ ] A) Using `defaultProps` only.
- [ ] B) Using ES6 destructuring default parameters in the function signature: `const Card = ({ title = "Default" }) => { ... }`.
- [ ] C) In the database schema.
- [ ] D) Inside a `useEffect`.

**Correct Answer:** B
*   **Why it's correct:** Default parameters are the standard, type-safe ES6 way to define defaults in functional React components.
*   **Why other options are wrong:** A is deprecated in modern React. C and D are incorrect layers.

---

### Q24. What is the time complexity of React reconciling changes in a Virtual DOM compared to direct manual DOM manipulation?
- [ ] A) Virtual DOM is always slower because it adds a JavaScript overhead layer.
- [ ] B) Virtual DOM is faster at scale because it batches updates and performs minimal DOM modifications in one write.
- [ ] C) They take the same time.
- [ ] D) Virtual DOM compiles to HTML files.

**Correct Answer:** B
*   **Why it's correct:** Modifying the browser DOM is expensive. React's Virtual DOM batches changes and computes the minimal diff, reducing expensive layout recalculations.
*   **Why other options are wrong:** A, C, and D are incorrect descriptions of reconciliation.

---

### Q25. What is the key attribute used for when rendering lists of elements?
- [ ] A) To add style rules.
- [ ] B) To help React identify which items have changed, been added, or been removed, preventing reconciliation bugs.
- [ ] C) To encrypt the list items.
- [ ] D) To check user permissions.

**Correct Answer:** B
*   **Why it's correct:** Keys act as identifiers. Without unique keys, React can misalign state in dynamic lists, leading to rendering bugs.
*   **Why other options are wrong:** A, C, and D describe styling, encryption, or security tasks unrelated to list reconciliation.

---

### Q26. Why should you avoid using array indices as keys when rendering dynamic lists?
- [ ] A) Because indices are not unique.
- [ ] B) Because reordering the list will change the indices, causing React to misalign state with elements.
- [ ] C) Because indices are strings.
- [ ] D) Because it throws a compiler crash.

**Correct Answer:** B
*   **Why it's correct:** If items are inserted or deleted, their indices change. React will assume the element at index `1` is the same, causing rendering bugs.
*   **Why other options are wrong:** A is incorrect. C is incorrect. D is wrong since React only warns in the console.

---

### Q27. What is logged by this state updater sequence?
```jsx
function DoubleAdd() {
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };
  return <button onClick={handleAdd}>{count}</button>;
}
```
- [ ] A) The button displays `1` after one click.
- [ ] B) The button displays `2` after one click.
- [ ] C) The button displays `0` after one click.
- [ ] D) The console logs `undefined`.

**Correct Answer:** B
*   **Why it's correct:** Passing a function to `setCount` (`prev => prev + 1`) instructs React to use the latest queued state value, resolving the batching limitation.
*   **Why other options are wrong:** A describes behavior with direct value updates (`setCount(count + 1)`). C and D are incorrect.

---

### Q28. What does a React Fragment (`<> ... </\>`) accomplish?
- [ ] A) It adds a wrapper `<div>` to the page.
- [ ] B) It groups sibling elements without adding an extra node to the DOM.
- [ ] C) It splits the code into chunks.
- [ ] D) It runs a cleanup script.

**Correct Answer:** B
*   **Why it's correct:** Fragments allow returning multiple elements from a component without cluttering the DOM with wrapper divs.
*   **Why other options are wrong:** A describes standard divs. C and D describe bundling or lifecycle tasks.

---

### Q29. If a component has an active `useRef` variable, does updating it trigger a rerender?
- [ ] A) Yes, always.
- [ ] B) No, updating a ref does not trigger a rerender.
- [ ] C) Only if the ref is passed as a prop.
- [ ] D) Only if the screen is resized.

**Correct Answer:** B
*   **Why it's correct:** Refs are designed for mutable values that persist across renders without causing a redraw.
*   **Why other options are wrong:** A, C, and D describe scenarios where the ref value change itself does not trigger a redraw.

---

### Q30. Why do we write `useState` initializers as functions (e.g. `useState(() => getInitialState())`) for heavy tasks?
- [ ] A) To compile the state into TypeScript.
- [ ] B) To implement lazy initialization, ensuring the slow setup function only runs once when the component mounts rather than on every render.
- [ ] C) To encrypt the state variable.
- [ ] D) To bypass token limits.

**Correct Answer:** B
*   **Why it's correct:** Passing a function to `useState` runs it once on initialization. Passing the raw call (`useState(getInitialState())`) runs the function on every render, wasting CPU resources.
*   **Why other options are wrong:** A, C, and D describe compilation, encryption, or API tasks.