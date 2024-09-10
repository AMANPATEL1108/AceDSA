const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/mark-solved', auth, async (req, res) => {
  try {
    const { problemId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user.solvedProblems.includes(problemId)) {
      user.solvedProblems.push(problemId);
      await user.save();
    }
    res.json(user.solvedProblems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
