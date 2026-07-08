# Problem 11: Group Anagrams

**Topic:** HashMap / String

## Problem Statement
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

## Example
```text
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

## Hint
> [!TIP]
> Any two strings that are anagrams will become identical if you sort their characters alphabetically (e.g. "eat" and "tea" both sort to "aet"). Use this sorted string as a key in a HashMap.

## JavaScript Solution
```javascript
function groupAnagrams(strs) {
  const groups = {};
  
  for (let str of strs) {
    // Sort the characters of the string
    const key = str.split("").sort().join("");
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(str);
  }
  return Object.values(groups);
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n * k log k)** where n is the number of strings and k is the maximum length of a string. We sort each string (taking k log k) n times. Space Complexity is **O(n * k)** to store the groups in the hash map.
*   **Space Complexity:**