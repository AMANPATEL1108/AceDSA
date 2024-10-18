const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const { VM } = require('vm2');
const auth = require("../middleware/auth");
const User = require("../models/User");

// Get all problems

// GET /problems/topics
router.get('/topics', async (req, res) => {
  try {
      // Use MongoDB's distinct method to get unique topics from the collection
      const topics = await Problem.distinct('topic');
      console.log(topics);
      res.status(200).json(topics);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching topics.' });
  }
});

// Fetch problems by topic and track user progress
router.get('/topic/:topic', async (req, res) => {
  try {
    const { topic } = req.params;

    // Fetch problems by topic
    const problems = await Problem.find({ topic });

    // Combine problems and progress
    const problemsWithProgress = problems.map(problem => ({
      ...problem.toObject(),
    }));

    res.json(problemsWithProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});



router.get('/count-by-difficulty', async (req, res) => {
  try {
    const counts = await Problem.aggregate([
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = counts.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json(result);
  } catch (error) {
    console.error('Error fetching problem counts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Submit the solution
// router.post('/:id/submit', async (req, res) => {
//   try {
//     const { code } = req.body;
//     const problem = await Problem.findById(req.params.id);
//     // console.log("Problem: "+problem)
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }

//     // Run the code against each test case
//     const testResults = problem.testCases.map(testCase => {
//       const { input, output } = testCase;
//       const functionName = problem.template.match(/var\s+(\w+)\s*=/)[1];
//       const functionCall = `${functionName}(${input.map(JSON.stringify).join(', ')})`;
//       const wrappedCode = `
//         ${code}
//         const result = ${functionCall};
//         result;
//       `;

//       try {
//         const vm = new VM({
//           timeout: 1000,
//           sandbox: {}
//         });
//         const result = vm.run(wrappedCode);
//         const passed = JSON.stringify(output) === JSON.stringify(result);
//         return { passed, input, expected: output, result };
//       } catch (error) {
//         return { passed: false, input, expected: output, result: error.message };
//       }
//     });

//     const isAllPassed = testResults.every(result => result.passed);

//     res.json({ testResults, isAllPassed });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// router.post('/:id/submit', async (req, res) => {
//   try {
//     const { code, userID } = req.body;
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }

//     const testResults = problem.testCases.map(testCase => {
//       const { input, output } = testCase;
//       const functionName = problem.template.match(/var\s+(\w+)\s*=/)[1];
//       const functionCall = `${functionName}(${input.map(JSON.stringify).join(', ')})`;
//       const wrappedCode = `
//         ${code}
//         const result = ${functionCall};
//         result;
//       `;

//       try {
//         const vm = new VM({
//           timeout: 1000,
//           sandbox: {}
//         });
//         const result = vm.run(wrappedCode);
//         const passed = JSON.stringify(output) === JSON.stringify(result);
//         return { passed, input, expected: output, result };
//       } catch (error) {
//         return { passed: false, input, expected: output, result: error.message };
//       }
//     });

//     const isAllPassed = testResults.every(result => result.passed);

//     const user = await User.findById(userID);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     user.submissions.push({
//       problemId: problem._id,
//       code,
//       passed: isAllPassed,
//       date: new Date()
//     });

//     if (isAllPassed && !user.solvedProblems.includes(problem._id)) {
//       user.solvedProblems.push(problem._id);
//     }

//     await user.save();

//     res.json({ testResults, isAllPassed });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error', error: err.message });
//   }
// });

// BELOW WORKING CORRECTLY CODE
router.post('/:id/submit', async (req, res) => {
  try {
    const { code, userID, duration } = req.body;
    console.log("Reuest ki body : ",req.body);
    const problem = await Problem.findById(req.params.id);
    // console.log("problem DATA: ",problem);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    const testResults = problem.testCases.map(testCase => {
      const { input, output } = testCase;
      const functionName = problem.template.match(/var\s+(\w+)\s*=/)[1];
      const functionCall = `${functionName}(${input.map(JSON.stringify).join(', ')})`;
      const wrappedCode = `
        ${code}
        const result = ${functionCall};
        result;
      `;

      try {
        const vm = new VM({
          timeout: 1000,
          sandbox: {}
        });
        const result = vm.run(wrappedCode);
        const passed = JSON.stringify(output) === JSON.stringify(result);
        return { passed, input, expected: output, result };
      } catch (error) {
        return { passed: false, input, expected: output, result: error.message };
      }
    });

    const isAllPassed = testResults.every(result => result.passed);

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.submissions.push({
      problemId: problem._id,
      code,
      passed: isAllPassed,
      date: new Date(),
      duration: duration || 0
    });

    if (isAllPassed && !user.solvedProblems.includes(problem._id)) {
      user.solvedProblems.push(problem._id);
    }

    await user.save();

    res.json({ testResults, isAllPassed });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});
// ABOVE WORKING CORRECTLY CODE

// router.post('/:id/submit', async (req, res) => {
//   try {
//     const { code, userID, duration } = req.body;
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }

//     const functionName = problem.template.match(/(?:function|var|let|const)\s+(\w+)/)[1];
//     const wrappedCode = `
//       ${code}
//       async function runTestCase(input) {
//         // Assuming the input is always a nested array with a single array inside
//         return ${functionName}(...input[0]);
//       }
//     `;

//     const builtInFunctions = `
//       const safeSortArray = (arr) => {
//   return arr && Array.isArray(arr) ? arr.sort((a, b) => a - b) : [];
// };      const reverseArray = (arr) => arr && Array.isArray(arr) ? arr.reverse() : [];
//       const filterArray = (arr, condition) => arr && Array.isArray(arr) ? arr.filter(condition) : [];
//       const mapArray = (arr, transform) => arr && Array.isArray(arr) ? arr.map(transform) : [];
//     `;

//     const testResults = await Promise.all(problem.testCases.map(async (testCase, index) => {
//       const { input, output } = testCase;
//       try {
//         const vm = new VM({
//           timeout: 3000,
//           sandbox: {
//             setTimeout,
//             setInterval,
//             clearTimeout,
//             clearInterval,
//             console: {
//               log: () => {},
//               error: () => {},
//               warn: () => {},
//             },
//           }
//         });
//         vm.run(builtInFunctions);
//         vm.run(wrappedCode);
//         const result = await vm.run(`runTestCase(${JSON.stringify(input)})`);
//         const passed = JSON.stringify(output) === JSON.stringify(result);
//         return { passed, input, expected: output, result, testCaseNumber: index + 1 };
//       } catch (error) {
//         return { passed: false, input, expected: output, result: error.message, testCaseNumber: index + 1 };
//       }
//     }));

//     const isAllPassed = testResults.every(result => result.passed);

//     const user = await User.findById(userID);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     user.submissions.push({
//       problemId: problem._id,
//       code,
//       passed: isAllPassed,
//       date: new Date(),
//       duration: duration || 0
//     });

//     if (isAllPassed && !user.solvedProblems.includes(problem._id)) {
//       user.solvedProblems.push(problem._id);
//     }

//     await user.save();

//     res.json({ testResults, isAllPassed });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error', error: err.message });
//   }
// });



// router.post('/:id/submit', async (req, res) => {
//   try {
//     const { code, userID, duration } = req.body;
//     const problem = await Problem.findById(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ msg: 'Problem not found' });
//     }

//     const functionName = problem.template.match(/(?:function|var|let|const)\s+(\w+)/)[1];
//     const wrappedCode = `
//       ${code}
//       async function runTestCase(input) {
//         // Assuming the input is always a nested array with a single array inside
//         return ${functionName}(...input);
//       }
//     `;

//     const testResults = await Promise.all(problem.testCases.map(async (testCase, index) => {
//       const { input, output } = testCase;
//       try {
//         const vm = new VM({
//           timeout: 3000,
//           sandbox: {
//             setTimeout,
//             setInterval,
//             clearTimeout,
//             clearInterval,
//             console: {
//               log: () => {},
//               error: () => {},
//               warn: () => {},
//             },
//             Array,
//             Math
//           }
//         });
//         vm.run(wrappedCode);
//         const result = await vm.run(`runTestCase(${JSON.stringify(input)})`);
//         const passed = JSON.stringify(output) === JSON.stringify(result);
//         return { passed, input, expected: output, result, testCaseNumber: index + 1 };
//       } catch (error) {
//         return { passed: false, input, expected: output, result: error.message, testCaseNumber: index + 1 };
//       }
//     }));

//     const isAllPassed = testResults.every(result => result.passed);

//     const user = await User.findById(userID);
//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     user.submissions.push({
//       problemId: problem._id,
//       code,
//       passed: isAllPassed,
//       date: new Date(),
//       duration: duration || 0
//     });

//     if (isAllPassed && !user.solvedProblems.includes(problem._id)) {
//       user.solvedProblems.push(problem._id);
//     }

//     await user.save();

//     res.json({ testResults, isAllPassed });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ msg: 'Server Error', error: err.message });
//   }
// });


// ------------------ BELOW IS THE LEETCODE STYLE CODE SUBMISSION THING ------------------

// Memory usage tracker
// class MemoryTracker {
//     constructor(limit) {
//         this.limit = limit;
//         this.currentUsage = 0;
//     }

//     track(size) {
//         this.currentUsage += size;
//         if (this.currentUsage > this.limit) {
//             throw new Error('Memory limit exceeded');
//         }
//     }
// }

// // Custom console for tracking output
// class CodeConsole {
//     constructor() {
//         this.logs = [];
//     }

//     log(...args) {
//         this.logs.push(args.map(arg => String(arg)).join(' '));
//     }

//     clear() {
//         this.logs = [];
//     }

//     getLogs() {
//         return this.logs.join('\n');
//     }
// }

// router.post('/:id/submit', async (req, res) => {
//     try {
//         const { code, userID, language = 'javascript' } = req.body;
//         const problem = await Problem.findById(req.params.id);

//         if (!problem) {
//             return res.status(404).json({ error: 'Problem not found' });
//         }

//         // Configuration similar to LeetCode
//         const CONFIG = {
//             timeLimit: 3000,      // 3 seconds
//             memoryLimit: 256e6,   // 256MB
//             outputLimit: 1e4,     // 10KB
//         };

//         const codeConsole = new CodeConsole();
//         const memoryTracker = new MemoryTracker(CONFIG.memoryLimit);

//         const testResults = await Promise.all(problem.testCases.map(async (testCase, index) => {
//             const startTime = process.hrtime();
//             const { input, expected } = testCase;

//             try {
//                 // Prepare the sandbox environment
//                 const sandbox = {
//                     Array, Object, String, Number, Boolean, Date, Math, JSON,
//                     parseInt, parseFloat, Infinity, NaN, undefined, null: null,
//                     Set, Map, RegExp, Error, Symbol,
//                     console: codeConsole,
//                     memoryTracker,
//                 };

//                 // Create the code wrapper with LeetCode-style setup
//                 const wrappedCode = `
//                     (function() {
//                         'use strict';
                        
//                         // LeetCode-style function definition
//                         ${code}

//                         // Extract function name
//                         const funcName = ${JSON.stringify(problem.functionName)};
//                         if (typeof global[funcName] !== 'function') {
//                             throw new Error('Function ' + funcName + ' is not defined');
//                         }

//                         // Prepare test case input
//                         const input = ${JSON.stringify(input)};
                        
//                         // Run the solution
//                         const result = global[funcName](...input);
                        
//                         // Return result in LeetCode format
//                         return {
//                             output: result,
//                             stdout: console.getLogs(),
//                         };
//                     })()
//                 `;

//                 // Create VM instance with timeout
//                 const vm = new VM({
//                     timeout: CONFIG.timeLimit,
//                     sandbox,
//                 });

//                 // Run the code
//                 const executionResult = vm.run(wrappedCode);
//                 const endTime = process.hrtime(startTime);
//                 const executionTime = endTime[0] * 1000 + endTime[1] / 1e6; // Convert to ms

//                 // Verify output
//                 const isCorrect = verifyOutput(executionResult.output, expected);

//                 return {
//                     testCase: index + 1,
//                     passed: isCorrect,
//                     input: formatInput(input),
//                     expected: formatOutput(expected),
//                     output: formatOutput(executionResult.output),
//                     stdout: executionResult.stdout,
//                     runtime: executionTime.toFixed(2) + 'ms',
//                     status: isCorrect ? 'Accepted' : 'Wrong Answer',
//                 };

//             } catch (error) {
//                 return handleExecutionError(error, index);
//             } finally {
//                 codeConsole.clear();
//             }
//         }));

//         // Calculate submission statistics
//         const stats = calculateStats(testResults);

//         // Save submission
//         await saveSubmission(userID, problem._id, code, stats);

//         res.json({
//             success: true,
//             results: testResults,
//             stats: {
//                 totalTestCases: testResults.length,
//                 passedTestCases: stats.passed,
//                 runtime: stats.averageRuntime + 'ms',
//                 memory: stats.memoryUsed + 'MB',
//                 status: stats.status
//             }
//         });

//     } catch (err) {
//         console.error('Submission error:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Helper functions
// function verifyOutput(actual, expected) {
//     if (actual === expected) return true;
    
//     // Array comparison
//     if (Array.isArray(actual) && Array.isArray(expected)) {
//         if (actual.length !== expected.length) return false;
//         return actual.every((val, idx) => verifyOutput(val, expected[idx]));
//     }
    
//     // Object comparison
//     if (typeof actual === 'object' && typeof expected === 'object') {
//         const actualKeys = Object.keys(actual).sort();
//         const expectedKeys = Object.keys(expected).sort();
//         if (actualKeys.join(',') !== expectedKeys.join(',')) return false;
//         return actualKeys.every(key => verifyOutput(actual[key], expected[key]));
//     }
    
//     // Number comparison (handle precision)
//     if (typeof actual === 'number' && typeof expected === 'number') {
//         return Math.abs(actual - expected) < 1e-6;
//     }
    
//     return false;
// }

// function handleExecutionError(error, index) {
//     let status = 'Runtime Error';
//     let message = error.message;

//     if (error.message.includes('timeout')) {
//         status = 'Time Limit Exceeded';
//         message = 'Time limit exceeded';
//     } else if (error.message.includes('Memory limit exceeded')) {
//         status = 'Memory Limit Exceeded';
//         message = 'Memory limit exceeded';
//     }

//     return {
//         testCase: index + 1,
//         passed: false,
//         status,
//         error: message,
//         runtime: 'N/A'
//     };
// }

// function calculateStats(results) {
//     const passed = results.filter(r => r.passed).length;
//     const totalRuntime = results.reduce((sum, r) => sum + (parseFloat(r.runtime) || 0), 0);
    
//     return {
//         passed,
//         totalTestCases: results.length,
//         averageRuntime: (totalRuntime / results.length).toFixed(2),
//         memoryUsed: process.memoryUsage().heapUsed / 1024 / 1024,
//         status: passed === results.length ? 'Accepted' : 'Failed'
//     };
// }

// function formatInput(input) {
//     return Array.isArray(input) ? input.map(item => JSON.stringify(item)) : JSON.stringify(input);
// }

// function formatOutput(output) {
//     return typeof output === 'undefined' ? 'undefined' : JSON.stringify(output);
// }

// async function saveSubmission(userID, problemId, code, stats) {
//     const submission = {
//         userId: userID,
//         problemId,
//         code,
//         status: stats.status,
//         runtime: stats.averageRuntime,
//         memory: stats.memoryUsed,
//         timestamp: new Date()
//     };

//     await User.create(submission);
// }

// ------------------ ABOVE IS THE LEETCODE STYLE CODE SUBMISSION THING ------------------

// router.get('/submissions/:userId/:problemId', async (req, res) => {
//   try {
//     const { userId, problemId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const submissions = user.submissions.filter(sub => sub.problemId.toString() === problemId);
//     res.json(submissions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.get('/submissions/:userId/:problemId', async (req, res) => {
  try {
    const { userId, problemId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const submissions = user.submissions.filter(sub => sub.problemId.toString() === problemId);
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/mark-solved', async (req, res) => {
  try {
    const { problemId, code, userID } = req.body;

    // Fetch the user by userID
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch the problem by problemId
    const problem = await Problem.findById(problemId);
    // console.log("Problem id: ",problem._id)
    // console.log("has user solved it? : ",!user.solvedProblems.includes(problem._id))
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    // Check if the problemId is already in the user's solvedProblems array
    if (!user.solvedProblems.includes(problem._id)) {
      user.solvedProblems.push(problem._id); // Push only the ObjectId (problem._id)
    }

    // Add the code along with the problemId to the user's codes array
    // user.codes.push({ problemId: problem._id, code });
    user.codes.push({ 
      problemId: problem._id, 
      code,
      passed: true,
      date: new Date()
    });

    // Save the updated user object
    await user.save();

    // Send a success response
    res.json({ success: true, message: 'Problem marked as solved' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Route to get solved problems of a user
router.get("/:userID/solved-problems", async (req, res) => {
  try {
    const { userID } = req.params;

    // Fetch the user from the database
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Get the list of solved problem IDs
    const solvedProblems = user.solvedProblems || [];

    res.json(solvedProblems); // Returning the list of solved problem IDs
  } catch (err) {
    console.error("Error fetching solved problems:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Add this new route
// router.get('/submissions/:userId/:problemId', async (req, res) => {
//   try {
//     const { userId, problemId } = req.params;
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const submissions = user.codes.filter(code => code.problemId.toString() === problemId);
//     res.json(submissions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


router.get('/average-solve-time/:problemId', async (req, res) => {
  try {
    const { problemId } = req.params;
    const users = await User.find({ 'submissions.problemId': problemId });
    
    let totalTime = 0;
    let count = 0;
    
    users.forEach(user => {
      user.submissions.forEach(sub => {
        if (sub.problemId.toString() === problemId && sub.passed) {
          totalTime += sub.duration;
          count++;
        }
      });
    });
    
    const averageTime = count > 0 ? totalTime / count : 0;
    
    res.json({ averageTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;