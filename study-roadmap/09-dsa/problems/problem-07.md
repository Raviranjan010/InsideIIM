# Problem 07: Two Sum II - Input Array Is Sorted

**Topic:** Two Pointers / Array

## Problem Statement
Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers that add up to a specific `target` number. Return their 1-indexed positions.

## Example
```text
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]
```

## Hint
> [!TIP]
> Since the array is sorted, you can use two pointers at opposite ends (left at 0, right at length-1). If their sum is greater than the target, decrement the right pointer. If the sum is smaller, increment the left pointer.

## JavaScript Solution
```javascript
function twoSum2(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;
  
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1]; // Return 1-indexed position
    } else if (sum < target) {
      left++; // Sum is too small, increase left
    } else {
      right--; // Sum is too large, decrease right
    }
  }
  return [];
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because the two pointers move closer to each other, scanning the array of size n at most once. Space Complexity is **O(1)** because we only store pointer index variables.
*   **Space Complexity:**