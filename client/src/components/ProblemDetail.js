// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../utils/api";
// import Editor from "@monaco-editor/react";
// import { toast } from 'react-hot-toast';
// import { FaCheckCircle, FaTimesCircle, FaChevronRight, FaChevronDown, FaLightbulb, FaCode, FaChartLine, FaHistory, FaUndo, FaSpinner, FaClock } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import ProblemDescription from "./ProblemDescription";

// const ProblemDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [problem, setProblem] = useState(null);
//   const [code, setCode] = useState("");
//   const [testResults, setTestResults] = useState([]);
//   const [isAllPassed, setIsAllPassed] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSolved, setIsSolved] = useState(location.state?.isSolved || false);
//   const [activeTab, setActiveTab] = useState("description");
//   const [submissions, setSubmissions] = useState([]);
//   const [selectedTestCase, setSelectedTestCase] = useState(null);
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [endTime, setEndTime] = useState(null);
//   const [elapsedTime, setElapsedTime] = useState(0);


//   const parseInputString = (inputStr) => {
//     try {
//       // If input is already an array, return it
//       if (Array.isArray(inputStr)) {
//         return inputStr;
//       }

//       // Remove any extra quotes around the entire string
//       let cleanStr = inputStr.trim();
//       if (cleanStr.startsWith('"') && cleanStr.endsWith('"')) {
//         cleanStr = cleanStr.slice(1, -1);
//       }

//       // Parse the string as JSON if it's a valid JSON format
//       if (cleanStr.startsWith('[') && cleanStr.endsWith(']')) {
//         try {
//           return JSON.parse(cleanStr);
//         } catch (e) {
//           // If JSON parse fails, try the manual parsing below
//         }
//       }

//       // Split by commas, but not within arrays
//       const values = [];
//       let currentValue = '';
//       let bracketCount = 0;

//       for (let i = 0; i < cleanStr.length; i++) {
//         const char = cleanStr[i];
//         if (char === '[') bracketCount++;
//         if (char === ']') bracketCount--;

//         if (char === ',' && bracketCount === 0) {
//           values.push(currentValue.trim());
//           currentValue = '';
//         } else {
//           currentValue += char;
//         }
//       }
//       values.push(currentValue.trim());

//       // Parse each value
//       return values.map(val => {
//         try {
//           if (val.startsWith('[') && val.endsWith(']')) {
//             return JSON.parse(val);
//           }
//           // Try parsing as number if possible
//           const num = Number(val);
//           return isNaN(num) ? val : num;
//         } catch {
//           return val;
//         }
//       });
//     } catch (error) {
//       console.error('Error parsing input:', error);
//       return [inputStr];
//     }
//   };

//   const formatExampleInput = (input, paramNames = []) => {
//     try {
//       const parsedValues = parseInputString(input);
      
//       // If we have no parameter names, just return the formatted values
//       if (!paramNames || paramNames.length === 0) {
//         return JSON.stringify(parsedValues);
//       }

//       // Match each parameter with its value
//       return parsedValues
//         .map((value, index) => {
//           if (index < paramNames.length) {
//             return `${paramNames[index]} = ${JSON.stringify(value)}`;
//           }
//           return null;
//         })
//         .filter(Boolean) // Remove null values
//         .join(', ');
//     } catch (error) {
//       console.error('Error formatting example input:', error);
//       return input;
//     }
//   };

//   const formatExampleOutput = (output) => {
//     try {
//       // If output is already a string and starts with quotes, remove them
//       if (typeof output === 'string') {
//         let cleanOutput = output.trim();
//         if (cleanOutput.startsWith('"') && cleanOutput.endsWith('"')) {
//           cleanOutput = cleanOutput.slice(1, -1);
//         }
//         // If it's an array string, parse it and re-stringify for consistent formatting
//         if (cleanOutput.startsWith('[') && cleanOutput.endsWith(']')) {
//           try {
//             return JSON.stringify(JSON.parse(cleanOutput));
//           } catch {
//             return cleanOutput;
//           }
//         }
//         return cleanOutput;
//       }
//       return JSON.stringify(output);
//     } catch (error) {
//       console.error('Error formatting example output:', error);
//       return output;
//     }
//   };

//   const extractFunctionParams = (template) => {
//     try {
//       const functionMatch = template.match(/function\s*\((.*?)\)/);
//       if (functionMatch && functionMatch[1]) {
//         return functionMatch[1].split(',').map(param => param.trim());
//       }
//       return [];
//     } catch (error) {
//       console.error('Error extracting function parameters:', error);
//       return [];
//     }
//   };


//   useEffect(() => {
//     // const fetchProblemData = async () => {
//     //   try {
//     //     const response = await api.get(`/problems/${id}`);
//     //     setProblem(response.data);
//     //     setCode(response.data.template);
//     //   } catch (err) {
//     //     console.error("Error fetching problem data:", err);
//     //     toast.error("Failed to load problem data");
//     //   }
//     // };

//     const fetchProblemData = async () => {
//       try {
//         const response = await api.get(`/problems/${id}`);
//         setProblem(response.data);
//         setCode(response.data.template);
        
//         // Extract parameter names when problem data is loaded
//         const paramNames = extractFunctionParams(response.data.template);
//         setProblem(prev => ({
//           ...prev,
//           paramNames: paramNames
//         }));
//       } catch (err) {
//         console.error("Error fetching problem data:", err);
//         toast.error("Failed to load problem data");
//       }
//     };

