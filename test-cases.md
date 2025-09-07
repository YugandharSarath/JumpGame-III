# Jump Game Test Cases

## Basic Examples
```javascript

Input: [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Input: [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0.
```

## Edge Cases

### Single Element
```javascript
Input: [0]
Output: true
Explanation: Already at the last index.

Input: [1]
Output: true
Explanation: Already at the last index.
```

### Zero at Start
```javascript
Input: [0, 1]
Output: false
Explanation: Cannot move from index 0.

Input: [0, 2, 3]
Output: false
Explanation: Stuck at index 0.
```

### Jumping Over Zeros
```javascript
Input: [2, 0, 0]
Output: true
Explanation: Jump 2 steps from index 0 to reach index 2.

Input: [3, 0, 0, 0]
Output: true
Explanation: Jump 3 steps from index 0 to reach index 3.

Input: [1, 0, 1, 0]
Output: false
Explanation: Can only reach index 1, but index 1 has value 0.
```

### Complex Cases
```javascript
Input: [5, 9, 3, 2, 1, 0, 2, 3, 3, 1, 0, 0]
Output: true
Explanation: Large initial jump allows reaching the end.

Input: [1, 1, 1, 1, 1]
Output: true
Explanation: Can make small jumps to reach the end.

Input: [2, 1, 0, 1]
Output: true
Explanation: Jump 2 from index 0 to reach index 2, then 0 to stay at index 2 (which is not the last), but we can jump 1 from index 1.
```

### Boundary Cases
```javascript
Input: [1, 0, 0, 0]
Output: false
Explanation: Can reach index 1, but stuck there.

Input: [2, 1, 0, 0]
Output: false
Explanation: Can reach index 2, but stuck there.

Input: [1, 1, 1, 1]
Output: true
Explanation: Each jump of 1 reaches the next position.
```

### Performance Test Cases
```javascript

Input: Array of 10000 elements, all with value 1
Output: true

Input: [100000, 0, 0, 0, ..., 0] (length 10000)
Output: true

Input: [1, 0, 1, 0, 1, 0, ..., 1] (length 10000)
Output: false (gets stuck at first 0)
```

## Test Coverage
- ✅ Basic functionality
- ✅ Edge cases (single element, zeros)
- ✅ Boundary conditions
- ✅ Performance with large inputs
- ✅ All possible return scenarios (true/false)
- ✅ Maximum constraint values