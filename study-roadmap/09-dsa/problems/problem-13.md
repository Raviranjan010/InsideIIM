# Problem 13: Longest Common Prefix

**Topic:** String / Array

## Problem Statement
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return `""`.

## Example
```text
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

## Hint
> [!TIP]
> Set the first string as the prefix. Iterate through the remaining strings; while the current string does not start with the prefix, shorten the prefix by removing one character from the end.

## JavaScript Solution
```javascript
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  
  for (let i = 1; i < strs.length; i++) {
    // Shorten prefix until the current string starts with it
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(S)** where S is the sum of all characters in all strings in the array. Space Complexity is **O(1)** because we only store the prefix string index pointers.
*   **Space Complexity:**