//     const fetchSubmissions = async () => {
//       try {
//         const userID = localStorage.getItem("userID");
//         if (userID) {
//           const response = await api.get(`/problems/submissions/${userID}/${id}`);
//           setSubmissions(response.data);
//         }
//       } catch (err) {
//         console.error("Error fetching submissions:", err);
//         toast.error("Failed to load submissions");
//       }
//     };

//     fetchProblemData();
//     fetchSubmissions();

//     const userID = localStorage.getItem("userID");
//     setIsLoggedIn(!!userID);
//   }, [id]);

//   useEffect(() => {
//     let timer;
//     if (startTime && !endTime) {
//       timer = setInterval(() => {
//         setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [startTime, endTime]);



//   const formatTime = (seconds) => {
//   if (seconds < 60) {
//     return `${seconds}s`;
//   } else if (seconds < 3600) {
//     return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
//   } else {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     return `${hours}h ${minutes}m`;
//   }
// };



//   const handleSubmit = async () => {
//   if (!isLoggedIn) {
//     toast.error('Please log in to submit your solution.');
//     return;
//   }

//   if(code === problem.template) {
//     toast.error('Please write your solution before submitting.');
//     return;
//   }

//   setIsSubmitting(true);
//   setTestResults([]);
//   setIsAllPassed(false);

//   const endTime = Date.now();
//   const duration = startTime ? endTime - startTime : 0;
//   const formattedDuration = formatTime(Math.floor(duration / 1000));

//   try {
//     const userID = localStorage.getItem("userID");
//     const response = await api.post(`/problems/${id}/submit`, { code, userID, duration: formattedDuration });
//     setTestResults(response.data.testResults);
//     setIsAllPassed(response.data.isAllPassed);

//     if (response.data.isAllPassed) {
//       setIsSolved(true);
//       toast.success('Problem submitted successfully!');
//     } else {
//       toast.warn('Some test cases failed. Keep trying!');
//     }

//     const submissionsResponse = await api.get(`/problems/submissions/${userID}/${id}`);
//     setSubmissions(submissionsResponse.data);
//   } catch (err) {
//     console.error("Error submitting solution:", err);
//     toast.error('Error submitting solution. Please try again.');
//   } finally {
//     setIsSubmitting(false);
//     setStartTime(null);
//     setElapsedTime(0);
//   }
// };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleEditorWillMount = (monaco) => {
//     monaco.editor.defineTheme('customTheme', {
//       base: 'vs-dark',
//       inherit: true,
//       rules: [],
//       colors: {
//         'editor.background': '#1e1e1e',
//       }
//     });
//   };

//   const handleEditorDidMount = (editor, monaco) => {
//     editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
//       // Prevent default paste behavior
//     });

//     editor.onKeyDown((e) => {
//       if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyV) {
//         e.preventDefault();
//         e.stopPropagation();
//         toast.error('Pasting is not allowed in this editor.');
//       }
//     });

//     editor.onContextMenu((e) => {
//       e.preventDefault();
//     });
//   };

//   if (!problem) return <div>Loading...</div>;



//   const tabContent = {
//     description: (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//               <h3 className="text-2xl font-bold mb-4 text-green-400">Problem Description</h3>
//               {/* <p className="text-gray-300 leading-relaxed mb-6">{formatDescription(problem.description)}</p> */}
//               <ProblemDescription problem={problem} />
//         {/* ... previous content ... */}
//         <h4 className="text-xl font-bold mb-2 text-green-400">Examples</h4>
//         {problem.example.map((example, index) => (
//           <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
//             <pre className="text-gray-300 overflow-x-auto font-mono">
//               <div className="mb-1">
//                 <strong className="text-green-400">Example {index + 1}:</strong>
//               </div>
//               <div className="mb-1">
//                 <strong className="text-blue-400">Input: </strong>
//                 {formatExampleInput(example.input, problem.paramNames)}
//               </div>
//               <div>
//                 <strong className="text-blue-400">Output: </strong>
//                 {formatExampleOutput(example.output)}
//               </div>
//               {example.explanation && (
//                 <div className="mt-2">
//                   <strong className="text-blue-400">Explanation: </strong>
//                   {example.explanation}
//                 </div>
//               )}
//             </pre>
//           </div>
//         ))}

