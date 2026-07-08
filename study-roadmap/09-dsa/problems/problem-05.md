# Problem 05: Maximum Subarray (Kadane's Algorithm)

**Topic:** Array

## Problem Statement
Given an integer array `nums`, find the subarray with the largest sum and return its sum.

## Example
```text
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: The subarray [4, -1, 2, 1] has the largest sum = 6.
```

## Hint
> [!TIP]
> At each index in the array, the maximum sum ending at that index is either the current element itself, or the current element plus the maximum sum ending at the previous index. Keep track of the global maximum sum found so far.

## JavaScript Solution
```javascript
function maxSubArray(nums) {
  let maxGlobal = nums[0];
  let maxCurrent = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    // Decide whether to start a new subarray at nums[i],
    // or add nums[i] to the running total sum.
    maxCurrent = Math.max(nums[i], maxCurrent + nums[i]);
    maxGlobal = Math.max(maxGlobal, maxCurrent);
  }
  return maxGlobal;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we scan the array from left to right in a single linear pass. Space Complexity is **O(1)** because we only store two numeric variables in memory (`maxGlobal` and `maxCurrent`), using no extra array structures.
*   **Space Complexity:**