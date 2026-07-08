# Problem 02: Valid Anagram

**Topic:** HashMap / String

## Problem Statement
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

## Example
```text
Input: s = "anagram", t = "nagaram"
Output: true
```

## Hint
> [!TIP]
> Count the occurrences of each character in string `s` using a frequency map object, then decrement the counts while looping through string `t`. If you encounter a character not in the map, or a count drops below zero, they are not anagrams.

## JavaScript Solution
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const charCounts = {};
  
  // Count characters in s
  for (let char of s) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  
  // Decrement counts using t
  for (let char of t) {
    if (!charCounts[char]) {
      return false; // Character missing or count drops below 0
    }
    charCounts[char]--;
  }
  return true;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** where n is the length of the strings. We run two sequential linear loops. Space Complexity is **O(1)** (Constant Space) because the keys in the object are limited to the alphabet (at most 26 keys for lowercase English letters).
*   **Space Complexity:**