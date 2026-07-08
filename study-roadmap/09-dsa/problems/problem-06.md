# Problem 06: Merge Sorted Array

**Topic:** Two Pointers / Array

## Problem Statement
You are given two sorted integer arrays `nums1` and `nums2`, and their sizes `m` and `n`. Merge `nums2` into `nums1` as one sorted array in-place. `nums1` has a size of `m + n`.

## Example
```text
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
```

## Hint
> [!TIP]
> Instead of merging from the front (which requires shifting elements and taking O(n) time), merge from the *back* of both arrays. Place a write pointer at the final index (m+n-1) of `nums1` and write the larger elements first.

## JavaScript Solution
```javascript
function merge(nums1, m, nums2, n) {
  let p1 = m - 1;       // Pointer at end of active elements in nums1
  let p2 = n - 1;       // Pointer at end of nums2
  let write = m + n - 1; // Write pointer at the absolute end of nums1
  
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[write] = nums1[p1];
      p1--;
    } else {
      nums1[write] = nums2[p2];
      p2--;
    }
    write--;
  }
}
```

## Complexity Analysis
*   **Time Complexity:** Time Complexity is **O(m + n)** because we write exactly m+n elements sequentially. Space Complexity is **O(1)** because we merge directly into the pre-allocated extra slots of the first array in-place.
*   **Space Complexity:**