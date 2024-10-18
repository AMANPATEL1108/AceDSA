// import React, { useState, useEffect } from "react";
// import api from "../utils/api";
// import { FaCheckCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const Problems = () => {
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState(new Set());

//   useEffect(() => {
//     const fetchProblemsAndUserProgress = async () => {
//       try {
//         // Fetch problems
//         const res = await api.get("/problems");
//         setProblems(res.data);

//         // Fetch user ID from local storage
//         const userID = localStorage.getItem("userID");

//         if (userID) {
//           // Fetch user's solved problems based on their ID
//           const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
//           setSolvedProblems(new Set(solvedRes.data));
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchProblemsAndUserProgress();
//   }, []);

//   const solvedCount = solvedProblems.size;
//   const totalProblems = problems.length;
//   const completionPercentage =
//     totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

//   return (
//     <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold mb-4 text-green-400">Problems</h2>
//         {/* Progress Bar Section */}
//         <div className="bg-gray-800 rounded-lg p-4 mb-8">
//           <p className="text-xl mb-2">
//             Progress: {solvedCount} / {totalProblems} problems solved
//           </p>
//           <div className="w-full bg-gray-700 rounded-full h-4">
//             <div
//               className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
//               style={{ width: `${completionPercentage}%` }}
//             ></div>
//           </div>
//           <p className="text-right mt-1">
//             {completionPercentage.toFixed(1)}% complete
//           </p>
//         </div>

//         {/* Problems Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 text-left w-16">Status</th>
//                 <th className="px-4 py-3 text-left">Title</th>
//                 <th className="px-4 py-3 text-left w-24">Difficulty</th>
//                 <th className="px-4 py-3 text-left w-32">Topic</th>
//               </tr>
//             </thead>
//             <tbody>
//               {problems.map((problem) => (
//                 <tr
//                   key={problem._id}
//                   className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
//                 >
//                   <td className="px-4 py-3">
//                     <FaCheckCircle
//                       className={`text-2xl ${
//                         solvedProblems.has(problem._id)
//                           ? "text-green-400"
//                           : "text-gray-500"
//                       }`}
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <Link
//                       to={`/problems/${problem._id}`}
//                       state={{ isSolved: solvedProblems.has(problem._id) }}
//                       className="text-green-400 hover:text-green-300 transition duration-300"
//                     >
//                       {problem.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-3">{problem.difficulty}</td>
//                   <td className="px-4 py-3">{problem.topic}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Problems;

// ---------------------------------------------------------


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import api from "../utils/api";
// import { FaCheckCircle } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import MatrixBackground from "./MatrixBackground"; // Assuming this is a background animation similar to the matrix

// const Problems = () => {
//   const [problems, setProblems] = useState([]);
// const [solvedProblems, setSolvedProblems] = useState(new Set());

//   useEffect(() => {
//     const fetchProblemsAndUserProgress = async () => {
//       try {
//         // Fetch problems
//         const res = await api.get("/problems");
//         setProblems(res.data);

//         // Fetch user ID from local storage
//         const userID = localStorage.getItem("userID");

// if (userID) {
//   // Fetch user's solved problems based on their ID
//   const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
//   setSolvedProblems(new Set(solvedRes.data));
// }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };

//     fetchProblemsAndUserProgress();
//   }, []);

// const solvedCount = solvedProblems.size;
// const totalProblems = problems.length;
// const completionPercentage =
//   totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

//   return (
//     <div className="relative bg-gray-900 text-gray-100 font-mono min-h-screen">
//       <MatrixBackground />
//       <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
//         <motion.h2
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl font-bold mb-4 text-green-400"
//         >
//           Problems
//         </motion.h2>

// {/* Progress Bar Section */}
// <motion.div
//   initial={{ opacity: 0, scale: 0.8 }}
//   animate={{ opacity: 1, scale: 1 }}
//   transition={{ duration: 0.5 }}
//   className="bg-gray-800 rounded-lg p-4 mb-8"
// >
//   <p className="text-xl mb-2">
//     Progress: {solvedCount} / {totalProblems} problems solved
//   </p>
//   <div className="w-full bg-gray-700 rounded-full h-4">
//     <motion.div
//       initial={{ width: 0 }}
//       animate={{ width: `${completionPercentage}%` }}
//       transition={{ duration: 0.5, ease: "easeInOut" }}
//       className="bg-green-500 h-4 rounded-full"
//     ></motion.div>
//   </div>
//   <p className="text-right mt-1">
//     {completionPercentage.toFixed(1)}% complete
//   </p>
// </motion.div>

