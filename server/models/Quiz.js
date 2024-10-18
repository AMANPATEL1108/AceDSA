// const mongoose = require('mongoose');

// const QuizSchema = new mongoose.Schema({
//   topic: { type: String, required: true },
//   questions: [{
//     question: String,
//     options: [String],
//     correctAnswer: String
//   }],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Quiz', QuizSchema);

// Quiz Schema

const mongoose = require('mongoose');

// Quiz Schema
const QuizSchema = new mongoose.Schema({
  topic: String,
  questions: [{
    questionType: {
      type: String,
      enum: ['theory', 'code_understanding', 'output_prediction', 'debug']
    },
    question: String,
    options: [String],
    correctAnswer: String,
    explanation: String,
    codeSnippet: String
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);