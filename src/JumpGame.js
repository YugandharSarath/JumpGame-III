import React, { useState } from 'react';

const JumpGame = () => {
    const [arr, setArr] = useState([4, 2, 3, 0, 3, 1, 2]);
    const [start, setStart] = useState(5);
    const [arrayInput, setArrayInput] = useState('4,2,3,0,3,1,2');
    const [startInput, setStartInput] = useState('5');
    const [result, setResult] = useState(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [error, setError] = useState('');
    const [path, setPath] = useState([]);
    const [visited, setVisited] = useState(new Set());
    const [currentStep, setCurrentStep] = useState(0);
    const [explorationSteps, setExplorationSteps] = useState([]);
    const [isVisualizing, setIsVisualizing] = useState(false);

    const canReach = (arr, start) => {
        const visited = new Set();
        const steps = [];

        const dfs = (index, currentPath) => {
            if (visited.has(index)) {
                steps.push({
                    type: 'backtrack',
                    index: index,
                    message: `Already visited index ${index}, backtracking`,
                    visited: new Set(visited),
                    path: [...currentPath]
                });
                return false;
            }

            if (index < 0 || index >= arr.length) {
                steps.push({
                    type: 'outOfBounds',
                    index: index,
                    message: `Index ${index} is out of bounds, backtracking`,
                    visited: new Set(visited),
                    path: [...currentPath]
                });
                return false;
            }

            visited.add(index);
            currentPath.push(index);

            steps.push({
                type: 'visit',
                index: index,
                value: arr[index],
                message: `Visiting index ${index} with value ${arr[index]}`,
                visited: new Set(visited),
                path: [...currentPath]
            });

            if (arr[index] === 0) {
                steps.push({
                    type: 'found',
                    index: index,
                    message: `Found target! Index ${index} has value 0`,
                    visited: new Set(visited),
                    path: [...currentPath],
                    success: true
                });
                return true;
            }

            const leftJump = index - arr[index];
            const rightJump = index + arr[index];

            steps.push({
                type: 'explore',
                index: index,
                leftJump: leftJump,
                rightJump: rightJump,
                message: `From index ${index}, can jump to ${leftJump} or ${rightJump}`,
                visited: new Set(visited),
                path: [...currentPath]
            });

            if (dfs(leftJump, [...currentPath])) {
                return true;
            }

            if (dfs(rightJump, [...currentPath])) {
                return true;
            }

            currentPath.pop();
            steps.push({
                type: 'backtrack',
                index: index,
                message: `No path found from index ${index}, backtracking`,
                visited: new Set(visited),
                path: [...currentPath]
            });

            return false;
        };

        const result = dfs(start, []);
        return { result, steps };
    };

    const handleArrayInputChange = (e) => {
        setArrayInput(e.target.value);
    };

    const handleStartInputChange = (e) => {
        setStartInput(e.target.value);
    };

    const parseInputs = () => {
        try {
            const parsedArray = arrayInput.split(',').map(num => {
                const trimmed = num.trim();
                if (trimmed === '') throw new Error('Empty value in array');
                const parsed = parseInt(trimmed);
                if (isNaN(parsed)) throw new Error(`"${trimmed}" is not a valid number`);
                if (parsed < 0) throw new Error('Array values must be non-negative');
                return parsed;
            });

            if (parsedArray.length === 0) throw new Error('Array cannot be empty');
            if (parsedArray.length > 50000) throw new Error('Array length must be <= 50000');

            for (let val of parsedArray) {
                if (val >= parsedArray.length) {
                    throw new Error(`Value ${val} must be < array length (${parsedArray.length})`);
                }
            }

            const parsedStart = parseInt(startInput.trim());
            if (isNaN(parsedStart)) throw new Error('Start index must be a valid number');
            if (parsedStart < 0) throw new Error('Start index must be non-negative');
            if (parsedStart >= parsedArray.length) {
                throw new Error(`Start index must be < array length (${parsedArray.length})`);
            }

            return { array: parsedArray, startIndex: parsedStart };
        } catch (err) {
            throw new Error(`Invalid input: ${err.message}`);
        }
    };

    const calculateResult = async () => {
        try {
            setError('');
            setIsCalculating(true);
            setResult(null);
            setPath([]);
            setVisited(new Set());
            setExplorationSteps([]);
            setCurrentStep(0);

            const { array, startIndex } = parseInputs();
            setArr(array);
            setStart(startIndex);

            await new Promise(resolve => setTimeout(resolve, 500));

            const { result, steps } = canReach(array, startIndex);

            setResult(result);
            setExplorationSteps(steps);

            if (result) {
                const successStep = steps.find(step => step.success);
                if (successStep) {
                    setPath(successStep.path);
                }
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setIsCalculating(false);
        }
    };

    const visualizeStep = (stepIndex) => {
        if (stepIndex >= 0 && stepIndex < explorationSteps.length) {
            setCurrentStep(stepIndex);
            const step = explorationSteps[stepIndex];
            setVisited(step.visited);
            if (step.success) {
                setPath(step.path);
            }
        }
    };

    const resetVisualization = () => {
        setCurrentStep(0);
        setVisited(new Set());
        setPath([]);
        setIsVisualizing(false);
    };

    const loadExample = (exampleArray, exampleStart) => {
        const arrayStr = exampleArray.join(',');
        setArrayInput(arrayStr);
        setStartInput(exampleStart.toString());
        setArr(exampleArray);
        setStart(exampleStart);
        setResult(null);
        setError('');
        setPath([]);
        setVisited(new Set());
        setExplorationSteps([]);
        setCurrentStep(0);
        setIsVisualizing(false);
    };

    const getElementClass = (index) => {
        let classes = 'array-element';

        if (index === start && !isVisualizing) {
            classes += ' start';
        }

        if (isVisualizing && explorationSteps.length > 0) {
            const currentStepData = explorationSteps[currentStep];
            if (currentStepData && currentStepData.index === index) {
                classes += ' current';
            } else if (visited.has(index)) {
                classes += ' visited';
            }
        } else if (path.includes(index)) {
            classes += ' visited';
        }

        if (arr[index] === 0) {
            classes += ' target';
        }

        return classes;
    };

    const getJumpTargets = (index) => {
        if (index < 0 || index >= arr.length) return [];
        const left = index - arr[index];
        const right = index + arr[index];
        const targets = [];
        if (left >= 0 && left < arr.length) targets.push(left);
        if (right >= 0 && right < arr.length) targets.push(right);
        return targets;
    };

    return (
        <div className="jump-game-container" data-testid="jump-game-container">
            <div className="header">
                <h1>Jump Game III</h1>
                <p>Find if you can reach any index with value 0</p>
            </div>

            <div className="main-content">
                <div className="input-section">
                    <h2>Input Configuration</h2>

                    <div className="input-group">
                        <label htmlFor="array-input">
                            Array (comma-separated integers):
                        </label>
                        <input
                            id="array-input"
                            data-testid="array-input"
                            type="text"
                            value={arrayInput}
                            onChange={handleArrayInputChange}
                            placeholder="e.g., 4,2,3,0,3,1,2"
                            className="array-input"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="start-input">
                            Start Index:
                        </label>
                        <input
                            id="start-input"
                            data-testid="start-input"
                            type="number"
                            value={startInput}
                            onChange={handleStartInputChange}
                            placeholder="e.g., 5"
                            className="start-input"
                            min="0"
                        />
                    </div>

                    <div className="button-group">
                        <button
                            data-testid="calculate-btn"
                            onClick={calculateResult}
                            disabled={isCalculating}
                            className="btn btn-primary"
                        >
                            {isCalculating ? 'Calculating...' : 'Check Reachability'}
                        </button>

                        <button
                            data-testid="example1-btn"
                            onClick={() => loadExample([4, 2, 3, 0, 3, 1, 2], 5)}
                            className="btn btn-secondary"
                        >
                            Example 1
                        </button>

                        <button
                            data-testid="example2-btn"
                            onClick={() => loadExample([4, 2, 3, 0, 3, 1, 2], 0)}
                            className="btn btn-secondary"
                        >
                            Example 2
                        </button>

                        <button
                            data-testid="example3-btn"
                            onClick={() => loadExample([3, 0, 2, 1, 2], 2)}
                            className="btn btn-secondary"
                        >
                            Example 3
                        </button>
                    </div>

                    {error && (
                        <div className="error-message" data-testid="error-message">
                            {error}
                        </div>
                    )}
                </div>

                <div className="visualization-section">
                    <h2>Array Visualization</h2>

                    <div className="legend">
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#ffd700', borderColor: '#ffb347'}}></div>
                            Start Position
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#ff6b6b', borderColor: '#ff5252'}}></div>
                            Current
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#90EE90', borderColor: '#32CD32'}}></div>
                            Visited
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{backgroundColor: '#4ecdc4', borderColor: '#26a69a'}}></div>
                            Target (0)
                        </div>
                    </div>

                    <div className="array-visualization" data-testid="array-visualization">
                        {arr.map((num, index) => (
                            <div
                                key={index}
                                className={getElementClass(index)}
                                data-testid={`array-element-${index}`}
                            >
                                <div className="element-value">{num}</div>
                                <div className="element-index">{index}</div>
                                {isVisualizing && explorationSteps.length > 0 && explorationSteps[currentStep] && 
                                 explorationSteps[currentStep].index === index && (
                                    <div className="jump-arrows">
                                        {getJumpTargets(index).map((target, i) => (
                                            <span key={i} className="arrow">
                                                {target < index ? '←' : '→'}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {explorationSteps.length > 0 && (
                        <div className="step-controls">
                            <button
                                data-testid="prev-step-btn"
                                onClick={() => {
                                    if (currentStep > 0) {
                                        visualizeStep(currentStep - 1);
                                    }
                                }}
                                disabled={currentStep === 0}
                                className="btn btn-secondary"
                            >
                                ← Prev
                            </button>

                            <div className="step-info">
                                Step {currentStep + 1} of {explorationSteps.length}
                            </div>

                            <button
                                data-testid="next-step-btn"
                                onClick={() => {
                                    setIsVisualizing(true);
                                    if (currentStep < explorationSteps.length - 1) {
                                        visualizeStep(currentStep + 1);
                                    }
                                }}
                                disabled={currentStep === explorationSteps.length - 1}
                                className="btn btn-success"
                            >
                                Next →
                            </button>

                            <button
                                data-testid="reset-btn"
                                onClick={resetVisualization}
                                className="btn btn-secondary"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {result !== null && (
                <div className="result-section fade-in" data-testid="result-section">
                    <h2 className="result-title">
                        🎯 Result
                    </h2>
                    <div className={`result-value ${result ? 'true' : 'false'}`} data-testid="result-value">
                        {result ? 'TRUE - Can reach a zero!' : 'FALSE - Cannot reach any zero'}
                    </div>

                    {result && path.length > 0 && (
                        <div className="path-section" data-testid="path-section">
                            <h3>Successful Path:</h3>
                            <div>
                                {path.map((index, i) => (
                                    <React.Fragment key={index}>
                                        <span className="path-step">
                                            Index {index} (value: {arr[index]})
                                        </span>
                                        {i < path.length - 1 && (
                                            <span className="path-arrow">→</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="complexity-info">
                        <strong>Time Complexity:</strong> O(n) - Each index visited at most once<br/>
                        <strong>Space Complexity:</strong> O(n) - Recursion stack and visited set<br/>
                        <strong>Algorithm:</strong> Depth-First Search with backtracking
                    </div>

                    {explorationSteps.length > 0 && isVisualizing && (
                        <div className="exploration-info" data-testid="exploration-info">
                            <strong>Current Step:</strong> {explorationSteps[currentStep]?.message || 'No message'}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JumpGame;