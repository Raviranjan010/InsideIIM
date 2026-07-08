# Problem 14: Majority Element

**Topic:** HashMap / Array

## Problem Statement
Given an array `nums` of size `n`, return the majority element. The majority element is the element that appears more than `⌊n / 2⌋` times.

## Example
```text
Input: nums = [3, 2, 3]
Output: 3
```

## Hint
> [!TIP]
> Use a frequency map to count occurrences of each number. Since the majority element occurs more than half the time, return the key whose count exceeds n/2.

## JavaScript Solution
```javascript
function majorityElement(nums) {
  const counts = {};
  const majorityLimit = nums.length / 2;
  
  for (let num of nums) {
    counts[num] = (counts[num] || 0) + 1;
    if (counts[num] > majorityLimit) {
      return num;
    }
  }
  return -1;
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(n)** because we scan the array of size n once, checking counts in O(1). Space Complexity is **O(n)** because in the worst case we store counts for up to n/2 unique elements in the map.
*   **Space Complexity:**