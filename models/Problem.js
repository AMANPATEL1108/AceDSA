const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  leetcode_link: { type: String, required: true },
  description: { type: String, required: true },
  topic: { type: String, required: true },
});

module.exports = mongoose.model('Problem', ProblemSchema);
