# Problem 08: Move Zeroes

**Topic:** Two Pointers / Array

## Problem Statement
Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements. You must do this in-place.

## Example
```text
Input: nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
```

## Hint
> [!TIP]
> Use a write pointer starting at 0. Loop through the array; whenever you find a non-zero element, swap it with the element at the write pointer, and increment the write pointer.

## JavaScript Solution
```javascript
function moveZeroes(nums) {
  let write = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      // Swap elements
      let temp = nums[write];
      nums[write] = nums[i];
      nums[i] = temp;
      write++;
    }
  }
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we loop through the array of size n exactly once. Space Complexity is **O(1)** because we perform all swaps directly on the input array in-place.
*   **Space Complexity:**