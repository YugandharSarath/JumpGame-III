
---

## Jump Game III – Simplified Question

### Requirements

* Take an array `arr` (1 ≤ arr.length ≤ 50,000) and a `start` index.
* From index `i`, you may jump to `i + arr[i]` or `i - arr[i]`.
* Return `true` if you can reach **any index where arr\[index] = 0**, otherwise `false`.
* Must not jump outside the array.
* Time complexity should be O(n), visiting each index at most once.
* Use a visited set to avoid infinite loops.

---

### Edge Cases & Constraints

* **Single element array with zero** → should return `true`.
* **Single element array without zero** → should return `false`.
* **Zero at start index** → should immediately return `true`.
* **No zeros in array** → should return `false`.
* **Multiple zeros** → return `true` if any are reachable.
* Must handle cycles and prevent infinite recursion/loops.
* Cannot go outside array bounds.
* 0 ≤ arr\[i] < arr.length, and 0 ≤ start < arr.length.

---

### Data-Test IDs (for React App)

* **`jump-game-container`** → Main container for the UI.
* **`array-input`** → Input field for the array.
* **`start-input`** → Input field for the start index.
* **`calculate-btn`** → Button to run the algorithm.
* **`error-message`** → Shows validation errors.
* **`result-value`** → Shows final result (true/false).
* **`array-element-{index}`** → Each array element (to visualize jumps).
* **`prev-step-btn`, `next-step-btn`, `reset-btn`** → Buttons to control visualization steps.

---
