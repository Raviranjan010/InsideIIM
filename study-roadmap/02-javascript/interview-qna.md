# JavaScript Interview Q&A: 20 Fresher Questions

This guide contains 20 core interview questions geared towards freshers, with comprehensive model answers that demonstrate deep, practical understanding.

---

### Q1. What is the difference between `==` and `===` in JavaScript, and why is `===` generally preferred?
**Answer:**
`==` (loose equality) compares two values after converting them to a common type, which is called implicit type coercion. For example, `5 == "5"` evaluates to `true` because the string is converted to a number before comparison. On the other hand, `===` (strict equality) compares both the value and the data type without coercion, meaning `5 === "5"` is `false`. Developers prefer `===` because coercion in `==` can lead to confusing bugs and unexpected truths, such as `[] == false` evaluating to `true`.

---

### Q2. Explain the concept of scope chain and lexical scope in JavaScript.
**Answer:**
Lexical scope means that the accessibility of a variable is determined by its physical location inside the source code's nesting structure. When a variable is referenced, the JavaScript engine tries to resolve it in the current block or function scope. If it cannot find it, it moves outward to the parent scope, repeating this process up to the global scope. This nested lookup pathway is known as the scope chain.

---

### Q3. How does hoisting affect functions declared as declarations versus functions declared as expressions?
**Answer:**
Function declarations are fully hoisted, meaning both the function name and its complete body are loaded into memory before any code runs. This allows you to call the function above its physical location in the file. Function expressions, however, assign a function to a variable (e.g., using `var` or `let`). If declared with `var`, only the variable name is hoisted as `undefined`, and calling it before assignment results in a `TypeError: is not a function`. If declared with `let` or `const`, they are trapped in the Temporal Dead Zone and calling them early throws a `ReferenceError`.

---

### Q4. What is the Temporal Dead Zone (TDZ) and why does it exist?
**Answer:**
The Temporal Dead Zone is the phase between the start of a block scope and the line where a `let` or `const` variable is declared and initialized. If you attempt to access the variable during this window, JavaScript throws a `ReferenceError` instead of returning `undefined`. The TDZ was introduced in ES6 to enforce safer coding habits. It prevents developers from referencing variables before they are initialized, avoiding the silent logic errors common with `var` hoisting.

---

### Q5. What is a closure in JavaScript, and can you provide a practical use-case for it?
**Answer:**
A closure is created when an inner function retains access to variables from its outer enclosing scope, even after that outer scope or parent function has finished executing. The inner function "closes over" and remembers its lexical environment. A common use-case is data privacy or encapsulation. By returning an inner function that modifies a variable declared in the outer function, you create a private state that cannot be directly mutated by external code, mimicking private fields.

---

### Q6. Explain how the `this` keyword behaves inside an arrow function compared to a regular function.
**Answer:**
In a regular function, the value of `this` is dynamic and depends entirely on *how* the function is called (e.g., it refers to the object before the dot, the window object globally, or the new instance when using `new`). Arrow functions do not bind their own `this`. Instead, they resolve `this` lexically, inheriting it from the parent scope in which they were defined. This makes arrow functions ideal for callback methods (like inside `setTimeout` or event listeners) where you want to preserve the context of an outer class or object method.

---

### Q7. What are the differences between `call`, `apply`, and `bind` methods, and when would you use them?
**Answer:**
All three methods are used to explicitly set the `this` context of a function. `call` invokes the function immediately, accepting arguments individually separated by commas. `apply` also invokes the function immediately, but accepts arguments bundled as a single array. `bind` does not execute the function right away; instead, it returns a new wrapper function with `this` permanently bound to the passed context, which is useful for setting up event listener handlers or delayed callbacks.

---

### Q8. What is the difference between a shallow copy and a deep copy of an object, and how do you achieve each?
**Answer:**
A shallow copy clones only the top-level properties of an object; nested objects or arrays are copied as references, meaning modifying a nested value in the copy will alter the original object. You can create a shallow copy using the spread operator `{ ...obj }` or `Object.assign()`. A deep copy copies all levels of an object, creating duplicates of nested structures so they share no references with the original. This can be achieved using `structuredClone(obj)` in modern environments, or by converting the object to JSON and back via `JSON.parse(JSON.stringify(obj))` for simple structures.

---

### Q9. How does array/object destructuring work, and what happens if you try to destructure a property that doesn't exist?
**Answer:**
Destructuring is a syntax that allows you to extract values from arrays or properties from objects directly into distinct variables in a single line. If you attempt to destructure a property that does not exist in the source object (e.g., `const { age } = user` when `age` is missing), the variable is successfully created but initialized as `undefined`. To prevent this, you can assign default fallback values directly inside the destructuring expression, like `const { age = 25 } = user`.

---

### Q10. What is the difference between `map()` and `forEach()` array methods?
**Answer:**
`map()` is an immutable transformation method; it runs a callback on each element and returns a brand-new array containing the returned values, leaving the original array untouched. `forEach()` is designed to execute side effects, such as mutating outer variables or logging to the console. It iterates through the array but always returns `undefined`. You should use `map()` when you want to convert one set of data to another, and `forEach()` when you just want to run an action on each item.

