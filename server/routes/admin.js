const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Problem = require("../models/Problem");
const Topic = require("../models/Topic");
const adminAuth = require("../middleware/adminAuth");
const {
  getUsers,
  getProblems,
  deleteProblem,
} = require("../controllers/adminController");

// Admin login route

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = { admin: { id: admin.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all users
router.get("/users", adminAuth, getUsers);

// Delete a user
// router.delete('/users/:id', adminAuth, async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/problems", adminAuth, getProblems);
// router.delete("/problems/:id", adminAuth, deleteProblem);

// Add these routes in admin.js
router.get('/problems', adminAuth, async (req, res) => {
  try {
    const problems = await Problem.find().sort({ id: 1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/problems/:id", adminAuth, async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/problems/:id', adminAuth, async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json({ message: 'Problem deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/problems/bulk-delete', adminAuth, async (req, res) => {
  try {
    await Problem.deleteMany({ _id: { $in: req.body.problemIds } });
    res.json({ message: 'Problems deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
