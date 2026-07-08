# Problem 12: First Unique Character in a String

**Topic:** HashMap / String

## Problem Statement
Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.

## Example
```text
Input: s = "leetcode"
Output: 0
```

## Hint
> [!TIP]
> Perform a two-pass scan. In the first pass, count the occurrences of all characters in a frequency map. In the second pass, loop through the string again and return the index of the first character with a frequency count of 1.

## JavaScript Solution
```javascript
function firstUniqChar(s) {
  const counts = {};
  
  // First pass: count frequencies
  for (let char of s) {
    counts[char] = (counts[char] || 0) + 1;
  }
  
  // Second pass: find index of first unique character
  for (let i = 0; i < s.length; i++) {
    if (counts[s[i]] === 1) {
      return i;
    }
  }
  return -1;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we scan the string of length n exactly twice. Space Complexity is **O(1)** (Constant space) because the keys in the counts map are limited to the 26 lowercase English letters.
*   **Space Complexity:**