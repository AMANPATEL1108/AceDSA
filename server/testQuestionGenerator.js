// const { generateAndStoreQuestion } = require('./routes/questionGenerator');
// // import { generateAndStoreQuestion } from './routes/questionGenerator.js';


// async function testGenerator() {
//   console.log('Starting test generation...');
//   await generateAndStoreQuestion();
//   console.log('Test generation complete.');
// }

// testGenerator();

const { generateAndStoreQuestion } = require('./routes/questionGenerator');
const { generateQuiz } = require('./routes/quizGenerator');

async function testGenerator() {
  console.log('Starting test generation...');
  for (let i = 0; i < 50; i++) {
    await generateAndStoreQuestion();
  }
  // await generateQuiz();
  console.log('Test generation complete.');
}

testGenerator();
