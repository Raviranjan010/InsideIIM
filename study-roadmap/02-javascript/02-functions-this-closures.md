# JS Core: Functions, `this` Context, & Closures

Functions are the building blocks of JavaScript applications. As a beginner, you must understand how functions are declared, how they scope variables, and how they handle context.

In this guide, you will learn the differences between function types, how the `this` keyword changes behavior, and how closures hold onto state.

---

## 1. Function Declarations vs. Expressions vs. Arrow Functions

In JavaScript, there are three primary ways to define a function:

*   **Function Declaration:** Defined with the `function` keyword and a name. They are **hoisted**, meaning you can call them *before* they are written in the code file.
*   **Function Expression:** A function assigned to a variable. They are not hoisted.
*   **Arrow Function:** A concise modern syntax (`() => {}`) introduced in ES6. They are expressions (not hoisted) and behave differently regarding scope and context.

### Code Example:
```javascript
// 1. Function Declaration (Hoisted)
greetDeclaration(); // Works! Prints "Hello from Declaration"

function greetDeclaration() {
  console.log("Hello from Declaration");
}

// 2. Function Expression (Not Hoisted)
const greetExpression = function() {
  console.log("Hello from Expression");
};
greetExpression(); // Must be called AFTER declaration

// 3. Arrow Function (Not Hoisted, Concise)
const greetArrow = (name) => `Hello, ${name}!`;
console.log(greetArrow("Alice")); 
```

### ⚠️ Common Mistake: Calling Expressions Before Creation
```javascript
// BUG: TypeError: greetExpression is not a function
greetExpression(); 

const greetExpression = function() {
  console.log("Hello!");
};
```
*   **Why it fails:** Unlike declarations, variables containing function expressions are initialized as `undefined` due to hoisting rules. Calling them before assignment throws a type error.
*   **The Fix:** Always declare function expressions and arrow functions at the top of your files *before* invoking them.

---

## 2. The `this` Keyword: Regular vs. Arrow Functions

The `this` keyword refers to the **context object** that is currently executing the function code. How `this` is set differs fundamentally between regular functions and arrow functions:

*   **Regular Functions:** `this` is dynamic. It is set to the object that **calls** the function at runtime. If no object calls it, it defaults to the global window object (or `undefined` in strict mode).
*   **Arrow Functions:** `this` is static (lexical). It ignores who calls it and simply inherits `this` from the **surrounding code block** where the arrow function was defined.

### Code Example:
```javascript
const agent = {
  name: "FinBot",
  
  // Regular Function
  logNameRegular: function() {
    console.log("Regular:", this.name);
  },
  
  // Arrow Function
  logNameArrow: () => {
    console.log("Arrow:", this.name);
  }
};

agent.logNameRegular(); // Prints: "Regular: FinBot" (called by agent object)
agent.logNameArrow();   // Prints: "Arrow: undefined" (inherits 'this' from global scope)
```

### ⚠️ Common Mistake: Using Arrow Functions as Object Methods
```javascript
// BUG: Cannot read properties of undefined (or prints undefined name)
const stock = {
  ticker: "AAPL",
  printTicker: () => {
    console.log(this.ticker); // OOPS: 'this' refers to the global/window scope!
  }
};
stock.printTicker();
```
*   **Why it fails:** Since arrow functions inherit `this` from their parent execution scope (which is the global context in this case), `this.ticker` attempts to resolve on the global object where `ticker` is undefined.
*   **The Fix:** Use standard method syntax or regular functions when declaring methods inside object literals:
```javascript
const stock = {
  ticker: "AAPL",
  printTicker() { // Correct: 'this' dynamically binds to 'stock'
    console.log(this.ticker); 
  }
};
```

---

## 3. Closures: Scope Memory

A **Closure** is a feature where an inner function retains access to the variables of its outer (parent) function, even *after* the parent function has finished executing.

Think of it as a function with a **built-in backpack** containing all the variables that existed when the function was born.

### Code Example (Holding onto State):
```javascript
function createCounter() {
  let count = 0; // Private variable inside outer function
  
  return function() {
    count += 1; // Inner function accesses count
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2 (holds onto state!)
```

### Practical Use Case: Private State Encapsulation
In production, you can use closures to create "private variables" that external code cannot modify directly, protecting your system configuration:

```javascript
function createApiKeyManager(initialKey) {
  let apiKey = initialKey; // Private variable
  
  return {
    getKey: () => apiKey,
    setKey: (newKey) => {
      if (newKey.startsWith("sk_")) { // Validation guard
        apiKey = newKey;
      } else {
        console.error("Invalid Key Format");
      }
    }
  };
}

const manager = createApiKeyManager("sk_12345");
manager.setKey("bad_key"); // Logs: "Invalid Key Format"
console.log(manager.getKey()); // "sk_12345" (Unchanged!)
```

### ⚠️ Common Mistake: Creating Closures Inadvertently in Loops
```javascript
// BUG: Logs "3", "3", "3" instead of "0", "1", "2"
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // OOPS: 'var' is function-scoped!
  }, 100);
}
```
*   **Why it fails:** Because `var` is function-scoped, all three timer closures point to the *same* single `i` variable in memory. By the time the timers run, the loop has completed and `i` equals `3`.
*   **The Fix:** Use block-scoped `let` variables. Every iteration creates a new binding for `i`, giving each closure its own private copy:
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Logs: 0, 1, 2
  }, 100);
}
```

---

## 🧠 Self-Check Recall

1.  Can you call a function expression before declaring it in the code?
2.  If an arrow function is declared inside a button click handler, what context does its `this` keyword refer to?
3.  Explain what a "Closure" is in one plain-English sentence.
4.  Why is using `var` inside loops prone to closure index bugs?
5.  What is a practical product use case for using closures in JavaScript?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **No.** Unlike function declarations, expressions are not hoisted and will throw a TypeError.
2.  **The surrounding environment (lexical scope)** where the handler was defined, rather than the button DOM element itself.
3.  **A function that remembers and retains access to its parent scope's variables** even after the parent function has returned.
4.  **Because `var` is not block-scoped.** All loop iterations share the exact same variable reference, so closures reference the final mutated value.
5.  **Data encapsulation / private variables.** It allows you to expose restricted read/write methods to protect sensitive variables (like API keys) from direct external tampering.
</details>
