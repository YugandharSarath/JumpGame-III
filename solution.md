# Jump Game Visualizer - Solution Explanation

## Problem Description

The Jump Game is a puzzle where you are given an array of non-negative integers. Each integer represents the **maximum number of steps you can jump forward** from that position. The goal is to determine if you can reach the last index starting from the first index.

### Example Inputs

1. `[2, 3, 1, 1, 4]` → Can reach last index → ✅ True
2. `[3, 2, 1, 0, 4]` → Cannot reach last index → ❌ False
3. `[1, 0, 1, 0]` → Stuck before last index → ❌ False

## Solution Approach

We use a **greedy algorithm** to solve the problem efficiently:

### Algorithm Steps

1. Initialize a variable `maxReach` to 0. This keeps track of the **farthest index reachable so far**.
2. Iterate through each index `i` in the array:

   * If `i > maxReach`, return `false` because we cannot proceed further.
   * Otherwise, update `maxReach = max(maxReach, i + nums[i])`.
   * If at any point `maxReach >= nums.length - 1`, return `true` because we can reach the last index.
3. If the loop ends without reaching the last index, return `false`.

### Step Tracking

* While iterating, we store the progress in a `steps` array:

  ```javascript
  { index: i, maxReach: maxReach, canReach: true/false }
  ```
* This allows us to visualize which indices are reachable and how `maxReach` evolves.

## Visualization Colors

* **Green:** Start position or last index if reachable
* **Blue:** Reachable indices
* **Red:** Unreachable indices
* **Yellow:** Last index if not reachable

## Example Execution

Input: `[2, 3, 1, 1, 4]`

| Index | Value | Max Reach | Status                 |
| ----- | ----- | --------- | ---------------------- |
| 0     | 2     | 2         | Reachable (start)      |
| 1     | 3     | 4         | Reachable              |
| 2     | 1     | 4         | Reachable              |
| 3     | 1     | 4         | Reachable              |
| 4     | 4     | 8         | Reachable (last index) |

**Result:** ✅ Can reach the last index

## Step-by-Step Explanation

```
At index 0 (value: 2), max reach becomes 2
At index 1 (value: 3), max reach becomes 4
At index 2 (value: 1), max reach becomes 4
At index 3 (value: 1), max reach becomes 4
Success! We can reach index 4
```

## Time Complexity

* **O(n)** — Only one pass through the array is needed.

## Space Complexity

* **O(n)** — To store the steps for visualization.

## Key Insights

* Greedy approach works because we only care about the **farthest reachable index**. Once we can reach the last index, we don’t need to consider other paths.
* If at any point the current index is beyond `maxReach`, we are **stuck**, and the answer is `false`.

---

