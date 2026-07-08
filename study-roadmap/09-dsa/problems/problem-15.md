# Problem 15: Missing Number

**Topic:** Math / Array

## Problem Statement
Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.

## Example
```text
Input: nums = [3, 0, 1]
Output: 2
```

## Hint
> [!TIP]
> Calculate the sum of all numbers from 0 to n using the mathematical formula: sum = n * (n + 1) / 2. Then, calculate the actual sum of the array. The missing number is the difference.

## JavaScript Solution
```javascript
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  
  // Sum array elements using reduce
  const actualSum = nums.reduce((acc, curr) => acc + curr, 0);
  
  return expectedSum - actualSum;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we sum the array of size n in linear time. Space Complexity is **O(1)** because we only store two numeric variables in memory (`expectedSum` and `actualSum`).
*   **Space Complexity:**