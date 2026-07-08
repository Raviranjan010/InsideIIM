# Technical Round Questions: JS, React, Node, & LangGraph

This bank contains 15 technical round questions covering JavaScript, React, Node.js, and LangGraph.js, designed to evaluate your core programming knowledge.

---

### Q1. What is the difference between the Microtask Queue and the Macrotask Queue in the Node.js Event Loop?
**Answer:**
The Node.js Event Loop manages asynchronous execution using two queues. The **Microtask Queue** handles high-priority callbacks like resolved Promises (`process.nextTick` and `.then()`), whereas the **Macrotask Queue** handles standard callbacks like timers (`setTimeout`, `setInterval`) and network I/O. The Event Loop prioritizes the Microtask Queue: it must execute all callbacks in the Microtask Queue before moving on to the next macrotask, meaning Promise resolutions will always run before timer callbacks.

---

### Q2. Explain the purpose of the cleanup function in React's `useEffect` hook. Why is it necessary?
**Answer:**
The cleanup function is the function returned inside a `useEffect` callback. It runs right before the component unmounts or before the effect runs again due to dependency updates. It is critical for preventing memory leaks and side effects by clearing active subscriptions, closing WebSocket connections, or canceling active timers (like `setInterval`) that would otherwise continue running in the background of the browser.

---

### Q3. How does LangGraph.js handle state updates concurrently when multiple nodes run?
**Answer:**
LangGraph.js enforces immutability. Instead of letting nodes mutate a single global state object directly, each node returns a partial state update. The graph execution engine intercepts these updates and merges them into the state channels using the **Reducer Functions** defined in the `Annotation.Root` schema. This prevents concurrent write collisions and race conditions.

---

### Q4. What is a Closure in JavaScript, and what is a practical use case?
**Answer:**
A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives an inner function access to the outer function's scope even after the outer function has finished executing. A common use case is data privacy: creating factory functions with private variables that can only be read or modified by returned getter/setter methods.

---

### Q5. Why are Next.js API Route Handlers referred to as serverless or edge functions?
**Answer:**
Unlike a traditional monolithic Express.js server that runs continuously in memory, Next.js Route Handlers are compiled as isolated, on-demand functions. When a request hits `/api/research`, Vercel spins up a lightweight container (serverless instance) to execute that specific route handler and spins it down immediately after returning the response. This enables instant auto-scaling and reduces costs since you only pay for active execution time.

---

### Q6. How do the scoping behaviors of `var`, `let`, and `const` differ in JavaScript?
**Answer:**
`var` is function-scoped (or globally scoped) and is hoisted to the top of its scope, initializing as `undefined`. `let` and `const` are block-scoped (restricted to the nearest curly braces `{}`) and are hoisted but not initialized, residing in the "Temporal Dead Zone" until their actual declaration line is executed. Additionally, variables declared with `const` cannot be reassigned, whereas `let` and `var` variables can.

---

### Q7. How do you cancel an active outbound HTTP fetch request in Node.js?
**Answer:**
You cancel a fetch request using the **`AbortController`** Web API. You instantiate the controller, retrieve its associated `AbortSignal` object, and pass that signal as an option inside your `fetch` configuration:
```javascript
const controller = new AbortController();
fetch(url, { signal: controller.signal });
```
Calling `controller.abort()` cancels the connection and causes the fetch promise to reject with an `AbortError`.

---

### Q8. What is the role of the Zod library in TypeScript validation?
**Answer:**
TypeScript types are static compile-time contracts that disappear completely once compiled to raw JavaScript. Zod is a schema declaration and validation library that operates at **runtime**. It allows developers to define schemas that validate incoming data (such as JSON payloads from API calls or LLM outputs) at runtime, catching formatting errors and automatically generating matching static TypeScript types.

---

### Q9. How do you define a root state schema in LangGraph.js?
**Answer:**
In modern LangGraph.js, the root state schema is defined using the **`Annotation.Root`** API. You declare key-value pairs where the value specifies the data type and, optionally, a reducer function to determine how updates are merged (such as appending messages to a history list). The resulting object is passed into the `StateGraph` constructor.

---

### Q10. What is the difference between React Server Components (RSC) and Client Components in Next.js?
**Answer:**
**Server Components** (the default in Next.js) render exclusively on the server. They can fetch database data directly, have smaller bundle sizes because their dependencies stay on the server, and do not support client-side interactivity like hooks or event listeners. **Client Components** (declared using the `'use client'` directive) are pre-rendered on the server but hydated in the browser, allowing the use of React hooks (`useState`, `useEffect`) and interactive event handlers.

---

### Q11. How do you implement a fetch retry loop with exponential backoff in Node.js?
**Answer:**
A retry loop uses a recursive function or a `for/while` loop wrapped in a `try...catch` block. If the fetch fails, you catch the exception, check if you have remaining retry attempts, calculate a delay that increases exponentially (e.g., `2^attempt * 1000` ms), await a sleep timer promise, and call the fetch again, failing only when the retry limit is exceeded.

---

### Q12. Why are JavaScript strings immutable, and how does this affect memory allocation during concatenation loops?
**Answer:**
Strings are immutable for thread safety, optimization, and memory sharing inside the JavaScript engine. Because they cannot be altered, appending characters in a loop (`str += "a"`) does not modify the existing string. Instead, the engine allocates memory for a brand-new string copy containing both values on every iteration, leading to $O(n^2)$ time complexity and increased memory overhead for large loops.

---

### Q13. What is the difference between a JavaScript `Map` and a plain `Object`?
**Answer:**
A plain `Object` is designed for record structures where keys must be Strings or Symbols, and it inherits default prototype properties which can lead to prototype pollution security bugs. A `Map` is a dedicated key-value collection that allows keys of **any** data type (including objects or functions), maintains the insertion order of elements, and offers helper methods like `.set()`, `.get()`, and `.has()` that execute in $O(1)$ constant time.

---

### Q14. What is a recursion limit in LangGraph, and how is it configured?
**Answer:**
A recursion limit is a safety configuration that prevents cyclic graphs from running in infinite loops. It tracks the number of times a graph transitions between nodes. It is configured when invoking the compiled graph by passing a options object:
```javascript
await app.invoke(inputs, { recursionLimit: 15 });
```
If the graph exceeds this limit, execution is halted with an error, preventing high API costs.

---

### Q15. What are Generics in TypeScript, and why are they used in LangGraph state schemas?
**Answer:**
Generics are code templates that allow you to define functions, classes, or types with **placeholder types** that are specified when the code is instantiated. In LangGraph.js, we use generics with the `Annotation` utility to enforce compile-time type safety on our state keys (e.g. `Annotation<string[]>` or `Annotation<BaseMessage[]>`), ensuring that compiler checks fail if a node attempts to return an invalid data type.
