// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const session = require('express-session');
// const passport = require('./utils/passportConfig');  // Import passport setup
// const { generateAndStoreQuestion } = require('./routes/questionGenerator');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionsSuccessStatus: 200,
// }));

// app.use(express.json());
// app.use(session({
//   secret: 'your_secret_key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false, maxAge: 60 * 60 * 1000 },
// }));

// // Initialize passport and session handling
// app.use(passport.initialize());
// app.use(passport.session());

// mongoose.connect('mongodb://localhost:27017/cp3DB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Start the question generation process
// generateAndStoreQuestion();

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/problems', require('./routes/problems'));
// app.use('/api/topics', require('./routes/topics'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/quote', require('./routes/quote'));


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// --------------------------------------------------------------------------

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('./utils/passportConfig');
const { generateAndStoreQuestion,generateQuiz } = require('./routes/questionGenerator');
const cron = require('node-cron');
const Problem = require('./models/Problem');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60 * 60 * 1000 },
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/cp3DB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Schedule daily question generation at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Generating daily question...');
  generateAndStoreQuestion();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/quote', require('./routes/quote'));

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const today = new Date().toISOString().split('T')[0];
  const todaysProblem = await Problem.findOne({
    createdAt: { $gte: new Date(today) }
  });
  if (!todaysProblem) {
    generateAndStoreQuestion();
  }
});