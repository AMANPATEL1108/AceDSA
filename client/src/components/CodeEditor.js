import React, { useState } from 'react';

// Simulated problem data
const problemData = {
  title: "Two Sum",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  template: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
};`,
  testCases: [
    { input: [2,7,11,15], target: 9, expectedOutput: [0,1] },
    { input: [3,2,4], target: 6, expectedOutput: [1,2] },
    { input: [3,3], target: 6, expectedOutput: [0,1] },
  ]
};

// Function to execute the code (simulated for frontend)
const executeCode = (code, nums, target) => {
  try {
    // Create a function from the code string
    const twoSum = new Function('nums', 'target', `
      ${code}
      return twoSum(nums, target);
    `);

    // Execute the function with the given input
    return twoSum(nums, target);
  } catch (error) {
    return `Error: ${error.message}`;
  }
};

const CodeEditor = () => {
  const [code, setCode] = useState(problemData.template);
  const [testResults, setTestResults] = useState([]);
  const [isAllPassed, setIsAllPassed] = useState(false);

  const handleRunCode = () => {
    const results = problemData.testCases.map(testCase => {
      const output = executeCode(code, testCase.input, testCase.target);
      const passed = JSON.stringify(output) === JSON.stringify(testCase.expectedOutput);
      return { ...testCase, output, passed };
    });

    setTestResults(results);
    setIsAllPassed(results.every(result => result.passed));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ marginTop: '0' }}>{problemData.title}</h2>
        <p>{problemData.description}</p>
        <textarea
          style={{
            width: '100%',
            height: '250px',
            padding: '10px',
            fontFamily: 'monospace',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button 
          onClick={handleRunCode}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Run Code
        </button>

        {testResults.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Test Results:</h3>
            {testResults.map((result, index) => (
              <div key={index} style={{
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '4px',
                backgroundColor: result.passed ? '#d4edda' : '#f8d7da',
                color: result.passed ? '#155724' : '#721c24',
                border: `1px solid ${result.passed ? '#c3e6cb' : '#f5c6cb'}`
              }}>
                <strong>Test Case {index + 1}:</strong> {result.passed ? 'Passed' : 'Failed'}<br />
                Input: nums = {JSON.stringify(result.input)}, target = {result.target}<br />
                Expected Output: {JSON.stringify(result.expectedOutput)}<br />
                Your Output: {JSON.stringify(result.output)}
              </div>
            ))}
          </div>
        )}

        {isAllPassed && (
          <div style={{ marginTop: '20px', color: '#28a745', fontWeight: 'bold' }}>
            ✓ All test cases passed! Problem completed!
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;

