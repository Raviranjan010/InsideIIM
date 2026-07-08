# DSA Basics: Arrays & Strings

For coding interviews, **Arrays** and **Strings** are the most commonly tested data structures. They represent contiguous lists of data and form the foundation for more complex algorithms.

---

## 1. Core Characteristics of Arrays

An **Array** is a collection of elements stored in **contiguous (back-to-back) memory locations**. 

Because elements are packed side-by-side, the computer can calculate the exact memory location of any element if it knows the index.

### Performance Breakdown:
*   **Access / Read ($O(1)$ - Constant Time):** Reading `arr[3]` is instantaneous because the computer jumps directly to that memory slot.
*   **Search ($O(n)$ - Linear Time):** To find if the number `7` exists in an unsorted array, you must scan element-by-element from the beginning to the end.
*   **Insertion & Deletion ($O(n)$ - Linear Time):** If you insert a new item at the beginning of an array, the computer cannot just squeeze it in. It must **shift** every existing element one slot to the right, which takes $O(n)$ operations.

---

## 2. Strings as Character Arrays

In computer science, a **String** is simply an array of characters (e.g. `['h', 'e', 'l', 'l', 'o']`).

### Immutability in JavaScript
In JavaScript, **strings are immutable**. Once a string is created, you cannot change individual characters directly:
```javascript
let str = "hello";
str[0] = "H"; // IGNORED silently in JS!
console.log(str); // Prints: "hello"
```
To modify a string in JS, you must convert it to an array, modify it, and join it back, which creates a brand new string in memory:
```javascript
let chars = str.split(""); // Convert to ['h','e','l','l','o']
chars[0] = "H";
str = chars.join(""); // Convert back to "Hello"
```

---

## 3. Typical Interview Patterns: Two Pointers

A classic technique for solving array/string problems with optimal memory usage is the **Two-Pointer Technique** (using a `left` and `right` pointer to scan from both ends).

```javascript
// Reverse an array in-place (no extra memory)
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap elements
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    // Move pointers closer
    left++;
    right--;
  }
  return arr;
}
```

---

## ⚠️ Common Mistake: Accidental $O(n^2)$ Complexity via Nested Array Methods

Beginners often write loops that seem to run in linear time ($O(n)$) but actually run in quadratic time ($O(n^2)$) because they call nested array methods inside the loop.

```javascript
// OOPS: Accidental O(n^2) complexity!
function removeDuplicates(arr) {
  let unique = [];
  for (let i = 0; i < arr.length; i++) { // O(n) loop
    if (!unique.includes(arr[i])) {      // O(n) nested search!
      unique.push(arr[i]);
    }
  }
  return unique;
}
```
*   **What happens:** The code runs slowly on large inputs.
*   **Why:** `arr.includes()` scans the entire `unique` array element-by-element, making the search take $O(n)$ steps. Running an $O(n)$ search inside an $O(n)$ loop results in $n \times n = O(n^2)$ operations.
*   **The Fix:** Use a `Set` or HashMap which checks presence in $O(1)$ constant time.

---

## 🧠 Self-Check Recall

1.  Why is inserting an element at the beginning of an array slower ($O(n)$) than inserting it at the end ($O(1)$)?
2.  Can you modify a character inside a JavaScript string directly using `str[2] = 'x'`?
3.  What is the time complexity of reading a value at a specific index in an array?
4.  Explain the Two-Pointer technique in one sentence.
5.  What is the time complexity of checking if an item exists inside an array using `arr.indexOf()`?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Because of element shifting.** Inserting at the beginning requires moving all existing elements one slot to the right, whereas inserting at the end requires no shifting.
2.  **No.** Strings in JavaScript are immutable; attempting to change characters directly is ignored.
3.  **$O(1)$** (Constant time).
4.  **It uses two index trackers** (often starting at opposite ends or moving at different speeds) to scan an array in a single traversal, minimizing memory overhead.
5.  **$O(n)$** (Linear time), because the computer must scan the array item-by-item until it finds a match.
</details>
