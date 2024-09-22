// const User = require('../models/User');
// const Problem = require('../models/Problem');

// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find().select('-password');
//     console.log(users);
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getProblems = async (req, res) => {
//   try {
//     const problems = await Problem.find();
//     res.json(problems);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.deleteProblem = async (req, res) => {
//   try {
//     const problem = await Problem.findByIdAndDelete(req.params.id);
//     if (!problem) {
//       return res.status(404).json({ message: 'Problem not found' });
//     }
//     res.json({ message: 'Problem deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const User = require('../models/User');
const Problem = require('../models/Problem');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};