// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const ProblemM = require('../models/Problem1');
// const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Hash Tables', 'Recursion'];

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// const marked = require('marked');

// function generateLeetCodeLink(title) {
//   // Convert the title to lowercase and replace spaces with hyphens
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   // Remove any special characters
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion() {
//   const difficulty = getRandomElement(difficulties);
//   const topic = getRandomElement(topics);

//   const prompt = `Generate a ${difficulty} DSA question about ${topic} with the following details:
//   1. A unique and challenging title
//   2. A detailed description of the problem
//   3. 3-4 relevant constraints
//   4. 2-3 helpful hints
//   5. A clear solution approach
//   6. Accurate time and space complexity
//   7. A code snippet template in JavaScript
//   8. 2-3 related topics
//   9. 3 example inputs and outputs
//   10. 10 test cases with inputs and expected outputs
//   Provide the response in JSON format, following this structure:
//   {
//     "title": "",
//     "topic": "${topic}",
//     "difficulty": "${difficulty}",
//     "leetcode_link": "",
//     "description": "",
//     "template": "function problemName(param1, param2) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "param1 = value1, param2 = value2",
//         "output": "expected output"
//       }
//     ],
//     "constraints": [],
//     "follow_up": "",
//     "hints": [],
//     "solution_approach": "",
//     "time_complexity": "",
//     "space_complexity": "",
//     "code_snippet": {
//       "javascript": ""
//     },
//     "related_topics": [],
//     "testCases": [
//       {
//         "input": [value1, value2],
//         "output": "expected output"
//       }
//     ]
//   }`;

//   try {
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
//       console.log(generatedText);
//     const tokens = marked.lexer(generatedText);
//     const jsonToken = tokens.find(token => token.type === 'code' && token.lang === 'json');
    
//     if (jsonToken) {
//       let questionData = JSON.parse(jsonToken.text);

//       // Generate LeetCode link based on the title
//       questionData.leetcode_link = generateLeetCodeLink(questionData.title);

//       // Ensure all required fields are present and have non-empty values
//       const requiredFields = [
//         'title', 'topic', 'difficulty', 'leetcode_link', 'description',
//         'template', 'example', 'constraints', 'follow_up', 'hints',
//         'solution_approach', 'time_complexity', 'space_complexity',
//         'code_snippet', 'related_topics', 'testCases'
//       ];

//       requiredFields.forEach(field => {
//         if (!questionData[field] || (Array.isArray(questionData[field]) && questionData[field].length === 0)) {
//           switch (field) {
//             case 'topic':
//               questionData[field] = topic;
//               break;
//             case 'difficulty':
//               questionData[field] = difficulty;
//               break;
//             case 'leetcode_link':
//               questionData[field] = 'https://leetcode.com/problems/example';
//               break;
//             case 'template':
//               questionData[field] = `function solve${topic.replace(/\s+/g, '')}(param1, param2) {\n    // Your code here\n};`;
//               break;
//             case 'example':
//               questionData[field] = [
//                 { input: "param1 = value1, param2 = value2", output: "expected output" },
//                 { input: "param1 = value3, param2 = value4", output: "expected output" },
//                 { input: "param1 = value5, param2 = value6", output: "expected output" }
//               ];
//               break;
//             case 'testCases':
//               questionData[field] = Array(10).fill({ input: [null, null], output: null });
//               break;
//             case 'code_snippet':
//               questionData[field] = { javascript: questionData.template || `function solve${topic.replace(/\s+/g, '')}(param1, param2) {\n  // Implement the solution\n  return result;\n}` };
//               break;
//             case 'related_topics':
//               questionData[field] = [topic];
//               break;
//             default:
//               questionData[field] = `Please provide ${field.replace(/_/g, ' ')} for this problem.`;
//           }
//         }
//       });

//       // Ensure testCases have the correct format
//       questionData.testCases = questionData.testCases.map(testCase => ({
//         input: Array.isArray(testCase.input) ? testCase.input : [null, null],
//         output: testCase.output
//       }));

//       return questionData;
//     } else {
//       throw new Error('No JSON found in the response');
//     }
//   } catch (error) {
//     console.warn('Question generation failed:', error.message);
//     return generateFallbackQuestion(difficulty, topic);
//   }
// }
// function generateFallbackQuestion(difficulty, topic) {
//   return {
//     title: `${difficulty} ${topic} Problem`,
//     topic: topic,
//     difficulty: difficulty,
//     leetcode_link: "https://leetcode.com/problems/example-problem",
//     description: `This is a ${difficulty} problem about ${topic}.`,
//     template: `function solve${topic}Problem(input) {\n    // Your code here\n}`,
//     example: [
//       {
//         input: "example input",
//         output: "example output"
//       }
//     ],
//     constraints: ["Add relevant constraints here"],
//     follow_up: "Can you optimize the solution further?",
//     hints: ["Think about using appropriate data structures for this problem"],
//     solution_approach: `Describe a general approach to solve this type of ${topic} problem`,
//     time_complexity: "Describe the time complexity",
//     space_complexity: "Describe the space complexity",
//     code_snippet: {
//       javascript: `function solve${topic}Problem(input) {\n  // Implement the solution\n  return result;\n}`
//     },
//     related_topics: [topic],
//     testCases: [
//       {
//         input: ["test input"],
//         output: "expected output"
//       }
//     ]
//   }
// }

// async function generateAndStoreQuestion() {
//   try {
//     const question = await generateQuestion();
//     const newProblem = new ProblemM(question);
//     await newProblem.save();
//     console.log('New question generated and stored:', newProblem.title);
//   } catch (error) {
//     console.error('Error generating or storing question:', error);
//   }
// }

// module.exports = { generateAndStoreQuestion };

// ----------------------- perfectly running one above ----------------------------

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Problem = require('../models/Problem');
// // const mongoose = require('mongoose');
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Hash Tables', 'Recursion'];

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// const marked = require('marked');

// function generateLeetCodeLink(title) {
//   // Convert the title to lowercase and replace spaces with hyphens
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   // Remove any special characters
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion() {
//   const difficulty = getRandomElement(difficulties);
//   const topic = getRandomElement(topics);

//   const prompt = `Generate a ${difficulty} DSA question about ${topic} with the following details:
//   1. A unique and challenging title
//   2. A detailed description of the problem
//   3. 3-4 relevant constraints
//   4. 2-3 helpful hints
//   5. A clear solution approach
//   6. Accurate time and space complexity
//   7. A code snippet template in JavaScript
//   8. 2-3 related topics
//   9. 3 example inputs and outputs
//   10. 10 test cases with inputs and expected outputs
//   Provide the response in JSON format, following this structure:
//   {
//     "title": "",
//     "topic": "${topic}",
//     "difficulty": "${difficulty}",
//     "leetcode_link": "",
//     "description": "",
//     "template": "function problemName(param1, param2) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "param1 = value1, param2 = value2",
//         "output": "expected output"
//       }
//     ],
//     "constraints": [],
//     "follow_up": "",
//     "hints": [],
//     "solution_approach": "",
//     "time_complexity": "",
//     "space_complexity": "",
//     "code_snippet": {
//       "javascript": ""
//     },
//     "related_topics": [],
//     "testCases": [
//       {
//         "input": [[value1, value2]],
//         "output": "expected output"
//       }
//     ]
//   }`;

//   try {
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
//       console.log(generatedText);
//     const tokens = marked.lexer(generatedText);
//     const jsonToken = tokens.find(token => token.type === 'code' && token.lang === 'json');
    
//     if (jsonToken) {
//       let questionData = JSON.parse(jsonToken.text);

//       // Generate LeetCode link based on the title
//       questionData.leetcode_link = generateLeetCodeLink(questionData.title);

//       // Ensure all required fields are present and have non-empty values
//       const requiredFields = [
//         'title', 'topic', 'difficulty', 'leetcode_link', 'description',
//         'template', 'example', 'constraints', 'follow_up', 'hints',
//         'solution_approach', 'time_complexity', 'space_complexity',
//         'code_snippet', 'related_topics', 'testCases'
//       ];

//       requiredFields.forEach(field => {
//         if (!questionData[field] || (Array.isArray(questionData[field]) && questionData[field].length === 0)) {
//           switch (field) {
//             case 'topic':
//               questionData[field] = topic;
//               break;
//             case 'difficulty':
//               questionData[field] = difficulty;
//               break;
//             case 'leetcode_link':
//               questionData[field] = 'https://leetcode.com/problems/example';
//               break;
//             case 'template':
//               questionData[field] = `function solve${topic.replace(/\s+/g, '')}(param1, param2) {\n    // Your code here\n};`;
//               break;
//             case 'example':
//               questionData[field] = [
//                 { input: "param1 = value1, param2 = value2", output: "expected output" },
//                 { input: "param1 = value3, param2 = value4", output: "expected output" },
//                 { input: "param1 = value5, param2 = value6", output: "expected output" }
//               ];
//               break;
//             case 'testCases':
//               questionData[field] = Array(10).fill({ input: [null, null], output: null });
//               break;
//             case 'code_snippet':
//               questionData[field] = { javascript: questionData.template || `function solve${topic.replace(/\s+/g, '')}(param1, param2) {\n  // Implement the solution\n  return result;\n}` };
//               break;
//             case 'related_topics':
//               questionData[field] = [topic];
//               break;
//             default:
//               questionData[field] = `Please provide ${field.replace(/_/g, ' ')} for this problem.`;
//           }
//         }
//       });

//       // Ensure testCases have the correct format
//       questionData.testCases = questionData.testCases.map(testCase => ({
//         input: Array.isArray(testCase.input) ? testCase.input : [null, null],
//         output: testCase.output
//       }));

//       return questionData;
//     } else {
//       throw new Error('No JSON found in the response');
//     }
//   } catch (error) {
//     console.warn('Question generation failed:', error.message);
//     return generateFallbackQuestion(difficulty, topic);
//   }
// }
// function generateFallbackQuestion(difficulty, topic) {
//   return {
//     title: `${difficulty} ${topic} Problem`,
//     topic: topic,
//     difficulty: difficulty,
//     leetcode_link: "https://leetcode.com/problems/example-problem",
//     description: `This is a ${difficulty} problem about ${topic}.`,
//     template: `function solve${topic}Problem(input) {\n    // Your code here\n}`,
//     example: [
//       {
//         input: "example input",
//         output: "example output"
//       }
//     ],
//     constraints: ["Add relevant constraints here"],
//     follow_up: "Can you optimize the solution further?",
//     hints: ["Think about using appropriate data structures for this problem"],
//     solution_approach: `Describe a general approach to solve this type of ${topic} problem`,
//     time_complexity: "Describe the time complexity",
//     space_complexity: "Describe the space complexity",
//     code_snippet: {
//       javascript: `function solve${topic}Problem(input) {\n  // Implement the solution\n  return result;\n}`
//     },
//     related_topics: [topic],
//     testCases: [
//       {
//         input: ["test input"],
//         output: "expected output"
//       }
//     ]
//   }
// }

// // async function generateAndStoreQuestion() {
// //   try {
// //     const question = await generateQuestion();
// //     const newProblem = new ProblemM(question);
// //     await newProblem.save();
// //     console.log('New question generated and stored:', newProblem.title);
// //   } catch (error) {
// //     console.error('Error generating or storing question:', error);
// //   }
// // }

// async function generateUniqueQuestion() {
//   let isUnique = false;
//   let questionData;

//   while (!isUnique) {
//     questionData = await generateQuestion();
//     const existingProblem = await Problem.findOne({ title: questionData.title });
//     isUnique = !existingProblem;
//   }

//   return questionData;
// }

// async function generateAndStoreQuestion() {
//   try {
//     const question = await generateUniqueQuestion();
//     const newProblem = new Problem(question);
//     await newProblem.save();
//     console.log('New question generated and stored:', newProblem.title);
//   } catch (error) {
//     console.error('Error generating or storing question:', error);
//   }
// }

// module.exports = { generateAndStoreQuestion };

// ----------------------------------------------------------------------------

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const ProblemM = require('../models/Problem1');
// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Hash Tables', 'Recursion'];

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function generateLeetCodeLink(title) {
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion() {
//   const difficulty = getRandomElement(difficulties);
//   const topic = getRandomElement(topics);

//   const prompt = `Generate a ${difficulty} DSA question about ${topic}. The response must strictly follow this exact format (including all fields and array sizes):
//   {
//     "title": "A unique and descriptive title",
//     "topic": "${topic}",
//     "difficulty": "${difficulty}",
//     "leetcode_link": "Will be auto-generated",
//     "description": "Detailed problem description",
//     "template": "var functionName = function(params) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "detailed input format",
//         "output": "expected output"
//       }
//     ],
//     "constraints": [
//       "exactly 4 specific numerical/logical constraints"
//     ],
//     "follow_up": "One challenging follow-up question",
//     "hints": [
//       "exactly 2 helpful hints"
//     ],
//     "solution_approach": "Detailed explanation of the optimal approach",
//     "time_complexity": "Big O notation with explanation",
//     "space_complexity": "Big O notation with explanation",
//     "code_snippet": {
//       "javascript": "Complete working solution"
//     },
//     "related_topics": [
//       "exactly 2 related topics"
//     ],
//     "testCases": [
//       {
//         "input": [[]],
//         "output": "expected output"
//       }
//     ]
//   }
  
//   Requirements:
//   1. Must include exactly 3 examples
//   2. Must include exactly 10 test cases
//   3. All arrays/lists in testCases must be proper JavaScript arrays
//   4. Code must be syntactically correct JavaScript
//   5. Must include complete solution in code_snippet
//   6. Template must match the solution's function signature`;

//   try {
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
    
//     // Extract JSON from the response
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in response');
//     }

//     let questionData = JSON.parse(jsonMatch[0]);
//     questionData.leetcode_link = generateLeetCodeLink(questionData.title);

//     // Validate the response format
//     const requiredFields = [
//       'title', 'topic', 'difficulty', 'description', 'template',
//       'example', 'constraints', 'follow_up', 'hints', 'solution_approach',
//       'time_complexity', 'space_complexity', 'code_snippet', 'related_topics',
//       'testCases'
//     ];

//     const validationErrors = [];

//     // Validate all required fields exist and have correct formats
//     requiredFields.forEach(field => {
//       if (!questionData[field]) {
//         validationErrors.push(`Missing field: ${field}`);
//       }
//     });

//     if (questionData.example.length !== 3) {
//       validationErrors.push('Must have exactly 3 examples');
//     }

//     if (questionData.testCases.length !== 10) {
//       validationErrors.push('Must have exactly 10 test cases');
//     }

//     if (validationErrors.length > 0) {
//       throw new Error('Validation failed: ' + validationErrors.join(', '));
//     }

//     return questionData;
//   } catch (error) {
//     console.error('Error generating question:', error);
//     // Try fallback AI generation one more time before giving up
//     try {
//       return await generateFallbackQuestion(difficulty, topic);
//     } catch (fallbackError) {
//       throw new Error('Both primary and fallback generation failed: ' + fallbackError.message);
//     }
//   }
// }

// async function generateFallbackQuestion(difficulty, topic) {
//   // Try one more time with a simplified prompt
//   const simplifiedPrompt = `Generate a simple ${difficulty} ${topic} coding problem following the exact same format as LeetCode's Two Sum problem. Include all the same fields and formatting.`;
  
//   try {
//     const result = await model.generateContent(simplifiedPrompt);
//     const generatedText = result.response.text();
    
//     // Extract JSON and validate
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in fallback response');
//     }

//     const questionData = JSON.parse(jsonMatch[0]);
//     // Validate essential fields
//     if (!questionData.title || !questionData.description || !questionData.code_snippet) {
//       throw new Error('Fallback generation missing essential fields');
//     }

//     return questionData;
//   } catch (error) {
//     throw new Error('Fallback generation failed: ' + error.message);
//   }
// }

// async function generateAndStoreQuestion() {
//   try {
//     const question = await generateQuestion();
//     // Get the count of existing problems to generate the next ID
//     const count = await ProblemM.countDocuments();
//     question.id = count + 1;
    
//     // Check if the question is unique
//     const existingProblem = await ProblemM.findOne({ title: question.title });
//     if (existingProblem) {
//       throw new Error('Question with this title already exists');
//     }

//     const newProblem = new ProblemM(question);
//     await newProblem.save();
//     console.log('New question generated and stored:', newProblem.title);
//     return newProblem;
//   } catch (error) {
//     console.error('Error generating or storing question:', error);
//     throw error; // Propagate the error instead of silently failing
//   }
// }

// module.exports = { generateAndStoreQuestion };

// ------------------------------------------------------------------------

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const ProblemM = require('../models/Problem1');
// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Hash Tables', 'Recursion'];

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function generateLeetCodeLink(title) {
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion() {
//   const difficulty = getRandomElement(difficulties);
//   const topic = getRandomElement(topics);

//   const prompt = `Generate a ${difficulty} DSA question about ${topic}. The response must follow this exact format, with special attention to testCases format:

//   {
//     "title": "Problem Title",
//     "topic": "${topic}",
//     "difficulty": "${difficulty}",
//     "leetcode_link": "Will be auto-generated",
//     "description": "Detailed problem description",
//     "template": "var functionName = function(params) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "Clear description of input format",
//         "output": "Expected output"
//       }
//     ],
//     "constraints": [
//       "exactly 4 specific numerical/logical constraints"
//     ],
//     "follow_up": "One challenging follow-up question",
//     "hints": [
//       "exactly 2 helpful hints"
//     ],
//     "solution_approach": "Detailed explanation of the optimal approach",
//     "time_complexity": "Big O notation with explanation",
//     "space_complexity": "Big O notation with explanation",
//     "code_snippet": {
//       "javascript": "Complete working solution"
//     },
//     "related_topics": [
//       "exactly 2 related topics"
//     ],
//     "testCases": [
//       {
//         "input": [[1,2,3]], // For single array parameter
//         "output": "expected output"
//       },
//       {
//         "input": [5, 10], // For two simple parameters
//         "output": "expected output"
//       },
//       {
//         "input": [[1,2,3], 5], // For array and value parameters
//         "output": "expected output"
//       }
//     ]
//   }
  
//   Requirements:
//   1. Must include exactly 3 examples
//   2. Must include exactly 10 test cases
//   3. ALL testCases input must be in one of these formats:
//      - For single array parameter: [[array]]
//      - For two parameters (any type): [param1, param2]
//      - For array and value: [[array], value]
//   4. Code must be syntactically correct JavaScript
//   5. Must include complete solution in code_snippet
//   6. Template must match the solution's function signature`;

//   try {
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
    
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in response');
//     }

//     let questionData = JSON.parse(jsonMatch[0]);
//     questionData.leetcode_link = generateLeetCodeLink(questionData.title);

//     const requiredFields = [
//       'title', 'topic', 'difficulty', 'description', 'template',
//       'example', 'constraints', 'follow_up', 'hints', 'solution_approach',
//       'time_complexity', 'space_complexity', 'code_snippet', 'related_topics',
//       'testCases'
//     ];

//     const validationErrors = [];

//     requiredFields.forEach(field => {
//       if (!questionData[field]) {
//         validationErrors.push(`Missing field: ${field}`);
//       }
//     });

//     if (questionData.example.length !== 3) {
//       validationErrors.push('Must have exactly 3 examples');
//     }

//     if (questionData.testCases.length !== 10) {
//       validationErrors.push('Must have exactly 10 test cases');
//     }

//     // Extract parameter count from template
//     const paramMatch = questionData.template.match(/function\s*\((.*?)\)/);
//     const paramCount = paramMatch ? paramMatch[1].split(',').length : 0;

//     // Validate test cases format based on parameter count
//     questionData.testCases.forEach((testCase, index) => {
//       if (!Array.isArray(testCase.input)) {
//         validationErrors.push(`Test case ${index + 1} input must be an array`);
//         return;
//       }

//       if (paramCount === 1) {
//         // For single parameter, must be [[array]]
//         if (!Array.isArray(testCase.input[0])) {
//           testCase.input = [testCase.input]; // Convert to correct format
//         }
//       } else if (paramCount === 2) {
//         // For two parameters, must be [param1, param2] or [[array], param2]
//         if (Array.isArray(testCase.input[0]) && testCase.input.length !== 2) {
//           validationErrors.push(`Test case ${index + 1} with array parameter must have exactly 2 elements`);
//         } else if (!Array.isArray(testCase.input[0]) && testCase.input.length !== 2) {
//           validationErrors.push(`Test case ${index + 1} must have exactly 2 parameters`);
//         }
//       }
//     });

//     if (validationErrors.length > 0) {
//       throw new Error('Validation failed: ' + validationErrors.join(', '));
//     }

//     return questionData;
//   } catch (error) {
//     console.error('Error generating question:', error);
//     try {
//       return await generateFallbackQuestion(difficulty, topic);
//     } catch (fallbackError) {
//       throw new Error('Both primary and fallback generation failed: ' + fallbackError.message);
//     }
//   }
// }

// async function generateFallbackQuestion(difficulty, topic) {
//   const simplifiedPrompt = `Generate a simple ${difficulty} ${topic} coding problem. Test cases must follow these formats:
//   - For single array parameter: input: [[1,2,3]]
//   - For two parameters: input: [param1, param2]
//   - For array and value: input: [[1,2,3], value]`;
  
//   try {
//     const result = await model.generateContent(simplifiedPrompt);
//     const generatedText = result.response.text();
    
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in fallback response');
//     }

//     const questionData = JSON.parse(jsonMatch[0]);
    
//     // Extract parameter count and validate format
//     const paramMatch = questionData.template?.match(/function\s*\((.*?)\)/);
//     const paramCount = paramMatch ? paramMatch[1].split(',').length : 1;

//     // Validate and fix test case formats
//     questionData.testCases = questionData.testCases.map(testCase => {
//       if (paramCount === 1 && !Array.isArray(testCase.input[0])) {
//         return { ...testCase, input: [testCase.input] };
//       }
//       return testCase;
//     });

//     return questionData;
//   } catch (error) {
//     throw new Error('Fallback generation failed: ' + error.message);
//   }
// }

// async function generateAndStoreQuestion() {
//   try {
//     const question = await generateQuestion();
//     const count = await ProblemM.countDocuments();
//     question.id = count + 1;
    
//     const existingProblem = await ProblemM.findOne({ title: question.title });
//     if (existingProblem) {
//       throw new Error('Question with this title already exists');
//     }

//     const newProblem = new ProblemM(question);
//     await newProblem.save();
//     console.log('New question generated and stored:', newProblem.title);
//     return newProblem;
//   } catch (error) {
//     console.error('Error generating or storing question:', error);
//     throw error;
//   }
// }

// module.exports = { generateAndStoreQuestion };

// ------------------------------------------------------------------


// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Problem = require('../models/Problem');
// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// // const db = mongoose.connection;
// // db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// // db.once('open', () => console.log('Connected to MongoDB'));

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// // const topics = ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'Sorting', 'Searching', 'Hash Tables', 'Recursion'];
// const topics = [
//   'Arrays', 'Strings', 'LinkedLists', 'DynamicProgramming', 'Sorting', 
//   'Searching', 'HashTables', 'Recursion', 'Stacks', 'Queues', 
//   'Heaps', 'BitManipulation', 'Math', 'Greedy', 'Backtracking'
// ];


// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function generateLeetCodeLink(title) {
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion() {
//   const difficulty = getRandomElement(difficulties);
//   const topic = getRandomElement(topics);

//   const prompt = `Generate a ${difficulty} DSA question about ${topic}. The response must follow this exact format, with special attention to testCases format:

//   {
//     "title": "Problem Title",
//     "topic": "${topic}",
//     "difficulty": "${difficulty}",
//     "leetcode_link": "Will be auto-generated",
//     "description": "Detailed problem description",
//     "template": "var functionName = function(params) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "Clear description of input format",
//         "output": "Expected output"
//       }
//     ],
//     "constraints": [
//       "exactly 4 specific numerical/logical constraints"
//     ],
//     "follow_up": "One challenging follow-up question",
//     "hints": [
//       "exactly 2 helpful hints"
//     ],
//     "solution_approach": "Detailed explanation of the optimal approach",
//     "time_complexity": "Big O notation with explanation",
//     "space_complexity": "Big O notation with explanation",
//     "code_snippet": {
//       "javascript": "Complete working solution"
//     },
//     "related_topics": [
//       "exactly 2 related topics"
//     ],
//     "testCases": [
//       {
//         "input": [[1,2,3]], // For single array parameter
//         "output": "expected output"
//       },
//       {
//         "input": [5, 10], // For two simple parameters
//         "output": "expected output"
//       },
//       {
//         "input": [[1,2,3], 5], // For array and value parameters
//         "output": "expected output"
//       }
//     ]
//   }
  
//     Requirements:

//     1. Must include exactly 3 examples
//     2. Must include exactly 10 test cases
//     3. ALL test cases input must be in one of these formats:
//         For single array parameter: [[array]]
//         For two parameters (any type): [param1, param2]
//         For array and value: [[array], value]
//     4. Code must be syntactically correct JavaScript
//     5. Must include complete solution in code_snippet
//     6. Template must match the solution's function signature
//     7. The output must be correct and exactly match the expected output for each input to prevent submission errors.`;

//   try {
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
    
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in response');
//     }

//     let questionData = JSON.parse(jsonMatch[0]);
//     questionData.leetcode_link = generateLeetCodeLink(questionData.title);

//     const requiredFields = [
//       'title', 'topic', 'difficulty', 'description', 'template',
//       'example', 'constraints', 'follow_up', 'hints', 'solution_approach',
//       'time_complexity', 'space_complexity', 'code_snippet', 'related_topics',
//       'testCases'
//     ];

//     const validationErrors = [];

//     requiredFields.forEach(field => {
//       if (!questionData[field]) {
//         validationErrors.push(`Missing field: ${field}`);
//       }
//     });

//     if (questionData.example.length !== 3) {
//       validationErrors.push('Must have exactly 3 examples');
//     }

//     if (questionData.testCases.length !== 10) {
//       validationErrors.push('Must have exactly 10 test cases');
//     }

//     // Extract parameter count from template
//     const paramMatch = questionData.template.match(/function\s*\((.*?)\)/);
//     const paramCount = paramMatch ? paramMatch[1].split(',').length : 0;

//     // Validate test cases format based on parameter count
//     questionData.testCases.forEach((testCase, index) => {
//       if (!Array.isArray(testCase.input)) {
//         validationErrors.push(`Test case ${index + 1} input must be an array`);
//         return;
//       }

//       if (paramCount === 1) {
//         // For single parameter, must be [[array]]
//         if (!Array.isArray(testCase.input[0])) {
//           testCase.input = [testCase.input]; // Convert to correct format
//         }
//       } else if (paramCount === 2) {
//         // For two parameters, must be [param1, param2] or [[array], param2]
//         if (Array.isArray(testCase.input[0]) && testCase.input.length !== 2) {
//           validationErrors.push(`Test case ${index + 1} with array parameter must have exactly 2 elements`);
//         } else if (!Array.isArray(testCase.input[0]) && testCase.input.length !== 2) {
//           validationErrors.push(`Test case ${index + 1} must have exactly 2 parameters`);
//         }
//       }
//     });

//     if (validationErrors.length > 0) {
//       throw new Error('Validation failed: ' + validationErrors.join(', '));
//     }

//     return questionData;
//   } catch (error) {
//     console.error('Error generating question:', error);
//     try {
//       return await generateFallbackQuestion(difficulty, topic);
//     } catch (fallbackError) {
//       throw new Error('Both primary and fallback generation failed: ' + fallbackError.message);
//     }
//   }
// }

// async function generateFallbackQuestion(difficulty, topic) {
//   const simplifiedPrompt = `Generate a simple ${difficulty} ${topic} coding problem. Test cases must follow these formats:
//   - For single array parameter: input: [[1,2,3]]
//   - For two parameters: input: [param1, param2]
//   - For array and value: input: [[1,2,3], value]`;
  
//   try {
//     const result = await model.generateContent(simplifiedPrompt);
//     const generatedText = result.response.text();
    
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in fallback response');
//     }

//     const questionData = JSON.parse(jsonMatch[0]);
    
//     // Extract parameter count and validate format
//     const paramMatch = questionData.template?.match(/function\s*\((.*?)\)/);
//     const paramCount = paramMatch ? paramMatch[1].split(',').length : 1;

//     // Validate and fix test case formats
//     questionData.testCases = questionData.testCases.map(testCase => {
//       if (paramCount === 1 && !Array.isArray(testCase.input[0])) {
//         return { ...testCase, input: [testCase.input] };
//       }
//       return testCase;
//     });

//     return questionData;
//   } catch (error) {
//     throw new Error('Fallback generation failed: ' + error.message);
//   }
// }

// // async function generateAndStoreQuestion() {
// //   try {
// //     const question = await generateQuestion();
// //     const count = await ProblemM.countDocuments();
// //     question.id = count + 1;
    
// //     const existingProblem = await ProblemM.findOne({ title: question.title });
// //     if (existingProblem) {
// //       throw new Error('Question with this title already exists');
// //     }

// //     const newProblem = new ProblemM(question);
// //     await newProblem.save();
// //     console.log('New question generated and stored:', newProblem.title);
// //     return newProblem;
// //   } catch (error) {
// //     console.error('Error generating or storing question:', error);
// //     throw error;
// //   }
// // }

// async function generateAndStoreQuestion(maxRetries = 10) {
//   let attempt = 0;

//   while (attempt < maxRetries) {
//     try {
//       const question = await generateQuestion();
//       const count = await Problem.countDocuments();
//       question.id = count + 1;

//       const existingProblem = await Problem.findOne({ title: question.title });
//       if (existingProblem) {
//         throw new Error('Question with this title already exists');
//       }

//       const newProblem = new Problem(question);
//       await newProblem.save();
//       console.log('New question generated and stored:', newProblem.title);
//       return newProblem;

//     } catch (error) {
//       attempt++;
//       console.error(`Attempt ${attempt} failed:`, error.message);

//       if (attempt >= maxRetries) {
//         throw new Error('Failed to generate question after multiple attempts');
//       }

//       console.log('Retrying...');
//     }
//   }
// }


// module.exports = { generateAndStoreQuestion };

// ---------------------------------------------------------

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Problem = require('../models/Problem');
// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// const topics = [
//   'Arrays', 'Strings', 'LinkedLists', 'DynamicProgramming', 'Sorting', 
//   'Searching', 'HashTables', 'Recursion', 'Stacks', 'Queues', 
//   'Heaps', 'BitManipulation', 'Math', 'Greedy', 'Backtracking'
// ];

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function generateLeetCodeLink(title) {
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion(topic) {
//   const difficulty = getRandomElement(difficulties);

//   const prompt = `Generate a ${difficulty} DSA question about ${topic}. The response must follow this exact format, with special attention to testCases format:

//   {
//     "title": "Problem Title",
//     "topic": "${topic}",
//     "difficulty": "${difficulty}",
//     "leetcode_link": "Will be auto-generated",
//     "description": "Detailed problem description",
//     "template": "var functionName = function(params) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "Clear description of input format",
//         "output": "Expected output"
//       }
//     ],
//     "constraints": [
//       "exactly 4 specific numerical/logical constraints"
//     ],
//     "follow_up": "One challenging follow-up question",
//     "hints": [
//       "exactly 2 helpful hints"
//     ],
//     "solution_approach": "Detailed explanation of the optimal approach",
//     "time_complexity": "Big O notation with explanation",
//     "space_complexity": "Big O notation with explanation",
//     "code_snippet": {
//       "javascript": "Complete working solution"
//     },
//     "related_topics": [
//       "exactly 2 related topics"
//     ],
//     "testCases": [
//       {
//         "input": [[1,2,3]], // For single array parameter
//         "output": "expected output"
//       },
//       {
//         "input": [5, 10], // For two simple parameters
//         "output": "expected output"
//       },
//       {
//         "input": [[1,2,3], 5], // For array and value parameters
//         "output": "expected output"
//       }
//     ]
//   }
  
//     Requirements:

//     1. Must include exactly 3 examples
//     2. Must include exactly 10 test cases
//     3. ALL test cases input must be in one of these formats:
//         For single array parameter: [[array]]
//         For two parameters (any type): [param1, param2]
//         For array and value: [[array], value]
//     4. Code must be syntactically correct JavaScript
//     5. Must include complete solution in code_snippet
//     6. Template must match the solution's function signature
//     7. The output must be correct and exactly match the expected output for each input to prevent submission errors.`;

//   try {
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
    
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
//     if (!jsonMatch) {
//       throw new Error('No valid JSON found in response');
//     }

//     let questionData = JSON.parse(jsonMatch[0]);
//     questionData.leetcode_link = generateLeetCodeLink(questionData.title);

//     // Validation logic remains the same...

//     return questionData;
//   } catch (error) {
//     console.error('Error generating question:', error);
//     throw error;
//   }
// }

// async function generateAndStoreQuestion(maxRetries = 20) {
//   const topic = getRandomElement(topics);
//   let attempt = 0;

//   while (attempt < maxRetries) {
//     try {
//       const question = await generateQuestion(topic);
//       const count = await Problem.countDocuments();
//       question.id = count + 1;

//       const existingProblem = await Problem.findOne({ title: question.title });
//       if (existingProblem) {
//         throw new Error('Question with this title already exists');
//       }

//       const newProblem = new Problem(question);
//       await newProblem.save();
//       console.log('New question generated and stored:', newProblem.title);
//       return newProblem;

//     } catch (error) {
//       attempt++;
//       console.error(`Attempt ${attempt} failed for topic ${topic}:`, error.message);

//       if (attempt >= maxRetries) {
//         throw new Error(`Failed to generate question for topic ${topic} after ${maxRetries} attempts`);
//       }

//       console.log('Retrying with the same topic...');
//     }
//   }
// }

// module.exports = { generateAndStoreQuestion };


// -------------------------------------------------

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const Problem = require('../models/Problem');
// const mongoose = require("mongoose");
// require('dotenv').config();

// mongoose.connect('mongodb://localhost:27017/cp3DB');

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const difficulties = ['Easy', 'Medium', 'Hard'];
// const topics = [
//   'Arrays', 'Strings', 'LinkedLists', 'DynamicProgramming', 'Sorting', 
//   'Searching', 'HashTables', 'Recursion', 'Stacks', 'Queues', 
//   'Heaps', 'BitManipulation', 'Math', 'Greedy', 'Backtracking'
// ];

// // Cache for existing titles
// let existingTitlesCache = new Set();
// let lastCacheUpdate = null;
// const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

// async function updateTitlesCache() {
//   const now = Date.now();
//   if (!lastCacheUpdate || (now - lastCacheUpdate) > CACHE_DURATION) {
//     const titles = await Problem.distinct('title');
//     existingTitlesCache = new Set(titles);
//     lastCacheUpdate = now;
//     console.log(`Updated titles cache. Total existing titles: ${existingTitlesCache.size}`);
//   }
// }

// function getRandomElement(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function generateLeetCodeLink(title) {
//   const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
//   const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
//   return `https://leetcode.com/problems/${cleanTitle}/`;
// }

// async function generateQuestion(difficulty, topic, existingTitles = new Set()) {
//   const selectedDifficulty = difficulty || getRandomElement(difficulties);
//   const selectedTopic = topic || getRandomElement(topics);

//   // Enhanced prompt with explicit instructions to avoid common errors
//   const prompt = `Generate a ${selectedDifficulty} DSA question about ${selectedTopic}. Follow these strict requirements:
//   1. The question must be original and unique
//   2. Test cases must be properly formatted and match the function signature
//   3. All JSON fields must be properly formatted
//   4. Ensure code solution matches the template
//   5. Avoid these titles: ${Array.from(existingTitles).slice(-5).join(', ')}

//   Response format:
//   {
//     "title": "Problem Title (must be unique and descriptive)",
//     "topic": "${selectedTopic}",
//     "difficulty": "${selectedDifficulty}",
//     "leetcode_link": "Will be auto-generated",
//     "description": "Clear and concise problem description",
//     "template": "var functionName = function(params) {\\n    // Your code here\\n};",
//     "example": [
//       {
//         "input": "Clear input format",
//         "output": "Expected output"
//       }
//     ],
//     "constraints": [
//       "exactly 4 specific constraints"
//     ],
//     "follow_up": "One follow-up question",
//     "hints": [
//       "exactly 2 hints"
//     ],
//     "solution_approach": "Clear explanation",
//     "time_complexity": "Big O notation with explanation",
//     "space_complexity": "Big O notation with explanation",
//     "code_snippet": {
//       "javascript": "Complete working solution"
//     },
//     "related_topics": [
//       "exactly 2 related topics"
//     ],
//     "testCases": [
//       {
//         "input": [[1,2,3]], // For single array parameter
//         "output": "expected output"
//       }
//     ]
//   }`;

//   try {
//     // Correct way to use the Gemini API
//     const result = await model.generateContent(prompt);
//     const generatedText = result.response.text();
    
//     const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    
//     if (!jsonMatch) {
//       throw new Error('Invalid response format');
//     }

//     let questionData = JSON.parse(jsonMatch[0]);
    
//     // Quick validation of critical fields
//     const criticalFields = ['title', 'description', 'template', 'testCases'];
//     const missingFields = criticalFields.filter(field => !questionData[field]);
    
//     if (missingFields.length > 0) {
//       throw new Error(`Missing critical fields: ${missingFields.join(', ')}`);
//     }

//     // Validate test cases format
//     const paramMatch = questionData.template.match(/function\s*\((.*?)\)/);
//     const paramCount = paramMatch ? paramMatch[1].split(',').length : 0;

//     questionData.testCases = questionData.testCases.map(testCase => {
//       if (!Array.isArray(testCase.input)) {
//         testCase.input = [testCase.input];
//       }
//       if (paramCount === 1 && !Array.isArray(testCase.input[0])) {
//         testCase.input = [testCase.input];
//       }
//       return testCase;
//     });

//     questionData.leetcode_link = generateLeetCodeLink(questionData.title);
//     return questionData;

//   } catch (error) {
//     throw new Error(`Generation failed: ${error.message}`);
//   }
// }

// async function generateAndStoreQuestion(maxRetries = 3) {
//   // Update the titles cache first
//   await updateTitlesCache();
  
//   let attempt = 0;
//   let selectedDifficulty = getRandomElement(difficulties);
//   let selectedTopic = getRandomElement(topics);
//   let lastError = null;

//   while (attempt < maxRetries) {
//     try {
//       console.log(`Attempt ${attempt + 1} - Generating ${selectedDifficulty} question about ${selectedTopic}`);
      
//       const question = await generateQuestion(selectedDifficulty, selectedTopic, existingTitlesCache);
      
//       // Check if title already exists
//       if (existingTitlesCache.has(question.title)) {
//         throw new Error('Title already exists in database');
//       }

//       const count = await Problem.countDocuments();
//       question.id = count + 1;

//       const newProblem = new Problem(question);
//       await newProblem.save();
      
//       // Update cache with new title
//       existingTitlesCache.add(question.title);
      
//       console.log('Successfully generated and stored:', question.title);
//       return newProblem;

//     } catch (error) {
//       lastError = error;
//       attempt++;
      
//       // Log the full error for debugging
//       console.error('Full error:', error);
      
//       if (error.message.includes('Title already exists')) {
//         console.log('Title collision detected, retrying with same topic...');
//       } else {
//         console.error(`Attempt ${attempt} failed:`, error.message);
        
//         // On final attempt, try with a different topic
//         if (attempt === maxRetries - 1) {
//           selectedTopic = getRandomElement(topics.filter(t => t !== selectedTopic));
//           console.log(`Final attempt with new topic: ${selectedTopic}`);
//         }
//       }

//       if (attempt >= maxRetries) {
//         throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
//       }

//       // Longer delay between retries to avoid rate limiting
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }
//   }
// }

// // Helper function to clear the titles cache if needed
// async function clearTitlesCache() {
//   existingTitlesCache.clear();
//   lastCacheUpdate = null;
//   console.log('Titles cache cleared');
// }

// module.exports = { 
//   generateAndStoreQuestion,
//   clearTitlesCache
// };

// -------------------------------------------------------------------------------

const { GoogleGenerativeAI } = require("@google/generative-ai");
const Problem = require('../models/Problem');
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/cp3DB');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const difficulties = ['Easy', 'Medium', 'Hard'];
const topics = [
  'Arrays', 'Strings', 'LinkedLists', 'DynamicProgramming', 'Sorting', 
  'Searching', 'HashTables', 'Recursion', 'Stacks', 'Queues', 
  'Heaps', 'BitManipulation', 'Math', 'Greedy', 'Backtracking'
];

let existingTitlesCache = new Set();
let lastCacheUpdate = null;
const CACHE_DURATION = 1000 * 60 * 60;

async function updateTitlesCache() {
  const now = Date.now();
  if (!lastCacheUpdate || (now - lastCacheUpdate) > CACHE_DURATION) {
    const titles = await Problem.distinct('title');
    existingTitlesCache = new Set(titles);
    lastCacheUpdate = now;
    console.log(`Updated titles cache. Total existing titles: ${existingTitlesCache.size}`);
  }
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateLeetCodeLink(title) {
  const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
  const cleanTitle = formattedTitle.replace(/[^a-z0-9-]/g, '');
  return `https://leetcode.com/problems/${cleanTitle}/`;
}

async function generateQuestion(difficulty, topic, existingTitles = new Set()) {
  const selectedDifficulty = difficulty || getRandomElement(difficulties);
  const selectedTopic = topic || getRandomElement(topics);

  const prompt = `Generate a ${selectedDifficulty} DSA question about ${selectedTopic}. 

STRICT REQUIREMENTS:
1. MUST include EXACTLY 10 test cases - no more, no less
2. MUST include EXACTLY 3 examples - no more, no less
3. Test cases must properly match the function signature
4. All JSON fields must be properly formatted
5. Avoid these titles: ${Array.from(existingTitles).slice(-5).join(', ')}

Response format (fill ALL fields, keep structure EXACTLY as shown):
{
  "title": "Problem Title (must be unique and descriptive)",
  "topic": "${selectedTopic}",
  "difficulty": "${selectedDifficulty}",
  "leetcode_link": "Will be auto-generated",
  "description": "Clear and concise problem description",
  "template": "var functionName = function(params) {\\n    // Your code here\\n};",
  "example": [
    {
      "input": "First example input",
      "output": "First example output"
    },
    {
      "input": "Second example input",
      "output": "Second example output"
    },
    {
      "input": "Third example input",
      "output": "Third example output"
    }
  ],
  "constraints": [
    "exactly 4 specific constraints"
  ],
  "follow_up": "One follow-up question",
  "hints": [
    "exactly 2 hints"
  ],
  "solution_approach": "Clear explanation",
  "time_complexity": "Big O notation with explanation",
  "space_complexity": "Big O notation with explanation",
  "code_snippet": {
    "javascript": "Complete working solution"
  },
  "related_topics": [
    "exactly 2 related topics"
  ],
  "testCases": [
    {
      "input": [[1,2,3]], 
      "output": "output1"
    },
    {
      "input": [5, 10],
      "output": "output2"
    },
    {
      "input": [[1,2,3], 5],
      "output": "output3"
    },
    {
      "input": [[4,5,6]],
      "output": "output4"
    },
    {
      "input": [7, 15],
      "output": "output5"
    },
    {
      "input": [[7,8,9], 3],
      "output": "output6"
    },
    {
      "input": [[2,4,6]],
      "output": "output7"
    },
    {
      "input": [12, 20],
      "output": "output8"
    },
    {
      "input": [[5,7,9], 4],
      "output": "output9"
    },
    {
      "input": [[8,10,12]],
      "output": "output10"
    }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();
    
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    let questionData = JSON.parse(jsonMatch[0]);
    
    // Validate number of examples and test cases
    if (!Array.isArray(questionData.example) || questionData.example.length !== 3) {
      throw new Error('Must have exactly 3 examples');
    }

    if (!Array.isArray(questionData.testCases) || questionData.testCases.length !== 10) {
      throw new Error('Must have exactly 10 test cases');
    }

    // Validate critical fields
    const criticalFields = ['title', 'description', 'template', 'testCases', 'example'];
    const missingFields = criticalFields.filter(field => !questionData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing critical fields: ${missingFields.join(', ')}`);
    }

    // Validate test cases format
    const paramMatch = questionData.template.match(/function\s*\((.*?)\)/);
    const paramCount = paramMatch ? paramMatch[1].split(',').length : 0;

    questionData.testCases = questionData.testCases.map((testCase, index) => {
      if (!testCase.input || !testCase.output) {
        throw new Error(`Test case ${index + 1} missing input or output`);
      }
      
      if (!Array.isArray(testCase.input)) {
        testCase.input = [testCase.input];
      }
      if (paramCount === 1 && !Array.isArray(testCase.input[0])) {
        testCase.input = [testCase.input];
      }
      return testCase;
    });

    questionData.leetcode_link = generateLeetCodeLink(questionData.title);
    return questionData;

  } catch (error) {
    throw new Error(`Generation failed: ${error.message}`);
  }
}

async function generateAndStoreQuestion(maxRetries = 10) {
  await updateTitlesCache();
  
  let attempt = 0;
  let selectedDifficulty = getRandomElement(difficulties);
  let selectedTopic = getRandomElement(topics);
  let lastError = null;

  while (attempt < maxRetries) {
    try {
      console.log(`Attempt ${attempt + 1} - Generating ${selectedDifficulty} question about ${selectedTopic}`);
      
      const question = await generateQuestion(selectedDifficulty, selectedTopic, existingTitlesCache);
      
      if (existingTitlesCache.has(question.title)) {
        throw new Error('Title already exists in database');
      }

      const count = await Problem.countDocuments();
      question.id = count + 1;

      const newProblem = new Problem(question);
      await newProblem.save();
      existingTitlesCache.add(question.title);
      
      console.log('Successfully generated and stored:', question.title);
      console.log(`Number of examples: ${question.example.length}`);
      console.log(`Number of test cases: ${question.testCases.length}`);
      return newProblem;

    } catch (error) {
      lastError = error;
      attempt++;
      
      console.error('Attempt failed:', error.message);
      
      if (attempt === maxRetries - 1) {
        selectedTopic = getRandomElement(topics.filter(t => t !== selectedTopic));
        console.log(`Final attempt with new topic: ${selectedTopic}`);
      }

      if (attempt >= maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

module.exports = { generateAndStoreQuestion };