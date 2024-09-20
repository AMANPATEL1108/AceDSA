// const mongoose = require('mongoose');

// const problemSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   title: { type: String, required: true },
//   topic: { type: String, required: true },
//   difficulty: { type: String, required: true },
//   leetcode_link: { type: String, required: true },
//   description: { type: String, required: true },
//   example: {
//     input: { type: String, required: true },
//     output: { type: String, required: true }
//   },
//   constraints: { type: [String], required: true },
//   hints: { type: [String], required: true },
//   solution_approach: { type: String, required: true },
//   time_complexity: { type: String, required: true },
//   space_complexity: { type: String, required: true },
//   code_snippet: {
//     javascript: { type: String, required: true }
//   },
//   related_topics: { type: [String], required: true },
//   testCases: [
//     {
//       input: { type: [mongoose.Schema.Types.Mixed], required: true },
//       output: { type: mongoose.Schema.Types.Mixed, required: true }
//     }
//   ],
//   template: { type: String, required: true }
// });

// module.exports = mongoose.models.Problem || mongoose.model('Problem', problemSchema);

// -----------------------------------------------------

// const mongoose = require('mongoose');

// const exampleSchema = new mongoose.Schema({
//   input: { type: String, required: true },
//   output: { type: String, required: true }
// });

// const problemSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   title: { type: String, required: true },
//   topic: { type: String, required: true },
//   difficulty: { type: String, required: true },
//   leetcode_link: { type: String, required: true },
//   description: { type: String, required: true },
//   example: { type: [exampleSchema], required: true },
//   constraints: { type: [String], required: true },
//   hints: { type: [String], required: false },
//   solution_approach: { type: String, required: true },
//   time_complexity: { type: String, required: true },
//   space_complexity: { type: String, required: true },
//   code_snippet: {
//     javascript: { type: String, required: true }
//   },
//   related_topics: { type: [String], required: false },
//   testCases: { type: Array, required: true },
//   template: { type: String, required: true }
// });

// module.exports = mongoose.model('Problem', problemSchema);

const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  input: { type: [mongoose.Schema.Types.Mixed], required: true },
  output: { type: mongoose.Schema.Types.Mixed, required: true }
});
const exampleSchema = new mongoose.Schema({
  input: { type: String, required: true },
  output: { type: String, required: true }
});

const problemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true },
  leetcode_link: { type: String, required: true },
  description: { type: String, required: true },
  example: { type: [exampleSchema], required: true },
  constraints: { type: [String], required: true },
  hints: { type: [String], required: false },
  solution_approach: { type: String, required: true },
  time_complexity: { type: String, required: true },
  space_complexity: { type: String, required: true },
  code_snippet: {
    javascript: { type: String, required: true }
  },
  related_topics: { type: [String], required: false },
  testCases: [testCaseSchema],
  template: { type: String, required: true }
});

module.exports = mongoose.model('Problem', problemSchema);
