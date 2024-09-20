// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../utils/api";
// import Editor from "@monaco-editor/react";
// import { toast } from 'react-hot-toast';
// import { FaCheckCircle, FaLightbulb, FaCode, FaChartLine } from "react-icons/fa";
// import { motion } from "framer-motion";

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

//   useEffect(() => {
//     const fetchProblemData = async () => {
//       try {
//         const response = await api.get(`/problems/${id}`);
//         setProblem(response.data);
//         setCode(response.data.template);
//       } catch (err) {
//         console.error("Error fetching problem data:", err);
//       }
//     };
//     fetchProblemData();

//     const userID = localStorage.getItem("userID");
//     setIsLoggedIn(!!userID);
//   }, [id]);

//   const handleSubmit = async () => {
//     if (!isLoggedIn) {
//       toast.error('Please log in to submit your solution.');
//       return;
//     }

//     try {
//       const response = await api.post(`/problems/${id}/submit`, { code });
//       setTestResults(response.data.testResults);
//       setIsAllPassed(response.data.isAllPassed);

//       const userID = localStorage.getItem("userID");
//       if (response.data.isAllPassed) {
//         await api.post("/problems/mark-solved", { problemId: id, code, userID });
//         setIsSolved(true);
//         toast.success('Problem submitted successfully!');
//       } else {
//         toast.warn('Some test cases failed!');
//       }
//     } catch (err) {
//       console.error("Error submitting solution:", err);
//       toast.error('Error submitting solution. Please try again.');
//     }
//   };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   if (!problem) return <div>Loading...</div>;

//   const tabContent = {
//     description: (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-green-400">Problem Description</h3>
//         <p className="text-gray-300 leading-relaxed">{problem.description}</p>
//       </motion.div>
//     ),
//     constraints: (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-green-400">Constraints</h3>
//         <ul className="list-disc list-inside text-gray-300 space-y-2">
//           {problem.constraints.map((constraint, index) => (
//             <li key={index}>{constraint}</li>
//           ))}
//         </ul>
//       </motion.div>
//     ),
//     examples: (
//       // <motion.div
//       //   initial={{ opacity: 0, y: 20 }}
//       //   animate={{ opacity: 1, y: 0 }}
//       //   transition={{ duration: 0.5 }}
//       // >
//       //   <h3 className="text-2xl font-bold mb-4 text-green-400">Examples</h3>
//       //   <div className="bg-gray-800 p-4 rounded-lg">
//       //     <pre className="text-gray-300 overflow-x-auto">
//       //       <strong>Input:</strong> {problem.example.input}
//       //       <br />
//       //       <strong>Output:</strong> {problem.example.output}
//       //     </pre>
//       //   </div>
//       // </motion.div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-green-400">Examples</h3>

//         {problem.example.map((example, index) => (
//           <div key={index} className="bg-gray-800 p-4 rounded-lg mb-4">
//             <pre className="text-gray-300 overflow-x-auto">
//               <strong>Example {index + 1}:</strong>
//               <br />
//               <strong>Input:</strong> {example.input}
//               <br />
//               <strong>Output:</strong> {example.output}
//             </pre>
//           </div>
//         ))}
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
//             <li key={index} className="bg-gray-800 p-4 rounded-lg">
//               <FaLightbulb className="inline-block mr-2 text-yellow-400" />
//               <span className="text-gray-300">{hint}</span>
//             </li>
//           ))}
//         </ul>
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
//                   className={`px-4 py-2 rounded-full transition-colors duration-200 ${activeTab === tab
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                     }`}
//                 >
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
//               <h3 className="text-2xl font-bold mb-4 text-green-400">Code Editor</h3>
//               <div className="relative">
//                 <Editor
//                   height="50vh"
//                   defaultLanguage="javascript"
//                   value={code}
//                   onChange={(value) => setCode(value)}
//                   theme="vs-dark"
//                   options={{
//                     minimap: { enabled: false },
//                     fontSize: 14,
//                   }}
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
//                   className={`w-full bg-green-500 text-white px-4 py-2 rounded-lg font-bold ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
//                     }`}
//                   disabled={!isLoggedIn}
//                 >
//                   <FaCode className="inline-block mr-2" />
//                   Submit Solution
//                 </button>
//               </div>
//             </div>

