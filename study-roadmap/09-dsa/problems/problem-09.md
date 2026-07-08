# Problem 09: Intersection of Two Arrays

**Topic:** HashSet / Array

## Problem Statement
Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique.

## Example
```text
Input: nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output: [2]
```

## Hint
> [!TIP]
> Convert `nums1` into a Set. Loop through `nums2`, and if an element exists inside the first Set, add it to a second results Set. This ensures O(1) checks and unique results.

## JavaScript Solution
```javascript
function intersection(nums1, nums2) {
  const set1 = new Set(nums1);
  const result = new Set();
  
  for (let num of nums2) {
    if (set1.has(num)) {
      result.add(num);
    }
  }
  return Array.from(result);
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(m + n)** where m and n are the lengths of `nums1` and `nums2`. We build a Set in O(m) and scan the second array in O(n). Space Complexity is **O(m + n)** to store elements in the sets.
*   **Space Complexity:**