//         <h4 className="text-xl font-bold mb-2 text-green-400">Constraints</h4>
//         <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
//           {problem.constraints.map((constraint, index) => (
//             <li key={index}>{constraint}</li>
//           ))}
//         </ul>
//       </motion.div>
//     ),
//     hints: (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-green-400">Hints</h3>
//         <ul className="space-y-4">
//           {problem.hints.map((hint, index) => (
//             <li key={index} className="bg-gray-700 p-4 rounded-lg">
//               <FaLightbulb className="inline-block mr-2 text-yellow-400" />
//               <span className="text-gray-300">{hint}</span>
//             </li>
//           ))}
//         </ul>
//       </motion.div>
//     ),
//     submissions: (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-green-400">Your Submissions</h3>
//         {submissions.length > 0 ? (
//           <div className="space-y-4">
//             {submissions.slice().reverse().map((submission, index) => (
//               <div key={index} className={`p-4 rounded-lg ${submission.passed ? 'bg-green-700' : 'bg-red-700'}`}>
//                 <h4 className="font-bold mb-2">Submission {submissions.length - index}</h4>
//                 <p>Date: {new Date(submission.date).toLocaleString()}</p>
//                 <p>Status: {submission.passed ? 'Passed' : 'Failed'}</p>
//                 {/* <p>Duration: {formatTime(submission.duration / 1000)}</p> */}
//                 <p>Duration: {submission.duration}</p>
//                 <button
//                   className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
//                   onClick={() => setCode(submission.code)}
//                 >
//                   View Code
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-300">No submissions yet.</p>
//         )}
//       </motion.div>
//     ),
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-4xl font-bold text-green-400">{problem.title}</h2>
//           {isSolved && (
//             <div className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full">
//               <FaCheckCircle className="mr-2" />
//               <span>Solved</span>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="space-y-6">
//             <div className="flex space-x-4 mb-4">
//               {Object.keys(tabContent).map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-full transition-colors duration-200 flex items-center ${activeTab === tab
//                     ? "bg-green-500 text-white"
//                     : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                     }`}
//                 >
//                   {tab === "submissions" && <FaHistory className="mr-2" />}
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//             <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
//               {tabContent[activeTab]}
//             </div>
//             <div className="flex justify-between items-center">
//               <div className="flex items-center space-x-4">
//                 <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
//                   {problem.difficulty}
//                 </span>
//                 <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
//                   {problem.topic}
//                 </span>
//               </div>
//               <a
//                 href={problem.leetcode_link}
//                 className="text-blue-400 hover:text-blue-300 transition duration-300"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View on LeetCode
//               </a>
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold text-green-400">Code Editor</h3>
//                 <div className="flex items-center">
//                   <FaClock className="text-green-400 mr-2" />
//                   <span className="text-xl font-bold text-green-400">
//                     {formatTime(elapsedTime)}
//                   </span>
//                 </div>
//                 {isLoggedIn && (
//                   <button
//                     onClick={() => setCode(problem.template)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-md flex items-center hover:bg-blue-600 transition duration-300"
//                   >
//                     <FaUndo className="mr-2" />
//                     Reset Code
//                   </button>
//                 )}
//               </div>
//               <div className="relative">
//                 <Editor
//                   height="50vh"
//                   defaultLanguage="javascript"
//                   value={code}
//                   onChange={(value) => {
//                     setCode(value);
//                     if (!startTime) {
//                       setStartTime(Date.now());
//                     }
//                   }}
//                   theme="customTheme"
//                   options={{
//                     minimap: { enabled: false },
//                     fontSize: 14,
//                     readOnly: !isLoggedIn,
//                     quickSuggestions: false,
//                     suggestOnTriggerCharacters: false,
//                     acceptSuggestionOnEnter: "off",
//                     tabCompletion: "off",
//                     wordBasedSuggestions: false,
//                     parameterHints: { enabled: false },
//                     contextmenu: false,
//                     scrollbar: {
//                       vertical: 'visible',
//                       horizontal: 'visible',
//                     },
//                   }}
//                   beforeMount={handleEditorWillMount}
//                   onMount={handleEditorDidMount}
//                 />
//                 {!isLoggedIn && (
//                   <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
//                     <button
//                       onClick={handleLogin}
//                       className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-600 transition duration-300"
//                     >
//                       Login to Code
//                     </button>
//                   </div>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={!isLoggedIn || isSubmitting}
//                   className={`w-full bg-green-500 text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center transition duration-300 ${!isLoggedIn || isSubmitting
//                       ? 'opacity-50 cursor-not-allowed'
//                       : 'hover:bg-green-600'
//                     }`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <FaSpinner className="animate-spin mr-2 text-xl" />
//                                             <span>Running Test Cases...</span>
//                     </>
//                   ) : (
//                     <>
//                       <FaCode className="mr-2 text-xl" />
//                       <span>Submit Solution</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {testResults.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 shadow-2xl mt-6"
//               >
//                 <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
//                   Test Results
//                 </h3>
//                 <div className="flex flex-wrap gap-3 mb-6">
//                   {testResults.map((result, index) => (
//                     <motion.button
//                       key={index}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition-all duration-300 ${result.passed
//                         ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
//                         : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
//                         } ${selectedTestCase === index ? 'ring-4 ring-blue-400' : ''}`}
//                       onClick={() => setSelectedTestCase(index)}
//                     >
//                       {result.passed ? <FaCheckCircle className="inline mr-2" /> : <FaTimesCircle className="inline mr-2" />}
//                       Case {index + 1}
//                     </motion.button>
//                   ))}
//                 </div>
//                 <AnimatePresence>
//                   {selectedTestCase !== null && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="bg-gray-800 p-6 rounded-lg mt-4 shadow-inner"
//                     >
//                       <h4 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
//                         Test Case {selectedTestCase + 1}:
//                         <span className={`ml-2 ${testResults[selectedTestCase].passed ? 'text-green-500' : 'text-red-500'}`}>
//                           {testResults[selectedTestCase].passed ? 'Passed' : 'Failed'}
//                         </span>
//                       </h4>
//                       {['input', 'expected', 'result'].map((section) => (
//                         <div key={section} className="mb-4">
//                           <button
//                             className="w-full text-left p-4 bg-gray-700 rounded-lg flex justify-between items-center"
//                             onClick={() => setExpandedSection(expandedSection === section ? null : section)}
//                           >
//                             <span className="font-semibold text-lg capitalize">{section}</span>
//                             {expandedSection === section ? <FaChevronDown /> : <FaChevronRight />}
//                           </button>
//                           <AnimatePresence initial={false}>
//                             {expandedSection === section && (
//                               <motion.div
//                                 initial={{ opacity: 0, height: 0 }}
//                                 animate={{ opacity: 1, height: 'auto' }}
//                                 exit={{ opacity: 0, height: 0 }}
//                                 transition={{
//                                   duration: 0.3,
//                                   ease: [0.04, 0.62, 0.23, 0.98],
//                                   height: { duration: 0.4 }
//                                 }}
//                                 className="bg-gray-600 p-4 rounded-b-lg overflow-hidden"
//                               >
//                                 <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300 text-left">
//                                   {(() => {
//                                     try {
//                                       const data = testResults[selectedTestCase][section];
//                                       if (data !== null && data !== undefined) {
//                                         let stringified = JSON.stringify(data, null, 2);
//                                         if (Array.isArray(data) && data.length === 1 && Array.isArray(data[0])) {
//                                           stringified = JSON.stringify(data[0], null, 2);
//                                         }
//                                         return stringified.replace(/\[[\s\S]*?\]/g, match =>
//                                           match.replace(/\s+/g, ' ').replace(/\[ /g, '[').replace(/ \]/g, ']')
//                                         );
//                                       }
//                                       return 'No data available';
//                                     } catch (error) {
//                                       console.error('Error rendering test result:', error);
//                                       return 'Error rendering data';
//                                     }
//                                   })()}
//                                 </pre>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </div>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             )}