//             {testResults.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-gray-800 rounded-lg p-6 shadow-lg"
//               >
//                 <h3 className="text-2xl font-bold mb-4 text-green-400">Test Results</h3>
//                 <div className="space-y-4">
//                   {testResults.map((result, index) => (
//                     <div
//                       key={index}
//                       className={`p-4 rounded-lg ${result.passed ? 'bg-green-900' : 'bg-red-900'
//                         }`}
//                     >
//                       <h4 className="font-bold mb-2">
//                         Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
//                       </h4>
//                       <pre className="text-sm overflow-x-auto">
//                         <strong>Input:</strong> {JSON.stringify(result.input)}
//                         <br />
//                         <strong>Expected:</strong> {JSON.stringify(result.expected)}
//                         <br />
//                         <strong>Output:</strong> {JSON.stringify(result.result)}
//                       </pre>
//                     </div>
//                   ))}
//                 </div>
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

// ------------------------- above code has the one of the best css for our project... -------------------

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../utils/api";
// import Editor from "@monaco-editor/react";
// import { toast } from 'react-hot-toast';
// import { FaCheckCircle, FaLightbulb, FaCode, FaChartLine, FaHistory } from "react-icons/fa";
// import { motion } from "framer-motion";

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

//   useEffect(() => {
//     const fetchProblemData = async () => {
//       try {
//         const response = await api.get(`/problems/${id}`);
//         setProblem(response.data);
//         setCode(response.data.template);
//       } catch (err) {
//         console.error("Error fetching problem data:", err);
//         toast.error("Failed to load problem data");
//       }
//     };

//     const fetchSubmissions = async () => {
//       try {
//         const userID = localStorage.getItem("userID");
//         if (userID) {
//           const response = await api.get(`/submissions/${userID}/${id}`);
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

//   const handleSubmit = async () => {
//     if (!isLoggedIn) {
//       toast.error('Please log in to submit your solution.');
//       return;
//     }

//     try {
//       const response = await api.post(`/problems/${id}/submit`, { code });
//       setTestResults(response.data.testResults);
//       setIsAllPassed(response.data.isAllPassed);

//       const userID = localStorage.getItem("userID");
//       if (response.data.isAllPassed) {
//         await api.post("/problems/mark-solved", { problemId: id, code, userID });
//         setIsSolved(true);
//         toast.success('Problem submitted successfully!');
//       } else {
//         toast.warn('Some test cases failed!');
//       }

//       // Refresh submissions after a new submission
//       const submissionsResponse = await api.get(`/submissions/${userID}/${id}`);
//       setSubmissions(submissionsResponse.data);
//     } catch (err) {
//       console.error("Error submitting solution:", err);
//       toast.error('Error submitting solution. Please try again.');
//     }
//   };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   if (!problem) return <div>Loading...</div>;

//   const tabContent = {
//     description: (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h3 className="text-2xl font-bold mb-4 text-green-400">Problem Description</h3>
//         <p className="text-gray-300 leading-relaxed mb-6">{problem.description}</p>

//         <h4 className="text-xl font-bold mb-2 text-green-400">Examples</h4>
//         {problem.example.map((example, index) => (
//           <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
//             <pre className="text-gray-300 overflow-x-auto">
//               <strong>Example {index + 1}:</strong>
//               <br />
//               <strong>Input:</strong> {example.input}
//               <br />
//               <strong>Output:</strong> {example.output}
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
//             {submissions.map((submission, index) => (
//               <div key={index} className={`p-4 rounded-lg ${submission.passed ? 'bg-green-700' : 'bg-red-700'}`}>
//                 <h4 className="font-bold mb-2">Submission {index + 1}</h4>
//                 <p>Date: {new Date(submission.date).toLocaleString()}</p>
//                 <p>Status: {submission.passed ? 'Passed' : 'Failed'}</p>
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
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
//               <h3 className="text-2xl font-bold mb-4 text-green-400">Code Editor</h3>
//               <div className="relative">
//                 <Editor
//                   height="50vh"
//                   defaultLanguage="javascript"
//                   value={code}
//                   onChange={(value) => setCode(value)}
//                   theme="vs-dark"
//                   options={{
//                     minimap: { enabled: false },
//                     fontSize: 14,
//                     readOnly: !isLoggedIn,
//                     // Disable paste
//                     quickSuggestions: false,
//                     suggestOnTriggerCharacters: false,
//                     acceptSuggestionOnEnter: "off",
//                     tabCompletion: "off",
//                     wordBasedSuggestions: false,
//                     parameterHints: {
//                       enabled: false,
//                     },
//                     // Additional options to prevent paste
//                     'editor.pasteFromWordContextMenu': false,
//                     'editor.pasteFrom': false,
//                   }}
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
//                   className={`w-full bg-green-500 text-white px-4 py-2 rounded-lg font-bold ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
//                     }`}
//                   disabled={!isLoggedIn}
//                 >
//                   <FaCode className="inline-block mr-2" />
//                   Submit Solution
//                 </button>
//               </div>
//             </div>