//         {/* Problems Table */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="overflow-x-auto"
//         >
//           <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 text-left w-16">Status</th>
//                 <th className="px-4 py-3 text-left">Title</th>
//                 <th className="px-4 py-3 text-left w-24">Difficulty</th>
//                 <th className="px-4 py-3 text-left w-32">Topic</th>
//               </tr>
//             </thead>
//             <tbody>
//               {problems.map((problem, index) => (
//                 <motion.tr
//                   key={problem._id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
//                 >
//                   <td className="px-4 py-3">
//                     <FaCheckCircle
//                       className={`text-2xl ${
//                         solvedProblems.has(problem._id)
//                           ? "text-green-400"
//                           : "text-gray-500"
//                       }`}
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <Link
//                       to={`/problems/${problem._id}`}
//                       state={{ isSolved: solvedProblems.has(problem._id) }}
//                       className="text-green-400 hover:text-green-300 transition duration-300"
//                     >
//                       {problem.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-3">{problem.difficulty}</td>
//                   <td className="px-4 py-3">{problem.topic}</td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Problems;


// --------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../utils/api';

// const Problems = () => {
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await api.get('/problems/topics'); // Fetch the topics
//         console.log(res.data);
//         setTopics(res.data);
//       } catch (err) {
//         console.error('Error fetching topics:', err);
//       }
//     };

//     fetchTopics();
//   }, []);

//   return (
//     <div className="bg-gray-900 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <h1 className="text-4xl text-green-400 mb-8 text-center font-mono">Select a Topic</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {topics.map((topic, index) => (
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               key={index} // Use index as key since topics are strings
//               className="bg-gray-800 text-green-400 p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
//             >
//               <Link to={`/problems/topic/${topic}`} className="block text-2xl font-bold">
//                 {topic} {/* Directly use the topic name */}
//               </Link>
//               {/* Optional: You can add a short description if needed */}
//               <p className="mt-2 text-sm">Explore problems related to {topic}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Problems;

// ----------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../utils/api';
// import { FaPuzzlePiece } from 'react-icons/fa'; // Using an icon library for visual elements

// const Problems = () => {
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await api.get('/problems/topics'); // Fetch the topics
//         console.log(res.data);
//         setTopics(res.data);
//       } catch (err) {
//         console.error('Error fetching topics:', err);
//       }
//     };

//     fetchTopics();
//   }, []);

//   return (
//     <div className="bg-gray-900 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <h1 className="text-5xl text-cyan-400 mb-12 text-center font-bold">Explore Programming Problems</h1>
//         <p className="text-lg text-gray-300 mb-8 text-center">Select a topic below to start practicing!</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {topics.map((topic, index) => (
//             <motion.div
//               whileHover={{ scale: 1.05, rotateZ: 3 }} // Slight rotation effect on hover
//               whileTap={{ scale: 0.95 }} // Scale down when tapped
//               key={index}
//               className="bg-gray-800 text-white p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out cursor-pointer hover:shadow-lg hover:bg-gray-700"
//             >
//               <Link to={`/problems/topic/${topic}`} className="flex items-center space-x-4">
//                 <FaPuzzlePiece className="text-4xl text-cyan-400" />
//                 <div>
//                   <h2 className="text-2xl font-semibold hover:text-cyan-300">{topic}</h2>
//                   <p className="mt-1 text-sm text-gray-400">Explore problems related to {topic}</p>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Problems;


