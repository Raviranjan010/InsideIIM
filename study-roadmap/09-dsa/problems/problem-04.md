# Problem 04: Contains Duplicate

**Topic:** HashSet / Array

## Problem Statement
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

## Example
```text
Input: nums = [1, 2, 3, 1]
Output: true
```

## Hint
> [!TIP]
> Use a Set object to store numbers you have already visited. Since lookup in a Set is O(1), checking if the current number has already been seen takes constant time.

## JavaScript Solution
```javascript
function containsDuplicate(nums) {
  const seen = new Set();
  
  for (let num of nums) {
    if (seen.has(num)) {
      return true; // Duplicate found!
    }
    seen.add(num);
  }
  return false;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we traverse the array of length n once. Looking up and adding items to the Set takes O(1) average time. Space Complexity is **O(n)** because we may store up to n elements inside the Set in the worst case.
*   **Space Complexity:**