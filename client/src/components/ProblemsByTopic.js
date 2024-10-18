// import React, { useState, useEffect } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useParams, Link } from 'react-router-dom';
// import api from '../utils/api';

// const ProblemsByTopic = () => {
//   const { topic } = useParams();
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState(new Set());

//   useEffect(() => {
//     const fetchProblemsByTopic = async () => {
//       try {
//         const res = await api.get(`/problems/topic/${topic}`); // Fetch problems by topic
//         setProblems(res.data);

//         // Fetch solved problems
//         const userID = localStorage.getItem('userID');
//         if (userID) {
//           const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
//           setSolvedProblems(new Set(solvedRes.data));
//         }
//       } catch (err) {
//         console.error('Error fetching problems:', err);
//       }
//     };

//     fetchProblemsByTopic();
//   }, [topic]);

//   return (
//     <div className="bg-gray-900 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <h1 className="text-4xl text-green-400 mb-8 font-mono">{topic} Problems</h1>

//         <div className="overflow-x-auto">
//           <table className="w-full bg-gray-800 rounded-lg">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 text-left w-16">Status</th>
//                 <th className="px-4 py-3 text-left">Title</th>
//                 <th className="px-4 py-3 text-left w-24">Difficulty</th>
//               </tr>
//             </thead>
//             <tbody>
//               {problems.map((problem) => (
//                 <motion.tr
//                   key={problem._id}
//                   className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <td className="px-4 py-3">
//                     <FaCheckCircle
//                       className={`text-2xl ${
//                         solvedProblems.has(problem._id) ? 'text-green-400' : 'text-gray-500'
//                       }`}
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <Link
//                       to={`/problems/${problem._id}`}
//                       className="text-green-400 hover:text-green-300 transition duration-300"
//                     >
//                       {problem.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-3">{problem.difficulty}</td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemsByTopic;


// import React, { useState, useEffect } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useParams, Link } from 'react-router-dom';
// import api from '../utils/api';

// const ProblemsByTopic = () => {
//   const { topic } = useParams();
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState(new Set());

//   useEffect(() => {
//     const fetchProblemsByTopic = async () => {
//       try {
//         const res = await api.get(`/problems/topic/${topic}`); // Fetch problems by topic
//         console.log(res.data);
//         setProblems(res.data);

//         // Fetch solved problems
//         const userID = localStorage.getItem('userID');
//         if (userID) {
//           const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
//           setSolvedProblems(new Set(solvedRes.data));
//         }
//       } catch (err) {
//         console.error('Error fetching problems:', err);
//       }
//     };

//     fetchProblemsByTopic();
//   }, [topic]);

//   return (
//     <div className="bg-gray-900 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <h1 className="text-4xl text-green-400 mb-8 font-mono">{topic} Problems</h1>

//         <div className="overflow-x-auto">
//           <table className="w-full bg-gray-800 rounded-lg">
//             <thead className="bg-gray-700">
//               <tr>
//                 <th className="px-4 py-3 text-left w-16">Status</th>
//                 <th className="px-4 py-3 text-left">Title</th>
//                 <th className="px-4 py-3 text-left w-24">Difficulty</th>
//               </tr>
//             </thead>
//             <tbody>
//               {problems.map((problem) => (
//                 <motion.tr
//                   key={problem._id}
//                   className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <td className="px-4 py-3">
//                     <FaCheckCircle
//                       className={`text-2xl ${
//                         solvedProblems.has(problem._id) ? 'text-green-400' : 'text-gray-500'
//                       }`}
//                     />
//                   </td>
//                   <td className="px-4 py-3">
//                     <Link
//                       to={`/problems/${problem._id}`}
//                       className="text-green-400 hover:text-green-300 transition duration-300"
//                     >
//                       {problem.title}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-3">{problem.difficulty}</td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemsByTopic;

// ----------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { useParams, Link } from 'react-router-dom';
// import api from '../utils/api';

// const ProblemsByTopic = () => {
//   const { topic } = useParams();
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState(new Set());

//   useEffect(() => {
//     const fetchProblemsByTopic = async () => {
//       try {
//         const res = await api.get(`/problems/topic/${topic}`); // Fetch problems by topic
//         setProblems(res.data);

