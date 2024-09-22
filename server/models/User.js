// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
// });

// module.exports = mongoose.model('User', UserSchema);


// -----------------------------------

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
//   codes: [
//     {
//       problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
//       code: { type: String, required: true }
//     }
//   ]
// });

// module.exports = mongoose.model('User', UserSchema);

// ------------------------------------------------

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
//   codes: [
//     {
//       problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
//       code: { type: String, required: true }
//     }
//   ]
// });

// module.exports = mongoose.model('User', UserSchema);

// ------------------------------------------------

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true
  // },
  // email: {
  //   type: String,
  //   required: function() {
  //     return !this.githubId;  // Email is required if not an OAuth user
  //   },
  //   unique: true
  // },
  // password: {
  //   type: String,
  //   required: function() {
  //     return !this.githubId;  // Password is required if not an OAuth user
  //   }
  // },
  // githubId: {
  //   type: String,  // Only for GitHub OAuth users
  //   required: false,
  //   unique: true
  // },
  // avatar: {
  //   type: String,
  //   required: false
  // },
//   solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
//   codes: [
//     {
//       problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
//       code: { type: String, required: true }
//     }
//   ]
// });

// module.exports = mongoose.model('User', userSchema);

// ------------------------------------
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  code: { type: String, required: true },
  passed: { type: Boolean, required: true },
  date: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: function() {
      return !this.githubId;  // Email is required if not an OAuth user
    },
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.githubId;  // Password is required if not an OAuth user
    }
  },
  githubId: {
    type: String,  // Only for GitHub OAuth users
    required: false,
    unique: true
  },
  avatar: {
    type: String,
    required: false
  },
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  submissions: [submissionSchema]
});

module.exports = mongoose.model('User', userSchema);
