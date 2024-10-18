const axios = require('axios');
const Quiz = require('../models/Quiz');

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

async function fetchTopics() {
    try {
      const res = await axios.get(
        "https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData"
      );
      
      return res.data
        .filter(file => file.name.endsWith('.md'))
        .map(topic => topic.name.split('.')[0]);
    } catch (error) {
      throw new Error(`Failed to fetch topics: ${error.message}`);
    }
  }
  
  // Function to fetch topic content from GitHub
  async function fetchTopicContent(topic) {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/Gurupatel007/AceDSA/main/client/src/topicsData/${topic}.md`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch topic content: ${error.message}`);
    }
  }
  
  // Function to extract code snippets from content
  function extractCodeSnippets(content) {
    const codeRegex = /```(?:javascript|js)?\n([\s\S]*?)```/g;
    const matches = [...content.matchAll(codeRegex)];
    return matches.map(match => match[1].trim());
  }
  
  // Function to extract key concepts from content
  function extractKeyConcepts(content) {
    const lines = content.split('\n');
    const concepts = [];
    let currentConcept = '';
  
    for (const line of lines) {
      if (line.startsWith('## ') || line.startsWith('# ')) {
        continue;
      }
      if (line.includes(':') || line.includes(' is ') || line.includes(' are ')) {
        if (currentConcept) {
          concepts.push(currentConcept);
        }
        currentConcept = line;
      } else if (currentConcept && line.trim().length > 0) {
        currentConcept += ' ' + line.trim();
      }
    }
    
    if (currentConcept) {
      concepts.push(currentConcept);
    }
  
    return concepts;
  }
  
  // Function to generate options for theory questions
  function generateTheoryOptions(correctAnswer) {
    const options = [correctAnswer];
    
    // Generate opposite meaning
    const oppositeAnswer = correctAnswer
      .replace(/is|are/g, 'is not')
      .replace(/can|will/g, 'cannot')
      .replace(/allows|enable/g, 'prevents');
    options.push(oppositeAnswer);
  
    // Generate partial answer
    const partialAnswer = correctAnswer.split('.')[0] + '.';
    options.push(partialAnswer);
  
    // Generate misleading answer
    const misleadingAnswer = correctAnswer
      .replace(/efficient|fast|quick/g, 'slow')
      .replace(/dynamic|flexible/g, 'static')
      .replace(/easy|simple/g, 'complex');
    options.push(misleadingAnswer);
  
    return shuffleArray(options);
  }
  
  // Function to generate theory questions
  function generateTheoryQuestions(concepts) {
    return concepts.map(concept => {
      const [topic, explanation] = concept.split(/[:is|are]/);
      if (!topic || !explanation) return null;
  
      return {
        questionType: 'theory',
        question: `What ${topic.toLowerCase().startsWith('what') ? topic : `is ${topic}`}?`,
        options: generateTheoryOptions(explanation.trim()),
        correctAnswer: explanation.trim(),
        explanation: `The correct explanation for ${topic} is: ${explanation}`
      };
    }).filter(Boolean);
  }
  
  // Function to generate code understanding questions
  function generateCodeQuestions(codeSnippets) {
    return codeSnippets.map(snippet => {
      // Analyze the code snippet to determine its purpose
      const purpose = analyzeCodePurpose(snippet);
      const complexity = analyzeTimeComplexity(snippet);
      
      return {
        questionType: 'code_understanding',
        question: "What is the main purpose of this code?",
        codeSnippet: snippet,
        options: generateCodeOptions(purpose),
        correctAnswer: purpose,
        explanation: `This code ${purpose.toLowerCase()}. Its time complexity is ${complexity}.`
      };
    });
  }
  
  // Helper function to analyze code purpose
  function analyzeCodePurpose(code) {
    if (code.includes('sort')) return 'Sorts elements in the array';
    if (code.includes('indexOf') || code.includes('find')) return 'Searches for an element';
    if (code.includes('push') || code.includes('pop')) return 'Manipulates array elements';
    if (code.includes('reduce')) return 'Reduces array to a single value';
    if (code.includes('map')) return 'Transforms array elements';
    return 'Processes array elements';
  }
  
  // Helper function to analyze time complexity
  function analyzeTimeComplexity(code) {
    const hasNestedLoop = code.match(/for.*for|while.*while/s);
    const hasLoop = code.match(/for|while/);
    
    if (hasNestedLoop) return 'O(n²)';
    if (hasLoop) return 'O(n)';
    return 'O(1)';
  }
  
  // Function to generate code options
  function generateCodeOptions(correctAnswer) {
    const options = [
      correctAnswer,
      'Sorts elements in the array',
      'Searches for an element',
      'Transforms array elements'
    ];
    return shuffleArray(options.filter(opt => opt !== correctAnswer)).slice(0, 3)
      .concat([correctAnswer]);
  }
  
  // Function to generate output prediction questions
  function generateOutputQuestions(codeSnippets) {
    return codeSnippets.map(snippet => {
      const sampleInput = generateSampleInput();
      const expectedOutput = predictOutput(snippet, sampleInput);
      
      return {
        questionType: 'output_prediction',
        question: `What will be the output of this code for input: ${sampleInput}?`,
        codeSnippet: snippet,
        options: generateOutputOptions(expectedOutput),
        correctAnswer: expectedOutput,
        explanation: `For input ${sampleInput}, the code executes step by step to produce ${expectedOutput}`
      };
    }).slice(0, 2); // Limit to 2 output questions
  }
  
  // Helper function to generate sample input
  function generateSampleInput() {
    return `[${Array.from({length: 5}, () => Math.floor(Math.random() * 10))}]`;
  }
  
  // Helper function to predict output (simplified)
  function predictOutput(code, input) {
    if (code.includes('filter')) return `[${input.split(',').filter(n => n % 2 === 0)}]`;
    if (code.includes('map')) return `[${input.split(',').map(n => n * 2)}]`;
    return input; // Default case
  }
  
  // Function to generate output options
  function generateOutputOptions(correctAnswer) {
    const options = [correctAnswer];
    options.push(`[${correctAnswer.slice(1, -1).split(',').reverse()}]`);
    options.push(`[${correctAnswer.slice(1, -1).split(',').map(n => n * 2)}]`);
    options.push('undefined');
    return shuffleArray(options);
  }
  
  // Main function to generate quiz
  async function generateQuiz(topic) {
    try {
      
      const topics = await fetchTopics();
      const topic = getRandomElement(topics);
  
      // Fetch content from GitHub
      const content = await fetchTopicContent(topic);
      
      // Extract information
      const concepts = extractKeyConcepts(content);
      const codeSnippets = extractCodeSnippets(content);
      
      // Generate different types of questions
      const theoryQuestions = generateTheoryQuestions(concepts);
      const codeQuestions = generateCodeQuestions(codeSnippets);
      const outputQuestions = generateOutputQuestions(codeSnippets);
      
      // Combine and shuffle questions
      let allQuestions = [
        ...theoryQuestions.slice(0, 2),  // 2 theory questions
        ...codeQuestions.slice(0, 2),    // 2 code understanding questions
        ...outputQuestions.slice(0, 1)    // 1 output prediction question
      ];
      
      allQuestions = shuffleArray(allQuestions);
  
      // Create new quiz
      const newQuiz = new Quiz({
        topic,
        questions: allQuestions,
        difficulty: calculateDifficulty(allQuestions)
      });
  
      await newQuiz.save();
      return newQuiz;
    } catch (error) {
      throw new Error(`Failed to generate quiz: ${error.message}`);
    }
  }
  
  // Helper function to calculate overall difficulty
  function calculateDifficulty(questions) {
    const complexityScore = questions.reduce((score, q) => {
      if (q.codeSnippet && q.codeSnippet.includes('for')) score += 1;
      if (q.question.length > 100) score += 1;
      return score;
    }, 0);
    
    if (complexityScore > questions.length * 0.7) return 'hard';
    if (complexityScore > questions.length * 0.3) return 'medium';
    return 'easy';
  }
  
  // Utility function to shuffle array
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }
  
  module.exports = { generateQuiz };