//             {isAllPassed && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-green-600 text-white rounded-lg p-6 shadow-lg text-center"
//               >
//                 <FaChartLine className="text-4xl mb-2 inline-block" />
//                 <h3 className="text-2xl font-bold">All test cases passed!</h3>
//                 <p>Congratulations on solving this problem!</p>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemDetail;

// ----------------------------------------------------

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import Editor from "@monaco-editor/react";
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaChevronRight, FaChevronDown, FaLightbulb, FaCode, FaChartLine, FaHistory, FaUndo, FaSpinner, FaClock } from "react-icons/fa";
import { 
  Book, 
  Search, 
  Clock, 
  Terminal, 
  ChevronRight, 
  ChevronDown,
  Layout, 
  Loader2, 
  AlertCircle,
  Code,
  History,
  Undo,
  LineChart,
  BookOpen,
  Lightbulb,
  CheckCircle2
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import ProblemDescription from "./ProblemDescription";

const ProblemDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState([]);
  const [isAllPassed, setIsAllPassed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSolved, setIsSolved] = useState(location.state?.isSolved || false);
  const [activeTab, setActiveTab] = useState("description");
  const [submissions, setSubmissions] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [solvedProblems, setSolvedProblems] = useState(new Set());


  const extractFunctionParams = (template) => {
    try {
      const functionMatch = template.match(/function\s*\((.*?)\)/);
      if (functionMatch && functionMatch[1]) {
        return functionMatch[1].split(',').map(param => param.trim());
      }
      return [];
    } catch (error) {
      console.error('Error extracting function parameters:', error);
      return [];
    }
  };


  useEffect(() => {
    // const fetchProblemData = async () => {
    //   try {
    //     const response = await api.get(`/problems/${id}`);
    //     setProblem(response.data);
    //     setCode(response.data.template);
    //   } catch (err) {
    //     console.error("Error fetching problem data:", err);
    //     toast.error("Failed to load problem data");
    //   }
    // };

    const fetchProblemData = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
        setCode(response.data.template);
        
        // Extract parameter names when problem data is loaded
        const paramNames = extractFunctionParams(response.data.template);
        setProblem(prev => ({
          ...prev,
          paramNames: paramNames
        }));

        // Fetch solved problems
        const userID = localStorage.getItem('userID');
        if (userID) {
          const solvedRes = await fetch(`/api/problems/${userID}/solved-problems`);
          const solvedData = await solvedRes.json();
          setSolvedProblems(new Set(solvedData));
        }

      } catch (err) {
        console.error("Error fetching problem data:", err);
        // toast.error("Failed to load problem data");
      }
    };

    const fetchSubmissions = async () => {
      try {
        const userID = localStorage.getItem("userID");
        if (userID) {
          const response = await api.get(`/problems/submissions/${userID}/${id}`);
          setSubmissions(response.data);
        }
      } catch (err) {
        console.error("Error fetching submissions:", err);
        toast.error("Failed to load submissions");
      }
    };

    fetchProblemData();
    fetchSubmissions();

    const userID = localStorage.getItem("userID");
    setIsLoggedIn(!!userID);
  }, [id]);

  useEffect(() => {
    let timer;
    if (startTime && !endTime) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, endTime]);



  const formatTime = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  } else if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
};



  const handleSubmit = async () => {
  if (!isLoggedIn) {
    toast.error('Please log in to submit your solution.');
    return;
  }

  if(code === problem.template) {
    toast.error('Please write your solution before submitting.');
    return;
  }

  setIsSubmitting(true);
  setTestResults([]);
  setIsAllPassed(false);

  const endTime = Date.now();
  const duration = startTime ? endTime - startTime : 0;
  const formattedDuration = formatTime(Math.floor(duration / 1000));

  try {
    const userID = localStorage.getItem("userID");
    const response = await api.post(`/problems/${id}/submit`, { code, userID, duration: formattedDuration });
    setTestResults(response.data.testResults);
    setIsAllPassed(response.data.isAllPassed);

    if (response.data.isAllPassed) {
      setIsSolved(true);
      toast.success('Problem submitted successfully!');
    } else {
      toast.warn('Some test cases failed. Keep trying!');
    }

    const submissionsResponse = await api.get(`/problems/submissions/${userID}/${id}`);
    setSubmissions(submissionsResponse.data);
  } catch (err) {
    console.error("Error submitting solution:", err);
    toast.error('Error submitting solution. Please try again.');
  } finally {
    setIsSubmitting(false);
    setStartTime(null);
    setElapsedTime(0);
  }
};

  const handleLogin = () => {
    navigate('/login');
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      // rules: [],
      // colors: {
      //   'editor.background': '#1e1e1e',
      // }
      rules: [
        { token: '', background: '1F1F1F' }, // Background color
        { token: 'comment', foreground: '637777', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'C792EA' },
        { token: 'string', foreground: 'A3BE8C' },
        { token: 'number', foreground: 'F78C6C' },
        { token: 'type', foreground: '82AAFF' },
        { token: 'variable', foreground: 'F07178' },
        { token: 'function', foreground: 'E5C07B' },
        // Add more rules for different tokens if needed
      ],
      colors: {
        'editor.foreground': '#D8DEE9',
        'editor.background': '#1F1F1F',
        'editorCursor.foreground': '#A7A7A7',
        'editor.lineHighlightBackground': '#2C2C2C',
        'editorLineNumber.foreground': '#4B5263',
        'editor.selectionBackground': '#3E4451',
        'editor.inactiveSelectionBackground': '#3E4451',
      },
    });
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () => {
      // Prevent default paste behavior
    });

    editor.onKeyDown((e) => {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.KeyV) {
        e.preventDefault();
        e.stopPropagation();
        toast.error('Pasting is not allowed in this editor.');
      }
    });

    editor.onContextMenu((e) => {
      e.preventDefault();
    });
  };

  if (!problem) return <div>Loading...</div>;



  const tabContent = {
    description: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
              {/* <h3 className="text-2xl font-bold mb-4 text-green-400">Problem Description</h3> */}
              {/* <p className="text-gray-300 leading-relaxed mb-6">{formatDescription(problem.description)}</p> */}
              <ProblemDescription problem={problem} />
        {/* ... previous content ... */}
        {/* <h4 className="text-xl font-bold mb-2 text-green-400">Examples</h4>
        {problem.example.map((example, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
            <pre className="text-gray-300 overflow-x-auto font-mono">
              <div className="mb-1">
                <strong className="text-green-400">Example {index + 1}:</strong>
              </div>
              <div className="mb-1">
                <strong className="text-blue-400">Input: </strong>
                {formatExampleInput(example.input, problem.paramNames)}
              </div>
              <div>
                <strong className="text-blue-400">Output: </strong>
                {formatExampleOutput(example.output)}
              </div>
              {example.explanation && (
                <div className="mt-2">
                  <strong className="text-blue-400">Explanation: </strong>
                  {example.explanation}
                </div>
              )}
            </pre>
          </div>
        ))}

        <h4 className="text-xl font-bold mb-2 text-green-400">Constraints</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul> */}
      </motion.div>
    ),
    hints: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-green-400">Hints</h3>
        <ul className="space-y-4">
          {problem.hints.map((hint, index) => (
            <li key={index} className="bg-gray-700 p-4 rounded-lg text-justify ">
              <FaLightbulb className="inline-block mr-2 text-yellow-400" />
              <span className="text-gray-300">{hint}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ),
    submissions: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold mb-4 text-green-400">Your Submissions</h3>
        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.slice().reverse().map((submission, index) => (
              <div key={index} className={`p-4 rounded-lg ${submission.passed ? 'bg-green-700' : 'bg-red-700'}`}>
                <h4 className="font-bold mb-2">Submission {submissions.length - index}</h4>
                <p>Date: {new Date(submission.date).toLocaleString()}</p>
                <p>Status: {submission.passed ? 'Passed' : 'Failed'}</p>
                {/* <p>Duration: {formatTime(submission.duration / 1000)}</p> */}
                <p>Duration: {submission.duration}</p>
                <button
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => setCode(submission.code)}
                >
                  View Code
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No submissions yet.</p>
        )}
      </motion.div>
    ),
  };

  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
  //     {/* Top Banner */}
  //     <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

  //     <div className="mx-auto max-w-7xl px-4 py-12">
  //       {/* Header Section */}
  //       <div className="mb-12">
  //         <motion.h1 
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           className="mb-4 text-4xl font-bold text-white"
  //         >
  //           {problem.title}
  //         </motion.h1>
  //         <motion.div 
  //           initial={{ opacity: 0, y: -20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ delay: 0.1 }}
  //           className="flex items-center gap-4"
  //         >
  //           <span className="rounded-full bg-indigo-500/10 px-4 py-1 text-sm font-medium text-indigo-400">
  //             {problem.difficulty}
  //           </span>
  //           <span className="rounded-full bg-purple-500/10 px-4 py-1 text-sm font-medium text-purple-400">
  //             {problem.topic}
  //           </span>
  //           {isSolved && (
  //             <span className="rounded-full bg-green-500/10 px-4 py-1 text-sm font-medium text-green-400 flex items-center gap-2">
  //               <LineChart className="h-4 w-4" />
  //               Solved
  //             </span>
  //           )}
  //         </motion.div>
  //       </div>

  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  //         {/* Left Column */}
  //         <div className="space-y-6">
  //           <div className="flex flex-wrap gap-2">
  //             {Object.keys(tabContent).map((tab) => (
  //               <button
  //                 key={tab}
  //                 onClick={() => setActiveTab(tab)}
  //                 className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
  //                   activeTab === tab
  //                     ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
  //                     : "border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600/50 hover:bg-slate-700/50"
  //                 }`}
  //               >
  //                 {tab === "description" && <Book className="h-4 w-4" />}
  //                 {tab === "hints" && <Lightbulb className="h-4 w-4" />}
  //                 {tab === "submissions" && <History className="h-4 w-4" />}
  //                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
  //               </button>
  //             ))}
  //           </div>

  //           <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
  //             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  //             {tabContent[activeTab]}
  //           </div>
  //         </div>

  //         {/* Right Column - Code Editor */}
  //         <div className="space-y-6">
  //           <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
  //             <div className="flex items-center justify-between mb-4">
  //               <div className="flex items-center gap-3">
  //                 <div className="rounded-lg bg-indigo-500/10 p-2">
  //                   <Code className="h-5 w-5 text-indigo-400" />
  //                 </div>
  //                 <h3 className="font-semibold text-slate-200">Code Editor</h3>
  //               </div>
  //               <div className="flex items-center gap-4">
  //                 <div className="flex items-center gap-2 text-slate-400">
  //                   <Clock className="h-4 w-4" />
  //                   <span>{formatTime(elapsedTime)}</span>
  //                 </div>
  //                 {isLoggedIn && (
  //                   <button
  //                     onClick={() => setCode(problem.template)}
  //                     className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-400 hover:border-slate-600/50 hover:bg-slate-700/50 transition-all duration-300"
  //                   >
  //                     <Undo className="h-4 w-4" />
  //                     Reset Code
  //                   </button>
  //                 )}
  //               </div>
  //             </div>

  //             <div className="relative">
  //               <Editor
  //                 height="50vh"
  //                 defaultLanguage="javascript"
  //                 value={code}
  //                 onChange={(value) => {
  //                   setCode(value);
  //                   if (!startTime) {
  //                     setStartTime(Date.now());
  //                   }
  //                 }}
  //                 theme="customTheme"
  //                 options={{
  //                   minimap: { enabled: false },
  //                   fontSize: 14,
  //                   readOnly: !isLoggedIn,
  //                   quickSuggestions: false,
  //                   suggestOnTriggerCharacters: false,
  //                   acceptSuggestionOnEnter: "off",
  //                   tabCompletion: "off",
  //                   wordBasedSuggestions: false,
  //                   parameterHints: { enabled: false },
  //                   contextmenu: false,
  //                   scrollbar: {
  //                     vertical: 'visible',
  //                     horizontal: 'visible',
  //                   },
  //                 }}
  //                 beforeMount={handleEditorWillMount}
  //                 onMount={handleEditorDidMount}
  //               />

  //               {!isLoggedIn && (
  //                 <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center">
  //                   <button
  //                     onClick={handleLogin}
  //                     className="group relative overflow-hidden rounded-lg bg-indigo-500 px-6 py-3 text-xl font-bold text-white transition-all duration-300 hover:bg-indigo-600"
  //                   >
  //                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
  //                     Login to Code
  //                   </button>
  //                 </div>
  //               )}
  //             </div>

  //             <button
  //               onClick={handleSubmit}
  //               disabled={!isLoggedIn || isSubmitting}
  //               className={`mt-4 w-full group relative overflow-hidden rounded-lg bg-indigo-500 px-6 py-3 text-xl font-bold text-white transition-all duration-300 hover:bg-indigo-600 ${
  //                 !isLoggedIn || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
  //               }`}
  //             >
  //               <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
  //               <div className="flex items-center justify-center gap-2">
  //                 {isSubmitting ? (
  //                   <>
  //                     <Loader2 className="h-5 w-5 animate-spin" />
  //                     <span>Running Test Cases...</span>
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Terminal className="h-5 w-5" />
  //                     <span>Submit Solution</span>
  //                   </>
  //                 )}
  //               </div>
  //             </button>
  //           </div>

  //           {/* Test Results */}
  //           {testResults.length > 0 && (
  //             <motion.div
  //               initial={{ opacity: 0, y: 20 }}
  //               animate={{ opacity: 1, y: 0 }}
  //               className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
  //             >
  //               <h3 className="mb-6 text-2xl font-bold text-slate-200">Test Results</h3>
  //               <div className="flex flex-wrap gap-3 mb-6">
  //                 {testResults.map((result, index) => (
  //                   <button
  //                     key={index}
  //                     onClick={() => setSelectedTestCase(index)}
  //                     className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
  //                       result.passed
  //                         ? 'border-green-500/50 bg-green-500/10 text-green-400'
  //                         : 'border-red-500/50 bg-red-500/10 text-red-400'
  //                     } ${
  //                       selectedTestCase === index
  //                         ? 'ring-2 ring-indigo-500/50'
  //                         : ''
  //                     }`}
  //                   >
  //                     {result.passed ? (
  //                       <div className="rounded-full bg-green-500/20 p-1">
  //                         <Terminal className="h-4 w-4" />
  //                       </div>
  //                     ) : (
  //                       <div className="rounded-full bg-red-500/20 p-1">
  //                         <AlertCircle className="h-4 w-4" />
  //                       </div>
  //                     )}
  //                     Case {index + 1}
  //                   </button>
  //                 ))}
  //               </div>

  //               {/* Test Case Details */}
  //               {/* ... keep existing test case details code ... */}
  //               <AnimatePresence>
  //                 {selectedTestCase !== null && (
  //                   <motion.div
  //                     initial={{ opacity: 0, height: 0 }}
  //                     animate={{ opacity: 1, height: 'auto' }}
  //                     exit={{ opacity: 0, height: 0 }}
  //                     className="bg-gray-800 p-6 rounded-lg mt-4 shadow-inner"
  //                   >
  //                     <h4 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
  //                       Test Case {selectedTestCase + 1}:
  //                       <span className={`ml-2 ${testResults[selectedTestCase].passed ? 'text-green-500' : 'text-red-500'}`}>
  //                         {testResults[selectedTestCase].passed ? 'Passed' : 'Failed'}
  //                       </span>
  //                     </h4>
  //                     {['input', 'expected', 'result'].map((section) => (
  //                       <div key={section} className="mb-4">
  //                         <button
  //                           className="w-full text-left p-4 bg-gray-700 rounded-lg flex justify-between items-center"
  //                           onClick={() => setExpandedSection(expandedSection === section ? null : section)}
  //                         >
  //                           <span className="font-semibold text-lg capitalize">{section}</span>
  //                           {expandedSection === section ? <FaChevronDown /> : <FaChevronRight />}
  //                         </button>
  //                         <AnimatePresence initial={false}>
  //                           {expandedSection === section && (
  //                             <motion.div
  //                               initial={{ opacity: 0, height: 0 }}
  //                               animate={{ opacity: 1, height: 'auto' }}
  //                               exit={{ opacity: 0, height: 0 }}
  //                               transition={{
  //                                 duration: 0.3,
  //                                 ease: [0.04, 0.62, 0.23, 0.98],
  //                                 height: { duration: 0.4 }
  //                               }}
  //                               className="bg-gray-600 p-4 rounded-b-lg overflow-hidden"
  //                             >
  //                               <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300 text-left">
  //                                 {(() => {
  //                                   try {
  //                                     const data = testResults[selectedTestCase][section];
  //                                     if (data !== null && data !== undefined) {
  //                                       let stringified = JSON.stringify(data, null, 2);
  //                                       if (Array.isArray(data) && data.length === 1 && Array.isArray(data[0])) {
  //                                         stringified = JSON.stringify(data[0], null, 2);
  //                                       }
  //                                       return stringified.replace(/\[[\s\S]*?\]/g, match =>
  //                                         match.replace(/\s+/g, ' ').replace(/\[ /g, '[').replace(/ \]/g, ']')
  //                                       );
  //                                     }
  //                                     return 'No data available';
  //                                   } catch (error) {
  //                                     console.error('Error rendering test result:', error);
  //                                     return 'Error rendering data';
  //                                   }
  //                                 })()}
  //                               </pre>
  //                             </motion.div>
  //                           )}
  //                         </AnimatePresence>
  //                       </div>
  //                     ))}
  //                   </motion.div>
  //                 )}
  //               </AnimatePresence>
  //             </motion.div>
  //           )}

  //           {/* Success Message */}
  //           {isAllPassed && (
  //             <motion.div
  //               initial={{ opacity: 0, scale: 0.8 }}
  //               animate={{ opacity: 1, scale: 1 }}
  //               className="relative overflow-hidden rounded-xl border border-green-500/50 bg-green-500/10 p-6 backdrop-blur-sm"
  //             >
  //               <div className="flex items-center gap-4">
  //                 <div className="rounded-lg bg-green-500/20 p-3">
  //                   <LineChart className="h-6 w-6 text-green-400" />
  //                 </div>
  //                 <div>
  //                   <h3 className="text-xl font-bold text-green-400">All test cases passed!</h3>
  //                   <p className="text-slate-300">Congratulations on solving this problem!</p>
  //                 </div>
  //               </div>
  //             </motion.div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      {/* Gradient Banner */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
  
      <div className="container mx-auto px-4 py-8 max-w-[1400px]">
        {/* Header Section with Problem Info */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400"
              >
                {problem.title}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap items-center gap-3"
              >
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  <Terminal className="h-3.5 w-3.5" />
                  {problem.difficulty}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  <Book className="h-3.5 w-3.5" />
                  {problem.topic}
                </span>
                {solvedProblems.has(problem._id) && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                    <LineChart className="h-3.5 w-3.5" />
                    Solved
                  </span>
                )}
              </motion.div>
            </div>
            {/* <a
              href={problem.leetcode_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-slate-700/50 hover:text-white"
            >
              <Code className="h-4 w-4" />
              View on LeetCode
            </a> */}
            <div className="rounded-lg bg-indigo-500/10 p-2">
                  {solvedProblems.has(problem._id) ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <Terminal className="h-5 w-5 text-indigo-400" />
                  )}
                </div>
          </div>
        </div>
  
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Problem Details */}
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-800/30 rounded-lg backdrop-blur-sm">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20"
                      : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  {tab === "description" && <Book className="h-4 w-4" />}
                  {tab === "hints" && <Lightbulb className="h-4 w-4" />}
                  {tab === "submissions" && <History className="h-4 w-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
  
            {/* Tab Content */}
            <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5" />
              <div className="relative">
                {tabContent[activeTab]}
              </div>
            </div>
          </div>
  
          {/* Right Column - Code Editor */}
          <div className="space-y-6">
            {/* Editor Container */}
            <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
              {/* Editor Header */}
              <div className="flex items-center justify-between border-b border-slate-700/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-500/10 p-2">
                    <Code className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">Code Editor</h3>
                    <p className="text-sm text-slate-400">JavaScript</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-1.5">
                    <Clock className="h-4 w-4 text-indigo-400" />
                    <span className="text-sm font-medium text-slate-400">{formatTime(elapsedTime)}</span>
                  </div>
                  {isLoggedIn && (
                    <button
                      onClick={() => setCode(problem.template)}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1.5 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-slate-700/50 hover:text-white"
                    >
                      <Undo className="h-4 w-4" />
                      Reset
                    </button>
                  )}
                </div>
              </div>
  
              {/* Editor Body */}
              <div className="relative">
                <Editor
                  height="60vh"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    if (!startTime) {
                      setStartTime(Date.now());
                    }
                  }}
                  theme="customTheme"
                  options={{
                    fontFamily: 'Ubuntu Mono, monospace',
                    minimap: { enabled: false },
                    fontSize: 16,
                    readOnly: !isLoggedIn,
                    quickSuggestions: false,
                    suggestOnTriggerCharacters: false,
                    acceptSuggestionOnEnter: "off",
                    tabCompletion: "off",
                    wordBasedSuggestions: false,
                    parameterHints: { enabled: false },
                    contextmenu: false,
                    scrollbar: {
                      vertical: 'visible',
                      horizontal: 'visible',
                    },
                  }}
                  beforeMount={handleEditorWillMount}
                  onMount={handleEditorDidMount}
                  className="border-t border-slate-700/50"
                />
  
                {!isLoggedIn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm">
                    <button
                      onClick={handleLogin}
                      className="group relative overflow-hidden rounded-lg bg-indigo-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-indigo-600"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                      Login to Code
                    </button>
                  </div>
                )}
              </div>
  
              {/* Submit Button */}
              <div className="p-4 border-t border-slate-700/50">
                <button
                  onClick={handleSubmit}
                  disabled={!isLoggedIn || isSubmitting}
                  className={`w-full group relative overflow-hidden rounded-lg bg-indigo-500 px-6 py-3 text-lg font-semibold text-white transition-all duration-300 hover:bg-indigo-600 ${
                    !isLoggedIn || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                  <div className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Running Tests...</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="h-5 w-5" />
                        <span>Submit Solution</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
  
            {/* Test Results */}
            {testResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm"
              >
                {/* Results Header */}
                <div className="border-b border-slate-700/50 p-4">
                  <h3 className="text-lg font-semibold text-slate-200">Test Results</h3>
                </div>
  
                {/* Test Cases Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4">
                  {testResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTestCase(index)}
                      className={`flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-all duration-300 ${
                        result.passed
                          ? 'border-green-500/20 bg-green-500/10 text-green-400'
                          : 'border-red-500/20 bg-red-500/10 text-red-400'
                      } ${
                        selectedTestCase === index
                          ? 'ring-2 ring-indigo-500/50'
                          : ''
                      }`}
                    >
                      {result.passed ? (
                        <div className="rounded-full bg-green-500/20 p-1">
                          <Terminal className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-red-500/20 p-1">
                          <AlertCircle className="h-4 w-4" />
                        </div>
                      )}
                      Case {index + 1}
                    </button>
                  ))}
                </div>
  
                {/* Selected Test Case Details */}
                {selectedTestCase !== null && (
                  <div className="border-t border-slate-700/50 p-4">
                    {['input', 'expected', 'result'].map((section) => (
                      <div key={section} className="mb-4 last:mb-0">
                        <button
                          className="w-full flex items-center justify-between rounded-lg bg-slate-700/50 p-3 text-left transition-colors hover:bg-slate-700/75"
                          onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                        >
                          <span className="font-medium capitalize text-slate-200">{section}</span>
                          {expandedSection === section ? (
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-slate-400" />
                          )}
                        </button>
                        <AnimatePresence initial={false}>
                          {expandedSection === section && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 bg-slate-800/50 rounded-b-lg border-x border-b border-slate-700/50">
                                <pre className="text-sm text-slate-300 whitespace-pre-wrap">
                                  {JSON.stringify(testResults[selectedTestCase][section], null, 2)}
                                </pre>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
  
            {/* Success Message */}
            {isAllPassed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative overflow-hidden rounded-xl border border-green-500/20 bg-green-500/10 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-green-500/20 p-3">
                    <LineChart className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-400">All Tests Passed!</h3>
                    <p className="text-slate-300">Great job! You've successfully solved this problem.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

};

export default ProblemDetail;