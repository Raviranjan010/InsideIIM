# Problem 01: Two Sum

**Topic:** HashMap

## Problem Statement
Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

## Example
```text
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] === 9, we return [0, 1].
```

## Hint
> [!TIP]
> Use a HashMap to store the numbers you have seen so far as keys, and their array indices as values. For each number, calculate the target complement (target - current_number) and check if it exists in your map.

## JavaScript Solution
```javascript
function twoSum(nums, target) {
  const seen = new Map(); // Key: number, Value: index
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we traverse the array of length n exactly once. Lookups and insertions in the Map take O(1) constant time on average. Space Complexity is **O(n)** because in the worst-case scenario, we store up to n elements in the Map.
*   **Space Complexity:**