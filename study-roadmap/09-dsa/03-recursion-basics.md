# DSA Basics: Basic Recursion

Many complex structures in programming (like trees, graphs, and agent graphs) are naturally recursive. Understanding **Recursion** is essential for traversing nodes and dividing complex problems into sub-problems.

---

## 1. What is Recursion?

Recursion is a programming technique where **a function calls itself** to solve a smaller version of the same problem.

To prevent calling itself forever, a recursive function must have two components:
1.  **The Base Case (The Stop Sign):** The condition under which the function stops calling itself and returns a value. Without this, the program runs out of memory.
2.  **The Recursive Case (The Loop Step):** The part where the function calls itself with a slightly smaller input, moving closer to the base case.

---

## 2. The Call Stack & Stack Overflows

When a program calls a function, Node.js places a **Call Frame** (containing local variables) onto a region of memory called the **Call Stack**.

In recursion, each recursive call adds a *new* frame to the top of the stack. None of these frames are cleared until a base case is hit, at which point the stack resolves and unwinds.

```text
[ Stack Growth ]
Frame 3: factorial(1) ──> Hits Base Case! Returns 1
Frame 2: factorial(2) ──> Waiting for factorial(1)
Frame 1: factorial(3) ──> Waiting for factorial(2)
```

If your recursion fails to hit a base case, it will grow the stack until it exceeds the stack's memory limit, causing a crash known as a **Stack Overflow**.

---

## 3. Code Example: Factorial Calculation

Let's look at the classic mathematical recursive function to calculate factorials ($n!$):

```javascript
function factorial(n) {
  // 1. Base Case
  if (n === 1) {
    return 1;
  }
  
  // 2. Recursive Case (n * factorial of one number smaller)
  return n * factorial(n - 1);
}

console.log(factorial(3)); // Outputs: 6 (3 * 2 * 1)
```

---

## ⚠️ Common Mistake: Missing a Return Statement on the Recursive Call

A very common mistake is executing the recursive call but forgetting to `return` its output back up the call chain:

```javascript
// OOPS: Missing return statement!
function sumRange(n) {
  if (n === 1) {
    return 1;
  }
  sumRange(n - 1) + n; // Forgot the 'return' keyword!
}

console.log(sumRange(3)); // Prints: undefined
```
*   **What happens:** The function returns `undefined` instead of the calculated sum.
*   **Why:** Even though the base case returned `1`, that value was discarded at the outer level because the parent frame didn't capture and pass it back.
*   **The Fix:** Always prepend the recursive call with the `return` keyword: `return sumRange(n - 1) + n;`.

---

## 🧠 Self-Check Recall

1.  What are the two mandatory components of every recursive function?
2.  What region of memory keeps track of active function calls and local variables?
3.  What happens to the Call Stack if a recursive function does not have a base case?
4.  Trace the call sequence of `factorial(3)` (i.e. what are the sub-calls)?
5.  Why does recursion consume more memory than a standard `for` loop that does the same calculation?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **The Base Case** (to stop execution) and **the Recursive Case** (to call itself with a smaller input).
2.  **The Call Stack.**
3.  **It overflows.** The function calls itself endlessly, exhausting the stack's allocated memory and throwing a `RangeError: Maximum call stack size exceeded`.
4.  `factorial(3)` calls `factorial(2)`, which calls `factorial(1)`. `factorial(1)` returns `1` to `factorial(2)`, which multiplies by `2` and returns `2` to `factorial(3)`, which multiplies by `3` and returns `6`.
5.  **Because of stack frames.** A loop updates variables in a single frame, whereas recursion allocates a new stack frame in memory for every function call.
</details>
