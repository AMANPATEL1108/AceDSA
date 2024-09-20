const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const OAuthUser = require('../models/OAuthUser');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userid: user.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GitHub OAuth
router.get('/github', passport.authenticate('github'));

// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
//   (req, res) => {
//     const token = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.redirect(`http://localhost:3000/login?token=${token}&userid=${req.user.id}`);
//   }
// );

// router.get('/verify', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json({ user });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ user: { id: req.user.id } }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.redirect(`http://localhost:3000/login?token=${token}&userid=${req.user.id}`);
  }
);

// router.get('/verify', auth, async (req, res) => {
//   try {
//     console.log("User id: ",req.user.id);
//     const user = await User.findById(req.user.id).select('-password');
//     res.json({ user });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/verify', (req, res, next) => {
  next();
}, auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/refresh-token', auth, (req, res) => {
  const payload = { user: { id: req.user.id } };
  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '24h' },
    (err, token) => {
      if (err) throw err;
      res.json({ token });
    }
  );
});




module.exports = router;
