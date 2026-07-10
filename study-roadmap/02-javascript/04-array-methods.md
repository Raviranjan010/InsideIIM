# JavaScript Basics: Array Methods

Arrays in JavaScript are dynamic lists of data, and they come equipped with built-in iteration methods. In modern web development and AI orchestration, manually writing `for` loops is often replaced by these higher-order array methods to make code cleaner, more readable, and less prone to off-by-one errors.

This guide covers the most important array methods: `map()`, `filter()`, `reduce()`, `find()`, `forEach()`, `some()`, and `every()`.

---

## 1. Transforming Data with `map()`

### Plain-English Explanation
Think of `map()` as an assembly line worker. You hand them a box of raw materials (the original array), they perform the exact same operation on every single item, and they output a brand-new box containing the processed items (the new array). The original array is never modified.

### Why It Matters in a Real Product Context
When displaying an AI chat interface, you might have an array of raw message objects from your database. You can use `map()` to transform those raw records into a list of React component props or clean HTML list items.

### Runnable Code Example
```javascript
const rawUsers = [
  { id: "usr_1", name: "alice", role: "admin" },
  { id: "usr_2", name: "bob", role: "member" }
];

// Formatting usernames to uppercase for the header display
const usernames = rawUsers.map(user => user.name.toUpperCase());
console.log(usernames); // Output: ["ALICE", "BOB"]
```

### Common Mistake & Exact Error Message
A classic mistake when using arrow functions with curly braces `{}` inside `map()` is forgetting the `return` statement.
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(num => {
  num * 2; // OOPS: Missing 'return'!
});
console.log(doubled); // Output: [undefined, undefined, undefined]
```
While this doesn't crash immediately, it results in an array of `undefined` values, leading to downstream bugs like:
```text
TypeError: Cannot read properties of undefined (reading 'toString')
```
**The Fix:** Either remove the curly braces for an implicit return or add the `return` keyword:
```javascript
const doubledCorrect = numbers.map(num => num * 2); // Implicit return
```

---

## 2. Selecting Subsets with `filter()`

### Plain-English Explanation
Think of `filter()` as a security guard at a club. They look at every person in the line (the original array) and check if they meet a specific criteria (e.g., "Must be wearing a collar"). If they pass, they are allowed into the club (the new filtered array). If they fail, they are left out.

### Why It Matters in a Real Product Context
In an agentic loop, you might want to filter out system messages from the history before displaying the conversation to the end-user, leaving only `"user"` and `"assistant"` messages.

### Runnable Code Example
```javascript
const messages = [
  { role: "system", content: "Initialize graph state" },
  { role: "user", content: "Explain arrays" },
  { role: "assistant", content: "An array is..." }
];

// Filtering out system messages
const userVisibleMessages = messages.filter(msg => msg.role !== "system");
console.log(userVisibleMessages);
// Output: [ { role: 'user', content: 'Explain...' }, { role: 'assistant', content: 'An array...' } ]
```

---

## 3. Aggregating Values with `reduce()`

### Plain-English Explanation
Think of `reduce()` as a snowball rolling down a hill. It starts with an initial size (the accumulator), rolls through a list of items, adding mass from each item it passes, and ends up as a single, large snowball (a single accumulated value).

### Why It Matters in a Real Product Context
When invoking multiple tools or processing a sequence of agent nodes, you want to sum up the total LLM token usage or calculate the total API cost generated during a user's session.

### Runnable Code Example
```javascript
const tokenUsages = [
  { node: "Router", tokens: 250 },
  { node: "Evaluator", tokens: 600 },
  { node: "Generator", tokens: 400 }
];

// Summing all tokens, starting from an initial accumulator value of 0
const totalTokens = tokenUsages.reduce((accumulator, item) => {
  return accumulator + item.tokens;
}, 0);

console.log(totalTokens); // Output: 1250
```

### Common Mistake & Exact Error Message
Forgetting to supply the initial value (the second argument of `reduce()`) when working with an array of objects.
```javascript
const badTotal = tokenUsages.reduce((acc, item) => acc + item.tokens);
// OOPS: No initial value supplied!
console.log(badTotal); // Output: [object Object]600400
```
If you omit the initial value, `reduce()` will use the first element of the array (the object `{ node: "Router", tokens: 250 }`) as the starting accumulator, and then attempt to add a number to an object, resulting in string concatenation issues or NaN bugs.

---

## 4. Searching Elements with `find()`

### Plain-English Explanation
Think of `find()` as a magnifying glass searching for a specific item in a drawer. It scans from left to right, and the absolute moment it finds the *first* item that matches your description, it pulls it out and stops searching. If nothing matches, it returns `undefined`.

### Why It Matters in a Real Product Context
Locating a specific active user session or finding the target node configuration in a configuration list.

### Runnable Code Example
```javascript
const tools = [
  { name: "GoogleSearch", enabled: false },
  { name: "Calculator", enabled: true },
  { name: "DbQuery", enabled: true }
];

// Find the first enabled tool
const activeTool = tools.find(tool => tool.enabled);
console.log(activeTool.name); // Output: "Calculator" (stops search at first match)
```

---

## 5. Iterating with `forEach()`

### Plain-English Explanation
Think of `forEach()` as a mail carrier delivering letters. They go to every house in order and perform an action (dropping off mail), but they don't produce any new collection of houses. It is strictly used for side-effects.

### Why It Matters in a Real Product Context
Logging metrics to an external service or adding event listeners to a list of DOM elements.

### Runnable Code Example
```javascript
const logs = ["Warning: Rate limit near", "Error: Database timeout"];
logs.forEach(log => console.warn(`[AGENT LOG]: ${log}`));
```

---

## 6. Boolean Checks: `some()` and `every()`

- **`some()`** checks if **at least one** element in the array meets the condition. It returns `true` or `false`.
- **`every()`** checks if **all** elements in the array meet the condition. It returns `true` or `false`.

### Runnable Code Example
```javascript
const apiStatuses = [200, 200, 500, 200];

// Has any request failed? (status >= 400)
const hasFailures = apiStatuses.some(status => status >= 400);
console.log(hasFailures); // Output: true

// Are all requests successful? (status === 200)
const allSuccessful = apiStatuses.every(status => status === 200);
console.log(allSuccessful); // Output: false
```

---

## 7. Self-Check Recall

1. **Which array method returns a brand-new array of the exact same length as the original, but with modified elements?**
2. **If `filter()` finds no elements that match the filter condition, what does it return?**
3. **What is the default value of the accumulator if you do not provide an initial value to `reduce()`?**
4. **How does `find()` behave differently from `filter()` when searching for matching items?**
5. **Can you stop or `break` out of a `forEach()` loop early?**

<details>
<summary>🔑 Click to reveal answers</summary>

1. **`map()`.** It always maintains a 1-to-1 mapping of items, unless an error occurs.
2. **An empty array `[]`.** It does not return `undefined`.
3. **The first element of the array.** If the array is empty and no initial value is provided, it throws a `TypeError: Reduce of empty array with no initial value`.
4. **`find()` returns only the first matching element** (or `undefined` if none match). **`filter()` returns a new array** containing all matching elements.
5. **No.** You cannot use `break` or `continue` inside `forEach()`. If you need to stop early, use a standard `for...of` loop or the `some()` / `find()` methods.
</details>