---

### Q11. Explain how `reduce()` works and what the initial value argument is used for.
**Answer:**
`reduce()` processes an array element-by-element to consolidate it into a single output value, which could be a number, string, array, or object. It accepts a callback function with an accumulator (the running total) and the current element. The second argument of `reduce()` defines the initial value of that accumulator. If you omit the initial value, `reduce()` will use the first element of the array as the accumulator and start iterating from the second element, which can cause runtime errors if the array is empty or if you are processing objects.

---

### Q12. What is the difference between `slice()` and `splice()` methods, particularly regarding mutation?
**Answer:**
`slice()` is non-mutating; it copies a section of an array and returns it as a new array, leaving the original array unmodified. `splice()` is mutating; it directly changes the original array by deleting, replacing, or inserting elements at a specific index. For example, `arr.slice(0, 2)` reads the first two items, while `arr.splice(0, 2)` removes the first two items from `arr`.

---

### Q13. Explain the Event Loop, Call Stack, Task Queue, and Microtask Queue in JavaScript.
**Answer:**
JavaScript is single-threaded, meaning it can only execute one line of code at a time using the Call Stack. When asynchronous actions (like timers or fetches) complete, their callbacks are placed in queues. The Microtask Queue (for Promise callbacks) has higher priority, while the Task Queue (for `setTimeout` or event handlers) has lower priority. The Event Loop constantly monitors the Call Stack; the moment the stack is empty, it pushes callbacks from the Microtask Queue to the stack first, and then items from the Task Queue.

---

### Q14. What are the three states of a Promise, and how do you handle multiple Promises resolving concurrently?
**Answer:**
A Promise starts in a `pending` state and eventually transitions to either `fulfilled` (success) or `rejected` (failure). To handle multiple promises concurrently, you can use `Promise.all()`, which runs them in parallel and resolves when all succeed, but rejects immediately if any single promise fails. Alternatively, `Promise.allSettled()` waits for all promises to finish regardless of whether they succeed or fail, returning an array of objects describing the outcome of each.

---

### Q15. What is the difference between `async/await` and raw Promise chaining using `.then()`?
**Answer:**
Raw Promise chaining uses `.then()` and `.catch()` callbacks to handle asynchronous results, which can become nested and hard to read (often called "callback hell"). `async/await` is syntactic sugar built on top of promises that allows you to write asynchronous code that looks and behaves like synchronous code. It eliminates the need for nested callbacks, allowing you to use standard `try/catch` blocks for error handling and improving code readability.

---

### Q16. How does error handling work with asynchronous code using async/await compared to synchronous try-catch blocks?
**Answer:**
Inside an `async` function, you can wrap asynchronous operations (prefixed with `await`) inside a standard `try/catch` block, just like you would for synchronous code. If an awaited Promise rejects, JavaScript automatically converts that rejection into a throwable error, which is caught by the `catch` block. For synchronous try-catch blocks, the check is immediate; if you try to catch a raw asynchronous error without `await`, the try block finishes executing before the error is actually thrown, causing the error to bypass the catch block.

---

### Q17. What is the difference between Named Exports and Default Exports in ES Modules?
**Answer:**
Named exports allow you to export multiple variables or functions from a single file by wrapping their names in curly braces, and they must be imported using those exact names. A file can have only one Default export, which represents the fallback value of that module. When importing a default export, you do not use curly braces, and you can name the imported value whatever you want in the importing file.

---

### Q18. Explain how prototypical inheritance works in JavaScript. What is the prototype chain?
**Answer:**
In JavaScript, objects have a hidden link to another object called their prototype (accessible via `__proto__`). When you try to access a property or call a method on an object, JavaScript first looks for it on the object itself. If it is not found, the engine follows the prototype link to the parent object, repeating this lookup until it finds the property or reaches the end of the chain (which is `null`). This hierarchical linking is called the prototype chain, and it is how JavaScript implements inheritance.

---

### Q19. How does a JavaScript `class` work under the hood? Is it different from traditional classes in languages like Java?
**Answer:**
JavaScript classes (introduced in ES6) are primarily syntactic sugar over JavaScript's existing prototype-based inheritance model. Under the hood, a class is actually a constructor function, and the methods defined inside the class are attached to the function's prototype object. This is fundamentally different from languages like Java or C++, which copy class definitions and construct real instance structures at runtime. In JavaScript, classes are just objects linking to other prototype objects dynamically.

---

### Q20. Why does `fetch()` resolve even if the server returns a 404 or 500 status code? How do you detect if a fetch request actually succeeded?
**Answer:**
The `fetch()` API promise only rejects when a network failure occurs, such as a DNS resolution failure, a lost connection, or a firewall block. HTTP status codes like `404 Not Found` or `500 Server Error` represent completed communication with a server, meaning a response *was* successfully received. To detect if a request succeeded, you must check the response object's boolean `.ok` property (which is `true` for status codes in the `200-299` range) or read the `.status` property manually in your code.
