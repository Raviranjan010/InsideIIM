# DSA Basics: Big-O Complexity & Reasoning

When interviewing, developers must be able to predict how fast their code runs. We measure this efficiency using **Big-O Notation**. 

Big-O tells us how the execution time or memory usage of an algorithm scales as the size of the input data ($n$) grows.

---

## 1. The Common Big-O Time Complexities

Here are the 6 time complexities you will see in almost every coding interview:

### 1. $O(1)$ - Constant Time
The algorithm takes the same number of steps regardless of input size.
*   **Example:** Accessing an array index (`arr[5]`) or reading a map key.

### 2. $O(\log n)$ - Logarithmic Time
The search space is cut in half on every step. Very fast.
*   **Example:** Binary Search (searching for a name in a sorted phonebook).

### 3. $O(n)$ - Linear Time
The number of operations grows proportionally with input size.
*   **Example:** A single loop traversing an array of size $n$.
```javascript
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

### 4. $O(n \log n)$ - Linearithmic Time
Commonly found in efficient sorting algorithms.
*   **Example:** `Array.prototype.sort()` (Merge Sort, Quick Sort under the hood).

### 5. $O(n^2)$ - Quadratic Time
Every element is compared to every other element. Slow for large inputs.
*   **Example:** Nested loops scanning the same array.
```javascript
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    console.log(i, j);
  }
}
```

### 6. $O(2^n)$ - Exponential Time
The operations double with each increase in input size. Extremely slow.
*   **Example:** Recursive Fibonacci calculation without caching.

---

## 2. Rules for Analyzing Code

To calculate Big-O, follow two simple rules:

### Rule 1: Keep the Worst-Case Scenario
If an algorithm scans an array for a number, it *could* find it on the first step ($O(1)$). But Big-O always measures the **worst case** (the number is at the very end or missing, taking $O(n)$ steps).

### Rule 2: Drop the Constants and Non-Dominant Terms
*   `O(2n)` becomes **`O(n)`** (constants don't matter at scale).
*   `O(n² + n)` becomes **`O(n²)`** (as $n$ grows huge, $n$ becomes insignificant compared to $n^2$).

---

## ⚠️ Common Mistake: Assuming Two Sequential Loops are $O(n^2)$

Beginners often see two loops in a function and assume it is $O(n^2)$, without checking if they are nested or sequential.

```javascript
// OOPS: Misclassifying sequential loops
function processArray(arr) {
  // First Loop: O(n)
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  
  // Second Loop: O(n)
  for (let j = 0; j < arr.length; j++) {
    console.log(arr[j]);
  }
}
```
*   **The Mistake:** Stating the complexity is $O(n^2)$.
*   **Why it's wrong:** The loops are **sequential**, not nested. The total operations are $n + n = 2n$. Dropping the constant gives a time complexity of **$O(n)$** (Linear), which is much faster than quadratic time.

---

## 🧠 Self-Check Recall

1.  What does Big-O notation measure?
2.  If an algorithm divides its remaining search space in half with every step, what is its time complexity?
3.  What is the time complexity of the following code?
    ```javascript
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < 5; j++) {
        console.log(i, j);
      }
    }
    ```
4.  Why is `O(3n + 5)` simplified to `O(n)` in Big-O analysis?
5.  Rank these three complexities from fastest to slowest: `O(n²)`, `O(n log n)`, `O(1)`.

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **How an algorithm's execution time or space scale** as the size of the input data ($n$) grows.
2.  **$O(\log n)$** (Logarithmic time).
3.  **$O(n)$** (Linear time). The outer loop runs $n$ times, but the inner loop only ever runs a constant 5 times (which is $O(1)$). $n \times 5 = 5n$, which simplifies to $O(n)$.
4.  **Because we drop constants and low-order terms.** As $n$ grows to infinity, the multiplier `3` and the flat addition `5` have negligible impact on the scaling behavior.
5.  **`O(1)`** (Fastest) → **`O(n log n)`** → **`O(n²)`** (Slowest).
</details>
