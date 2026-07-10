# JavaScript Basics: Asynchronous Programming & The Event Loop

JavaScript is **single-threaded**, meaning it can only execute one line of code at a time. However, web applications must handle slow operations like downloading files, querying databases, and calling external AI model APIs without freezing the user interface. 

To achieve this, JavaScript uses an **asynchronous runtime model** powered by the **Event Loop**. This guide explains how this mechanism works and how to write asynchronous code using Promises and `async/await`.

---

## 1. The Event Loop: How JavaScript Handles Slowness

### Plain-English Explanation
Imagine you are a chef in a busy kitchen (the single JavaScript thread). 
- **Synchronous task:** Chopping onions. You must stand at the cutting board and chop until done before you can do anything else.
- **Asynchronous task:** Baking a cake in the oven. You don't stand in front of the oven staring at it for 45 minutes. Instead, you put the cake in the oven, set a timer (register an asynchronous operation), and immediately go chop carrots. When the oven timer rings (an event is pushed to the Queue), you pause your chopping to take the cake out (the callback is executed).

### Microtasks vs. Macrotasks
The Event Loop manages two queues of tasks:
1. **Microtask Queue:** High-priority tasks that need to run immediately after the current code finishes. **Promise resolution callbacks (`.then()`, `await` resumes)** go here.
2. **Macrotask Queue (Task Queue):** Lower-priority tasks like timers (`setTimeout`, `setInterval`) or network events.

The Event Loop *always* empties the entire Microtask Queue before moving on to the next Macrotask.

---

## 2. Promises: The Asynchronous Contract

### Plain-English Explanation
A **Promise** is a placeholder for a value that is not yet available but will be resolved in the future (like a pager handed to you at a restaurant that buzzes when your table is ready). A Promise can be in one of three states:
- `pending`: Still waiting for the work to finish.
- `fulfilled`: The work finished successfully (returns the result).
- `rejected`: An error occurred (returns the reason).

### Why It Matters in a Real Product Context
When calling an LLM endpoint, your code creates a promise. The UI shows a loading spinner while the promise is `pending`. Once the API responds, the promise resolves to `fulfilled`, and your app updates the screen.

### Runnable Code Example
```javascript
// Creating a Promise that simulates fetching stock research
const fetchStockPrice = (ticker) => {
  return new Promise((resolve, reject) => {
    console.log(`[API]: Fetching price for ${ticker}...`);
    
    setTimeout(() => {
      if (ticker === "INVALID") {
        reject(new Error("Ticker symbol not found."));
      } else {
        resolve({ ticker, price: 175.50 });
      }
    }, 1500); // Simulated network delay
  });
};

// Consuming the promise using .then() and .catch()
fetchStockPrice("AAPL")
  .then((data) => {
    console.log(`[SUCCESS]: Price is $${data.price}`);
  })
  .catch((error) => {
    console.error(`[ERROR]: ${error.message}`);
  });
```

---

## 3. Async/Await: Syntactic Sugar for Promises

Writing chain after chain of `.then()` callbacks can lead to hard-to-read nested code ("callback hell"). ES8 introduced `async` and `await`, which allows you to write asynchronous code that reads like synchronous code.

- **`async` keyword:** Declares that a function returns a Promise.
- **`await` keyword:** Pauses the execution of the async function until the promise resolves, returning its value.

### Runnable Code Example
```javascript
// Using async/await to execute sequential research steps
async function runInvestmentAnalysis() {
  try {
    // Wait for the first API call to finish before starting the next
    const appleData = await fetchStockPrice("AAPL");
    console.log(`Analyzed ${appleData.ticker} at $${appleData.price}`);
    
    const teslaData = await fetchStockPrice("TSLA");
    console.log(`Analyzed ${teslaData.ticker} at $${teslaData.price}`);
  } catch (error) {
    // Catches any rejection that occurs in either await call
    console.error(`Analysis failed: ${error.message}`);
  }
}

runInvestmentAnalysis();
```

---

## 4. Common Mistake & Exact Error Message

A very common mistake when writing asynchronous code is forgetting the `await` keyword before a function call that returns a Promise.
```javascript
async function getReport() {
  const data = fetchStockPrice("MSFT"); // OOPS: Missing 'await'!
  console.log(data.price); // Output: undefined
}
getReport();
```
**Why it fails:** Without `await`, JavaScript does not pause. It assigns the raw, pending Promise object to `data` and immediately moves to the next line. Since the Promise object does not have a property named `price` (which only exists inside the resolved value), `data.price` evaluates to `undefined`.

If you try to perform string manipulation or pass this to other functions, it will cause runtime errors:
```text
TypeError: Cannot read properties of undefined (reading 'toUpperCase')
```
Additionally, if the Promise later rejects, you will see a warning in the console:
```text
UnhandledPromiseRejectionWarning: Unhandled promise rejection.
```
**The Fix:** Always prefix Promise-returning function calls with `await` when you need their resolved values:
```javascript
const data = await fetchStockPrice("MSFT");
```

---

## 5. Self-Check Recall

1. **What are the three possible states of a JavaScript Promise?**
2. **If a Promise resolves and a `setTimeout` timer fires at the exact same moment, which callback will execute first in the Event Loop?**
3. **What keyword must prefix any function in which you want to use the `await` operator?**
4. **How do you handle errors/rejections when writing asynchronous code with `async/await`?**
5. **True or False: Using `await` makes the main browser thread freeze until the operation completes.**

<details>
<summary>🔑 Click to reveal answers</summary>

1. **`pending`, `fulfilled`, and `rejected`.**
2. **The Promise callback.** Promise callbacks are placed in the Microtask Queue, which has higher priority and is processed entirely before the Event Loop checks the Macrotask Queue (where `setTimeout` callbacks reside).
3. **The `async` keyword.** Using `await` in a regular function results in a syntax error: `SyntaxError: await is only valid in async functions`.
4. **By wrapping the `await` calls in a standard `try...catch` block.** Any promise rejection will throw an exception that can be caught in the `catch` block.
5. **False.** While `await` pauses execution inside that specific `async` function, the JavaScript thread remains free to execute other scripts, process event listeners, and render the UI.
</details>
