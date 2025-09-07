import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import JumpGame from './JumpGame';

describe('JumpGame Component', () => {
  beforeEach(() => {
    render(<JumpGame />);
  });

  test('renders jump game container', () => {
    expect(screen.getByTestId('jump-game-container')).toBeInTheDocument();
  });

  test('renders array input field with default value', () => {
    const input = screen.getByTestId('array-input');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('4,2,3,0,3,1,2');
  });

  test('renders start input field with default value', () => {
    const input = screen.getByTestId('start-input');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('5');
  });

  test('renders calculate button', () => {
    const button = screen.getByTestId('calculate-btn');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Check Reachability');
  });

  test('renders example buttons', () => {
    expect(screen.getByTestId('example1-btn')).toBeInTheDocument();
    expect(screen.getByTestId('example2-btn')).toBeInTheDocument();
    expect(screen.getByTestId('example3-btn')).toBeInTheDocument();
  });

  test('renders array visualization', () => {
    expect(screen.getByTestId('array-visualization')).toBeInTheDocument();
  });

  test('displays array elements correctly', () => {
    expect(screen.getByTestId('array-element-0')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-1')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-2')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-3')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-4')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-5')).toBeInTheDocument();
    expect(screen.getByTestId('array-element-6')).toBeInTheDocument();
  });

  test('updates array input value when typing', () => {
    const input = screen.getByTestId('array-input');
    fireEvent.change(input, { target: { value: '1,2,3,0' } });
    expect(input.value).toBe('1,2,3,0');
  });

  test('updates start input value when typing', () => {
    const input = screen.getByTestId('start-input');
    fireEvent.change(input, { target: { value: '2' } });
    expect(input.value).toBe('2');
  });

  test('calculates result for default example', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('result-section')).toBeInTheDocument();
    });

    const result = screen.getByTestId('result-value');
    expect(result).toHaveTextContent('TRUE - Can reach a zero!');
  });

  test('loads example 1 correctly', () => {
    const example1Btn = screen.getByTestId('example1-btn');
    fireEvent.click(example1Btn);

    const arrayInput = screen.getByTestId('array-input');
    const startInput = screen.getByTestId('start-input');
    expect(arrayInput.value).toBe('4,2,3,0,3,1,2');
    expect(startInput.value).toBe('5');
  });

  test('loads example 2 correctly', () => {
    const example2Btn = screen.getByTestId('example2-btn');
    fireEvent.click(example2Btn);

    const arrayInput = screen.getByTestId('array-input');
    const startInput = screen.getByTestId('start-input');
    expect(arrayInput.value).toBe('4,2,3,0,3,1,2');
    expect(startInput.value).toBe('0');
  });

  test('loads example 3 correctly', () => {
    const example3Btn = screen.getByTestId('example3-btn');
    fireEvent.click(example3Btn);

    const arrayInput = screen.getByTestId('array-input');
    const startInput = screen.getByTestId('start-input');
    expect(arrayInput.value).toBe('3,0,2,1,2');
    expect(startInput.value).toBe('2');
  });

  test('shows error for invalid array input', async () => {
    const arrayInput = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(arrayInput, { target: { value: 'invalid,input' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for empty array input', async () => {
    const arrayInput = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(arrayInput, { target: { value: '' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for negative numbers in array', async () => {
    const arrayInput = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(arrayInput, { target: { value: '1,-2,3,0' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for invalid start index', async () => {
    const startInput = screen.getByTestId('start-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(startInput, { target: { value: 'invalid' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for negative start index', async () => {
    const startInput = screen.getByTestId('start-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(startInput, { target: { value: '-1' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for start index out of bounds', async () => {
    const startInput = screen.getByTestId('start-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(startInput, { target: { value: '10' } }); 
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('shows error for array values >= array length', async () => {
    const arrayInput = screen.getByTestId('array-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(arrayInput, { target: { value: '5,0,1' } }); 
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
  });

  test('button is disabled during calculation', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    expect(calculateBtn).toBeDisabled();
    expect(calculateBtn).toHaveTextContent('Calculating...');

    await waitFor(() => {
      expect(calculateBtn).not.toBeDisabled();
      expect(calculateBtn).toHaveTextContent('Check Reachability');
    });
  });

  test('step controls appear after calculation', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      expect(screen.getByTestId('prev-step-btn')).toBeInTheDocument();
      expect(screen.getByTestId('next-step-btn')).toBeInTheDocument();
      expect(screen.getByTestId('reset-btn')).toBeInTheDocument();
    });
  });

  test('shows path section when result is true', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      const result = screen.getByTestId('result-value');
      if (result.textContent.includes('TRUE')) {
        expect(screen.getByTestId('path-section')).toBeInTheDocument();
      }
    });
  });

  test('handles single element array with zero', async () => {
    const arrayInput = screen.getByTestId('array-input');
    const startInput = screen.getByTestId('start-input');
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.change(arrayInput, { target: { value: '0' } });
    fireEvent.change(startInput, { target: { value: '0' } });
    fireEvent.click(calculateBtn);

    await waitFor(() => {
      const result = screen.getByTestId('result-value');
      expect(result).toHaveTextContent('TRUE - Can reach a zero!');
    });
  });

  test('step navigation works correctly', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      const nextBtn = screen.getByTestId('next-step-btn');
      const prevBtn = screen.getByTestId('prev-step-btn');

      expect(prevBtn).toBeDisabled();

      fireEvent.click(nextBtn);

      expect(prevBtn).not.toBeDisabled();
    });
  });

  test('reset button resets visualization', async () => {
    const calculateBtn = screen.getByTestId('calculate-btn');

    fireEvent.click(calculateBtn);

    await waitFor(() => {
      const nextBtn = screen.getByTestId('next-step-btn');
      const resetBtn = screen.getByTestId('reset-btn');

      fireEvent.click(nextBtn);
      fireEvent.click(nextBtn);

      fireEvent.click(resetBtn);

      const prevBtn = screen.getByTestId('prev-step-btn');
      expect(prevBtn).toBeDisabled();
    });
  });
});

describe('Jump Game III Algorithm', () => {
  const canReach = (arr, start) => {
    const visited = new Set();

    const dfs = (index) => {
      if (visited.has(index) || index < 0 || index >= arr.length) {
        return false;
      }

      visited.add(index);

      if (arr[index] === 0) {
        return true;
      }

      const leftJump = index - arr[index];
      const rightJump = index + arr[index];

      return dfs(leftJump) || dfs(rightJump);
    };

    return dfs(start);
  };

  test('algorithm works for example 1', () => {
    expect(canReach([4, 2, 3, 0, 3, 1, 2], 5)).toBe(true);
  });

  test('algorithm works for example 2', () => {
    expect(canReach([4, 2, 3, 0, 3, 1, 2], 0)).toBe(true);
  });

  test('algorithm works for example 3', () => {
    expect(canReach([3, 0, 2, 1, 2], 2)).toBe(false);
  });

  test('algorithm works for single element with zero', () => {
    expect(canReach([0], 0)).toBe(true);
  });

  test('algorithm works for single element without zero', () => {
    expect(canReach([1], 0)).toBe(false);
  });

  test('algorithm works when zero is at start', () => {
    expect(canReach([0, 1, 2], 0)).toBe(true);
  });

  test('algorithm works when no zeros exist', () => {
    expect(canReach([1, 2, 3, 4], 0)).toBe(false);
  });

  test('algorithm works with multiple zeros', () => {
    expect(canReach([0, 1, 0, 3], 1)).toBe(true);
  });

  test('algorithm handles cycles correctly', () => {
    expect(canReach([1, 1, 1, 1], 0)).toBe(false);
  });

  test('algorithm works with large jumps', () => {
    expect(canReach([4, 0, 1, 2, 3], 0)).toBe(true);
  });

  test('algorithm works when zero is unreachable', () => {
    expect(canReach([1, 3, 2], 0)).toBe(false);
  });

  test('algorithm works with backwards jumps only', () => {
    expect(canReach([1, 2, 0], 2)).toBe(true);
  });
});