// -------------------------------------------------

  // import React, { useState, useEffect } from 'react';
  // import { Link } from 'react-router-dom';
  // import { motion } from 'framer-motion';
  // import api from '../utils/api';
  // import { FaPuzzlePiece, FaList, FaTree, FaSort, FaSearch, FaLink, FaSitemap, FaCubes, FaStream, FaLayerGroup, FaMicrochip, FaRedo, FaHashtag, FaCode, FaFileAlt, FaInfinity, FaBrain, FaTools, FaDatabase, FaClipboardList, FaDollarSign } from 'react-icons/fa'; // Import necessary icons
  // import { PiGraph } from "react-icons/pi";
  // import { GiMaze } from "react-icons/gi";
  // import { BiMath } from "react-icons/bi";

  // const topicIcons = {
  //   Arrays: <FaList className="text-4xl text-cyan-400" />,
  //   Strings: <FaFileAlt className="text-4xl text-cyan-400" />,
  //   Trees: <FaTree className="text-4xl text-cyan-400" />,
  //   Graphs: <PiGraph className="text-4xl text-cyan-400" />,
  //   DynamicProgramming: <FaBrain className="text-4xl text-cyan-400" />,
  //   Backtracking: <GiMaze className="text-4xl text-cyan-400" />,
  //   Sorting: <FaSort className="text-4xl text-cyan-400" />,
  //   Searching: <FaSearch className="text-4xl text-cyan-400" />,
  //   Databases: <FaDatabase className="text-4xl text-cyan-400" />,
  //   LinkedLists: <FaLink className="text-4xl text-cyan-400" />,
  //   Stacks: <FaLayerGroup className="text-4xl text-cyan-400" />,
  //   Queues: <FaStream className="text-4xl text-cyan-400" />,
  //   Hashing: <FaHashtag className="text-4xl text-cyan-400" />,
  //   BitManipulation: <FaMicrochip className="text-4xl text-cyan-400" />,
  //   Recursion: <FaRedo className="text-4xl text-cyan-400" />,
  //   Heaps: <FaCubes className="text-4xl text-cyan-400" />,
  //   Tries: <FaSitemap className="text-4xl text-cyan-400" />,
  //   Greedy: <FaDollarSign className="text-4xl text-cyan-400" />,
  //   Math: <BiMath className="text-4xl text-cyan-400" />,
  //   HashTables: <FaClipboardList className="text-4xl text-cyan-400" />,
  //   // Add more topics and their corresponding icons here
  // };

  // const topics = [
  //   'Arrays',
  //   'Strings',
  //   'LinkedLists',
  //   'Stacks',
  //   'Queues',
  //   'HashTables',
  //   'Recursion',
  //   'Sorting',
  //   'Searching',
  //   'Trees',
  //   'Heaps',
  //   'Graphs',
  //   'DynamicProgramming',
  //   'Greedy',
  //   'Backtracking',
  //   'BitManipulation',
  //   'Math'
  // ];


  // const Problems = () => {
  //   const [topics, setTopics] = useState([]);
  //   const [solvedProblems, setSolvedProblems] = useState(new Set());

  //   useEffect(() => {
  //     const fetchTopics = async () => {
  //       try {
  //         const res = await api.get('/problems/topics'); // Fetch the topics
  //         console.log(res.data);
  //         setTopics(res.data);

  //         const userID = localStorage.getItem('userID');
  //         if (userID) {
  //           // Fetch user's solved problems based on their ID
  //           const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
  //           setSolvedProblems(new Set(solvedRes.data));
  //         }
  //       } catch (err) {
  //         console.error('Error fetching topics:', err);
  //       }
  //     };

  //     fetchTopics();
  //   }, []);

  //   const solvedCount = solvedProblems.size;
  //   const totalProblems = topics.length;
  //   const completionPercentage =
  //     totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

  //   return (
  //     <div className="bg-gray-900 min-h-screen py-12">
  //       <div className="max-w-7xl mx-auto px-6">
  //         {/* Progress Bar Section */}
  //         <motion.div
  //           initial={{ opacity: 0, scale: 0.8 }}
  //           animate={{ opacity: 1, scale: 1 }}
  //           transition={{ duration: 0.5 }}
  //           className="bg-gray-800 rounded-lg p-6 mb-12 shadow-lg"
  //         >
  //           <p className="text-xl text-cyan-400 font-semibold mb-3">
  //             Progress: {solvedCount} / {totalProblems} problems solved
  //           </p>
  //           <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
  //             <motion.div
  //               initial={{ width: 0 }}
  //               animate={{ width: `${completionPercentage}%` }}
  //               transition={{ duration: 0.5, ease: "easeInOut" }}
  //               className="bg-green-500 h-4 rounded-full"
  //             ></motion.div>
  //           </div>
  //           <p className="text-right text-cyan-400 font-medium">
  //             {completionPercentage.toFixed(1)}% complete
  //           </p>
  //         </motion.div>
    
  //         {/* Header Section */}
  //         <h1 className="text-5xl text-cyan-400 mb-12 text-center font-bold">Explore Programming Problems</h1>
  //         <p className="text-lg text-gray-300 mb-8 text-center">Select a topic below to start practicing!</p>
    
  //         {/* Topics Grid */}
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {topics.map((topic, index) => (
  //             <Link
  //               key={index}
  //               to={`/problems/topic/${topic}`}
  //               className="block h-full"
  //             >
  //               <motion.div
  //                 whileHover={{ scale: 1.05, rotateZ: 3 }}
  //                 whileTap={{ scale: 0.95 }}
  //                 className="h-full bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out cursor-pointer hover:shadow-2xl hover:bg-gray-700"
  //               >
  //                 <div className="flex flex-col items-center space-y-4 h-full">
  //                   <div className="flex-shrink-0">
  //                     {topicIcons[topic] || <FaPuzzlePiece className="text-4xl text-cyan-400" />}
  //                   </div>
  //                   <div className="text-center">
  //                     <h2 className="text-2xl font-semibold hover:text-cyan-300">{topic}</h2>
  //                     <p className="mt-1 text-sm text-gray-400">Explore problems related to {topic}</p>
  //                   </div>
  //                 </div>
  //               </motion.div>
  //             </Link>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
    
  // };

  // export default Problems;


  // -----------------------------------------------------------

//   import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import api from '../utils/api';
// import { FaPuzzlePiece, FaList, FaTree, FaArrowRight , FaSort, FaSearch, FaLink, FaSitemap, FaCubes, FaStream, FaLayerGroup, FaMicrochip, FaRedo, FaHashtag, FaCode, FaFileAlt, FaInfinity, FaBrain, FaTools, FaDatabase, FaClipboardList, FaDollarSign } from 'react-icons/fa';
// import { PiGraph } from "react-icons/pi";
// import { GiMaze } from "react-icons/gi";
// import { BiMath } from "react-icons/bi";

// const topicIcons = {
//   Arrays: <FaList className="text-4xl text-cyan-400" />,
//   Strings: <FaFileAlt className="text-4xl text-cyan-400" />,
//   Trees: <FaTree className="text-4xl text-cyan-400" />,
//   Graphs: <PiGraph className="text-4xl text-cyan-400" />,
//   DynamicProgramming: <FaBrain className="text-4xl text-cyan-400" />,
//   Backtracking: <GiMaze className="text-4xl text-cyan-400" />,
//   Sorting: <FaSort className="text-4xl text-cyan-400" />,
//   Searching: <FaSearch className="text-4xl text-cyan-400" />,
//   Databases: <FaDatabase className="text-4xl text-cyan-400" />,
//   LinkedLists: <FaLink className="text-4xl text-cyan-400" />,
//   Stacks: <FaLayerGroup className="text-4xl text-cyan-400" />,
//   Queues: <FaStream className="text-4xl text-cyan-400" />,
//   Hashing: <FaHashtag className="text-4xl text-cyan-400" />,
//   BitManipulation: <FaMicrochip className="text-4xl text-cyan-400" />,
//   Recursion: <FaRedo className="text-4xl text-cyan-400" />,
//   Heaps: <FaCubes className="text-4xl text-cyan-400" />,
//   Tries: <FaSitemap className="text-4xl text-cyan-400" />,
//   Greedy: <FaDollarSign className="text-4xl text-cyan-400" />,
//   Math: <BiMath className="text-4xl text-cyan-400" />,
//   HashTables: <FaClipboardList className="text-4xl text-cyan-400" />,
// };

// const topics = [
//   'Arrays',
//   'Strings',
//   'LinkedLists',
//   'Stacks',
//   'Queues',
//   'HashTables',
//   'Recursion',
//   'Sorting',
//   'Searching',
//   'Trees',
//   'Heaps',
//   'Graphs',
//   'DynamicProgramming',
//   'Greedy',
//   'Backtracking',
//   'BitManipulation',
//   'Math'
// ];

// // const Roadmap = () => {
// //   return (
// //     <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-12">
// //       <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Programming Topics Roadmap</h2>
// //       <div className="flex flex-wrap justify-center items-center">
// //         {topics.map((topic, index) => (
// //           <React.Fragment key={topic}>
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5, delay: index * 0.1 }}
// //               className="bg-gray-700 text-white p-4 m-2 rounded-lg shadow-md"
// //             >
// //               <p className="font-semibold">{topic}</p>
// //             </motion.div>
// //             {index < topics.length - 1 && (
// //               <FaArrowRight className="text-cyan-400 mx-2" />
// //             )}
// //           </React.Fragment>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// const Problems = () => {
//   const [solvedProblems, setSolvedProblems] = useState(new Set());
//   const [totalProblems,setTotalProblems] = useState();

//   useEffect(() => {
//     const fetchSolvedProblems = async () => {
//       try {
//         const problemData = await api.get("/problems");
//         console.log(problemData.data.length);
//         setTotalProblems(problemData.data.length);

//         const userID = localStorage.getItem('userID');
//         if (userID) {
//           const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
//           setSolvedProblems(new Set(solvedRes.data));
//         }
//       } catch (err) {
//         console.error('Error fetching solved problems:', err);
//       }
//     };

//     fetchSolvedProblems();
//   }, []);

//   const solvedCount = solvedProblems.size;
//   // const totalProblems = topics.length;
//   const completionPercentage = totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

//   return (
//     <div className="bg-gray-900 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Progress Bar Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gray-800 rounded-lg p-6 mb-12 shadow-lg"
//         >
//           <p className="text-xl text-cyan-400 font-semibold mb-3">
//             Progress: {solvedCount} / {totalProblems} problems solved
//           </p>
//           <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${completionPercentage}%` }}
//               transition={{ duration: 0.5, ease: "easeInOut" }}
//               className="bg-green-500 h-4 rounded-full"
//             ></motion.div>
//           </div>
//           <p className="text-right text-cyan-400 font-medium">
//             {completionPercentage.toFixed(1)}% complete
//           </p>
//         </motion.div>

//         {/* Header Section */}
//         <h1 className="text-5xl text-cyan-400 mb-12 text-center font-bold">Explore Programming Problems</h1>
//         <p className="text-lg text-gray-300 mb-8 text-center">Follow the roadmap below to master programming concepts!</p>

//         {/* Roadmap Section
//         <Roadmap /> */}

//         {/* Topics Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {topics.map((topic, index) => (
//             <Link
//               key={index}
//               to={`/problems/topic/${topic}`}
//               className="block h-full"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05, rotateZ: 3 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="h-full bg-gray-800 text-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out cursor-pointer hover:shadow-2xl hover:bg-gray-700"
//               >
//                 <div className="flex flex-col items-center space-y-4 h-full">
//                   <div className="flex-shrink-0">
//                     {topicIcons[topic] || <FaPuzzlePiece className="text-4xl text-cyan-400" />}
//                   </div>
//                   <div className="text-center">
//                     <h2 className="text-2xl font-semibold hover:text-cyan-300">{topic}</h2>
//                     <p className="mt-1 text-sm text-gray-400">Explore problems related to {topic}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Problems;

// -----------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Award, BookOpen, Clock, ArrowRight, Zap } from 'lucide-react';
import { FaPuzzlePiece, FaList, FaTree, FaArrowRight, FaSort, FaSearch, 
  FaLink, FaSitemap, FaCubes, FaStream, FaLayerGroup, FaMicrochip, 
  FaRedo, FaHashtag, FaCode, FaFileAlt, FaInfinity, FaBrain, 
  FaTools, FaDatabase, FaClipboardList, FaDollarSign } from 'react-icons/fa';
import { PiGraph } from "react-icons/pi";
import { GiMaze } from "react-icons/gi";
import { BiMath } from "react-icons/bi";
import api from '../utils/api';

const topicIcons = {
  Arrays: <FaList className="text-4xl text-cyan-400" />,
  Strings: <FaFileAlt className="text-4xl text-cyan-400" />,
  Trees: <FaTree className="text-4xl text-cyan-400" />,
  Graphs: <PiGraph className="text-4xl text-cyan-400" />,
  DynamicProgramming: <FaBrain className="text-4xl text-cyan-400" />,
  Backtracking: <GiMaze className="text-4xl text-cyan-400" />,
  Sorting: <FaSort className="text-4xl text-cyan-400" />,
  Searching: <FaSearch className="text-4xl text-cyan-400" />,
  Databases: <FaDatabase className="text-4xl text-cyan-400" />,
  LinkedLists: <FaLink className="text-4xl text-cyan-400" />,
  Stacks: <FaLayerGroup className="text-4xl text-cyan-400" />,
  Queues: <FaStream className="text-4xl text-cyan-400" />,
  Hashing: <FaHashtag className="text-4xl text-cyan-400" />,
  BitManipulation: <FaMicrochip className="text-4xl text-cyan-400" />,
  Recursion: <FaRedo className="text-4xl text-cyan-400" />,
  Heaps: <FaCubes className="text-4xl text-cyan-400" />,
  Tries: <FaSitemap className="text-4xl text-cyan-400" />,
  Greedy: <FaDollarSign className="text-4xl text-cyan-400" />,
  Math: <BiMath className="text-4xl text-cyan-400" />,
  HashTables: <FaClipboardList className="text-4xl text-cyan-400" />,
};

const topics = [
  'Arrays', 'Strings', 'LinkedLists', 'Stacks', 'Queues', 'HashTables',
  'Recursion', 'Sorting', 'Searching', 'Trees', 'Heaps', 'Graphs',
  'DynamicProgramming', 'Greedy', 'Backtracking', 'BitManipulation', 'Math'
];

const Problems = () => {
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [recentProgress, setRecentProgress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [problemData, userProgress] = await Promise.all([
          api.get("/problems"),
          fetchUserProgress()
        ]);
        
        setTotalProblems(problemData.data.length);
        setSolvedProblems(new Set(userProgress.solvedProblems));
        setRecentProgress(userProgress.recentProgress);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchUserProgress = async () => {
    const userID = localStorage.getItem('userID');
    if (!userID) return { solvedProblems: [], recentProgress: [] };

    try {
      const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
      // Mock recent progress data - replace with actual API call
      const mockRecentProgress = [
        { date: '2024-03-01', count: 3 },
        { date: '2024-03-02', count: 5 },
        { date: '2024-03-03', count: 2 },
        { date: '2024-03-04', count: 4 },
        { date: '2024-03-05', count: 6 }
      ];

      return {
        solvedProblems: solvedRes.data,
        recentProgress: mockRecentProgress
      };
    } catch (err) {
      console.error('Error fetching user progress:', err);
      return { solvedProblems: [], recentProgress: [] };
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completionPercentage = totalProblems > 0 ? 
    (solvedProblems.size / totalProblems) * 100 : 0;

  const ProgressStats = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/20"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-lg">
            <Award className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Problems Solved</h3>
            <p className="text-2xl font-bold text-cyan-400">{solvedProblems.size}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <BookOpen className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Total Problems</h3>
            <p className="text-2xl font-bold text-purple-400">{totalProblems}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-xl p-6 border border-pink-500/20"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Completion</h3>
            <p className="text-2xl font-bold text-pink-400">
              {completionPercentage.toFixed(1)}%
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const RoadmapView = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-slate-800/50 rounded-xl p-8 mb-12 overflow-hidden"
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        {topics.map((topic, index) => (
          <React.Fragment key={topic}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50"
            >
              <div className="flex items-center gap-3">
                {topicIcons[topic]}
                <span className="text-white font-medium">{topic}</span>
              </div>
            </motion.div>
            {index < topics.length - 1 && (
              <ArrowRight className="text-slate-500" />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Top Banner */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text mb-4"
          >
            Master Programming Concepts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            Track your progress and explore problems across different topics
          </motion.p>
        </div>

        {/* Progress Stats */}
        <ProgressStats />

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/20"
            />
          </div>
          <button
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="px-6 py-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors duration-300"
          >
            {showRoadmap ? 'Hide Roadmap' : 'Show Roadmap'}
          </button>
        </div>

        {/* Roadmap */}
        <AnimatePresence>
          {showRoadmap && <RoadmapView />}
        </AnimatePresence>

        {/* Topics Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/problems/topic/${topic}`} className="block h-full">
                  <motion.div
                    whileHover={{ scale: 1.03, rotateZ: 1 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-colors duration-300"
                  >
                    <div className="flex flex-col items-center gap-6">
                      {topicIcons[topic] || (
                        <FaPuzzlePiece className="text-4xl text-cyan-400" />
                      )}
                      <div className="text-center">
                        <h2 className="text-xl font-semibold text-white mb-2">
                          {topic}
                        </h2>
                        <p className="text-sm text-slate-400">
                          Master {topic.toLowerCase()} concepts through practice
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Problems;