# DSA Basics: HashMaps, Objects, & Sets

While arrays are index-based lists, **HashMaps** (often called Dictionaries or Associative Arrays) store data as **key-value pairs**. They are the single most powerful tool in coding interviews for optimizing slow algorithms.

---

## 1. How HashMaps Work under the Hood

A HashMap achieves near-instantaneous lookups by using a **Hash Function**.

```text
Key (String) ──> [ Hash Function ] ──> Index (Number) ──> Memory Address
```

1.  When you write `map.set("age", 25)`, the HashMap runs the string `"age"` through a hash function that converts it into a specific array index (e.g. `4`).
2.  It saves the value `25` directly at index `4` of an underlying array.
3.  When you read `map.get("age")`, the hash function instantly calculates `4` and reads the memory address, bypassing the need to search the array.

### Performance Breakdown:
*   **Lookup / Read:** $O(1)$ average time.
*   **Insertion / Deletion:** $O(1)$ average time.
*   **Space Complexity:** $O(n)$ because storing keys and values consumes memory proportional to the number of items.

---

## 2. HashMap Tools in JavaScript: `Object`, `Map`, and `Set`

JavaScript provides three distinct options for key-value and presence checks:

### 1. Plain Objects (`{}`)
The most common way to store key-value pairs in JS. Ideal for basic configurations.
*   **Limit:** Keys can only be Strings or Symbols.

### 2. Map Objects (`new Map()`)
A specialized collection for key-value maps.
*   **Advantage:** Keys can be *any* data type (including objects or functions), it maintains insertion order, and has helper methods like `.has()`, `.get()`, and `.set()`.

### 3. Sets (`new Set()`)
A collection of **unique values** (no duplicates allowed).
*   **Advantage:** Used for $O(1)$ presence checks (checking if an item exists) using `.has()`.

---

## 3. Typical Interview Pattern: Frequency Counter

A common interview technique is counting the frequency of elements in a single pass:

```javascript
// Check if an array has duplicates in O(n) time
function hasDuplicates(arr) {
  const seen = new Set();
  
  for (let num of arr) {
    if (seen.has(num)) { // O(1) lookup!
      return true; // Duplicate found
    }
    seen.add(num); // O(1) insertion
  }
  return false;
}
```

---

## ⚠️ Common Mistake: Iterating Over the Map to Find a Key

Beginners often convert a Map back into an array to search for a key, which completely destroys the performance benefit.

```javascript
// OOPS: Turning O(1) lookup into O(n) search!
const map = new Map();
map.set("Alice", 95);

// Searching if key exists:
const exists = Array.from(map.keys()).includes("Alice"); // O(n) search!
```
*   **What happens:** The lookup runs in linear time instead of constant time.
*   **The Fix:** Use the native `.has()` method which runs in $O(1)$:
```javascript
const existsCorrect = map.has("Alice"); // O(1) constant lookup!
```

---

## 🧠 Self-Check Recall

1.  What is the average time complexity of looking up a key inside a HashMap?
2.  What is the difference between a JavaScript `Object` and a JavaScript `Map` regarding key types?
3.  How does a `Set` differ from an `Array`?
4.  Write a code snippet to create a Set from the array `[1, 2, 2, 3]` and check its unique size.
5.  What is a hash collision? (Explain simply without formal jargon).

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **$O(1)$** (Constant time).
2.  **Object keys must be Strings or Symbols.** Map keys can be of any data type, including numbers, objects, or arrays.
3.  **A Set only stores unique values** and provides $O(1)$ lookup speed. Arrays allow duplicate values and take $O(n)$ search speed.
4.  
    ```javascript
    const mySet = new Set([1, 2, 2, 3]);
    console.log(mySet.size); // Prints: 3
    ```
5.  **A hash collision occurs** when two completely different keys are processed by the hash function and resolve to the exact same array index index in memory.
</details>