//         // Fetch solved problems
//         const userID = localStorage.getItem('userID');
//         if (userID) {
//           const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
//           setSolvedProblems(new Set(solvedRes.data));
//         }
//       } catch (err) {
//         console.error('Error fetching problems:', err);
//       }
//     };

//     fetchProblemsByTopic();
//   }, [topic]);

//   return (
//     <div className="bg-gray-900 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <h1 className="text-6xl text-white font-extrabold text-center mb-10">Explore {topic} Problems</h1>

//         <div className="overflow-hidden shadow-xl rounded-lg">
//           <div className="bg-gray-800 rounded-t-lg p-4">
//             <h2 className="text-3xl text-white text-center mb-4">Problem List</h2>
//             <p className="text-gray-400 text-center">Click on a title to view problem details</p>
//           </div>

//           <div className="bg-gray-900 rounded-b-lg">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-800">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-200">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-200">Title</th>
//                   <th className="px-6 py-4 text-left text-sm font-medium text-gray-200">Difficulty</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {problems.map((problem) => (
//                   <motion.tr
//                     key={problem._id}
//                     className="hover:bg-gray-800 transition duration-300" // Simple dark hover effect
//                     whileHover={{ scale: 1.02 }} // Slightly increase scale on hover
//                   >
//                     <td className="px-6 py-4">
//                       <FaCheckCircle
//                         className={`text-2xl ${solvedProblems.has(problem._id) ? 'text-green-400' : 'text-gray-500'}`}
//                       />
//                     </td>
//                     <td className="px-6 py-4">
//                       <Link
//                         to={`/problems/${problem._id}`}
//                         className="text-white transition duration-300 font-semibold border-b-2 border-transparent"
//                       >
//                         {problem.title}
//                       </Link>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className={`text-sm font-bold ${problem.difficulty === 'Easy' ? 'text-green-400' : problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
//                         {problem.difficulty}
//                       </span>
//                     </td>
//                   </motion.tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemsByTopic;


// ----------------------------------------------------------

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Clock, Terminal, ChevronRight, 
  Layout, Loader2, AlertCircle, CheckCircle2,
  BookOpen, Filter
} from 'lucide-react';

const ProblemsByTopic = () => {
  const { topic } = useParams();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  // Mock difficulties - replace with your actual difficulties
  const difficulties = [
    { id: 'all', name: 'All Difficulties' },
    { id: 'Easy', name: 'Easy' },
    { id: 'Medium', name: 'Medium' },
    { id: 'Hard', name: 'Hard' }
  ];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        // Replace with your actual API call
        const res = await fetch(`/api/problems/topic/${topic}`);
        const data = await res.json();
        setProblems(data);

        // Fetch solved problems
        const userID = localStorage.getItem('userID');
        if (userID) {
          const solvedRes = await fetch(`/api/problems/${userID}/solved-problems`);
          const solvedData = await solvedRes.json();
          setSolvedProblems(new Set(solvedData));
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching problems:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [topic]);

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const ProblemCard = ({ problem }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative"
    >
      <Link 
        to={`/problems/${problem._id}`}
        className="block"
      >
        <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-500/10 p-2">
                  {solvedProblems.has(problem._id) ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <Terminal className="h-5 w-5 text-indigo-400" />
                  )}
                </div>
                <h3 className="font-semibold text-slate-200">
                  {problem.title}
                </h3>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Filter className="h-4 w-4" />
                <span className={`
                  ${problem.difficulty === 'Easy' ? 'text-green-400' : 
                    problem.difficulty === 'Medium' ? 'text-yellow-400' : 
                    'text-red-400'}
                `}>
                  {problem.difficulty}
                </span>
              </div>
              {problem.timeLimit && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{problem.timeLimit} sec</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold text-white"
          >
            {topic.charAt(0).toUpperCase() + topic.slice(1)} Problems
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            Master your coding skills with our curated problem set
          </motion.p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-3 pl-12 pr-4 text-slate-200 placeholder-slate-400 transition-colors duration-300 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </motion.div>

          {/* Difficulty Filters */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedDifficulty === difficulty.id
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400'
                    : 'border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600/50 hover:bg-slate-700/50'
                }`}
              >
                {difficulty.name}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Problems Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>Error loading problems: {error}</p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem._id} problem={problem} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProblems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Search className="mb-4 h-12 w-12 text-slate-400" />
            <h3 className="mb-2 text-lg font-semibold text-slate-200">No problems found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProblemsByTopic;