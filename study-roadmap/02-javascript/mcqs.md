# JavaScript Practice: 40 Multiple Choice Questions (MCQs)

These questions are evenly distributed across the 9 core topics in JavaScript. They range from basic syntax to advanced async flows, prototypes, and API patterns.

---

## 📂 Topic 1: Syntax, Variables, & Scope

### Q1. Consider the following code:
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
```
What will be logged to the console?
- [ ] A) `0, 1, 2` followed by `0, 1, 2`
- [ ] B) `3, 3, 3` followed by `0, 1, 2`
- [ ] C) `3, 3, 3` followed by `3, 3, 3`
- [ ] D) `0, 1, 2` followed by `3, 3, 3`

**Correct Answer:** B
*   **Why it's correct:** `var` is function-scoped. The first loop sharing a single `i` variable ends at `3` before the timeouts execute, printing `3, 3, 3`. `let` is block-scoped, creating a new binding of `j` for each loop iteration, retaining `0, 1, 2`.
*   **Why other options are wrong:** A and C are wrong because they fail to account for `var` sharing a single reference or `let` creating a fresh scope per iteration. D has the outputs reversed.

---

### Q2. What is logged by the following code snippet?
```javascript
function test() {
  console.log(a);
  console.log(b);
  var a = 1;
  let b = 2;
}
test();
```
- [ ] A) `undefined` followed by `undefined`
- [ ] B) `undefined` followed by a `ReferenceError`
- [ ] C) `ReferenceError` followed by a `ReferenceError`
- [ ] D) `1` followed by `2`

**Correct Answer:** B
*   **Why it's correct:** Variables declared with `var` are hoisted and initialized to `undefined`, so `a` logs `undefined`. Variables declared with `let` are hoisted but not initialized, residing in the Temporal Dead Zone (TDZ), so accessing `b` throws a `ReferenceError`.
*   **Why other options are wrong:** A is wrong because `let` does not initialize to `undefined` during hoisting. C is wrong because `var a` is hoisted and does not crash. D is wrong because code executes sequentially and variables aren't evaluated at declaration values beforehand.

---

### Q3. What happens if you try to redeclare the same variable in the same block scope?
```javascript
let x = 10;
let x = 20;
```
- [ ] A) The code runs, and `x` becomes `20`.
- [ ] B) `x` remains `10` silently without any error.
- [ ] C) A runtime `TypeError` is thrown.
- [ ] D) A compile-time `SyntaxError` is thrown.

**Correct Answer:** D
*   **Why it's correct:** JavaScript engines throw a `SyntaxError` immediately during compilation when detecting duplicate declarations of `let` or `const` in the same scope, preventing the code from running.
*   **Why other options are wrong:** A and B are wrong because they describe `var` behavior or silent failure, which does not apply to block-scoped variables. C is wrong because this is a parser-level structure error, not a type mutation error.

---

### Q4. If you run the following script in a web browser's global scope, what will happen?
```javascript
var x = "hello";
let y = "world";
console.log(window.x, window.y);
```
- [ ] A) `"hello" undefined`
- [ ] B) `"hello" "world"`
- [ ] C) `undefined undefined`
- [ ] D) `TypeError: window.x is not a function`

**Correct Answer:** A
*   **Why it's correct:** In browsers, global declarations using `var` are attached as properties to the global `window` object. Block-scoped declarations (`let` and `const`) are kept in a declarative environment record and are not attached to `window`.
*   **Why other options are wrong:** B is wrong because `let y` is not mapped to `window.y`. C is wrong because `var x` successfully binds. D is wrong because accessing non-existent object properties returns `undefined` rather than throwing errors.

---

## 📂 Topic 2: Functions, `this`, & Closures

### Q5. What is the output of the following code?
```javascript
const person = {
  name: "Jane",
  greet: () => {
    console.log(`Hello, ${this.name}`);
  },
  greetNormal() {
    console.log(`Hello, ${this.name}`);
  }
};
person.greet();
person.greetNormal();
```
- [ ] A) `Hello, Jane` followed by `Hello, Jane`
- [ ] B) `Hello, undefined` followed by `Hello, Jane`
- [ ] C) `Hello, Jane` followed by `Hello, undefined`
- [ ] D) `TypeError: person.greet is not a function`

**Correct Answer:** B
*   **Why it's correct:** Arrow functions do not bind their own `this`. Instead, they inherit `this` from the outer lexical scope (which is the global object/window here, where `this.name` is undefined). Standard methods bind `this` to the object calling them, letting `greetNormal` print "Jane".
*   **Why other options are wrong:** A is wrong because the arrow function cannot bind `this` to `person`. C is wrong because the normal method executes correctly. D is wrong because `greet` is a valid function property.

---

### Q6. What does this code print?
```javascript
function makeCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}
const counter1 = makeCounter();
const counter2 = makeCounter();
console.log(counter1(), counter1(), counter2());
```
- [ ] A) `1 2 3`
- [ ] B) `1 1 1`
- [ ] C) `1 2 1`
- [ ] D) `0 1 0`

**Correct Answer:** C
*   **Why it's correct:** The inner function forms a closure, preserving access to the `count` variable. Each invocation of `makeCounter()` creates a new closure with its own isolated `count` variable, so `counter1` increments twice (`1` and `2`), while `counter2` starts fresh (`1`).
*   **Why other options are wrong:** A is wrong because `counter2` doesn't share `counter1`'s counter. B is wrong because closures mutate their captured state and do not reset on every call. D is wrong because pre-increment `++count` updates and returns the value (`1`), not the old value (`0`).

---

### Q7. What is the main purpose of an IIFE (Immediately Invoked Function Expression)?
- [ ] A) To make a function run asynchronously in the background.
- [ ] B) To force a function to compile faster.
- [ ] C) To create a private scope to avoid polluting the global namespace.
- [ ] D) To allow a function to be called from other modules.

**Correct Answer:** C
*   **Why it's correct:** Historically, before ES6 block scope (`let`/`const`), developers wrapped code in an IIFE `(function(){ ... })()` to ensure variables defined inside remained local to the function, preventing pollution of the global scope.
*   **Why other options are wrong:** A is wrong because IIFEs execute synchronously. B is wrong because execution speed is unaffected. D is wrong because variables inside are private and cannot be imported elsewhere unless explicitly exposed.

---

### Q8. What is the difference between `call` and `bind` methods on a function?
- [ ] A) `call` invokes the function immediately with a set `this`, while `bind` returns a new function with `this` locked.
- [ ] B) `call` accepts arguments as an array, while `bind` accepts them individually.
- [ ] C) `bind` invokes the function immediately, while `call` delays execution.
- [ ] D) There is no difference; they are aliases of each other.

**Correct Answer:** A
*   **Why it's correct:** `func.call(context, arg1, arg2)` executes the function right away, whereas `func.bind(context)` returns a wrapper function with the context preset for future execution.
*   **Why other options are wrong:** B describes the difference between `call` (individual args) and `apply` (array of args). C is incorrect because it reverses the execution timing of the two methods. D is incorrect because they are distinct utilities.

---

### Q9. What will happen when executing the following code?
```javascript
sayHello();
sayHi();

function sayHello() {
  console.log("Hello");
}
var sayHi = function() {
  console.log("Hi");
};
```
- [ ] A) It prints `"Hello"` then `"Hi"`.
- [ ] B) It throws a `ReferenceError` on the first line.
- [ ] C) It prints `"Hello"` then throws a `TypeError: sayHi is not a function`.
- [ ] D) It throws a `TypeError` on both lines.

**Correct Answer:** C
*   **Why it's correct:** Function declarations (`sayHello`) are fully hoisted, allowing execution before declaration. Function expressions assigned to `var` variables (`sayHi`) hoist only the variable declaration as `undefined`. Calling `undefined()` throws a `TypeError`.
*   **Why other options are wrong:** A is wrong because `sayHi` is not defined as a function yet when called. B is wrong because `sayHello` runs correctly due to hoisting. D is wrong because `sayHello` is fully valid.

---

## 📂 Topic 3: Objects, Arrays, & Destructuring

### Q10. What is logged by this destructuring snippet?
```javascript
const user = { id: 101, details: { name: "Alex" } };
const { id, details: { name, age = 30 } } = user;
console.log(id, name, age);
```
- [ ] A) `101 Alex undefined`
- [ ] B) `101 undefined 30`
- [ ] C) `101 Alex 30`
- [ ] D) `ReferenceError: details is not defined`

**Correct Answer:** C
*   **Why it's correct:** Destructuring extracts `id` and nested `name`. It also assigns a default value of `30` to `age` since `age` is missing in `user.details`.
*   **Why other options are wrong:** A is wrong because the default fallback `30` is applied. B is wrong because `name` is successfully resolved. D is wrong because destructuring nested values is valid and does not crash, even though the intermediate variable `details` itself is not bound.

---

### Q11. What is the output of this spread operator evaluation?
```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };
obj2.a = 99;
obj2.b.c = 99;
console.log(obj1.a, obj1.b.c);
```
- [ ] A) `1 2`
- [ ] B) `99 99`
- [ ] C) `1 99`
- [ ] D) `99 2`

**Correct Answer:** C
*   **Why it's correct:** The spread operator `{ ...obj1 }` performs a **shallow copy**. Nested objects (like `b`) are copied by reference, so modifying `obj2.b.c` affects `obj1.b.c`. The primitive property `a` is copied by value, so modifying `obj2.a` leaves `obj1.a` unchanged.
*   **Why other options are wrong:** A assumes spread does a deep clone. B assumes spread mutates the parent primitive. D assumes nested properties are cloned while top-level ones are shared, which is the exact opposite of reality.

---

### Q12. What value does `rest` hold after this assignment?
```javascript
const [first, ...rest] = [10, 20, 30];
console.log(rest);
```
- [ ] A) `20`
- [ ] B) `[20, 30]`
- [ ] C) `[[20, 30]]`
- [ ] D) `undefined`

**Correct Answer:** B
*   **Why it's correct:** The rest operator (`...rest`) gathers all remaining unassigned elements of the array into a new array.
*   **Why other options are wrong:** A is wrong because the rest parameter captures all left-over items as an array, not just the single next item. C wraps it in an unnecessary extra array dimension. D is incorrect since elements exist.

---

### Q13. How do you create an object property dynamically using a variable's value as the key?
- [ ] A) `const obj = { variable: "value" };`
- [ ] B) `const obj = { [variable]: "value" };`
- [ ] C) `const obj = { (variable): "value" };`
- [ ] D) `const obj = { ${variable}: "value" };`

**Correct Answer:** B
*   **Why it's correct:** Bracket notation inside object literals `[variable]` evaluates the variable and uses the resulting string as the key. This is called a Computed Property Name.
*   **Why other options are wrong:** A uses `"variable"` literally as the key. C and D are invalid syntaxes inside object declarations and will throw a SyntaxError.

---

## 📂 Topic 4: Array Methods

### Q14. What does the following reduce code output?
```javascript
const items = ["a", "b", "a", "c"];
const result = items.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});
console.log(result);
```
- [ ] A) `["a", "b", "c"]`
- [ ] B) `{ a: 2, b: 1, c: 1 }`
- [ ] C) `4`
- [ ] D) `undefined`

**Correct Answer:** B
*   **Why it's correct:** The accumulator starts as an empty object `{}`. For each character, the callback increments the count of that character key, creating a frequency count object `{ a: 2, b: 1, c: 1 }`.
*   **Why other options are wrong:** A is wrong because `reduce` returns the final accumulator type (an object), not a unique array (which `filter` or `Set` does). C is the length of the original array, not the accumulator. D occurs if you forget to return the accumulator `acc` inside the callback.

---

### Q15. What is the difference between `slice()` and `splice()`?
- [ ] A) `slice` modifies the original array; `splice` returns a shallow copy.
- [ ] B) `slice` returns a shallow copy without modifying the original array; `splice` modifies the original array by adding or removing elements.
- [ ] C) `slice` only works on strings; `splice` only works on arrays.
- [ ] D) They do the same thing, but `splice` is faster.

**Correct Answer:** B
*   **Why it's correct:** `slice(start, end)` is an immutable operation returning a subset of elements. `splice(start, deleteCount, items)` is a mutable operation that changes the contents of the array it is called on.
*   **Why other options are wrong:** A is the exact reverse of their behaviors. C is wrong because `slice` works on both arrays and strings. D is incorrect because their functionalities and side effects are completely different.

---

### Q16. What is logged to the console?
```javascript
const arr = [1, 2, 3];
const res1 = arr.forEach(x => x * 2);
const res2 = arr.map(x => x * 2);
console.log(res1, res2);
```
- [ ] A) `undefined [2, 4, 6]`
- [ ] B) `[2, 4, 6] [2, 4, 6]`
- [ ] C) `undefined undefined`
- [ ] D) `[1, 2, 3] [2, 4, 6]`

**Correct Answer:** A
*   **Why it's correct:** `forEach` performs side effects and always returns `undefined`, regardless of the callback return value. `map` returns a brand-new array containing the transformed results of each element.
*   **Why other options are wrong:** B assumes `forEach` behaves like `map`. C assumes `map` has no return value. D assumes `forEach` returns the unmodified original array.

---

### Q17. What will the following code print?
```javascript
const users = [{ id: 1 }, { id: 2 }, { id: 1 }];
const res1 = users.find(u => u.id === 1);
const res2 = users.filter(u => u.id === 1);
console.log(res1, res2.length);
```
- [ ] A) `{ id: 1 } 1`
- [ ] B) `[{ id: 1 }, { id: 1 }] 2`
- [ ] C) `{ id: 1 } 2`
- [ ] D) `undefined 2`

**Correct Answer:** C
*   **Why it's correct:** `find` returns the **first** matched element as an object (`{ id: 1 }`). `filter` returns an **array** containing all matching elements, which has a length of `2`.
*   **Why other options are wrong:** A is wrong because `filter` returns all matching items, not just one. B is wrong because `find` returns a single object, not an array. D is wrong because a matching element does exist.

---

### Q18. What is the behavior of the `every` method on an empty array `[]`?
- [ ] A) It returns `false` because there are no elements to test.
- [ ] B) It throws a `TypeError`.
- [ ] C) It returns `true`.
- [ ] D) It returns `undefined`.

**Correct Answer:** C
*   **Why it's correct:** In mathematics and computer science, checking if a condition holds for all elements of an empty set is vacuously true. Hence, `[].every(...)` immediately returns `true`.
*   **Why other options are wrong:** A is wrong because checking empty conditions returns true. B is wrong because empty arrays are valid inputs. D is wrong because `every` always returns a boolean.

---

## 📂 Topic 5: Async, Promises, & Event Loop

### Q19. In what order will the logs appear?
```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");
```
- [ ] A) `Start` -> `Timeout` -> `Promise` -> `End`
- [ ] B) `Start` -> `End` -> `Timeout` -> `Promise`
- [ ] C) `Start` -> `End` -> `Promise` -> `Timeout`
- [ ] D) `Promise` -> `Start` -> `End` -> `Timeout`

**Correct Answer:** C
*   **Why it's correct:** Sync code runs first ("Start", "End"). Then, the Event Loop processes the **Microtask Queue** (which houses Promise callbacks) before the **Macrotask Queue** (which houses `setTimeout`), logging "Promise" before "Timeout".
*   **Why other options are wrong:** A and B fail to respect the async non-blocking queues. D executes async actions before synchronous script completion, which violates execution flow.

---

### Q20. What are the three mutually exclusive states of a JavaScript Promise?
- [ ] A) `waiting`, `success`, `failure`
- [ ] B) `pending`, `fulfilled`, `rejected`
- [ ] C) `paused`, `running`, `completed`
- [ ] D) `active`, `inactive`, `resolved`

**Correct Answer:** B
*   **Why it's correct:** A Promise is initialized as `pending` and can transition only once to either `fulfilled` (success) or `rejected` (failure).
*   **Why other options are wrong:** A, C, and D use non-standard terminology. Once a promise settles, it is referred to as resolved, which is a state of completion rather than an active state itself.

---

### Q21. If you pass an array of Promises to `Promise.all()`, what happens if one of them rejects?
- [ ] A) The returned Promise immediately rejects with that error, ignoring all other resolved promises.
- [ ] B) It waits for all other promises to resolve and returns a mixture of values and errors.
- [ ] C) It ignores the error and returns only the successful values.
- [ ] D) It retries the rejected promise automatically.

**Correct Answer:** A
*   **Why it's correct:** `Promise.all` operates on an "all-or-nothing" basis. It rejects immediately upon the first promise rejection (short-circuiting).
*   **Why other options are wrong:** B describes the behavior of `Promise.allSettled()`. C describes the behavior of `Promise.any()` (which only rejects if *all* reject). D is incorrect since native promises do not implement auto-retry.

---

### Q22. What is the difference between `Promise.race()` and `Promise.any()`?
- [ ] A) `race` resolves/rejects as soon as the first promise settles; `any` resolves as soon as the first promise is fulfilled (ignoring rejections unless all fail).
- [ ] B) `race` is for network requests; `any` is for local code.
- [ ] C) `any` evaluates promises in parallel; `race` evaluates them sequentially.
- [ ] D) There is no difference; they are duplicate APIs.

**Correct Answer:** A
*   **Why it's correct:** `Promise.race` returns the outcome (value or error) of the fastest promise. `Promise.any` looks only for the fastest *successful* (fulfilled) promise, ignoring rejections unless every single promise in the list fails.
*   **Why other options are wrong:** B and C describe fictitious rules. D is wrong because they handle errors and fulfillment differently.

---

### Q23. What does an `async` function always return?
- [ ] A) The evaluated data value directly.
- [ ] B) A Promise (resolved to the returned value or rejected with a thrown error).
- [ ] C) A generator object.
- [ ] D) `undefined` if it doesn't contain an `await` statement.

**Correct Answer:** B
*   **Why it's correct:** The `async` keyword wraps any returned value of the function inside a Promise automatically.
*   **Why other options are wrong:** A is wrong because async functions return a promise wrapper immediately, not raw synchronous data. C describes generator functions (`function*`). D is wrong because lack of `await` still results in a Promise return.

---

## 📂 Topic 6: Error Handling

### Q24. What does the following code log?
```javascript
function errorTest() {
  try {
    throw new Error("Oops");
  } catch (err) {
    return "Caught";
  } finally {
    return "Finally";
  }
}
console.log(errorTest());
```
- [ ] A) `Caught`
- [ ] B) `Finally`
- [ ] C) `Caught` followed by `Finally`
- [ ] D) An unhandled exception crash.

**Correct Answer:** B
*   **Why it's correct:** The `finally` block always executes before control leaves the function. When a `return` statement is written inside `finally`, it overrides any pending `return` statements from `try` or `catch`.
*   **Why other options are wrong:** A and C are wrong because the catch's return is discarded due to the override. D is wrong because the catch block successfully intercept the thrown error.

---

### Q25. What types of values can be thrown using the `throw` statement in JavaScript?
- [ ] A) Only instances of the `Error` object.
- [ ] B) Only Strings.
- [ ] C) Only Objects.
- [ ] D) Any data type (Strings, Numbers, Objects, Functions, etc.).

**Correct Answer:** D
*   **Why it's correct:** In JavaScript, you can throw anything (e.g. `throw "Error!"`, `throw 404`, or `throw { msg: "failed" }`). However, throwing an actual `Error` instance is best practice to capture stack traces.
*   **Why other options are wrong:** A, B, and C are too restrictive. JavaScript is dynamically typed and places no boundaries on what values can be thrown.

---

### Q26. Which error type is thrown when you try to access a property on an `undefined` value?
- [ ] A) `ReferenceError`
- [ ] B) `TypeError`
- [ ] C) `SyntaxError`
- [ ] D) `RangeError`

**Correct Answer:** B
*   **Why it's correct:** A `TypeError` is thrown when an operation cannot be performed on a specific data type (such as treating `undefined` like an object and trying to read properties from it).
*   **Why other options are wrong:** A is wrong because `ReferenceError` occurs when a variable name cannot be found in scope. C is syntax issues. D is numeric value ranges (like `new Array(-1)`).

---

### Q27. How can you catch unhandled Promise rejections globally in Node.js?
- [ ] A) `process.on('uncaughtException', ...)`
- [ ] B) `process.on('unhandledRejection', ...)`
- [ ] C) `window.onerror = ...`
- [ ] D) Wrap the entire file in a `try...catch` block.

**Correct Answer:** B
*   **Why it's correct:** In Node.js, unhandled promise errors trigger the `'unhandledRejection'` event on the global `process` object.
*   **Why other options are wrong:** A is for standard synchronous code crashes. C is a browser-only global handler, not Node.js. D cannot catch asynchronous promise rejections that settle after the try-catch block finishes execution.

---

## 📂 Topic 7: Modules (Import/Export)

### Q28. Which of the following is correct regarding named vs default exports?
- [ ] A) You can only have one named export per file.
- [ ] B) You must use curly braces to import named exports, but not default exports.
- [ ] C) Default exports must be renamed to match their declaration exactly during import.
- [ ] D) Named exports are imported using any custom name.

**Correct Answer:** B
*   **Why it's correct:** Named exports require explicit destructured syntax `import { name } from "module"`. Default exports represent the default fallback of a module and are imported as `import customName from "module"`.
*   **Why other options are wrong:** A is incorrect because you can have infinite named exports. C is incorrect because default imports can be given any name. D is incorrect because named exports must match their exported names.

---

### Q29. What is the return type of a dynamic import statement `import("./module.js")`?
- [ ] A) An object containing the module's contents synchronously.
- [ ] B) A Promise that resolves to a module namespace object.
- [ ] C) `undefined`.
- [ ] D) A worker thread.

**Correct Answer:** B
*   **Why it's correct:** Dynamic `import()` loads modules asynchronously on-demand and returns a Promise. The resolved value is an object containing all the module's exports.
*   **Why other options are wrong:** A is wrong because imports are async. C is wrong because it returns a promise. D describes multithreading workers.

---

### Q30. Which of the following is TRUE about ES Modules compared to CommonJS?
- [ ] A) ES Modules load synchronously; CommonJS loads asynchronously.
- [ ] B) ES Modules use `require()`; CommonJS uses `import`.
- [ ] C) ES Modules run in strict mode by default.
- [ ] D) ES Modules do not support top-level `await`.

**Correct Answer:** C
*   **Why it's correct:** ES Modules (`type: "module"`) automatically execute in Strict Mode (`"use strict"`), which disables unsafe features like assigning values to undeclared variables.
*   **Why other options are wrong:** A is wrong because ES Modules support asynchronous parsing while CommonJS is synchronous. B reverses their import keywords. D is wrong because ES Modules natively support top-level `await`.

---

### Q31. What is a "live binding" in ES Modules?
- [ ] A) Imported values can be changed by the importing file.
- [ ] B) If an exported variable's value changes inside the exporting module, the change is reflected in the importing module automatically.
- [ ] C) Modules require an active internet connection to share variables.
- [ ] D) Changes to local variables are auto-saved to disk.

**Correct Answer:** B
*   **Why it's correct:** ES Modules establish live connections to exported variables. If the exporter updates a value, the importer sees the updated value instantly. However, the importer cannot modify the value (it is read-only).
*   **Why other options are wrong:** A is wrong because imported variables are read-only views. C and D are fictitious concepts.

---

## 📂 Topic 8: Prototypes & Classes

### Q32. What is the difference between `__proto__` and `prototype` in JavaScript?
- [ ] A) `__proto__` exists on all objects and points to its prototype link; `prototype` exists only on constructor functions to define what `__proto__` objects created by it will get.
- [ ] B) `prototype` is the old way of writing `__proto__`.
- [ ] C) `__proto__` is for arrays; `prototype` is for objects.
- [ ] D) They are identical references.

**Correct Answer:** A
*   **Why it's correct:** `__proto__` is the actual active prototype link of an object instance. `prototype` is a property on constructor functions/classes used to assign the `__proto__` link to new instances during creation.
*   **Why other options are wrong:** B, C, and D confuse instance links with constructor configuration blueprints.

---

### Q33. What does the `new` keyword do under the hood when calling a constructor function?
- [ ] A) It compiles the constructor code into machine instructions.
- [ ] B) It creates a blank object, sets its `__proto__` link to the constructor's `prototype`, binds `this` to the new object, and returns it.
- [ ] C) It deletes the old function and creates a new one.
- [ ] D) It sends a request to the server to create a record.

**Correct Answer:** B
*   **Why it's correct:** The `new` keyword instantiates a new object, links its prototype chain, assigns `this` context to it for property setups, and implicitly returns it if no other object is returned.
*   **Why other options are wrong:** A, C, and D are incorrect descriptions of object instantiating and constructor patterns.

---

### Q34. What is the rule regarding the `super` keyword inside a subclass constructor?
- [ ] A) It must be called at the very end of the constructor.
- [ ] B) It is optional.
- [ ] C) It must be called before using the `this` keyword.
- [ ] D) It must only be called in static methods.

**Correct Answer:** C
*   **Why it's correct:** In subclasses, you must invoke `super()` first to initialize the parent class and instantiate `this`. Referencing `this` beforehand throws a ReferenceError.
*   **Why other options are wrong:** A is wrong because calling it at the end would cause errors if `this` was used earlier. B is wrong because it is mandatory. D is wrong because it applies to constructors.

---

### Q35. How are static methods called on a JavaScript class?
- [ ] A) On an instance of the class (e.g. `const inst = new MyClass(); inst.myStatic();`).
- [ ] B) Directly on the class constructor itself (e.g. `MyClass.myStatic();`).
- [ ] C) Using the `new` keyword.
- [ ] D) They cannot be called in JavaScript.

**Correct Answer:** B
*   **Why it's correct:** Static methods belong to the class constructor function itself rather than instance objects.
*   **Why other options are wrong:** A is wrong because instances do not inherit static methods. C is wrong because static methods are called, not instantiated. D is incorrect.

---

### Q36. What is the output of the following class getter/setter logic?
```javascript
class Temp {
  constructor(c) { this._c = c; }
  get temp() { return this._c; }
  set temp(v) { this._c = v; }
}
const t = new Temp(20);
t.temp = 30;
console.log(t.temp);
```
- [ ] A) `20`
- [ ] B) `30`
- [ ] C) `undefined`
- [ ] D) `StackOverflow Error`

**Correct Answer:** B
*   **Why it's correct:** Getter and Setter methods are accessed like properties. Setting `t.temp = 30` calls the setter, modifying `_c` to `30`. Reading `t.temp` calls the getter, returning `30`.
*   **Why other options are wrong:** A is the old value. C is wrong because getter returns the property value. D happens only if the getter/setter recursively calls `this.temp` (without the underscore), which causes an infinite loop.

---

## 📂 Topic 9: JSON & APIs

### Q37. What happens when you try to convert an object containing functions or `undefined` properties into JSON?
```javascript
const user = { name: "Bob", code: () => {}, val: undefined };
console.log(JSON.stringify(user));
```
- [ ] A) It throws a `TypeError: Cannot serialize functions`.
- [ ] B) It converts them to strings: `{"name":"Bob","code":"() => {}","val":"undefined"}`.
- [ ] C) It omits the function and undefined keys entirely, returning `{"name":"Bob"}`.
- [ ] D) It converts them to `null` values.

**Correct Answer:** C
*   **Why it's correct:** JSON syntax does not support functions or `undefined` values. `JSON.stringify` silently drops these keys when serializing objects.
*   **Why other options are wrong:** A is wrong because it does not throw errors. B is wrong because it does not stringify code. D is incorrect for object properties (though they become `null` inside array lists to preserve index alignment).

---

### Q38. What is the second parameter of `JSON.parse()` used for?
- [ ] A) It sets a timeout limit.
- [ ] B) A "reviver" callback function that transforms the parsed object properties before returning them.
- [ ] C) A fallback value if parsing fails.
- [ ] D) It formats indentation.

**Correct Answer:** B
*   **Why it's correct:** The reviver function `JSON.parse(text, (key, value) => { ... })` allows you to format or transform values (such as parsing ISO date strings into Date objects) during parsing.
*   **Why other options are wrong:** A and C describe invalid parameters. D describes the third parameter of `JSON.stringify()` (space count), not `JSON.parse()`.

---

### Q39. If a `fetch()` request encounters a `404 Not Found` or `500 Server Error`, how does the returned Promise behave?
- [ ] A) The Promise rejects immediately.
- [ ] B) The Promise resolves successfully with an `ok` property set to `false`.
- [ ] C) The browser crashes the tab.
- [ ] D) The request automatically retries.

**Correct Answer:** B
*   **Why it's correct:** The `fetch` API only rejects on network failures (e.g. no internet connection, DNS failure). HTTP errors like `404` or `500` still represent completed server responses, so the Promise resolves with `response.ok = false`.
*   **Why other options are wrong:** A is wrong because HTTP errors are treated as successful network completions. C is wrong. D is incorrect.

---

### Q40. Which header is mandatory to tell a server you are sending JSON data in the request body?
- [ ] A) `Accept: application/json`
- [ ] B) `Content-Type: application/json`
- [ ] C) `Format: json`
- [ ] D) `Data-Encoding: raw`

**Correct Answer:** B
*   **Why it's correct:** `Content-Type` tells the server the format of the payload data currently being sent in the request body.
*   **Why other options are wrong:** A is for telling the server what formats the client wants to receive back. C and D are non-standard headers.
