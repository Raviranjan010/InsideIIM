# Problem 03: Reverse String

**Topic:** Two Pointers / String

## Problem Statement
Write a function that reverses a string. The input string is given as an array of characters `s`. You must modify the input array in-place with O(1) extra memory.

## Example
```text
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

## Hint
> [!TIP]
> Use the Two-Pointer technique. Place one pointer at index 0 (left) and another at the last index (right). Swap the characters at these indices, move the pointers closer, and repeat until they meet.

## JavaScript Solution
```javascript
function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    // Swap in place
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    
    // Move pointers closer
    left++;
    right--;
  }
  return s;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we visit each element exactly once, performing n/2 swaps. Space Complexity is **O(1)** because we perform all swaps directly on the input array in-place, without allocating any extra array memory.
*   **Space Complexity:**