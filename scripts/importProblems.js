const mongoose = require('mongoose');
const Problem = require('../models/Problem');
const problemsData = require('../dsa_problems.json');

mongoose.connect('mongodb://localhost:27017/cp3DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importProblems = async () => {
  try {
    await Problem.deleteMany();
    for (const topic of problemsData.dsa_problems) {
      for (const problem of topic.problems) {
        await Problem.create({
          id: problem.id,
          title: problem.title,
          difficulty: problem.difficulty,
          leetcode_link: problem.leetcode_link,
          description: problem.description,
          topic: topic.topic,
        });
      }
    }
    console.log('Problems imported successfully');
    process.exit();
  } catch (error) {
    console.error('Error importing problems:', error);
    process.exit(1);
  }
};

importProblems();
