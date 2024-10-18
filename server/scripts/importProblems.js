
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
        // const validExamples = problem.example.filter(ex => ex.input && ex.output);
        
        await Problem.create({
          id: problem.id,
          title: problem.title,
          topic: problem.topic,
          difficulty: problem.difficulty,
          leetcode_link: problem.leetcode_link,
          description: problem.description,
          example: problem.example,  // Only valid examples
          constraints: problem.constraints,
          hints: problem.hints,
          solution_approach: problem.solution_approach,
          time_complexity: problem.time_complexity,
          space_complexity: problem.space_complexity,
          code_snippet: problem.code_snippet,
          related_topics: problem.related_topics,
          testCases: problem.testCases,
          template: problem.template
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
