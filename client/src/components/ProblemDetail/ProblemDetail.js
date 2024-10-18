// import React from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaCheckCircle } from "react-icons/fa";
// import ProblemDescription from "./ProblemDescription";
// import ProblemHints from "./ProblemHints";
// import SubmissionHistory from "./SubmissionHistory";
// import CodeEditor from "./CodeEditor";
// import TestResults from "./TestResults";
// import useProblemDetail from "../../hooks/useProblemDetail";

// const ProblemDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {
//     problem,
//     code,
//     setCode,
//     testResults,
//     isAllPassed,
//     isLoggedIn,
//     isSolved,
//     activeTab,
//     setActiveTab,
//     submissions,
//     handleSubmit,
//     handleLogin,
//     elapsedTime,
//   } = useProblemDetail(id, location.state?.isSolved);

//   if (!problem) return <div>Loading...</div>;

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

//         <div className="flex flex-row space-x-8">
//           <div className="w-1/2 space-y-6">
//             <div className="flex space-x-4 mb-4">
//               {["description", "hints", "submissions"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-4 py-2 rounded-full transition-colors duration-200 flex items-center ${
//                     activeTab === tab
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                   }`}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//             <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
//               {activeTab === "description" && <ProblemDescription problem={problem} />}
//               {activeTab === "hints" && <ProblemHints hints={problem.hints} />}
//               {activeTab === "submissions" && <SubmissionHistory submissions={submissions} setCode={setCode} />}
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

//           <div className="w-1/2 space-y-6">
//             <CodeEditor
//               code={code}
//               setCode={setCode}
//               isLoggedIn={isLoggedIn}
//               handleLogin={handleLogin}
//               handleSubmit={handleSubmit}
//               problem={problem}
//               elapsedTime={elapsedTime}
//             />

//             {testResults.length > 0 && (
//               <TestResults testResults={testResults} />
//             )}

//             {isAllPassed && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-green-600 text-white rounded-lg p-6 shadow-lg text-center"
//               >
//                 <FaCheckCircle className="text-4xl mb-2 inline-block" />
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


// -------------------------------------------------------------

// import React from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaCheckCircle, FaLightbulb, FaHistory, FaFileCode } from "react-icons/fa";
// import ProblemDescription from "./ProblemDescription";
// import ProblemHints from "./ProblemHints";
// import SubmissionHistory from "./SubmissionHistory";
// import CodeEditor from "./CodeEditor";
// import TestResults from "./TestResults";
// import useProblemDetail from "../../hooks/useProblemDetail";

// const ProblemDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const {
//         problem,
//         code,
//         setCode,
//         testResults,
//         isAllPassed,
//         isLoggedIn,
//         isSolved,
//         activeTab,
//         setActiveTab,
//         submissions,
//         handleSubmit,
//         handleLogin,
//         elapsedTime,
//     } = useProblemDetail(id, location.state?.isSolved);

//     if (!problem) return <div className="flex justify-center items-center h-screen text-gray-300">Loading...</div>;

//     const tabIcons = {
//         description: <FaFileCode />,
//         hints: <FaLightbulb />,
//         submissions: <FaHistory />,
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-200">
//             <div className="container mx-auto px-4 py-8">
//                 <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-4xl font-bold text-blue-400">{problem.title}</h2>
//                     <div className="flex gap-10 ">

//                         <div className="flex justify-between items-center">
//                             <div className="flex items-center space-x-4">
//                                 <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
//                                     {problem.difficulty}
//                                 </span>
//                                 <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
//                                     {problem.topic}
//                                 </span>
//                             </div>
//                         </div>
//                         {isSolved && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md"
//                             >
//                                 <FaCheckCircle className="mr-2" />
//                                 <span>Solved</span>
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>
//                 <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
//                     <div className="w-full lg:w-1/2 space-y-6">

//                         <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
//                             <div className="flex space-x-4 mb-4">
//                                 {Object.entries(tabIcons).map(([tab, icon]) => (
//                                     <button
//                                         key={tab}
//                                         onClick={() => setActiveTab(tab)}
//                                         className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${activeTab === tab
//                                                 ? "bg-blue-600 text-white"
//                                                 : "bg-gray-900 text-gray-300 hover:bg-gray-700"
//                                             }`}
//                                     >
//                                         {icon}
//                                         <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
//                                     </button>
//                                 ))}
//                             </div>
//                             {activeTab === "description" && <ProblemDescription problem={problem} />}
//                             {activeTab === "hints" && <ProblemHints hints={problem.hints} />}
//                             {activeTab === "submissions" && <SubmissionHistory submissions={submissions} setCode={setCode} />}
//                         </div>
//                     </div>

