# JavaScript Basics: Error Handling

In production applications, errors are inevitable. Network requests fail, database connections drop, and users input invalid data. If an error is not handled, the entire JavaScript program will crash. 

To build robust software, you must handle errors gracefully. This guide covers how to use `try/catch/finally` blocks, throw custom errors, and handle errors in asynchronous operations.

---

## 1. The Safety Net: `try/catch/finally`

### Plain-English Explanation
Think of your code like a trapeze act.
- **`try` block:** The trapeze artist executing their routine (the code that might fail).
- **`catch` block:** The safety net below. If the artist slips (an error is thrown), the safety net catches them, preventing a fatal fall, and handles the situation (logs the incident, notifies the manager).
- **`finally` block:** The cleanup crew. No matter whether the artist completed the act successfully or fell into the net, the cleanup crew sweeps the stage at the end (closes open connections, resets loaders).

### Why It Matters in a Real Product Context
When an AI agent connects to an LLM provider, the API call might timeout or hit rate limits. Using `try/catch`, we can catch this network timeout and return a fallback message ("The agent is busy, please try again") instead of crashing the Node.js server.

### Runnable Code Example
```javascript
function parseAgentResponse(rawJson) {
  try {
    console.log("[PARSE]: Attempting to parse response...");
    const parsed = JSON.parse(rawJson); // Might fail if rawJson is invalid
    console.log("[PARSE]: Success!");
    return parsed;
  } catch (error) {
    // This block only runs if an error was thrown in the try block
    console.error(`[PARSE ERROR]: Failed to parse JSON. Details: ${error.message}`);
    return { error: true, fallbackContent: "Sorry, I encountered an formatting issue." };
  } finally {
    // This block ALWAYS runs
    console.log("[CLEANUP]: Parsing transaction completed.");
  }
}

// Case 1: Valid input
parseAgentResponse('{"reply": "Hello!"}');

// Case 2: Invalid input (causes crash in try, gets caught in catch)
parseAgentResponse('{invalid-json}');
```

---

## 2. Throwing Custom Errors

Sometimes, your code encounters a logical failure that JavaScript does not consider a syntax or runtime error (such as a user entering a negative withdrawal amount). In these cases, you can manually trigger an error using the `throw` keyword.

### Runnable Code Example
```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function configureTemperature(temp) {
  if (temp < 0 || temp > 1) {
    // Throwing a custom error forces the calling code to handle the logic issue
    throw new ValidationError("LLM temperature must be between 0.0 and 1.0.");
  }
  console.log(`[CONFIG]: Temperature set to ${temp}`);
}

try {
  configureTemperature(1.5); // Invalid setting
} catch (error) {
  if (error instanceof ValidationError) {
    console.warn(`[VALIDATION FAILED]: ${error.message}`);
  } else {
    console.error(`[SYSTEM ERROR]: ${error.message}`);
  }
}
```

---

## 3. Handling Asynchronous Errors

Handling errors in asynchronous code requires extra care. If you write a `try/catch` block around an asynchronous operation but do not use `await`, the `catch` block will be useless because the async function returns a promise immediately, and the actual error occurs long after the `try/catch` block has finished executing.

### Runnable Code Example
```javascript
// A tool function that simulates a database timeout
const queryAgentMemory = () => {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Database connection timeout.")), 1000);
  });
};

async function executeAgentStep() {
  try {
    console.log("[NODE]: Reading memory...");
    // The 'await' keyword is essential to catch the rejection in this block
    const memory = await queryAgentMemory();
    console.log(memory);
  } catch (error) {
    console.error(`[NODE ERROR]: Recovering from error: ${error.message}`);
  }
}

executeAgentStep();
```

---

## 4. Common Mistake & Exact Error Message

The most dangerous error handling mistake is **swallowing errors silently** by leaving catch blocks empty.
```javascript
try {
  saveUserData(userData);
} catch (error) {
  // Empty! No logging, no reporting, no fallbacks.
}
```
**Why this is dangerous:** If `saveUserData` fails (e.g. because the database is full), the code will proceed as if everything succeeded. The user will think their data is saved, but it is lost forever. Tracking down this bug is extremely difficult because there are no error traces in your server logs.

Another mistake is forgetting to handle async rejections in middleware, leading to this crash message in Node.js:
```text
UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch().
```
In modern versions of Node.js, this warning is fatal and will crash your server process with:
```text
Process terminated with exit code 1.
```
**The Fix:** Always print error logs in catch blocks (at minimum `console.error(error)`) and write top-level handlers to catch unhandled rejections:
```javascript
process.on("unhandledRejection", (reason) => {
  console.error("CRITICAL: Unhandled Promise Rejection:", reason);
});
```

---

## 5. Self-Check Recall

1. **Which block of a `try/catch/finally` structure is guaranteed to run, regardless of whether an error occurred?**
2. **What keyword do you use to manually generate and trigger an error in your code?**
3. **If you run `try { setTimeout(() => { throw new Error('Oops'); }, 100); } catch (e) { console.log('Caught'); }`, will 'Caught' be logged to the console?**
4. **What parent class should all custom errors inherit from?**
5. **How does Node.js respond to unhandled promise rejections by default in modern versions?**

<details>
<summary>🔑 Click to reveal answers</summary>

1. **The `finally` block.** It executes after the `try` block (and `catch` block, if run) completes, making it ideal for cleanups.
2. **The `throw` keyword** (e.g., `throw new Error("Invalid Input");`).
3. **No, it will not be caught.** The `try/catch` block completes executing immediately, while the callback inside `setTimeout` is executed asynchronously later by the Event Loop in a completely different call stack.
4. **The built-in `Error` class.**
5. **It terminates the Node.js process** with a non-zero exit code (crashing the server).
</details>