//             {testResults.length > 0 && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-gray-800 rounded-lg p-6 shadow-lg"
//               >
//                 <h3 className="text-2xl font-bold mb-4 text-green-400">Test Results</h3>
//                 <div className="space-y-4">
//                   {testResults.map((result, index) => (
//                     <div
//                       key={index}
//                       className={`p-4 rounded-lg ${result.passed ? 'bg-green-900' : 'bg-red-900'
//                         }`}
//                     >
//                       <h4 className="font-bold mb-2">
//                         Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
//                       </h4>
//                       <pre className="text-sm overflow-x-auto">
//                         <strong>Input:</strong> {JSON.stringify(result.input)}
//                         <br />
//                         <strong>Expected:</strong> {JSON.stringify(result.expected)}
//                         <br />
//                         <strong>Output:</strong> {JSON.stringify(result.result)}
//                       </pre>
//                     </div>
//                   ))}
//                 </div>
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

// -----------------------------------------------

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import Editor from "@monaco-editor/react";
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaTimesCircle, FaChevronRight, FaChevronDown, FaLightbulb, FaCode, FaChartLine, FaHistory } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        const response = await api.get(`/problems/${id}`);
        setProblem(response.data);
        setCode(response.data.template);
      } catch (err) {
        console.error("Error fetching problem data:", err);
        toast.error("Failed to load problem data");
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

  // const handleSubmit = async () => {
  //   if (!isLoggedIn) {
  //     toast.error('Please log in to submit your solution.');
  //     return;
  //   }

  //   try {
  //     const response = await api.post(`/problems/${id}/submit`, { code });
  //     setTestResults(response.data.testResults);
  //     setIsAllPassed(response.data.isAllPassed);

  //     const userID = localStorage.getItem("userID");
  //     if (response.data.isAllPassed) {
  //       await api.post("/problems/mark-solved", { problemId: id, code, userID });
  //       setIsSolved(true);
  //       toast.success('Problem submitted successfully!');
  //     } else {
  //       toast.warn('Some test cases failed!');
  //     }

  //     // Refresh submissions after a new submission
  //     const submissionsResponse = await api.get(`/submissions/${userID}/${id}`);
  //     setSubmissions(submissionsResponse.data);
  //   } catch (err) {
  //     console.error("Error submitting solution:", err);
  //     toast.error('Error submitting solution. Please try again.');
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!isLoggedIn) {
  //     toast.error('Please log in to submit your solution.');
  //     return;
  //   }

  //   try {
  //     const userID = localStorage.getItem("userID");
  //     const response = await api.post(`/problems/${id}/submit`, { code, userID });
  //     setTestResults(response.data.testResults);
  //     setIsAllPassed(response.data.isAllPassed);

  //     if (response.data.isAllPassed) {
  //       setIsSolved(true);
  //       toast.success('Problem submitted successfully!');
  //     } else {
  //       toast.warn('Some test cases failed. Keep trying!');
  //     }

  //     // Refresh submissions
  //     const submissionsResponse = await api.get(`/submissions/${userID}/${id}`);
  //     setSubmissions(submissionsResponse.data);
  //   } catch (err) {
  //     console.error("Error submitting solution:", err);
  //     toast.error('Error submitting solution. Please try again.');
  //   }
  // };

  // const handleSubmit = async () => {
  //   if (!isLoggedIn) {
  //     toast.error('Please log in to submit your solution.');
  //     return;
  //   }

  //   try {
  //     const userID = localStorage.getItem("userID");
  //     const response = await api.post(`/problems/${id}/submit`, { code, userID });
  //     setTestResults(response.data.testResults);
  //     setIsAllPassed(response.data.isAllPassed);

  //     if (response.data.isAllPassed) {
  //       setIsSolved(true);
  //       toast.success('Problem submitted successfully!');
  //     } else {
  //       toast.warn('Some test cases failed. Keep trying!');
  //     }

  //     // Refresh submissions
  //     const submissionsResponse = await api.get(`/submissions/${userID}/${id}`);
  //     setSubmissions(submissionsResponse.data);
  //   } catch (err) {
  //     console.error("Error submitting solution:", err);
  //     toast.error('Error submitting solution. Please try again.');
  //   }
  // };
  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to submit your solution.');
      return;
    }

    try {
      const userID = localStorage.getItem("userID");
      const response = await api.post(`/problems/${id}/submit`, { code, userID });
      setTestResults(response.data.testResults);
      setIsAllPassed(response.data.isAllPassed);

      if (response.data.isAllPassed) {
        setIsSolved(true);
        toast.success('Problem submitted successfully!');
      } else {
        toast.warn('Some test cases failed. Keep trying!');
      }

      // Refresh submissions
      const submissionsResponse = await api.get(`/problems/submissions/${userID}/${id}`);
      setSubmissions(submissionsResponse.data);
    } catch (err) {
      console.error("Error submitting solution:", err);
      toast.error('Error submitting solution. Please try again.');
    }
  };



  const handleLogin = () => {
    navigate('/login');
  };

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
      }
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

    // Disable context menu to prevent paste option
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
        <h3 className="text-2xl font-bold mb-4 text-green-400">Problem Description</h3>
        <p className="text-gray-300 leading-relaxed mb-6">{problem.description}</p>

        <h4 className="text-xl font-bold mb-2 text-green-400">Examples</h4>
        {problem.example.map((example, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
            <pre className="text-gray-300 overflow-x-auto">
              <strong>Example {index + 1}:</strong>
              <br />
              <strong>Input:</strong> {example.input}
              <br />
              <strong>Output:</strong> {example.output}
            </pre>
          </div>
        ))}

        <h4 className="text-xl font-bold mb-2 text-green-400">Constraints</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
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
            <li key={index} className="bg-gray-700 p-4 rounded-lg">
              <FaLightbulb className="inline-block mr-2 text-yellow-400" />
              <span className="text-gray-300">{hint}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ),
    // submissions: (
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //   >
    //     <h3 className="text-2xl font-bold mb-4 text-green-400">Your Submissions</h3>
    //     {submissions.length > 0 ? (
    //       <div className="space-y-4">
    //         {submissions.map((submission, index) => (
    //           <div key={index} className={`p-4 rounded-lg ${submission.passed ? 'bg-green-700' : 'bg-red-700'}`}>
    //             <h4 className="font-bold mb-2">Submission {index + 1}</h4>
    //             <p>Date: {new Date(submission.date).toLocaleString()}</p>
    //             <p>Status: {submission.passed ? 'Passed' : 'Failed'}</p>
    //             <button
    //               className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
    //               onClick={() => setCode(submission.code)}
    //             >
    //               View Code
    //             </button>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <p className="text-gray-300">No submissions yet.</p>
    //     )}
    //   </motion.div>
    // ),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-green-400">{problem.title}</h2>
          {isSolved && (
            <div className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full">
              <FaCheckCircle className="mr-2" />
              <span>Solved</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex space-x-4 mb-4">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 flex items-center ${activeTab === tab
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                >
                  {tab === "submissions" && <FaHistory className="mr-2" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              {tabContent[activeTab]}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {problem.difficulty}
                </span>
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  {problem.topic}
                </span>
              </div>
              <a
                href={problem.leetcode_link}
                className="text-blue-400 hover:text-blue-300 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on LeetCode
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-green-400">Code Editor</h3>
              <div className="relative">
                <Editor
                  height="50vh"
                  defaultLanguage="javascript"
                  value={code}
                  onChange={(value) => setCode(value)}
                  theme="customTheme"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
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
                />
                {!isLoggedIn && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
                    <button
                      onClick={handleLogin}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg text-xl font-bold hover:bg-green-600 transition duration-300"
                    >
                      Login to Code
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  className={`w-full bg-green-500 text-white px-4 py-2 rounded-lg font-bold ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                    }`}
                  disabled={!isLoggedIn}
                >
                  <FaCode className="inline-block mr-2" />
                  Submit Solution
                </button>
              </div>
            </div>

            {/* {testResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-2xl font-bold mb-4 text-green-400">Test Results</h3>
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${result.passed ? 'bg-green-900' : 'bg-red-900'
                        }`}
                    >
                      <h4 className="font-bold mb-2">
                        Test Case {index + 1}: {result.passed ? 'Passed' : 'Failed'}
                      </h4>
                      <pre className="text-sm overflow-x-auto">
                        <strong>Input:</strong> {JSON.stringify(result.input)}
                        <br />
                        <strong>Expected:</strong> {JSON.stringify(result.expected)}
                        <br />
                        <strong>Output:</strong> {JSON.stringify(result.result)}
                      </pre>
                    </div>
                  ))}
                </div>
              </motion.div>
            )} */}

            {testResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 shadow-2xl mt-6"
              >
                <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  Test Results
                </h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {testResults.map((result, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition-all duration-300 ${result.passed
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                        } ${selectedTestCase === index ? 'ring-4 ring-blue-400' : ''}`}
                      onClick={() => setSelectedTestCase(index)}
                    >
                      {result.passed ? <FaCheckCircle className="inline mr-2" /> : <FaTimesCircle className="inline mr-2" />}
                      Case {index + 1}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {selectedTestCase !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-800 p-6 rounded-lg mt-4 shadow-inner"
                    >
                      <h4 className="font-bold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                        Test Case {selectedTestCase + 1}:
                        <span className={`ml-2 ${testResults[selectedTestCase].passed ? 'text-green-500' : 'text-red-500'}`}>
                          {testResults[selectedTestCase].passed ? 'Passed' : 'Failed'}
                        </span>
                      </h4>
                      {['input', 'expected', 'result'].map((section) => (
                        <div key={section} className="mb-4">
                          <button
                            className="w-full text-left p-4 bg-gray-700 rounded-lg flex justify-between items-center"
                            onClick={() => setExpandedSection(expandedSection === section ? null : section)}
                          >
                            <span className="font-semibold text-lg capitalize">{section}</span>
                            {expandedSection === section ? <FaChevronDown /> : <FaChevronRight />}
                          </button>
                          <AnimatePresence initial={false}>
                            {expandedSection === section && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.04, 0.62, 0.23, 0.98],
                                  height: { duration: 0.4 }
                                }}
                                className="bg-gray-600 p-4 rounded-b-lg overflow-hidden"
                              >
                                {/* <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300">
                                  {JSON.stringify(testResults[selectedTestCase][section], null, 2)}
                                </pre> */}
                                {/* <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300 text-left">
  {testResults[selectedTestCase] && testResults[selectedTestCase][section]
    ? JSON.stringify(testResults[selectedTestCase][section], null, 2)
        .replace(/\[[\s\S]*?\]/g, match => match.replace(/\s+/g, ' '))
    : 'No data available'}
</pre> */}
                                <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300 text-left">
                                  {(() => {
                                    try {
                                      const data = testResults[selectedTestCase][section];
                                      if (data !== null && data !== undefined) {
                                        let stringified = JSON.stringify(data, null, 2);
                                        if (Array.isArray(data) && data.length === 1 && Array.isArray(data[0])) {
                                          stringified = JSON.stringify(data[0], null, 2);
                                        }
                                        return stringified.replace(/\[[\s\S]*?\]/g, match =>
                                          match.replace(/\s+/g, ' ').replace(/\[ /g, '[').replace(/ \]/g, ']')
                                        );
                                      }
                                      return 'No data available';
                                    } catch (error) {
                                      console.error('Error rendering test result:', error);
                                      return 'Error rendering data';
                                    }
                                  })()}

                                </pre>


                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {isAllPassed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-600 text-white rounded-lg p-6 shadow-lg text-center"
              >
                <FaChartLine className="text-4xl mb-2 inline-block" />
                <h3 className="text-2xl font-bold">All test cases passed!</h3>
                <p>Congratulations on solving this problem!</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;