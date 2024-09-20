const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const { VM } = require('vm2');
const auth = require("../middleware/auth");
const User = require("../models/User");

// Get all problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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
router.post('/:id/submit', async (req, res) => {
  try {
    const { code, userID } = req.body;
    const problem = await Problem.findById(req.params.id);
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
      date: new Date()
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




module.exports = router;