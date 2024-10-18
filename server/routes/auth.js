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
    const { username, email, password, avatar } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password, avatar });
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

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token, userid: user.id });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });



// GitHub OAuth

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     const payload = { user: { id: user.id } };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token, userid: user.id, user: { username: user.username, avatar: user.avatar } });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

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

    // Update active days and streak
    const today = new Date().toDateString();
    if (!user.activeDays.includes(today)) {
      user.activeDays.push(today);
      if (user.lastActive && (new Date(today) - new Date(user.lastActive)) / (1000 * 60 * 60 * 24) === 1) {
        user.streak += 1;
      } else if (!user.lastActive || (new Date(today) - new Date(user.lastActive)) / (1000 * 60 * 60 * 24) > 1) {
        user.streak = 1;
      }
    }
    user.lastActive = today;
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userid: user.id, user: { username: user.username, avatar: user.avatar } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/update-time', auth, async (req, res) => {
  try {
    const { timeSpent } = req.body;
    const user = await User.findById(req.user.id);
    user.totalTimeSpent += timeSpent;
    await user.save();
    res.json({ totalTimeSpent: user.totalTimeSpent });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/user-data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/users/:id/activity', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const activityData = user.submissions.map(submission => ({
      date: submission.date.toISOString().split('T')[0],
      count: 1
    }));

    // Aggregate submissions by date
    const aggregatedData = activityData.reduce((acc, curr) => {
      const existingEntry = acc.find(entry => entry.date === curr.date);
      if (existingEntry) {
        existingEntry.count += curr.count;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    res.json(aggregatedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


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
    console.log("Token: ",token);
    console.log(("Userid: ",req.user.id));
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

router.get('/verify',auth, async (req, res) => {
  try {
    // console.log("User id:", req.user.id);
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
