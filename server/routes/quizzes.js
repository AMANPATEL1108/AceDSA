const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const { generateQuiz } = require('./questionGenerator');
const auth = require('../middleware/auth');

router.get('/:topic', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const submittedQuizIds = user.quizSubmissions.map(sub => sub.quizId);

    let quiz = await Quiz.findOne({
      topic: req.params.topic,
      _id: { $nin: submittedQuizIds }
    });

    if (!quiz) {
      quiz = await generateQuiz(req.params.topic);
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, userAnswers } = req.body;
    const quiz = await Quiz.findById(quizId);
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    const finalScore = (score / quiz.questions.length) * 100;

    const user = await User.findById(req.user.id);
    user.quizSubmissions.push({ quizId, score: finalScore });
    await user.save();

    res.json({ score: finalScore });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