//                     <div className="w-full lg:w-1/2 space-y-6">
//                         <CodeEditor
//                             code={code}
//                             setCode={setCode}
//                             isLoggedIn={isLoggedIn}
//                             handleLogin={handleLogin}
//                             handleSubmit={handleSubmit}
//                             problem={problem}
//                             elapsedTime={elapsedTime}
//                         />

//                         {testResults.length > 0 && (
//                             <TestResults testResults={testResults} />
//                         )}

//                         {isAllPassed && (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.5 }}
//                                 className="bg-green-600 text-white rounded-lg p-6 shadow-lg text-center"
//                             >
//                                 <FaCheckCircle className="text-4xl mb-2 inline-block" />
//                                 <h3 className="text-2xl font-bold">All test cases passed!</h3>
//                                 <p>Congratulations on solving this problem!</p>
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProblemDetail;

// ------------------------------------------------------------

// import React from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { motion } from "framer-motion";
// import { FaCheckCircle, FaLightbulb, FaHistory, FaFileCode } from "react-icons/fa";
// import ProblemDescription from "./ProblemDescription";
// import ProblemHints from "./ProblemHints";
// import SubmissionHistory from "./SubmissionHistory";
// import CodeEditor from "./CodeEditor";
// import TestResults from "./TestResults";
// import useProblemDetail from "../../hooks/useProblemDetail";

// const ProblemDetail = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const {
//         problem,
//         code,
//         setCode,
//         testResults,
//         isAllPassed,
//         isLoggedIn,
//         isSolved,
//         activeTab,
//         setActiveTab,
//         submissions,
//         handleSubmit,
//         handleLogin,
//         elapsedTime,
//     } = useProblemDetail(id, location.state?.isSolved);

//     if (!problem) return <div className="flex justify-center items-center h-screen text-gray-300">Loading...</div>;

//     const tabIcons = {
//         description: <FaFileCode />,
//         hints: <FaLightbulb />,
//         submissions: <FaHistory />,
//     };

//     return (
//         <div className="min-h-screen bg-gray-900 text-gray-200">
//             <div className="container mx-auto px-4 py-8">
                
//                 {/* Problem Title, Difficulty, Topic, and Solved Status */}
//                 <div className="flex items-center justify-between mb-8">
//                     <h2 className="text-4xl font-bold text-blue-400">
//                         {problem.title}
//                     </h2>
//                     <div className="flex gap-4 items-center">
//                         <div className="flex items-center space-x-4">
//                             <span className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm min-w-[100px] text-center">
//                                 {problem.difficulty}
//                             </span>
//                             <span className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm min-w-[100px] text-center">
//                                 {problem.topic}
//                             </span>
//                         </div>
//                         {isSolved && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="flex items-center bg-green-600 text-white px-5 py-2 rounded-md min-w-[120px] justify-center"
//                             >
//                                 <FaCheckCircle className="mr-2" />
//                                 <span>Solved</span>
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>

//                 {/* Problem Tabs and Details */}
//                 <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
//                     <div className="w-full lg:w-1/2 space-y-6">
//                         <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
//                             <div className="flex space-x-4 mb-4">
//                                 {Object.entries(tabIcons).map(([tab, icon]) => (
//                                     <button
//                                         key={tab}
//                                         onClick={() => setActiveTab(tab)}
//                                         className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${activeTab === tab
//                                                 ? "bg-blue-600 text-white"
//                                                 : "bg-gray-900 text-gray-300 hover:bg-gray-700"
//                                             }`}
//                                     >
//                                         {icon}
//                                         <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
//                                     </button>
//                                 ))}
//                             </div>

//                             {activeTab === "description" && <ProblemDescription problem={problem} />}
//                             {activeTab === "hints" && <ProblemHints hints={problem.hints} />}
//                             {activeTab === "submissions" && <SubmissionHistory submissions={submissions} setCode={setCode} />}
//                         </div>
//                     </div>

