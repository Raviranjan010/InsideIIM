# Problem 10: Valid Palindrome

**Topic:** String / Two Pointers

## Problem Statement
Given a string `s`, return `true` if it is a palindrome (reads the same forward and backward) after converting all uppercase letters to lowercase and removing all non-alphanumeric characters.

## Example
```text
Input: s = "A man, a plan, a canal: Panama"
Output: true
```

## Hint
> [!TIP]
> Clean the string first by converting it to lowercase and using a regular expression to strip out spaces and punctuation. Then use two pointers at both ends to compare characters.

## JavaScript Solution
```javascript
function isPalindrome(s) {
  // Strip non-alphanumeric characters using regex
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  let left = 0;
  let right = clean.length - 1;
  
  while (left < right) {
    if (clean[left] !== clean[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because cleaning the string and running the two-pointer comparisons scale linearly with string length. Space Complexity is **O(n)** because the regex creates a new cleaned string in memory.
*   **Space Complexity:**