//                     {/* Code Editor Section */}
//                     <div className="w-full lg:w-1/2 space-y-6">
//                         <CodeEditor
//                             code={code}
//                             setCode={setCode}
//                             isLoggedIn={isLoggedIn}
//                             handleLogin={handleLogin}
//                             handleSubmit={handleSubmit}
//                             problem={problem}
//                             elapsedTime={elapsedTime}
//                         />

//                         {/* Test Results */}
//                         {testResults.length > 0 && (
//                             <TestResults testResults={testResults} />
//                         )}

//                         {/* All Test Cases Passed Message */}
//                         {isAllPassed && (
//                             <motion.div
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ duration: 0.5 }}
//                                 className="bg-green-600 text-white rounded-lg p-6 shadow-lg text-center"
//                             >
//                                 <FaCheckCircle className="text-4xl mb-2 inline-block" />
//                                 <h3 className="text-2xl font-bold">All test cases passed!</h3>
//                                 <p>Congratulations on solving this problem!</p>
//                             </motion.div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProblemDetail;

import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaLightbulb, FaHistory, FaFileCode } from "react-icons/fa";
import ProblemDescription from "./ProblemDescription";
import ProblemHints from "./ProblemHints";
import SubmissionHistory from "./SubmissionHistory";
import CodeEditor from "./CodeEditor";
import TestResults from "./TestResults";
import useProblemDetail from "../../hooks/useProblemDetail";

const ProblemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        problem,
        code,
        setCode,
        testResults,
        isAllPassed,
        isLoggedIn,
        isSolved,
        activeTab,
        setActiveTab,
        submissions,
        handleSubmit,
        handleLogin,
        elapsedTime,
    } = useProblemDetail(id, location.state?.isSolved);

    if (!problem) return <div className="flex justify-center items-center h-screen text-gray-300">Loading...</div>;

    // Function to get the color based on difficulty level
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-600 text-white";
            case "Medium":
                return "bg-yellow-600 text-white";
            case "Hard":
                return "bg-red-600 text-white";
            default:
                return "bg-gray-600 text-white";
        }
    };

    const tabIcons = {
        description: <FaFileCode />,
        hints: <FaLightbulb />,
        submissions: <FaHistory />,
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <div className="container mx-auto px-4 py-8">
                
                {/* Problem Title */}
                <div className="mb-4">
                    <h2 className="text-4xl font-bold text-blue-400 text-left">
                        {problem.title}
                    </h2>
                </div>

                {/* Problem Info: Difficulty, Topic */}
                <div className="flex items-center space-x-4 mb-8">
                    {/* Difficulty */}
                    <span className={`px-4 py-2 rounded-md text-sm ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                    {/* Topic */}
                    <span className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
                        {problem.topic}
                    </span>
                </div>

                {/* Problem Tabs and Details */}
                <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
                    <div className="w-full lg:w-1/2 space-y-6">
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                            <div className="flex space-x-4 mb-4">
                                {Object.entries(tabIcons).map(([tab, icon]) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center space-x-2 ${activeTab === tab
                                                ? "bg-blue-600 text-white"
                                                : "bg-gray-900 text-gray-300 hover:bg-gray-700"
                                            }`}
                                    >
                                        {icon}
                                        <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                                    </button>
                                ))}
                            </div>

                            {activeTab === "description" && <ProblemDescription problem={problem} />}
                            {activeTab === "hints" && <ProblemHints hints={problem.hints} />}
                            {activeTab === "submissions" && <SubmissionHistory submissions={submissions} setCode={setCode} />}
                        </div>
                    </div>

                    {/* Code Editor Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <CodeEditor
                            code={code}
                            setCode={setCode}
                            isLoggedIn={isLoggedIn}
                            handleLogin={handleLogin}
                            handleSubmit={handleSubmit}
                            problem={problem}
                            elapsedTime={elapsedTime}
                        />

                        {/* Test Results */}
                        {testResults.length > 0 && (
                            <TestResults testResults={testResults} />
                        )}

                        {/* All Test Cases Passed Message */}
                        {isAllPassed && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-green-600 text-white rounded-lg p-6 shadow-lg text-center"
                            >
                                <FaCheckCircle className="text-4xl mb-2 inline-block" />
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
