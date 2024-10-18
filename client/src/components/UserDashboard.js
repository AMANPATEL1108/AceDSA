// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import api from '../utils/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaCode, FaTrophy, FaCalendarAlt, FaClock, FaLightbulb, FaChartLine, FaRocket, FaGithub, FaFire, FaMedal, FaMusic, FaTasks, FaBookOpen, FaTrash, FaPalette } from 'react-icons/fa';
// import MusicPlayer from './MusicPlayer';
// import Avatar from 'react-avatar';

// // const themes = {
// //   darkMode: {
// //     bg: 'bg-gray-900',
// //     text: 'text-gray-200',
// //     border: 'border-gray-700',
// //     cardBg: 'bg-gray-800',
// //     buttonBg: 'bg-blue-600',
// //     buttonHover: 'hover:bg-blue-700',
// //   },
// //   solarized: {
// //     bg: 'bg-[#002b36]',
// //     text: 'text-[#839496]',
// //     border: 'border-[#586e75]',
// //     cardBg: 'bg-[#073642]',
// //     buttonBg: 'bg-[#b58900]',
// //     buttonHover: 'hover:bg-[#cb4b16]',
// //   },
// //   monokai: {
// //     bg: 'bg-[#272822]',
// //     text: 'text-[#f8f8f2]',
// //     border: 'border-[#75715e]',
// //     cardBg: 'bg-[#3e3d32]',
// //     buttonBg: 'bg-[#a6e22e]',
// //     buttonHover: 'hover:bg-[#f92672]',
// //   },
// // };

// const themes = {
//   darkMode: {
//     bg: 'bg-gray-900',
//     text: 'text-gray-200',
//     border: 'border-gray-700',
//     cardBg: 'bg-gray-800',
//     buttonBg: 'bg-blue-600',
//     buttonHover: 'hover:bg-blue-700',
//   },
//   dracula: {
//     bg: 'bg-[#282a36]',
//     text: 'text-[#f8f8f2]',
//     border: 'border-[#44475a]',
//     cardBg: 'bg-[#1e1f29]',
//     buttonBg: 'bg-[#ff79c6]',
//     buttonHover: 'hover:bg-[#bd93f9]',
//   },
//   gruvbox: {
//     bg: 'bg-[#282828]',
//     text: 'text-[#ebdbb2]',
//     border: 'border-[#3c3836]',
//     cardBg: 'bg-[#3c3836]',
//     buttonBg: 'bg-[#fabd2f]',
//     buttonHover: 'hover:bg-[#fe8019]',
//   },
//   nord: {
//     bg: 'bg-[#2e3440]',
//     text: 'text-[#d8dee9]',
//     border: 'border-[#4c566a]',
//     cardBg: 'bg-[#3b4252]',
//     buttonBg: 'bg-[#81a1c1]',
//     buttonHover: 'hover:bg-[#5e81ac]',
//   },
//   oneDark: {
//     bg: 'bg-[#282c34]',
//     text: 'text-[#abb2bf]',
//     border: 'border-[#4b5263]',
//     cardBg: 'bg-[#2c323c]',
//     buttonBg: 'bg-[#61afef]',
//     buttonHover: 'hover:bg-[#528bff]',
//   },
//   cobalt: {
//     bg: 'bg-[#002240]',
//     text: 'text-[#ffffff]',
//     border: 'border-[#0e4b82]',
//     cardBg: 'bg-[#002b56]',
//     buttonBg: 'bg-[#ff9800]',
//     buttonHover: 'hover:bg-[#ff5722]',
//   },
// };


// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const { user, logout } = useContext(AuthContext);
//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [motivationalQuote, setMotivationalQuote] = useState('');
//   const [progressData, setProgressData] = useState([]);
//   const [streak, setStreak] = useState(0);
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTheme, setCurrentTheme] = useState('darkMode');

//   const [isSolved, setIsSolved] = useState(location.state?.isSolved || false);
//   // const theme = themes[currentTheme];

//   useEffect(() => {
//     if (user) {
//       setIsLoading(false);
//     }
//     fetchUserData();
//     fetchMotivationalQuote();
//     calculateTotalTime();
//     calculateStreak();
//   }, [user]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     navigate("/login");
//   }

//   // const fetchUserData = async () => {
//   //   try {
//   //     const solvedProblemsIds = user.solvedProblems.slice().reverse();
//   //     const recentSolvedProblems = await Promise.all(
//   //       solvedProblemsIds.slice(0, 5).map(async (problemId) => {
//   //         const response = await api.get(`/problems/${problemId}`);
//   //         return response.data;
//   //       })
//   //     );
//   //     setRecentSubmissions(recentSolvedProblems);

//   //     const progressRes = await api.get(`/users/${user.id}/progress`);
//   //     setProgressData(progressRes.data);
//   //   } catch (error) {
//   //     console.error('Error fetching user data:', error);
//   //   }
//   // };

//   const fetchUserData = async () => {
//   try {
//     const solvedProblemsIds = user.solvedProblems.slice().reverse();
//     const recentSolvedProblems = await Promise.all(
//       solvedProblemsIds.slice(0, 5).map(async (problemId) => {
//         const response = await api.get(`/problems/${problemId}`);
//         return response.data;
//       })
//     );
//     const averageSolveTimes = await fetchAverageSolveTimes(solvedProblemsIds.slice(0, 5));

//     const problemsWithAverageTimes = recentSolvedProblems.map((problem) => {
//       const averageTime = averageSolveTimes.find((time) => time.id === problem._id)?.averageTime || 'N/A';
//       return { ...problem, averageTime };
//     });

//     setRecentSubmissions(problemsWithAverageTimes);

//     const progressRes = await api.get(`/users/${user.id}/progress`);
//     setProgressData(progressRes.data);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };

//   const fetchMotivationalQuote = async () => {
//     try {
//       const response = await api.get('/api/quote');
//       setMotivationalQuote(response.data.content);
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//       setMotivationalQuote("Keep coding, keep growing!");
//     }
//   };

//   const calculateTotalTime = () => {
//     const joinDate = new Date(user.createdAt);
//     const now = new Date();
//     const timeDiff = now - joinDate;
//     setTotalTime(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
//   };

//   // const calculateStreak = () => {
//   //   setStreak(user.solvedProblems.length);
//   // };
//   const calculateStreak = () => {
//   const today = new Date();
//   let currentStreak = 0;
//   let lastSubmissionDate = null;

//   for (let i = user.submissions.length - 1; i >= 0; i--) {
//     const submissionDate = new Date(user.submissions[i].date);
//     if (lastSubmissionDate === null) {
//       lastSubmissionDate = submissionDate;
//       currentStreak = 1;
//     } else {
//       const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
//       if (dayDifference === 1) {
//         currentStreak++;
//         lastSubmissionDate = submissionDate;
//       } else if (dayDifference > 1) {
//         break;
//       }
//     }
//   }

//   const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
//   if (daysSinceLastSubmission > 1) {
//     currentStreak = 0;
//   }

//   setStreak(currentStreak);
// };

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
//       setNewTodo('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleMusic = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const fetchAverageSolveTimes = async (problemIds) => {
//   const averageTimes = await Promise.all(
//     problemIds.map(async (id) => {
//       const response = await api.get(`/problems/average-solve-time/${id}`);
//       return { id, averageTime: response.data.averageTime };
//     })
//   );
//   return averageTimes;
// };

//   const theme = themes[currentTheme];

//   return (
//     <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono`}>
//       <header className={`bg-black ${theme.border} border-b`}>
//         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <Avatar 
//               src={user.avatar} 
//               name={user.username} 
//               size="50" 
//               round={true} 
//               className="mr-4"
//             />
//           <h1 className="text-3xl font-bold">
//             <span className={theme.text}></span> {getGreeting()}, {user.username}!
//           </h1>
//           <div className="flex items-center space-x-4">
//             {/* <button
//               onClick={() => setCurrentTheme(prevTheme =>
//                 prevTheme === 'darkMode' ? 'solarized' :
//                   prevTheme === 'solarized' ? 'monokai' : 'darkMode'
//               )}
//               className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//             >
//               <FaPalette className="inline-block mr-2" /> Change Theme
//             </button> */}
//             <button
//               onClick={() => setCurrentTheme(prevTheme => {
//                 const themeOrder = ['darkMode', 'dracula', 'gruvbox', 'nord', 'oneDark', 'cobalt'];
//                 const currentIndex = themeOrder.indexOf(prevTheme);
//                 const nextIndex = (currentIndex + 1) % themeOrder.length;
//                 return themeOrder[nextIndex];
//               })}
//               className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//             >
//               <FaPalette className="inline-block mr-2" /> Change Theme
//             </button>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate('/');
//               }}
//               className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="grid grid-cols-12 gap-6">
//             <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//               <StatCard icon={FaCode} value={user.solvedProblems.length} label="Problems Solved" theme={theme} />
//               <StatCard icon={FaCalendarAlt} value={totalTime} label="Days Active" theme={theme} />
//               <StatCard icon={FaFire} value={streak} label="Day Streak" theme={theme} />
//               <StatCard icon={FaMedal} value={user.rank || 'N/A'} label="Global Rank" theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//               <MotivationalQuote quote={motivationalQuote} theme={theme} />
//               <ProgressChart data={progressData} theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//               <RecentSubmissions submissions={recentSubmissions} theme={theme} />
//               <QuickActions theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//               <TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} newTodo={newTodo} setNewTodo={setNewTodo} theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//               <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} theme={theme} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, value, label, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 flex items-center justify-between`}
//   >
//     <div>
//       <p className="text-2xl font-bold">{isNaN(value) ? 'N/A' : value}</p>
//       <p className={`text-sm ${theme.text}`}>{label}</p>
//     </div>
//     <Icon className={`text-3xl ${theme.text}`} />
//   </motion.div>
// );

// // const MotivationalQuote = ({ quote, theme }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5, delay: 0.2 }}
// //     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
// //   >
// //     <h2 className="text-xl font-semibold mb-4 flex items-center">
// //       <FaLightbulb className={`mr-2 ${theme.text}`} /> Daily Inspiration
// //     </h2>
// //     <blockquote className={`italic ${theme.text} text-lg`}>{quote}</blockquote>
// //   </motion.div>
// // );

// const programmingQuotes = [
//   "The only way to do great work is to love what you do. - Steve Jobs",
//   "Code is like humor. When you have to explain it, it's bad. - Cory House",
//   "First, solve the problem. Then, write the code. - John Johnson",
//   "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
//   "The best error message is the one that never shows up. - Thomas Fuchs",
//   "Simplicity is the soul of efficiency. - Austin Freeman",
//   "Make it work, make it right, make it fast. - Kent Beck",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
//   "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
//   "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
//   "The function of good software is to make the complex appear to be simple. - Grady Booch",
//   "It's not a bug – it's an undocumented feature. - Anonymous",
//   "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
//   "The best way to predict the future is to implement it. - David Heinemeier Hansson",
//   "Good code is its own best documentation. - Steve McConnell"
// ];

// const getRandomQuote = () => {
//   const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
//   return programmingQuotes[randomIndex];
// };

// const MotivationalQuote = ({ theme }) => {
//   const [quote, setQuote] = useState(getRandomQuote());

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className="text-xl font-semibold mb-4 flex items-center">
//         <FaLightbulb className={`mr-2 ${theme.text}`} /> Daily Inspiration
//       </h2>
//       <blockquote className={`italic ${theme.text} text-lg`}>{quote}</blockquote>
//     </motion.div>
//   );
// };


// const ProgressChart = ({ data, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.4 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaChartLine className={`mr-2 ${theme.text}`} /> Your Progress
//     </h2>
//     <ResponsiveContainer width="100%" height={200}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
//         <XAxis dataKey="date" stroke={theme.text} />
//         <YAxis stroke={theme.text} />
//         <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }} />
//         <Legend />
//         <Line type="monotone" dataKey="problemsSolved" stroke={theme.text} strokeWidth={2} />
//       </LineChart>
//     </ResponsiveContainer>
//   </motion.div>
// );


// const RecentSubmissions = ({ submissions, theme }) => {
//   const [visibleSubmissions, setVisibleSubmissions] = useState(3);

//   const loadMore = () => {
//     setVisibleSubmissions(prev => prev + 3);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//         <FaCode className="mr-2" /> Recent Submissions
//       </h2>
//       <ul className="space-y-3">
//         <AnimatePresence>
//           {submissions.slice(0, visibleSubmissions).map((problem, index) => (
//             <motion.li
//               key={problem._id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className={`p-3 rounded-md ${theme.buttonBg} transition duration-300`}
//             >
//               {/* <Link to={`/problems/${problem._id}`} className={`text-lg font-semibold ${theme.text} hover:opacity-80 transition duration-300`}>
//                 {problem.title}
//               </Link> */}
//               <Link 
//   to={`/problems/${problem._id}`} 
//   state={{ isSolved: true }}
//   className={`text-lg font-semibold ${theme.text} hover:opacity-80 transition duration-300`}
// >
//   {problem.title}
// </Link>
//               <p className={`text-sm ${theme.text} opacity-80`}>
//                 {problem.difficulty} | {problem.topic}
//               </p>
//             </motion.li>
//           ))}
//         </AnimatePresence>
//       </ul>
//       {visibleSubmissions < submissions.length && (
//         <button
//           onClick={loadMore}
//           className={`mt-4 ${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//         >
//           Load More
//         </button>
//       )}
//     </motion.div>
//   );
// };

// const getThemeGradient = (theme, index) => {
//   const gradients = {
//     darkMode: ['from-blue-700 to-blue-900', 'from-indigo-700 to-indigo-900', 'from-purple-700 to-purple-900'],
//     dracula: ['from-pink-700 to-purple-900', 'from-green-700 to-blue-900', 'from-orange-700 to-red-900'],
//     gruvbox: ['from-yellow-700 to-orange-900', 'from-green-700 to-teal-900', 'from-red-700 to-pink-900'],
//     nord: ['from-blue-700 to-indigo-900', 'from-green-700 to-teal-900', 'from-red-700 to-pink-900'],
//     oneDark: ['from-blue-700 to-indigo-900', 'from-green-700 to-teal-900', 'from-red-700 to-orange-900'],
//     cobalt: ['from-blue-800 to-indigo-900', 'from-orange-700 to-red-900', 'from-green-700 to-teal-900']
//   };

//   const themeGradients = gradients[theme.name] || gradients.darkMode;
//   return themeGradients[index % themeGradients.length];
// };

// const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.8 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 overflow-hidden`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaTasks className={`mr-2 ${theme.text}`} /> Todo List
//     </h2>
//     <div className="flex mb-4">
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         className={`flex-grow mr-2 p-2 rounded-md ${theme.cardBg} ${theme.border} border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//         placeholder="Add a new task..."
//       />
//       <button
//         onClick={addTodo}
//         className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300`}
//       >
//         Add
//       </button>
//     </div>
//     <ul className="space-y-2 max-h-60 overflow-y-auto">
//       {todos.map((todo) => (
//         <li
//           key={todo.id}
//           className={`flex items-center justify-between p-2 rounded-md ${theme.cardBg} hover:bg-opacity-80 transition duration-300`}
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id)}
//               className="mr-2"
//             />
//             <span className={todo.completed ? `line-through ${theme.text} opacity-50` : theme.text}>
//               {todo.text}
//             </span>
//           </div>
//           <button
//             onClick={() => deleteTodo(todo.id)}
//             className="text-red-500 hover:text-red-600 transition duration-300"
//           >
//             <FaTrash />
//           </button>
//         </li>
//       ))}
//     </ul>
//   </motion.div>
// );

// // const MusicPlayer = ({ isPlaying, toggleMusic }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5, delay: 1 }}
// //     className="bg-gray-800 border border-green-500 rounded-lg p-6"
// //   >
// //     <h2 className="text-xl font-semibold mb-4 flex items-center">
// //       <FaMusic className="mr-2 text-green-500" /> Focus Music
// //     </h2>
// //     <div className="flex items-center justify-center">
// //       <button
// //         onClick={toggleMusic}
// //         className={`bg-${isPlaying ? 'red' : 'green'}-600 hover:bg-${isPlaying ? 'red' : 'green'}-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-${isPlaying ? 'red' : 'green'}-500 focus:ring-opacity-50`}
// //       >
// //         {isPlaying ? 'Pause' : 'Play'} Focus Music
// //       </button>
// //     </div>
// //   </motion.div>
// // );

// // const QuickActions = () => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5, delay: 1.2 }}
// //     className="bg-gray-800 border border-green-500 rounded-lg p-6"
// //   >
// //     <h2 className="text-xl font-semibold mb-4 flex items-center">
// //       <FaRocket className="mr-2 text-green-500" /> Quick Actions
// //     </h2>
// //     <div className="grid grid-cols-2 gap-4">
// //       <QuickActionButton to="/problems" icon={FaCode} text="Solve Problems" />
// //       <QuickActionButton to="/leaderboard" icon={FaTrophy} text="Leaderboard" />
// //       <QuickActionButton to="/topics" icon={FaBookOpen} text="Study Topics" />
// //       <QuickActionButton href="https://github.com/your-repo" icon={FaGithub} text="Contribute" external />
// //     </div>
// //   </motion.div>
// // );

// // const QuickActionButton = ({ to, href, icon: Icon, text, external }) => {
// //   const baseClasses = "bg-gray-700 hover:bg-gray-600 text-green-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50";

// //   if (external) {
// //     return (
// //       <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
// //         <Icon className="mr-2" /> {text}
// //       </a>
// //     );
// //   }

// //   return (
// //     <Link to={to} className={baseClasses}>
// //       <Icon className="mr-2" /> {text}
// //     </Link>
// //   );
// // };

// const QuickActions = ({ theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 1.2 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//       <FaRocket className="mr-2" /> Quick Actions
//     </h2>
//     <div className="grid grid-cols-2 gap-4">
//       <QuickActionButton to="/problems" icon={FaCode} text="Solve Problems" theme={theme} />
//       <QuickActionButton to="/leaderboard" icon={FaTrophy} text="Leaderboard" theme={theme} />
//       <QuickActionButton to="/topics" icon={FaBookOpen} text="Study Topics" theme={theme} />
//       <QuickActionButton href="https://github.com/your-repo" icon={FaGithub} text="Contribute" external theme={theme} />
//     </div>
//   </motion.div>
// );

// const QuickActionButton = ({ to, href, icon: Icon, text, external, theme }) => {
//   const baseClasses = `${theme.buttonBg} ${theme.buttonHover} ${theme.text} font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-50`;

//   if (external) {
//     return (
//       <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
//         <Icon className="mr-2" /> {text}
//       </a>
//     );
//   }

//   return (
//     <Link to={to} className={baseClasses}>
//       <Icon className="mr-2" /> {text}
//     </Link>
//   );
// };

// // const MusicPlayer = ({ isPlaying, toggleMusic, theme }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5, delay: 1 }}
// //     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
// //   >
// //     <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
// //       <FaMusic className="mr-2" /> Focus Music
// //     </h2>
// //     <div className="flex items-center justify-center">
// //       <button
// //         onClick={toggleMusic}
// //         className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
// //       >
// //         {isPlaying ? 'Pause' : 'Play'} Focus Music
// //       </button>
// //     </div>
// //   </motion.div>
// // );

// <MusicPlayer/>

// export default UserDashboard;


// ----------------------------------------------------------------

// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import api from '../utils/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaCode, FaTrophy, FaCalendarAlt, FaClock, FaLightbulb, FaChartLine, FaRocket, FaGithub, FaFire, FaMedal, FaMusic, FaTasks, FaBookOpen, FaTrash, FaPalette } from 'react-icons/fa';
// import MusicPlayer from './MusicPlayer';
// import Avatar from 'react-avatar';

// const themes = {
//   darkMode: {
//     bg: 'bg-gray-900',
//     text: 'text-gray-200',
//     border: 'border-gray-700',
//     cardBg: 'bg-gray-800',
//     buttonBg: 'bg-blue-600',
//     buttonHover: 'hover:bg-blue-700',
//   },
//   dracula: {
//     bg: 'bg-[#282a36]',
//     text: 'text-[#f8f8f2]',
//     border: 'border-[#44475a]',
//     cardBg: 'bg-[#1e1f29]',
//     buttonBg: 'bg-[#ff79c6]',
//     buttonHover: 'hover:bg-[#bd93f9]',
//   },
//   gruvbox: {
//     bg: 'bg-[#282828]',
//     text: 'text-[#ebdbb2]',
//     border: 'border-[#3c3836]',
//     cardBg: 'bg-[#3c3836]',
//     buttonBg: 'bg-[#fabd2f]',
//     buttonHover: 'hover:bg-[#fe8019]',
//   },
//   nord: {
//     bg: 'bg-[#2e3440]',
//     text: 'text-[#d8dee9]',
//     border: 'border-[#4c566a]',
//     cardBg: 'bg-[#3b4252]',
//     buttonBg: 'bg-[#81a1c1]',
//     buttonHover: 'hover:bg-[#5e81ac]',
//   },
//   oneDark: {
//     bg: 'bg-[#282c34]',
//     text: 'text-[#abb2bf]',
//     border: 'border-[#4b5263]',
//     cardBg: 'bg-[#2c323c]',
//     buttonBg: 'bg-[#61afef]',
//     buttonHover: 'hover:bg-[#528bff]',
//   },
//   cobalt: {
//     bg: 'bg-[#002240]',
//     text: 'text-[#ffffff]',
//     border: 'border-[#0e4b82]',
//     cardBg: 'bg-[#002b56]',
//     buttonBg: 'bg-[#ff9800]',
//     buttonHover: 'hover:bg-[#ff5722]',
//   },
// };

// const UserDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [motivationalQuote, setMotivationalQuote] = useState('');
//   const [progressData, setProgressData] = useState([]);
//   const [streak, setStreak] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [totalTimeSpent, setTotalTimeSpent] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(true);
//   const [sessionStartTime, setSessionStartTime] = useState(Date.now());
//   // const [currentTheme, setCurrentTheme] = useState('darkMode');
//   const [currentTheme, setCurrentTheme] = useState(() => {
//     return localStorage.getItem('userTheme') || 'darkMode';
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [todos, setTodos] = useState(() => {
//     const storedTodos = localStorage.getItem('userTodos');
//     return storedTodos ? JSON.parse(storedTodos) : [];
//   });
//   const [newTodo, setNewTodo] = useState('');



//   const fetchUserData = useCallback(async () => {
//     try {
//       const response = await api.get('/auth/user-data');
//       setTotalTimeSpent(response.data.totalTimeSpent);
//       const solvedProblemsIds = user.solvedProblems.slice().reverse();
//       const recentSolvedProblems = await Promise.all(
//         solvedProblemsIds.slice(0, 5).map(async (problemId) => {
//           const response = await api.get(`/problems/${problemId}`);
//           return response.data;
//         })
//       );
//       setRecentSubmissions(recentSolvedProblems);

//       const progressRes = await api.get(`/users/${user.id}/progress`);
//       setProgressData(progressRes.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }, [user]);

//   const fetchMotivationalQuote = useCallback(async () => {
//     try {
//       const response = await api.get('/api/quote');
//       setMotivationalQuote(response.data.content);
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//       setMotivationalQuote("Keep coding, keep growing!");
//     }
//   }, []);
//     const calculateTotalTime = useCallback(() => {
//       if (user && user.createdAt) {
//         const joinDate = new Date(user.createdAt);
//         const now = new Date();
//         const timeDiff = now - joinDate;
//         setTotalTime(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
//       } else {
//         setTotalTime(0);
//       }
//     }, [user]);

//   // const calculateStreak = useCallback(() => {
//   //   const today = new Date();
//   //   let currentStreak = 0;
//   //   let lastSubmissionDate = null;

//   //   for (let i = user.submissions.length - 1; i >= 0; i--) {
//   //     const submissionDate = new Date(user.submissions[i].date);
//   //     if (lastSubmissionDate === null) {
//   //       lastSubmissionDate = submissionDate;
//   //       currentStreak = 1;
//   //     } else {
//   //       const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
//   //       if (dayDifference === 1) {
//   //         currentStreak++;
//   //         lastSubmissionDate = submissionDate;
//   //       } else if (dayDifference > 1) {
//   //         break;
//   //       }
//   //     }
//   //   }

//   //   const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
//   //   if (daysSinceLastSubmission > 1) {
//   //     currentStreak = 0;
//   //   }

//   //   setStreak(currentStreak);
//   // }, [user.submissions]);

//   const calculateStreak = useCallback(() => {
//   if (!user || !user.submissions) {
//     setStreak(0);
//     return;
//   }

//   const today = new Date();
//   let currentStreak = 0;
//   let lastSubmissionDate = null;

//   for (let i = user.submissions.length - 1; i >= 0; i--) {
//     const submissionDate = new Date(user.submissions[i].date);
//     if (lastSubmissionDate === null) {
//       lastSubmissionDate = submissionDate;
//       currentStreak = 1;
//     } else {
//       const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
//       if (dayDifference === 1) {
//         currentStreak++;
//         lastSubmissionDate = submissionDate;
//       } else if (dayDifference > 1) {
//         break;
//       }
//     }
//   }

//   const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
//   if (daysSinceLastSubmission > 1) {
//     currentStreak = 0;
//   }

//   setStreak(currentStreak);
// }, [user]);
//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
//       setNewTodo('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleMusic = () => {
//     setIsPlaying(!isPlaying);
//   };

//   // const updateTotalTimeSpent = async () => {
//   //   const timeSpent = Math.floor((Date.now() - sessionStartTime) / 1000);
//   //   try {
//   //     const response = await api.post('/auth/update-time', { timeSpent });
//   //     setTotalTimeSpent(response.data.totalTimeSpent);
//   //   } catch (error) {
//   //     console.error('Error updating total time spent:', error);
//   //   }
//   // };

//   const handleBeforeUnload = () => {
//     updateTotalTimeSpent();
//   };

//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       setIsTimerRunning(false);
//       updateTotalTimeSpent();
//     } else {
//       setIsTimerRunning(true);
//     }
//   };

//   const updateTotalTimeSpent = async () => {
//     try {
//       await api.post('/auth/update-time', { timeSpent: totalTimeSpent });
//     } catch (error) {
//       console.error('Error updating total time spent:', error);
//     }
//   };

//     // useEffect(() => {
//     //   if (user) {
//     //     fetchUserData();
//     //     fetchMotivationalQuote();
//     //     calculateTotalTime();
//     //     calculateStreak();
//     //   }
//     // }, [user, fetchUserData, fetchMotivationalQuote, calculateTotalTime, calculateStreak]);
//     useEffect(() => {
//       const fetchData = async () => {
//         setIsLoading(true);
//         if (user) {
//           await Promise.all([
//             fetchUserData(),
//             fetchMotivationalQuote(),
//             calculateTotalTime(),
//             calculateStreak(),
//             setSessionStartTime(Date.now())
//           ]);
//         }
//         setIsLoading(false);
//       };

//       fetchData();
//     }, [user, fetchUserData, fetchMotivationalQuote, calculateTotalTime, calculateStreak]);

//     useEffect(() => {
//       localStorage.setItem('userTheme', currentTheme);
//     }, [currentTheme]);

//     useEffect(() => {
//       localStorage.setItem('userTodos', JSON.stringify(todos));
//     }, [todos]);

//     // useEffect(() => {
//     //   const timer = setInterval(() => {
//     //     setTotalTimeSpent(prevTime => prevTime + 1);
//     //   }, 1000);

//     //   return () => {
//     //     clearInterval(timer);
//     //     updateTotalTimeSpent();
//     //   };
//     // }, []);

//     useEffect(() => {
//       let timer;
//       if (isTimerRunning) {
//         timer = setInterval(() => {
//           setTotalTimeSpent(prevTime => prevTime + 1);
//         }, 1000);
//       }

//       return () => {
//         clearInterval(timer);
//         updateTotalTimeSpent();
//       };
//     }, [isTimerRunning]);

//     useEffect(() => {
//       window.addEventListener('beforeunload', handleBeforeUnload);
//       document.addEventListener('visibilitychange', handleVisibilityChange);

//       return () => {
//         window.removeEventListener('beforeunload', handleBeforeUnload);
//         document.removeEventListener('visibilitychange', handleVisibilityChange);
//       };
//     }, []);

//     // const addTodo = () => {
//     //   if (newTodo.trim()) {
//     //     setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
//     //     setNewTodo('');
//     //   }
//     // };

//     // const toggleTodo = (id) => {
//     //   setTodos(todos.map(todo =>
//     //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     //   ));
//     // };

//     // const deleteTodo = (id) => {
//     //   setTodos(todos.filter(todo => todo.id !== id));
//     // };

//   const theme = themes[currentTheme];



//   return (
//     // <>
//     // {isLoading ? (
//     //   <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono flex items-center justify-center`}>
//     //     <div className="text-3xl">Loading...</div>
//     //   </div>
//     // ) : (
//       <>
//       {isLoading ? (
//         <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono flex items-center justify-center`}>
//           <div className="text-3xl">Loading...</div>
//         </div>
//       ) : (
//       <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono`}>
//       <header className={`bg-black ${theme.border} border-b`}>
//         <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//           <Avatar 
//             src={user.avatar} 
//             name={user.username} 
//             size="50" 
//             round={true} 
//             className="mr-4"
//           />
//           <h1 className="text-3xl font-bold">
//             <span className={theme.text}></span> {getGreeting()}, {user.username || 'Guest'}
//           </h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => setCurrentTheme(prevTheme => {
//                 const themeOrder = ['darkMode', 'dracula', 'gruvbox', 'nord', 'oneDark', 'cobalt'];
//                 const currentIndex = themeOrder.indexOf(prevTheme);
//                 const nextIndex = (currentIndex + 1) % themeOrder.length;
//                 return themeOrder[nextIndex];
//               })}
//               className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//             >
//               <FaPalette className="inline-block mr-2" /> Change Theme
//             </button>
//             <button
//               onClick={() => {
//                 logout();
//                 navigate('/');
//               }}
//               className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="grid grid-cols-12 gap-6">
//             <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//               <StatCard icon={FaCode} value={user?.solvedProblems?.length || 0} label="Problems Solved" theme={theme} />
//               <StatCard icon={FaCalendarAlt} value={totalTime} label="Days Active" theme={theme} />
//               <StatCard icon={FaFire} value={streak} label="Day Streak" theme={theme} />
//               <StatCard icon={FaMedal} value={user.rank || 'N/A'} label="Global Rank" theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//               <MotivationalQuote quote={motivationalQuote} theme={theme} />
//               <ProgressChart data={progressData} theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//               <RecentSubmissions submissions={recentSubmissions} theme={theme} />
//               <QuickActions theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//               <TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} newTodo={newTodo} setNewTodo={setNewTodo} theme={theme} />
//             </div>

//             <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//               <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} theme={theme} />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//     )}
//     </>
//   );
// }; */}
// <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//             <div className="px-4 py-6 sm:px-0">
//               <div className="grid grid-cols-12 gap-6">
//                 <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//                   <StatCard icon={FaCode} value={user?.solvedProblems?.length || 0} label="Problems Solved" theme={theme} />
//                   <StatCard icon={FaCalendarAlt} value={totalTime} label="Days Active" theme={theme} />
//                   <StatCard icon={FaFire} value={streak} label="Day Streak" theme={theme} />
//                   <StatCard icon={FaMedal} value={user.rank || 'N/A'} label="Global Rank" theme={theme} />
//                   {/* <StatCard icon={FaClock} value={formatTime(totalTimeSpent)} label="Total Time Spent" theme={theme} /> */}
//                   <StatCard icon={FaClock} value={formatTime(totalTimeSpent)} label="Total Time Spent" theme={theme} />
//                   <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} theme={theme} />
//                 </div>

//                 <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//                   <MotivationalQuote quote={motivationalQuote} theme={theme} />
//                   <ProgressChart data={progressData} theme={theme} />
//                   <TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} newTodo={newTodo} setNewTodo={setNewTodo} theme={theme} />
//                 </div>

//                 <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//                   <RecentSubmissions submissions={recentSubmissions} theme={theme} />
//                   <QuickActions theme={theme} />
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       )}
//     </>
//   );
// };

// const StatCard = ({ icon: Icon, value, label, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 flex items-center justify-between`}
//   >
//     <div>
//       <p className="text-2xl font-bold">{isNaN(value) ? 'N/A' : value}</p>
//       <p className={`text-sm ${theme.text}`}>{label}</p>
//     </div>
//     <Icon className={`text-3xl ${theme.text}`} />
//   </motion.div>
// );

// const MotivationalQuote = ({ theme }) => {
//   const [quote, setQuote] = useState(getRandomQuote());

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className="text-xl font-semibold mb-4 flex items-center">
//         <FaLightbulb className={`mr-2 ${theme.text}`} /> Daily Inspiration
//       </h2>
//       <blockquote className={`italic ${theme.text} text-lg`}>{quote}</blockquote>
//     </motion.div>
//   );
// };

// const ProgressChart = ({ data, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.4 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaChartLine className={`mr-2 ${theme.text}`} /> Your Progress
//     </h2>
//     <ResponsiveContainer width="100%" height={200}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
//         <XAxis dataKey="date" stroke={theme.text} />
//         <YAxis stroke={theme.text} />
//         <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }} />
//         <Legend />
//         <Line type="monotone" dataKey="problemsSolved" stroke={theme.text} strokeWidth={2} />
//       </LineChart>
//     </ResponsiveContainer>
//   </motion.div>
// );

// const RecentSubmissions = ({ submissions, theme }) => {
//   const [visibleSubmissions, setVisibleSubmissions] = useState(3);

//   const loadMore = () => {
//     setVisibleSubmissions(prev => prev + 3);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//         <FaCode className="mr-2" /> Recent Submissions
//       </h2>
//       <ul className="space-y-3">
//         <AnimatePresence>
//           {submissions.slice(0, visibleSubmissions).map((problem, index) => (
//             <motion.li
//               key={problem._id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className={`p-3 rounded-md ${theme.buttonBg} transition duration-300`}
//             >
//               <Link to={`/problems/${problem._id}`} className={`text-lg font-semibold ${theme.text} hover:opacity-80 transition duration-300`}>
//                 {problem.title}
//               </Link>
//               <p className={`text-sm ${theme.text} opacity-80`}>
//                 {problem.difficulty} | {problem.topic}
//               </p>
//             </motion.li>
//           ))}
//         </AnimatePresence>
//       </ul>
//       {visibleSubmissions < submissions.length && (
//         <button
//           onClick={loadMore}
//           className={`mt-4 ${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//         >
//           Load More
//         </button>
//       )}
//     </motion.div>
//   );
// };

// const QuickActions = ({ theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 1.2 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//       <FaRocket className="mr-2" /> Quick Actions
//     </h2>
//     <div className="grid grid-cols-2 gap-4">
//       <QuickActionButton to="/problems" icon={FaCode} text="Solve Problems" theme={theme} />
//       <QuickActionButton to="/leaderboard" icon={FaTrophy} text="Leaderboard" theme={theme} />
//       <QuickActionButton to="/topics" icon={FaBookOpen} text="Study Topics" theme={theme} />
//       <QuickActionButton href="https://github.com/your-repo" icon={FaGithub} text="Contribute" external theme={theme} />
//     </div>
//   </motion.div>
// );

// const QuickActionButton = ({ to, href, icon: Icon, text, external, theme }) => {
//   const baseClasses = `${theme.buttonBg} ${theme.buttonHover} ${theme.text} font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-50`;

//   if (external) {
//     return (
//       <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
//         <Icon className="mr-2" /> {text}
//       </a>
//     );
//   }

//   return (
//     <Link to={to} className={baseClasses}>
//       <Icon className="mr-2" /> {text}
//     </Link>
//   );
// };

// const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.8 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 overflow-hidden`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaTasks className={`mr-2 ${theme.text}`} /> Todo List
//     </h2>
//     <div className="flex mb-4">
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         className={`flex-grow mr-2 p-2 rounded-md ${theme.cardBg} ${theme.border} border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//         placeholder="Add a new task..."
//       />
//       <button
//         onClick={addTodo}
//         className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300`}
//       >
//         Add
//       </button>
//     </div>
//     <ul className="space-y-2 max-h-60 overflow-y-auto">
//       {todos.map((todo) => (
//         <li
//           key={todo.id}
//           className={`flex items-center justify-between p-2 rounded-md ${theme.cardBg} hover:bg-opacity-80 transition duration-300`}
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id)}
//               className="mr-2"
//             />
//             <span className={todo.completed ? `line-through ${theme.text} opacity-50` : theme.text}>
//               {todo.text}
//             </span>
//           </div>
//           <button
//             onClick={() => deleteTodo(todo.id)}
//             className="text-red-500 hover:text-red-600 transition duration-300"
//           >
//             <FaTrash />
//           </button>
//         </li>
//       ))}
//     </ul>
//   </motion.div>
// );

// const programmingQuotes = [
//   "The only way to do great work is to love what you do. - Steve Jobs",
//   "Code is like humor. When you have to explain it, it's bad. - Cory House",
//   "First, solve the problem. Then, write the code. - John Johnson",
//   "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
//   "The best error message is the one that never shows up. - Thomas Fuchs",
//   "Simplicity is the soul of efficiency. - Austin Freeman",
//   "Make it work, make it right, make it fast. - Kent Beck",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
//   "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
//   "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
//   "The function of good software is to make the complex appear to be simple. - Grady Booch",
//   "It's not a bug – it's an undocumented feature. - Anonymous",
//   "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
//   "The best way to predict the future is to implement it. - David Heinemeier Hansson",
//   "Good code is its own best documentation. - Steve McConnell"
// ];

// const getRandomQuote = () => {
//   const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
//   return programmingQuotes[randomIndex];
// };

// const formatTime = (seconds) => {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;
//   return `${hours}h ${minutes}m ${remainingSeconds}s`;
// };

// export default UserDashboard;

// ------------------------------------------------------------------

// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import api from '../utils/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaCode, FaTrophy, FaCalendarAlt, FaClock, FaLightbulb, FaChartLine, FaRocket, FaGithub, FaFire, FaMedal, FaMusic, FaTasks, FaBookOpen, FaTrash, FaPalette } from 'react-icons/fa';
// import MusicPlayer from './MusicPlayer';
// import Avatar from 'react-avatar';

// const themes = {
//   darkMode: {
//     bg: 'bg-gray-900',
//     text: 'text-gray-200',
//     border: 'border-gray-700',
//     cardBg: 'bg-gray-800',
//     buttonBg: 'bg-blue-600',
//     buttonHover: 'hover:bg-blue-700',
//   },
//   dracula: {
//     bg: 'bg-[#282a36]',
//     text: 'text-[#f8f8f2]',
//     border: 'border-[#44475a]',
//     cardBg: 'bg-[#1e1f29]',
//     buttonBg: 'bg-[#ff79c6]',
//     buttonHover: 'hover:bg-[#bd93f9]',
//   },
//   gruvbox: {
//     bg: 'bg-[#282828]',
//     text: 'text-[#ebdbb2]',
//     border: 'border-[#3c3836]',
//     cardBg: 'bg-[#3c3836]',
//     buttonBg: 'bg-[#fabd2f]',
//     buttonHover: 'hover:bg-[#fe8019]',
//   },
//   nord: {
//     bg: 'bg-[#2e3440]',
//     text: 'text-[#d8dee9]',
//     border: 'border-[#4c566a]',
//     cardBg: 'bg-[#3b4252]',
//     buttonBg: 'bg-[#81a1c1]',
//     buttonHover: 'hover:bg-[#5e81ac]',
//   },
//   oneDark: {
//     bg: 'bg-[#282c34]',
//     text: 'text-[#abb2bf]',
//     border: 'border-[#4b5263]',
//     cardBg: 'bg-[#2c323c]',
//     buttonBg: 'bg-[#61afef]',
//     buttonHover: 'hover:bg-[#528bff]',
//   },
//   cobalt: {
//     bg: 'bg-[#002240]',
//     text: 'text-[#ffffff]',
//     border: 'border-[#0e4b82]',
//     cardBg: 'bg-[#002b56]',
//     buttonBg: 'bg-[#ff9800]',
//     buttonHover: 'hover:bg-[#ff5722]',
//   },
// };

// const UserDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [motivationalQuote, setMotivationalQuote] = useState('');
//   const [progressData, setProgressData] = useState([]);
//   const [streak, setStreak] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [totalTimeSpent, setTotalTimeSpent] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(true);
//   const [sessionStartTime, setSessionStartTime] = useState(Date.now());
//   const [currentTime, setCurrentTime] = useState(totalTimeSpent);
//   const [currentTheme, setCurrentTheme] = useState(() => {
//     return localStorage.getItem('userTheme') || 'darkMode';
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [todos, setTodos] = useState(() => {
//     const storedTodos = localStorage.getItem('userTodos');
//     return storedTodos ? JSON.parse(storedTodos) : [];
//   });
//   const [newTodo, setNewTodo] = useState('');

//   const fetchUserData = useCallback(async () => {
//     try {
//       const response = await api.get('/auth/user-data');
//       setTotalTimeSpent(response.data.totalTimeSpent);
//       const solvedProblemsIds = user.solvedProblems.slice().reverse();
//       const recentSolvedProblems = await Promise.all(
//         solvedProblemsIds.slice(0, 5).map(async (problemId) => {
//           const response = await api.get(`/problems/${problemId}`);
//           return response.data;
//         })
//       );
//       setRecentSubmissions(recentSolvedProblems);

//       const progressRes = await api.get(`/users/${user.id}/progress`);
//       setProgressData(progressRes.data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }, [user]);

//   const fetchMotivationalQuote = useCallback(async () => {
//     try {
//       const response = await api.get('/api/quote');
//       setMotivationalQuote(response.data.content);
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//       setMotivationalQuote("Keep coding, keep growing!");
//     }
//   }, []);

//   const calculateTotalTime = useCallback(() => {
//     if (user && user.createdAt) {
//       const joinDate = new Date(user.createdAt);
//       const now = new Date();
//       const timeDiff = now - joinDate;
//       setTotalTime(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
//     } else {
//       setTotalTime(0);
//     }
//   }, [user]);

//   const calculateStreak = useCallback(() => {
//     if (!user || !user.submissions) {
//       setStreak(0);
//       return;
//     }

//     const today = new Date();
//     let currentStreak = 0;
//     let lastSubmissionDate = null;

//     for (let i = user.submissions.length - 1; i >= 0; i--) {
//       const submissionDate = new Date(user.submissions[i].date);
//       if (lastSubmissionDate === null) {
//         lastSubmissionDate = submissionDate;
//         currentStreak = 1;
//       } else {
//         const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
//         if (dayDifference === 1) {
//           currentStreak++;
//           lastSubmissionDate = submissionDate;
//         } else if (dayDifference > 1) {
//           break;
//         }
//       }
//     }

//     const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
//     if (daysSinceLastSubmission > 1) {
//       currentStreak = 0;
//     }

//     setStreak(currentStreak);
//   }, [user]);

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
//       setNewTodo('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleMusic = () => {
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       if (user) {
//         await Promise.all([
//           fetchUserData(),
//           fetchMotivationalQuote(),
//           calculateTotalTime(),
//           calculateStreak()
//         ]);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [user, fetchUserData, fetchMotivationalQuote, calculateTotalTime, calculateStreak]);

//   useEffect(() => {
//     localStorage.setItem('userTheme', currentTheme);
//   }, [currentTheme]);

//   useEffect(() => {
//     localStorage.setItem('userTodos', JSON.stringify(todos));
//   }, [todos]);

//   useEffect(() => {
//     let timer;
//     if (isTimerRunning) {
//       timer = setInterval(() => {
//         setTotalTimeSpent(prevTime => prevTime + 1);
//       }, 1000);
//     }

//     useEffect(() => {
//       const timer = setInterval(() => {
//         setCurrentTime(prevTime => prevTime + 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }, []);

//     return () => {
//       clearInterval(timer);
//       updateTotalTimeSpent();
//     };
//   }, [isTimerRunning]);

//   useEffect(() => {
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);

//   const handleBeforeUnload = () => {
//     updateTotalTimeSpent();
//   };

//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       setIsTimerRunning(false);
//       updateTotalTimeSpent();
//     } else {
//       setIsTimerRunning(true);
//     }
//   };

//   const updateTotalTimeSpent = async () => {
//     try {
//       await api.post('/auth/update-time', { timeSpent: totalTimeSpent });
//     } catch (error) {
//       console.error('Error updating total time spent:', error);
//     }
//   };

//   const theme = themes[currentTheme];

//   return (
//     <>
//       {isLoading ? (
//         <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono flex items-center justify-center`}>
//           <div className="text-3xl">Loading...</div>
//         </div>
//       ) : (
//         <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono`}>
//           <header className={`bg-black ${theme.border} border-b`}>
//             <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//               <Avatar
//                 src={user.avatar}
//                 name={user.username}
//                 size="50"
//                 round={true}
//                 className="mr-4"
//               />
//               <h1 className="text-3xl font-bold">
//                 <span className={theme.text}></span> {getGreeting()}, {user.username || 'Guest'}
//               </h1>
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setCurrentTheme(prevTheme => {
//                     const themeOrder = ['darkMode', 'dracula', 'gruvbox', 'nord', 'oneDark', 'cobalt'];
//                     const currentIndex = themeOrder.indexOf(prevTheme);
//                     const nextIndex = (currentIndex + 1) % themeOrder.length;
//                     return themeOrder[nextIndex];
//                   })}
//                   className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//                 >
//                   <FaPalette className="inline-block mr-2" /> Change Theme
//                 </button>
//                 <button
//                   onClick={() => {
//                     logout();
//                     navigate('/');
//                   }}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </header>

//           <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//             <div className="px-4 py-6 sm:px-0">
//               <div className="grid grid-cols-12 gap-6">
//                 <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//                   <StatCard icon={FaCode} value={user?.solvedProblems?.length || 0} label="Problems Solved" theme={theme} />
//                   <StatCard icon={FaCalendarAlt} value={totalTime} label="Days Active" theme={theme} />
//                   <StatCard icon={FaFire} value={streak} label="Day Streak" theme={theme} />
//                   <StatCard icon={FaMedal} value={user.rank || 'N/A'} label="Global Rank" theme={theme} />
//                   {/* <StatCard icon={FaClock} value={formatTime(totalTimeSpent)} label="Total Time Spent" theme={theme} /> */}
//                   <StatCard
//                     icon={FaClock}
//                     value={formatTime(currentTime)}
//                     label="Total Time Spent"
//                     theme={theme}
//                   />
//                   <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} theme={theme} />
//                 </div>

//                 <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//                   <MotivationalQuote quote={motivationalQuote} theme={theme} />
//                   <ProgressChart data={progressData} theme={theme} />
//                   <TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} newTodo={newTodo} setNewTodo={setNewTodo} theme={theme} />
//                 </div>

//                 <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//                   <RecentSubmissions submissions={recentSubmissions} theme={theme} />
//                   <QuickActions theme={theme} />
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       )}
//     </>
//   );
// };

// const StatCard = ({ icon: Icon, value, label, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 flex items-center justify-between`}
//   >
//     <div>
//       <p className="text-2xl font-bold">{isNaN(value) ? 'N/A' : value}</p>
//       <p className={`text-sm ${theme.text}`}>{label}</p>
//     </div>
//     <Icon className={`text-3xl ${theme.text}`} />
//   </motion.div>
// );

// const MotivationalQuote = ({ theme }) => {
//   const [quote, setQuote] = useState(getRandomQuote());

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className="text-xl font-semibold mb-4 flex items-center">
//         <FaLightbulb className={`mr-2 ${theme.text}`} /> Daily Inspiration
//       </h2>
//       <blockquote className={`italic ${theme.text} text-lg`}>{quote}</blockquote>
//     </motion.div>
//   );
// };

// const ProgressChart = ({ data, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.4 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaChartLine className={`mr-2 ${theme.text}`} /> Your Progress
//     </h2>
//     <ResponsiveContainer width="100%" height={200}>
//       <LineChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
//         <XAxis dataKey="date" stroke={theme.text} />
//         <YAxis stroke={theme.text} />
//         <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }} />
//         <Legend />
//         <Line type="monotone" dataKey="problemsSolved" stroke={theme.text} strokeWidth={2} />
//       </LineChart>
//     </ResponsiveContainer>
//   </motion.div>
// );

// const RecentSubmissions = ({ submissions, theme }) => {
//   const [visibleSubmissions, setVisibleSubmissions] = useState(3);

//   const loadMore = () => {
//     setVisibleSubmissions(prev => prev + 3);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//         <FaCode className="mr-2" /> Recent Submissions
//       </h2>
//       <ul className="space-y-3">
//         <AnimatePresence>
//           {submissions.slice(0, visibleSubmissions).map((problem, index) => (
//             <motion.li
//               key={problem._id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className={`p-3 rounded-md ${theme.buttonBg} transition duration-300`}
//             >
//               <Link to={`/problems/${problem._id}`} className={`text-lg font-semibold ${theme.text} hover:opacity-80 transition duration-300`}>
//                 {problem.title}
//               </Link>
//               <p className={`text-sm ${theme.text} opacity-80`}>
//                 {problem.difficulty} | {problem.topic}
//               </p>
//             </motion.li>
//           ))}
//         </AnimatePresence>
//       </ul>
//       {visibleSubmissions < submissions.length && (
//         <button
//           onClick={loadMore}
//           className={`mt-4 ${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//         >
//           Load More
//         </button>
//       )}
//     </motion.div>
//   );
// };

// const QuickActions = ({ theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 1.2 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//       <FaRocket className="mr-2" /> Quick Actions
//     </h2>
//     <div className="grid grid-cols-2 gap-4">
//       <QuickActionButton to="/problems" icon={FaCode} text="Solve Problems" theme={theme} />
//       <QuickActionButton to="/leaderboard" icon={FaTrophy} text="Leaderboard" theme={theme} />
//       <QuickActionButton to="/topics" icon={FaBookOpen} text="Study Topics" theme={theme} />
//       <QuickActionButton href="https://github.com/your-repo" icon={FaGithub} text="Contribute" external theme={theme} />
//     </div>
//   </motion.div>
// );

// const QuickActionButton = ({ to, href, icon: Icon, text, external, theme }) => {
//   const baseClasses = `${theme.buttonBg} ${theme.buttonHover} ${theme.text} font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-50`;

//   if (external) {
//     return (
//       <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
//         <Icon className="mr-2" /> {text}
//       </a>
//     );
//   }

//   return (
//     <Link to={to} className={baseClasses}>
//       <Icon className="mr-2" /> {text}
//     </Link>
//   );
// };

// const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.8 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 overflow-hidden`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaTasks className={`mr-2 ${theme.text}`} /> Todo List
//     </h2>
//     <div className="flex mb-4">
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         className={`flex-grow mr-2 p-2 rounded-md ${theme.cardBg} ${theme.border} border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//         placeholder="Add a new task..."
//       />
//       <button
//         onClick={addTodo}
//         className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300`}
//       >
//         Add
//       </button>
//     </div>
//     <ul className="space-y-2 max-h-60 overflow-y-auto">
//       {todos.map((todo) => (
//         <li
//           key={todo.id}
//           className={`flex items-center justify-between p-2 rounded-md ${theme.cardBg} hover:bg-opacity-80 transition duration-300`}
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id)}
//               className="mr-2"
//             />
//             <span className={todo.completed ? `line-through ${theme.text} opacity-50` : theme.text}>
//               {todo.text}
//             </span>
//           </div>
//           <button
//             onClick={() => deleteTodo(todo.id)}
//             className="text-red-500 hover:text-red-600 transition duration-300"
//           >
//             <FaTrash />
//           </button>
//         </li>
//       ))}
//     </ul>
//   </motion.div>
// );

// // const formatTime = (seconds) => {
// //   const hours = Math.floor(seconds / 3600);
// //   const minutes = Math.floor((seconds % 3600) / 60);
// //   const remainingSeconds = seconds % 60;
// //   return `${hours}h ${minutes}m ${remainingSeconds}s`;
// // };


// const formatTime = (seconds) => {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;
//   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
// };

// const programmingQuotes = [
//   "The only way to do great work is to love what you do. - Steve Jobs",
//   "Code is like humor. When you have to explain it, it's bad. - Cory House",
//   "First, solve the problem. Then, write the code. - John Johnson",
//   "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
//   "The best error message is the one that never shows up. - Thomas Fuchs",
//   "Simplicity is the soul of efficiency. - Austin Freeman",
//   "Make it work, make it right, make it fast. - Kent Beck",
//   "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
//   "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
//   "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
//   "The function of good software is to make the complex appear to be simple. - Grady Booch",
//   "It's not a bug – it's an undocumented feature. - Anonymous",
//   "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
//   "The best way to predict the future is to implement it. - David Heinemeier Hansson",
//   "Good code is its own best documentation. - Steve McConnell"
// ];

// const getRandomQuote = () => {
//   const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
//   return programmingQuotes[randomIndex];
// };

// export default UserDashboard;

// --------------------------------------------------------------------

// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import api from '../utils/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaCode, FaTrophy, FaCalendarAlt, FaClock, FaLightbulb, FaChartLine, FaRocket, FaGithub, FaFire, FaMedal, FaMusic, FaTasks, FaBookOpen, FaTrash, FaPalette } from 'react-icons/fa';
// import MusicPlayer from './MusicPlayer';
// import Avatar from 'react-avatar';

// const themes = {
//   darkMode: {
//     bg: 'bg-gray-900',
//     text: 'text-gray-200',
//     border: 'border-gray-700',
//     cardBg: 'bg-gray-800',
//     buttonBg: 'bg-blue-600',
//     buttonHover: 'hover:bg-blue-700',
//   },
//   dracula: {
//     bg: 'bg-[#282a36]',
//     text: 'text-[#f8f8f2]',
//     border: 'border-[#44475a]',
//     cardBg: 'bg-[#1e1f29]',
//     buttonBg: 'bg-[#ff79c6]',
//     buttonHover: 'hover:bg-[#bd93f9]',
//   },
//   gruvbox: {
//     bg: 'bg-[#282828]',
//     text: 'text-[#ebdbb2]',
//     border: 'border-[#3c3836]',
//     cardBg: 'bg-[#3c3836]',
//     buttonBg: 'bg-[#fabd2f]',
//     buttonHover: 'hover:bg-[#fe8019]',
//   },
//   nord: {
//     bg: 'bg-[#2e3440]',
//     text: 'text-[#d8dee9]',
//     border: 'border-[#4c566a]',
//     cardBg: 'bg-[#3b4252]',
//     buttonBg: 'bg-[#81a1c1]',
//     buttonHover: 'hover:bg-[#5e81ac]',
//   },
//   oneDark: {
//     bg: 'bg-[#282c34]',
//     text: 'text-[#abb2bf]',
//     border: 'border-[#4b5263]',
//     cardBg: 'bg-[#2c323c]',
//     buttonBg: 'bg-[#61afef]',
//     buttonHover: 'hover:bg-[#528bff]',
//   },
//   cobalt: {
//     bg: 'bg-[#002240]',
//     text: 'text-[#ffffff]',
//     border: 'border-[#0e4b82]',
//     cardBg: 'bg-[#002b56]',
//     buttonBg: 'bg-[#ff9800]',
//     buttonHover: 'hover:bg-[#ff5722]',
//   },
// };

// const UserDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   // console.log(user);
//   const navigate = useNavigate();
//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [motivationalQuote, setMotivationalQuote] = useState('');
//   const [progressData, setProgressData] = useState([]);
//   const [streak, setStreak] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [totalTimeSpent, setTotalTimeSpent] = useState(user?.totalTimeSpent || 0);
//   const [isTimerRunning, setIsTimerRunning] = useState(true);
//   const [sessionStartTime, setSessionStartTime] = useState(Date.now());
//   const [currentTheme, setCurrentTheme] = useState(() => {
//     return localStorage.getItem('userTheme') || 'darkMode';
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [todos, setTodos] = useState(() => {
//     const storedTodos = localStorage.getItem('userTodos');
//     return storedTodos ? JSON.parse(storedTodos) : [];
//   });
//   const [newTodo, setNewTodo] = useState('');
//   const [currentTime, setCurrentTime] = useState(totalTimeSpent);
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());
//   const [problemStats, setProblemStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
//   const [totalProblems, setTotalProblems] = useState(0);


//   // const calculateUserProgress = (user) => {
//   //   const today = new Date();
//   //   const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

//   //   const progressData = [];
//   //   for (let i = 0; i < 7; i++) {
//   //     const date = new Date(lastWeek.getTime() + i * 24 * 60 * 60 * 1000);
//   //     const problemsSolved = user.submissions.filter(submission => 
//   //       new Date(submission.date).toDateString() === date.toDateString()
//   //     ).length;
//   //     progressData.push({
//   //       date: date.toISOString().split('T')[0],
//   //       problemsSolved
//   //     });
//   //   }

//   //   return progressData;
//   // };

//   // const calculateUserProgress = useCallback(() => {
//   //   const today = new Date();
//   //   const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

//   //   const progressData = [];
//   //   for (let i = 0; i < 7; i++) {
//   //     const date = new Date(lastWeek.getTime() + i * 24 * 60 * 60 * 1000);
//   //     const problemsSolved = user.submissions.filter(submission => 
//   //       new Date(submission.date).toDateString() === date.toDateString()
//   //     ).length;
//   //     progressData.push({
//   //       date: date.toISOString().split('T')[0],
//   //       problemsSolved
//   //     });
//   //   }

//   //   return progressData;
//   // }, [user.submissions]);

//   const calculateUserProgress = useCallback(() => {
//   const today = new Date();
//   const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

//   const progressData = [];
//   for (let i = 0; i <= 6; i++) {
//     const date = new Date(sixDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
//     const problemsSolved = user.submissions.filter(submission => 
//       new Date(submission.date).toDateString() === date.toDateString()
//     ).length;
//     progressData.push({
//       date: date.toISOString().split('T')[0],
//       problemsSolved
//     });
//   }

//   return progressData;
// }, [user.submissions]);

//   // const fetchUserData = useCallback(async () => {
//   //   try {
//   //     setTotalTimeSpent(user.totalTimeSpent);
//   //     const solvedProblemsIds = user.solvedProblems.slice().reverse();
//   //     // setTotalProblems(user.solvedProblems.length);
//   //     const noOfProblems = await api.get('/problems');
//   //     console.log(noOfProblems);
//   //     setTotalProblems(noOfProblems.data.length);
//   //     // const recentSolvedProblems = await Promise.all(
//   //     //   solvedProblemsIds.slice(0, 5).map(async (problemId) => {
//   //     //     const response = await api.get(`/problems/${problemId}`);
//   //     //     return response.data;
//   //     //   })
//   //     // );
//   //     // setRecentSubmissions(recentSolvedProblems);
//   //   const solvedProblemsDetails = await Promise.all(
//   //     solvedProblemsIds.map(async (problemId) => {
//   //       const response = await api.get(`/problems/${problemId}`);
//   //       return response.data;
//   //     })
//   //   );
//   //   setRecentSubmissions(solvedProblemsDetails.slice(0, 5));

//   //   // Count problems by difficulty
//   //   const difficultyCounts = solvedProblemsDetails.reduce((acc, problem) => {
//   //     acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
//   //     return acc;
//   //   }, {});

//   //   setProblemStats({
//   //     total: solvedProblemsIds.length,
//   //     easy: difficultyCounts.Easy || 0,
//   //     medium: difficultyCounts.Medium || 0,
//   //     hard: difficultyCounts.Hard || 0
//   //   });

//   //     const progressData = calculateUserProgress(user);
//   //     setProgressData(progressData);
//   //     setTotalTimeSpent(user.totalTimeSpent);
//   //   } catch (error) {
//   //     console.error('Error fetching user data:', error);
//   //   }
//   // }, [user]);


//   const fetchUserData = useCallback(async () => {
//   try {
//     const solvedProblemsIds = user.solvedProblems.slice().reverse();

//     const noOfProblems = await api.get('/problems');
//     console.log(noOfProblems.data.length);
//     setTotalProblems(noOfProblems.data.length);

//     const solvedProblemsDetails = await Promise.all(
//       solvedProblemsIds.map(async (problemId) => {
//         const response = await api.get(`/problems/${problemId}`);
//         return response.data;
//       })
//     );
//     setRecentSubmissions(solvedProblemsDetails.slice(0, 5));

//     const difficultyCounts = solvedProblemsDetails.reduce((acc, problem) => {
//       acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
//       return acc;
//     }, {});

//     const problemsByDifficulty = await api.get('/problems/count-by-difficulty');
//     console.log("pb data: ",problemsByDifficulty);
//     const totalProblemsByDifficulty = problemsByDifficulty.data;

//     setProblemStats({
//       total: solvedProblemsIds.length,
//       easy: { solved: difficultyCounts.Easy || 0, total: totalProblemsByDifficulty.Easy },
//       medium: { solved: difficultyCounts.Medium || 0, total: totalProblemsByDifficulty.Medium },
//       hard: { solved: difficultyCounts.Hard || 0, total: totalProblemsByDifficulty.Hard }
//     });

//     const progressData = calculateUserProgress(user);
//     setProgressData(progressData);
//     setTotalTimeSpent(user.totalTimeSpent);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// }, [user]);

//   const fetchMotivationalQuote = useCallback(async () => {
//     try {
//       const response = await api.get('/api/quote');
//       setMotivationalQuote(response.data.content);
//     } catch (error) {
//       console.error('Error fetching quote:', error);
//       setMotivationalQuote("Keep coding, keep growing!");
//     }
//   }, []);

//   const calculateTotalTime = useCallback(() => {
//     if (user && user.createdAt) {
//       const joinDate = new Date(user.createdAt);
//       const now = new Date();
//       const timeDiff = now - joinDate;
//       setTotalTime(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
//     } else {
//       setTotalTime(0);
//     }
//   }, [user]);

//   const calculateStreak = useCallback(() => {
//     if (!user || !user.submissions) {
//       setStreak(0);
//       return;
//     }

//     const today = new Date();
//     let currentStreak = 0;
//     let lastSubmissionDate = null;

//     for (let i = user.submissions.length - 1; i >= 0; i--) {
//       const submissionDate = new Date(user.submissions[i].date);
//       if (lastSubmissionDate === null) {
//         lastSubmissionDate = submissionDate;
//         currentStreak = 1;
//       } else {
//         const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
//         if (dayDifference === 1) {
//           currentStreak++;
//           lastSubmissionDate = submissionDate;
//         } else if (dayDifference > 1) {
//           break;
//         }
//       }
//     }

//     const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
//     if (daysSinceLastSubmission > 1) {
//       currentStreak = 0;
//     }

//     setStreak(currentStreak);
//   }, [user]);

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
//       setNewTodo('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const toggleMusic = () => {
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       if (user) {
//         await Promise.all([
//           fetchUserData(),
//           fetchMotivationalQuote(),
//           calculateTotalTime(),
//           calculateStreak()
//         ]);
//         setProgressData(calculateUserProgress());
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [user, fetchUserData, fetchMotivationalQuote, calculateTotalTime, calculateStreak, calculateUserProgress]);

//   useEffect(() => {
//     localStorage.setItem('userTheme', currentTheme);
//   }, [currentTheme]);

//   useEffect(() => {
//     localStorage.setItem('userTodos', JSON.stringify(todos));
//   }, [todos]);

//   // useEffect(() => {
//   //   let timer;
//   //   if (isTimerRunning) {
//   //     timer = setInterval(() => {
//   //       setTotalTimeSpent(prevTime => prevTime + 1);
//   //       setCurrentTime(prevTime => prevTime + 1);
//   //     }, 1000);
//   //   }

//   //   return () => {
//   //     clearInterval(timer);
//   //     updateTotalTimeSpent();
//   //   };
//   // }, [isTimerRunning]);

//   // useEffect(() => {
//   //   const timer = setInterval(() => {
//   //     setTotalTimeSpent(prevTime => prevTime + 1000); // Increment by 1000 milliseconds (1 second)
//   //   }, 1000);

//   //   return () => clearInterval(timer);
//   // }, []);

// //   useEffect(() => {
// //   let timer;
// //   if (isTimerRunning) {
// //     timer = setInterval(() => {
// //       setCurrentTime(prevTime => prevTime + 1);
// //     }, 1000);
// //   }

// //   return () => {
// //     clearInterval(timer);
// //     if (isTimerRunning) {
// //       updateTotalTimeSpent();
// //     }
// //   };
// // }, [isTimerRunning]);
//   useEffect(() => {
//   const timer = setInterval(() => {
//     setCurrentDateTime(new Date());
//   }, 1000);

//   return () => clearInterval(timer);
// }, []);


//   // const formatTime = (seconds) => {
//   //   const hours = Math.floor(seconds / 3600);
//   //   const minutes = Math.floor((seconds % 3600) / 60);
//   //   return `${hours}h ${minutes}m`;
//   // };

//   // useEffect(() => {
//   //   window.addEventListener('beforeunload', handleBeforeUnload);
//   //   document.addEventListener('visibilitychange', handleVisibilityChange);

//   //   return () => {
//   //     window.removeEventListener('beforeunload', handleBeforeUnload);
//   //     document.removeEventListener('visibilitychange', handleVisibilityChange);
//   //   };
//   // }, []);

//   useEffect(() => {
//     const handleBeforeUnload = async (event) => {
//       event.preventDefault();
//       await updateTotalTimeSpent();
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);


//   const handleBeforeUnload = () => {
//     updateTotalTimeSpent();
//   };

//   const handleVisibilityChange = () => {
//     if (document.hidden) {
//       setIsTimerRunning(false);
//       updateTotalTimeSpent();
//     } else {
//       setIsTimerRunning(true);
//     }
//   };

//   // const updateTotalTimeSpent = async () => {
//   //   try {
//   //     await api.post('/auth/update-time', { timeSpent: totalTimeSpent });
//   //   } catch (error) {
//   //     console.error('Error updating total time spent:', error);
//   //   }
//   // };

//   const updateTotalTimeSpent = async () => {
//     try {
//       const response = await api.post('/users/update-time', { 
//         userId: user.id, 
//         additionalTime: currentTime 
//       });
//       setTotalTimeSpent(response.data.totalTimeSpent);
//       setCurrentTime(0);
//     } catch (error) {
//       console.error('Error updating total time spent:', error);
//     }
//   };


//   const theme = themes[currentTheme];

//   return (
//     <>
//       {isLoading ? (
//         <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono flex items-center justify-center`}>
//           <div className="text-3xl">Loading...</div>
//         </div>
//       ) : (
//         <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono`}>
//           <header className={`bg-black ${theme.border} border-b`}>
//             <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//               <Avatar 
//                 src={user.avatar} 
//                 name={user.username} 
//                 size="50" 
//                 round={true} 
//                 className="mr-4"
//               />
//               <h1 className="text-3xl font-bold">
//                 <span className={theme.text}></span> {getGreeting()}, {user.username || 'Guest'}
//               </h1>
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setCurrentTheme(prevTheme => {
//                     const themeOrder = ['darkMode', 'dracula', 'gruvbox', 'nord', 'oneDark', 'cobalt'];
//                     const currentIndex = themeOrder.indexOf(prevTheme);
//                     const nextIndex = (currentIndex + 1) % themeOrder.length;
//                     return themeOrder[nextIndex];
//                   })}
//                   className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//                 >
//                   <FaPalette className="inline-block mr-2" /> Change Theme
//                 </button>
//                 <button
//                   onClick={async () => {
//                     await updateTotalTimeSpent();
//                     logout();
//                     navigate('/');
//                   }}
//                   className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </header>

//           <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//             <div className="px-4 py-6 sm:px-0">
//               <div className="grid grid-cols-12 gap-6">
//                 <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//                   <StatCard icon={FaCode} value={user?.solvedProblems?.length || 0} label="Problems Solved" theme={theme} />
//                   <StatCard icon={FaCalendarAlt} value={totalTime} label="Days Active" theme={theme} />
//                   <StatCard icon={FaFire} value={streak} label="Day Streak" theme={theme} />
//                   <StatCard icon={FaMedal} value={user.rank || 'N/A'} label="Global Rank" theme={theme} />
//                   <StatCard icon={FaClock} value={currentDateTime.toLocaleTimeString()} label="Total Time Spent" theme={theme} />
//                   {/* {console.log(formatTime(totalTimeSpent))} */}
//                   <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} theme={theme} />
//                 </div>

//                 <div className="col-span-12 md:col-span-6 flex flex-col gap-6">
//                   <MotivationalQuote quote={motivationalQuote} theme={theme} />
//                   {/* <ProgressChart data={progressData} theme={theme} /> */}
//                   <ProblemStats problemStats={problemStats} totalProblems={totalProblems} theme={theme} />
//                   <TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} newTodo={newTodo} setNewTodo={setNewTodo} theme={theme} />
//                 </div>

//                 <div className="col-span-12 md:col-span-3 flex flex-col gap-6">
//                   <RecentSubmissions submissions={recentSubmissions} theme={theme} />
//                   <QuickActions theme={theme} />
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       )}
//     </>
//   );
// };

// // const StatCard = ({ icon: Icon, value, label, theme }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5 }}
// //     className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 flex items-center justify-between`}
// //   >
// //     <div>
// //       <p className="text-2xl font-bold">{isNaN(value) ? 'N/A' : value}</p>
// //       <p className={`text-sm ${theme.text}`}>{label}</p>
// //     </div>
// //     <Icon className={`text-3xl ${theme.text}`} />
// //   </motion.div>
// // );

// const StatCard = ({ icon: Icon, value, label, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 flex items-center justify-between`}
//   >
//     <div>
//       <p className="text-2xl font-bold">{value !== undefined && value !== null ? value : 'N/A'}</p>
//       <p className={`text-sm ${theme.text}`}>{label}</p>
//     </div>
//     <Icon className={`text-3xl ${theme.text}`} />
//   </motion.div>
// );

// const MotivationalQuote = ({ quote, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.2 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaLightbulb className={`mr-2 ${theme.text}`} /> Daily Inspiration
//     </h2>
//     <blockquote className={`italic ${theme.text} text-lg`}>{quote}</blockquote>
//   </motion.div>
// );

// // const ProgressChart = ({ data, theme }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5, delay: 0.4 }}
// //     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
// //   >
// //     <h2 className="text-xl font-semibold mb-4 flex items-center">
// //       <FaChartLine className={`mr-2 ${theme.text}`} /> Your Progress
// //     </h2>
// //     <ResponsiveContainer width="100%" height={200}>
// //       <LineChart data={data}>
// //         <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
// //         <XAxis dataKey="date" stroke={theme.text} />
// //         <YAxis stroke={theme.text} />
// //         <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }} />
// //         <Legend />
// //         <Line type="monotone" dataKey="problemsSolved" stroke={theme.text} strokeWidth={2} />
// //       </LineChart>
// //     </ResponsiveContainer>
// //   </motion.div>
// // );

// // const ProgressChart = ({ data, theme }) => (
// //   <motion.div
// //     initial={{ opacity: 0, y: 20 }}
// //     animate={{ opacity: 1, y: 0 }}
// //     transition={{ duration: 0.5, delay: 0.4 }}
// //     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
// //   >
// //     <h2 className="text-xl font-semibold mb-4 flex items-center">
// //       <FaChartLine className={`mr-2 ${theme.text}`} /> Your Progress
// //     </h2>
// //     <ResponsiveContainer width="100%" height={200}>
// //       <LineChart data={data}>
// //         <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
// //         <XAxis dataKey="date" stroke={theme.text} />
// //         <YAxis stroke={theme.text} />
// //         <Tooltip contentStyle={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}` }} />
// //         <Legend />
// //         <Line type="monotone" dataKey="problemsSolved" stroke={theme.text} strokeWidth={2} />
// //       </LineChart>
// //     </ResponsiveContainer>
// //   </motion.div>
// // );

// // const ProblemStats = ({ problemStats, totalProblems, theme }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
// //     >
// //       <h2 className="text-xl font-semibold mb-4">Problem Solving Progress</h2>
// //       <div className="flex justify-between items-center mb-4">
// //         <span>Solved</span>
// //         <span className="font-bold">{problemStats.total}/{totalProblems}</span>
// //       </div>
// //       <div className="space-y-2">
// //         <ProgressBar label="Easy" solved={problemStats.easy} total={totalProblems * 0.4} color="green" />
// //         <ProgressBar label="Medium" solved={problemStats.medium} total={totalProblems * 0.4} color="yellow" />
// //         <ProgressBar label="Hard" solved={problemStats.hard} total={totalProblems * 0.2} color="red" />
// //       </div>
// //     </motion.div>
// //   );
// // };
// const ProblemStats = ({ problemStats, theme , totalProblems }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className="text-xl font-semibold mb-4">Problem Solving Progress</h2>
//     <div className="flex justify-between items-center mb-4">
//       <span>Solved</span>
//       <span className="font-bold">{problemStats.total}/{totalProblems}</span>
//     </div>
//     <div className="space-y-2">
//       <ProgressBar label="Easy" solved={problemStats.easy.solved} total={problemStats.easy.total} color="green" />
//       <ProgressBar label="Medium" solved={problemStats.medium.solved} total={problemStats.medium.total} color="yellow" />
//       <ProgressBar label="Hard" solved={problemStats.hard.solved} total={problemStats.hard.total} color="red" />
//     </div>
//   </motion.div>
// );

// const ProgressBar = ({ label, solved, total, color }) => (
//   <div>
//     <div className="flex justify-between text-sm mb-1">
//       <span>{label}</span>
//       <span>{solved}/{Math.round(total)}</span>
//     </div>
//     <div className="w-full bg-gray-200 rounded-full h-2.5">
//       <div 
//         className={`bg-${color}-500 h-2.5 rounded-full`}
//         style={{ width: `${(solved / total) * 100}%` }}
//       ></div>
//     </div>
//   </div>
// );


// const RecentSubmissions = ({ submissions, theme }) => {
//   const [visibleSubmissions, setVisibleSubmissions] = useState(3);

//   const loadMore = () => {
//     setVisibleSubmissions(prev => prev + 3);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//         <FaCode className="mr-2" /> Recent Submissions
//       </h2>
//       <ul className="space-y-3">
//         <AnimatePresence>
//           {submissions.slice(0, visibleSubmissions).map((problem, index) => (
//             <motion.li
//               key={problem._id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.3, delay: index * 0.1 }}
//               className={`p-3 rounded-md ${theme.buttonBg} transition duration-300`}
//             >
//               <Link to={`/problems/${problem._id}`} className={`text-lg font-semibold ${theme.text} hover:opacity-80 transition duration-300`}>
//                 {problem.title}
//               </Link>
//               <p className={`text-sm ${theme.text} opacity-80`}>
//                 {problem.difficulty} | {problem.topic}
//               </p>
//             </motion.li>
//           ))}
//         </AnimatePresence>
//       </ul>
//       {visibleSubmissions < submissions.length && (
//         <button
//           onClick={loadMore}
//           className={`mt-4 ${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//         >
//           Load More
//         </button>
//       )}
//     </motion.div>
//   );
// };

// const QuickActions = ({ theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 1.2 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//   >
//     <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//       <FaRocket className="mr-2" /> Quick Actions
//     </h2>
//     <div className="grid grid-cols-2 gap-4">
//       <QuickActionButton to="/problems" icon={FaCode} text="Solve Problems" theme={theme} />
//       <QuickActionButton to="/leaderboard" icon={FaTrophy} text="Leaderboard" theme={theme} />
//       <QuickActionButton to="/topics" icon={FaBookOpen} text="Study Topics" theme={theme} />
//       <QuickActionButton href="https://github.com/your-repo" icon={FaGithub} text="Contribute" external theme={theme} />
//     </div>
//   </motion.div>
// );

// const QuickActionButton = ({ to, href, icon: Icon, text, external, theme }) => {
//   const baseClasses = `${theme.buttonBg} ${theme.buttonHover} ${theme.text} font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-50`;

//   if (external) {
//     return (
//       <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
//         <Icon className="mr-2" /> {text}
//       </a>
//     );
//   }

//   return (
//     <Link to={to} className={baseClasses}>
//       <Icon className="mr-2" /> {text}
//     </Link>
//   );
// };

// const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo, theme }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.8 }}
//     className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 overflow-hidden`}
//   >
//     <h2 className="text-xl font-semibold mb-4 flex items-center">
//       <FaTasks className={`mr-2 ${theme.text}`} /> Todo List
//     </h2>
//     <div className="flex mb-4">
//       <input
//         type="text"
//         value={newTodo}
//         onChange={(e) => setNewTodo(e.target.value)}
//         className={`flex-grow mr-2 p-2 rounded-md ${theme.cardBg} ${theme.border} border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
//         placeholder="Add a new task..."
//       />
//       <button
//         onClick={addTodo}
//         className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300`}
//       >
//         Add
//       </button>
//     </div>
//     <ul className="space-y-2 max-h-60 overflow-y-auto">
//       {todos.map((todo) => (
//         <li
//           key={todo.id}
//           className={`flex items-center justify-between p-2 rounded-md ${theme.cardBg} hover:bg-opacity-80 transition duration-300`}
//         >
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id)}
//               className="mr-2"
//             />
//             <span className={todo.completed ? `line-through ${theme.text} opacity-50` : theme.text}>
//               {todo.text}
//             </span>
//           </div>
//           <button
//             onClick={() => deleteTodo(todo.id)}
//             className="text-red-500 hover:text-red-600 transition duration-300"
//           >
//             <FaTrash />
//           </button>
//         </li>
//       ))}
//     </ul>
//   </motion.div>
// );

// const formatTime = (milliseconds) => {
//   const totalSeconds = Math.floor(milliseconds / 1000);
//   const hours = Math.floor(totalSeconds / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;
//   return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// };


// export default UserDashboard;

// ----------------------------------------------------------------------------

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCode, FaTrophy, FaCalendarAlt, FaClock, FaLightbulb, FaChartLine, FaRocket, FaGithub, FaFire, FaMedal, FaMusic, FaTasks, FaBookOpen, FaTrash, FaPalette } from 'react-icons/fa';
import MusicPlayer from './MusicPlayer';
import Avatar from 'react-avatar';
import { AreaChart, Area } from 'recharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
// import ReactTooltip from 'react-tooltip';
import { Tooltip as ReactTooltip } from 'react-tooltip';
// import './UserDashboard.css';
import DailyCodingChallenge from './DailyCodingChallenge';
import { Loader } from 'lucide-react';

const themes = {
  darkMode: {
    bg: 'bg-gray-900',
    text: 'text-gray-200',
    textMuted: 'text-gray-400',
    bgGradient: 'bg-gradient-to-b from-gray-900 to-gray-800',
    border: 'border-gray-700',
    cardBg: 'bg-gray-800',
    buttonBg: 'bg-blue-600',
    buttonHover: 'hover:bg-blue-700',
  },
  customMode: {
    bg: 'bg-[#0F172A]',
    bgGradient: 'bg-gradient-to-b from-[#0F172A] to-[#1E293B]',
    text: 'text-slate-200',
    textMuted: 'text-slate-400',
    border: 'border-slate-700/50',
    cardBg: 'bg-slate-800/50',
    buttonBg: 'bg-indigo-500',
    buttonHover: 'hover:bg-indigo-600',
  },
  dracula: {
    bg: 'bg-[#282a36]',
    text: 'text-[#f8f8f2]',
    bgGradient: 'bg-gradient-to-b from-[#282a36] to-[#44475a]',
    textMuted: 'text-[#6272a4]',
    border: 'border-[#44475a]',
    cardBg: 'bg-[#1e1f29]',
    buttonBg: 'bg-[#ff79c6]',
    buttonHover: 'hover:bg-[#bd93f9]',
  },
  gruvbox: {
    bg: 'bg-[#282828]',
    text: 'text-[#ebdbb2]',
    bgGradient: 'bg-gradient-to-b from-[#282828] to-[#3c3836]',
    textMuted: 'text-[#a89984]',
    border: 'border-[#3c3836]',
    cardBg: 'bg-[#3c3836]',
    buttonBg: 'bg-[#fabd2f]',
    buttonHover: 'hover:bg-[#fe8019]',
  },
  nord: {
    bg: 'bg-[#2e3440]',
    text: 'text-[#d8dee9]',
    bgGradient: 'bg-gradient-to-b from-[#2e3440] to-[#3b4252]',
    textMuted: 'text-[#4c566a]',
    border: 'border-[#4c566a]',
    cardBg: 'bg-[#3b4252]',
    buttonBg: 'bg-[#81a1c1]',
    buttonHover: 'hover:bg-[#5e81ac]',
  },
  oneDark: {
    bg: 'bg-[#282c34]',
    text: 'text-[#f8f8f2]',
    bgGradient: 'bg-gradient-to-b from-[#282c34] to-[#3e4452]',
    textMuted: 'text-[#5c6370]',
    border: 'border-[#4b5263]',
    cardBg: 'bg-[#2c323c]',
    buttonBg: 'bg-[#61afef]',
    buttonHover: 'hover:bg-[#528bff]',
  },
  cobalt: {
    bg: 'bg-[#002240]',
    text: 'text-[#ffffff]',
    bgGradient: 'bg-gradient-to-b from-[#002240] to-[#003366]',
    textMuted: 'text-[#99aabb]',
    border: 'border-[#0e4b82]',
    cardBg: 'bg-[#002b56]',
    buttonBg: 'bg-[#ff9800]',
    buttonHover: 'hover:bg-[#ff5722]',
  },
};

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [progressData, setProgressData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('userTheme') || 'darkMode';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('userTodos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [problemStats, setProblemStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  const [totalProblems, setTotalProblems] = useState(0);

  const [activityData, setActivityData] = useState([]);



  const fetchActivityData = useCallback(async () => {
    try {
      const response = await api.get(`/auth/users/${user._id}/activity`);
      setActivityData(response.data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);


  useEffect(() => {
    fetchActivityData();
  }, [fetchActivityData]);

  const fetchUserData = useCallback(async () => {
    try {
      const solvedProblemsIds = user.solvedProblems.slice().reverse();

      const noOfProblems = await api.get('/problems');
      setTotalProblems(noOfProblems.data.length);

      const solvedProblemsDetails = await Promise.all(
        solvedProblemsIds.map(async (problemId) => {
          const response = await api.get(`/problems/${problemId}`);
          return response.data;
        })
      );
      setRecentSubmissions(solvedProblemsDetails.slice(0, 5));

      const difficultyCounts = solvedProblemsDetails.reduce((acc, problem) => {
        acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
        return acc;
      }, {});

      const problemsByDifficulty = await api.get('/problems/count-by-difficulty');
      const totalProblemsByDifficulty = problemsByDifficulty.data;

      setProblemStats({
        total: solvedProblemsIds.length,
        easy: { solved: difficultyCounts.Easy || 0, total: totalProblemsByDifficulty.Easy },
        medium: { solved: difficultyCounts.Medium || 0, total: totalProblemsByDifficulty.Medium },
        hard: { solved: difficultyCounts.Hard || 0, total: totalProblemsByDifficulty.Hard }
      });

      const progressData = calculateUserProgress();
      setProgressData(progressData);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [user]);

  const calculateUserProgress = useCallback(() => {
    const today = new Date();
    const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const progressData = [];
    for (let i = 0; i <= 6; i++) {
      const date = new Date(sixDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      const problemsSolved = user.submissions.filter(submission =>
        new Date(submission.date).toDateString() === date.toDateString()
      ).length;
      progressData.push({
        date: date.toISOString().split('T')[0],
        problemsSolved
      });
    }

    return progressData;
  }, [user.submissions]);

  const programmingQuotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Code is like humor. When you have to explain it, it's bad. - Cory House",
    "First, solve the problem. Then, write the code. - John Johnson",
    "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
    "The best error message is the one that never shows up. - Thomas Fuchs",
    "Simplicity is the soul of efficiency. - Austin Freeman",
    "Make it work, make it right, make it fast. - Kent Beck",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
    "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
    "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
    "The function of good software is to make the complex appear to be simple. - Grady Booch",
    "It's not a bug – it's an undocumented feature. - Anonymous",
    "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
    "The best way to predict the future is to implement it. - David Heinemeier Hansson",
    "Good code is its own best documentation. - Steve McConnell"
  ];


  const fetchMotivationalQuote = useCallback(async () => {
    try {
      // const response = await api.get('/api/quote');
      // setMotivationalQuote(response.data.content);
      const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
      setMotivationalQuote(programmingQuotes[randomIndex]);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setMotivationalQuote("Keep coding, keep growing!");
    }
  }, []);

  const calculateTotalTime = useCallback(() => {
    if (user && user.createdAt) {
      const joinDate = new Date(user.createdAt);
      const now = new Date();
      const timeDiff = now - joinDate;
      setTotalTime(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
    } else {
      setTotalTime(0);
    }
  }, [user]);

  const calculateStreak = useCallback(() => {
    if (!user || !user.submissions) {
      setStreak(0);
      return;
    }

    const today = new Date();
    let currentStreak = 0;
    let lastSubmissionDate = null;

    for (let i = user.submissions.length - 1; i >= 0; i--) {
      const submissionDate = new Date(user.submissions[i].date);
      if (lastSubmissionDate === null) {
        lastSubmissionDate = submissionDate;
        currentStreak = 1;
      } else {
        const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
        if (dayDifference === 1) {
          currentStreak++;
          lastSubmissionDate = submissionDate;
        } else if (dayDifference > 1) {
          break;
        }
      }
    }

    const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
    if (daysSinceLastSubmission > 1) {
      currentStreak = 0;
    }

    setStreak(currentStreak);
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (user) {
        await Promise.all([
          fetchUserData(),
          fetchMotivationalQuote(),
          calculateTotalTime(),
          calculateStreak()
        ]);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user, fetchUserData, fetchMotivationalQuote, calculateTotalTime, calculateStreak]);


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
      setTodos(updatedTodos);
      setNewTodo('');
      localStorage.setItem('userTodos', JSON.stringify(updatedTodos));
    }
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('userTodos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('userTodos', JSON.stringify(updatedTodos));
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const theme = themes[currentTheme];

  return (
    <>
      {isLoading ? (
        <div className={`min-h-screen ${theme.bg} ${theme.text} font-mono flex items-center justify-center`}>
          {/* <div className="text-3xl">Loading...</div> */}
          <div className={`text-5xl ${theme.text}`}>
          <Loader size={100} color="#6366f1" strokeWidth={3} />
          </div>
        </div>
      ) : (
        <div className={`min-h-screen ${theme.bgGradient} ${theme.text} font-mono`}>
          <header className={`${theme.bg} ${theme.border} border-b`}>
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">

              <h1 className="text-3xl font-bold">
                <span className={theme.text}></span> {getGreeting()}, {user.username || 'Guest'}
              </h1>
              <div className="flex items-center space-x-4">

                <button
                  onClick={() => {
                    setCurrentTheme((prevTheme) => {
                      const themeOrder = ['darkMode','customMode', 'dracula', 'gruvbox', 'nord', 'oneDark', 'cobalt'];
                      const currentIndex = themeOrder.indexOf(prevTheme);
                      const nextIndex = (currentIndex + 1) % themeOrder.length;
                      const nextTheme = themeOrder[nextIndex];

                      // Set the new theme in localStorage
                      localStorage.setItem('userTheme', nextTheme);

                      return nextTheme;
                    });
                  }}
                  className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
                >
                  <FaPalette className="inline-block mr-2" /> Change Theme
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>

          
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <div className={`${theme.cardBg} rounded-lg shadow p-6`}>
                  <Avatar src={user.avatar} name={user.username} size="100" round={true} className="mx-auto mb-4" />
                  <h2 className={`text-2xl font-bold text-center mb-2 ${theme.text}`}>@{user.username}</h2>
                  {/* <p className={`${theme.text} text-center mb-4 opacity-80`}>@{user.handle}</p> */}
                  <div className="flex justify-around">
                    <StatCard icon={FaCode} value={user?.solvedProblems?.length || 0} label="Solved" theme={theme} />
                    <StatCard icon={FaFire} value={streak} label="Streak" theme={theme} />
                  </div>
                </div>

                <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} theme={theme} />
                <DailyCodingChallenge user={user} theme={theme} />
              </div>
              <div className="col-span-12 lg:col-span-6 space-y-6">
                <ActivityHeatmap data={activityData} theme={theme} />
                <ProblemStats problemStats={problemStats} totalProblems={totalProblems} theme={theme} />
                <TodoList todos={todos} addTodo={addTodo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} newTodo={newTodo} setNewTodo={setNewTodo} theme={theme} />
              </div>
              <div className="col-span-12 lg:col-span-3 space-y-6">
                <MotivationalQuote quote={motivationalQuote} theme={theme} />
                <RecentSubmissions submissions={recentSubmissions} theme={theme} />

              </div>
            </div>
            <div className="mt-2">
              <QuickActions theme={theme} />
            </div>
          </main>
        </div>
      )}
    </>
  );
};

const StatCard = ({ icon: Icon, value, label, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${theme.cardBg} ${theme.border} border rounded-lg p-4 flex items-center justify-between`}
  >
    <div>
      <p className="text-2xl font-bold">{isNaN(value) ? 'N/A' : value}</p>
      <p className={`text-sm ${theme.text}`}>{label}</p>
    </div>
    <Icon className={`text-3xl ${theme.text}`} />
  </motion.div>
);

const MotivationalQuote = ({ quote, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
  >
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <FaLightbulb className={`mr-2 ${theme.text}`} /> Daily Inspiration
    </h2>
    <blockquote className={`italic ${theme.text} text-lg`}>{quote}</blockquote>
  </motion.div>
);

const ProblemStats = ({ problemStats, totalProblems, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
  >
    <h2 className="text-xl font-semibold mb-4">Problem Solving Progress</h2>
    <div className="flex justify-between items-center mb-4">
      <span>Solved</span>
      <span className="font-bold">{problemStats.total}/{totalProblems}</span>
    </div>
    <div className="space-y-2">
      <ProgressBar label="Easy" solved={problemStats.easy.solved} total={problemStats.easy.total} color="green" />
      <ProgressBar label="Medium" solved={problemStats.medium.solved} total={problemStats.medium.total} color="yellow" />
      <ProgressBar label="Hard" solved={problemStats.hard.solved} total={problemStats.hard.total} color="red" />
    </div>
  </motion.div>
);

const ProgressBar = ({ label, solved, total, color }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span>{label}</span>
      <span>{solved}/{total}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className={`bg-${color}-600 h-2.5 rounded-full`}
        style={{ width: `${(solved / total) * 100}%` }}
      ></div>
    </div>
  </div>
);


const ActivityHeatmap = ({ data, theme }) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);

  const getColor = (count) => {
    if (!count || count === 0) return 'color-empty';
    if (count < 2) return 'color-scale-1';
    if (count < 4) return 'color-scale-2';
    if (count < 6) return 'color-scale-3';
    return 'color-scale-4';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaCalendarAlt className={`mr-2 ${theme.text}`} /> Your Activity
      </h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={today}
        values={data}
        classForValue={(value) => getColor(value ? value.count : 0)}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return null;
          }
          return {
            'data-tip': `${value.date}: ${value.count} problems solved`,
          };
        }}
      />
      <ReactTooltip />
      <style jsx>{`
        .react-calendar-heatmap .color-empty { fill: ${theme.cardBg}; }
        .react-calendar-heatmap .color-scale-1 { fill: #9be9a8; }
        .react-calendar-heatmap .color-scale-2 { fill: #40c463; }
        .react-calendar-heatmap .color-scale-3 { fill: #30a14e; }
        .react-calendar-heatmap .color-scale-4 { fill: #216e39; }
      `}</style>
    </motion.div>
  );
};


const RecentSubmissions = ({ submissions, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
    >
      <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
        <FaCode className="mr-2" /> Recent Submissions
      </h2>
      <ul
        className="space-y-3 overflow-y-auto scrollbar-hide" // Custom class to hide scrollbar
        style={{ maxHeight: '300px' }} // Adjust height as needed
      >
        <AnimatePresence>
          {submissions.map((problem, index) => (
            <motion.li
              key={problem._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-3 rounded-md ${theme.buttonBg} transition duration-300`}
            >
              <Link to={`/problems/${problem._id}`} className={`text-lg font-semibold ${theme.text} hover:opacity-80 transition duration-300`}>
                {problem.title}
              </Link>
              <p className={`text-sm ${theme.text} opacity-80`}>
                {problem.difficulty} | {problem.topic}
              </p>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
};


const QuickActions = ({ theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
    className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
  >
    <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
      <FaRocket className="mr-2" /> Quick Actions
    </h2>
    <div className="grid grid-cols-2 gap-4">
      <QuickActionButton to="/problems" icon={FaCode} text="Solve Problems" theme={theme} />
      <QuickActionButton to="/leaderboard" icon={FaTrophy} text="Leaderboard" theme={theme} />
      <QuickActionButton to="/topics" icon={FaBookOpen} text="Study Topics" theme={theme} />
      <QuickActionButton href="https://github.com/your-repo" icon={FaGithub} text="Contribute" external theme={theme} />
    </div>
  </motion.div>
);



const QuickActionButton = ({ to, href, icon: Icon, text, external, theme }) => {
  const baseClasses = `${theme.buttonBg} ${theme.buttonHover} ${theme.text} font-bold py-2 px-3 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
        <Icon className="mr-1 text-lg" /> <span className="truncate">{text}</span>
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses}>
      <Icon className="mr-1 text-lg" /> <span className="truncate">{text}</span>
    </Link>
  );
};

const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className={`${theme.cardBg} ${theme.border} border rounded-lg p-6 overflow-hidden`}
  >
    <h2 className="text-xl font-semibold mb-4 flex items-center">
      <FaTasks className={`mr-2 ${theme.text}`} /> Todo List
    </h2>
    <div className="flex mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className={`flex-grow mr-2 p-2 rounded-md ${theme.cardBg} ${theme.border} border focus:outline-none focus:ring-2 focus:ring-opacity-50`}
        placeholder="Add a new task..."
      />
      <button
        onClick={addTodo}
        className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300`}
      >
        Add
      </button>
    </div>
    <ul className="space-y-2 max-h-60 overflow-y-auto">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center justify-between p-2 rounded-md ${theme.cardBg} hover:bg-opacity-80 transition duration-300`}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-2"
            />
            <span className={todo.completed ? `line-through ${theme.text} opacity-50` : theme.text}>
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-600 transition duration-300"
          >
            <FaTrash />
          </button>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default UserDashboard;

// ---------------------------------------------------------------------------

// import React, { useState, useEffect, useContext, useCallback } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import api from '../utils/api';
// import { motion, AnimatePresence } from 'framer-motion';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { 
//   Book, Search, Clock, Terminal, ChevronRight, 
//   Layout, Loader2, AlertCircle, BookOpen, 
//   Calendar, Award, Zap, Github, Music, CheckSquare, Trash2
// } from 'lucide-react';
// import  CalendarHeatmap  from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
// import { Tooltip as ReactTooltip } from 'react-tooltip';
// import Avatar from 'react-avatar';

// const UserDashboard = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [recentSubmissions, setRecentSubmissions] = useState([]);
//   const [totalTime, setTotalTime] = useState(0);
//   const [motivationalQuote, setMotivationalQuote] = useState('');
//   const [progressData, setProgressData] = useState([]);
//   const [streak, setStreak] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [todos, setTodos] = useState(() => {
//     const storedTodos = localStorage.getItem('userTodos');
//     return storedTodos ? JSON.parse(storedTodos) : [];
//   });
//   const [newTodo, setNewTodo] = useState('');
//   const [problemStats, setProblemStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
//   const [totalProblems, setTotalProblems] = useState(0);
//   const [activityData, setActivityData] = useState([]);

//   const fetchActivityData = useCallback(async () => {
//     try {
//       const response = await api.get(`/auth/users/${user._id}/activity`);
//       setActivityData(response.data);
//     } catch (error) {
//       console.error('Error fetching activity data:', error);
//     }
//   }, [user._id]);

//   useEffect(() => {
//     fetchActivityData();
//   }, [fetchActivityData]);

//   const fetchUserData = useCallback(async () => {
//     try {
//       const solvedProblemsIds = user.solvedProblems.slice().reverse();

//       const noOfProblems = await api.get('/problems');
//       setTotalProblems(noOfProblems.data.length);

//       const solvedProblemsDetails = await Promise.all(
//         solvedProblemsIds.map(async (problemId) => {
//           const response = await api.get(`/problems/${problemId}`);
//           return response.data;
//         })
//       );
//       setRecentSubmissions(solvedProblemsDetails.slice(0, 5));

//       const difficultyCounts = solvedProblemsDetails.reduce((acc, problem) => {
//         acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
//         return acc;
//       }, {});

//       const problemsByDifficulty = await api.get('/problems/count-by-difficulty');
//       const totalProblemsByDifficulty = problemsByDifficulty.data;

//       setProblemStats({
//         total: solvedProblemsIds.length,
//         easy: { solved: difficultyCounts.Easy || 0, total: totalProblemsByDifficulty.Easy },
//         medium: { solved: difficultyCounts.Medium || 0, total: totalProblemsByDifficulty.Medium },
//         hard: { solved: difficultyCounts.Hard || 0, total: totalProblemsByDifficulty.Hard }
//       });

//       const progressData = calculateUserProgress();
//       setProgressData(progressData);

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }, [user]);

//   const calculateUserProgress = useCallback(() => {
//     const today = new Date();
//     const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

//     const progressData = [];
//     for (let i = 0; i <= 6; i++) {
//       const date = new Date(sixDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
//       const problemsSolved = user.submissions.filter(submission =>
//         new Date(submission.date).toDateString() === date.toDateString()
//       ).length;
//       progressData.push({
//         date: date.toISOString().split('T')[0],
//         problemsSolved
//       });
//     }

//     return progressData;
//   }, [user.submissions]);

//   const programmingQuotes = [
//     "The only way to do great work is to love what you do. - Steve Jobs",
//     "Code is like humor. When you have to explain it, it's bad. - Cory House",
//     "First, solve the problem. Then, write the code. - John Johnson",
//     "Programming isn't about what you know; it's about what you can figure out. - Chris Pine",
//     "The best error message is the one that never shows up. - Thomas Fuchs",
//     "Simplicity is the soul of efficiency. - Austin Freeman",
//     "Make it work, make it right, make it fast. - Kent Beck",
//     "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
//     "Experience is the name everyone gives to their mistakes. - Oscar Wilde",
//     "The most disastrous thing that you can ever learn is your first programming language. - Alan Kay",
//     "The function of good software is to make the complex appear to be simple. - Grady Booch",
//     "It's not a bug – it's an undocumented feature. - Anonymous",
//     "Debugging is twice as hard as writing the code in the first place. - Brian Kernighan",
//     "The best way to predict the future is to implement it. - David Heinemeier Hansson",
//     "Good code is its own best documentation. - Steve McConnell"
//   ];

//   const fetchMotivationalQuote = useCallback(() => {
//     const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
//     setMotivationalQuote(programmingQuotes[randomIndex]);
//   }, []);

//   const calculateTotalTime = useCallback(() => {
//     if (user && user.createdAt) {
//       const joinDate = new Date(user.createdAt);
//       const now = new Date();
//       const timeDiff = now - joinDate;
//       setTotalTime(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
//     } else {
//       setTotalTime(0);
//     }
//   }, [user]);

//   const calculateStreak = useCallback(() => {
//     if (!user || !user.submissions) {
//       setStreak(0);
//       return;
//     }

//     const today = new Date();
//     let currentStreak = 0;
//     let lastSubmissionDate = null;

//     for (let i = user.submissions.length - 1; i >= 0; i--) {
//       const submissionDate = new Date(user.submissions[i].date);
//       if (lastSubmissionDate === null) {
//         lastSubmissionDate = submissionDate;
//         currentStreak = 1;
//       } else {
//         const dayDifference = Math.floor((lastSubmissionDate - submissionDate) / (1000 * 60 * 60 * 24));
//         if (dayDifference === 1) {
//           currentStreak++;
//           lastSubmissionDate = submissionDate;
//         } else if (dayDifference > 1) {
//           break;
//         }
//       }
//     }

//     const daysSinceLastSubmission = Math.floor((today - lastSubmissionDate) / (1000 * 60 * 60 * 24));
//     if (daysSinceLastSubmission > 1) {
//       currentStreak = 0;
//     }

//     setStreak(currentStreak);
//   }, [user]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       if (user) {
//         await Promise.all([
//           fetchUserData(),
//           fetchMotivationalQuote(),
//           calculateTotalTime(),
//           calculateStreak()
//         ]);
//       }
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [user, fetchUserData, fetchMotivationalQuote, calculateTotalTime, calculateStreak]);

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good morning';
//     if (hour < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const addTodo = () => {
//     if (newTodo.trim()) {
//       const updatedTodos = [...todos, { id: Date.now(), text: newTodo, completed: false }];
//       setTodos(updatedTodos);
//       setNewTodo('');
//       localStorage.setItem('userTodos', JSON.stringify(updatedTodos));
//     }
//   };

//   const toggleTodo = (id) => {
//     const updatedTodos = todos.map(todo =>
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     );
//     setTodos(updatedTodos);
//     localStorage.setItem('userTodos', JSON.stringify(updatedTodos));
//   };

//   const deleteTodo = (id) => {
//     const updatedTodos = todos.filter(todo => todo.id !== id);
//     setTodos(updatedTodos);
//     localStorage.setItem('userTodos', JSON.stringify(updatedTodos));
//   };

//   const toggleMusic = () => {
//     setIsPlaying(!isPlaying);
//   };

// // main code starts here

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
//       {/* Top Banner */}
//       <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

//       <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         {isLoading ? (
//           <div className="flex items-center justify-center py-12">
//             <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
//           </div>
//         ) : (
//           <>
//             {/* Header Section */}
//             <div className="mb-12">
//               <motion.h1 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-4 text-4xl font-bold text-white"
//               >
//                 {getGreeting()}, {user.username || 'Guest'}
//               </motion.h1>
//               <motion.p 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.1 }}
//                 className="text-lg text-slate-400"
//               >
//                 Welcome to your personal dashboard
//               </motion.p>
//             </div>

//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <UserStats user={user} streak={streak} totalTime={totalTime} />
//               <MotivationalQuote quote={motivationalQuote} />
//               <ProblemStats problemStats={problemStats} totalProblems={totalProblems} />
//               <ActivityHeatmap data={activityData} />
//               <RecentSubmissions submissions={recentSubmissions} />
//               <TodoList
//                 todos={todos}
//                 addTodo={addTodo}
//                 toggleTodo={toggleTodo}
//                 deleteTodo={deleteTodo}
//                 newTodo={newTodo}
//                 setNewTodo={setNewTodo}
//               />
//             </div>

//             <QuickActions />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const UserStats = ({ user, streak, totalTime }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
//     <div className="relative">
//       <div className="flex items-center gap-4 mb-4">
//         <Avatar src={user.avatar} name={user.username} size="60" round={true} />
//         <div>
//           <h2 className="text-2xl font-bold text-white">@{user.username}</h2>
//           <p className="text-slate-400">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         <StatCard icon={Book} value={user?.solvedProblems?.length || 0} label="Problems Solved" />
//         <StatCard icon={Zap} value={streak} label="Day Streak" />
//         <StatCard icon={Clock} value={totalTime} label="Days Active" />
//         <StatCard icon={Award} value={user?.rank || 'N/A'} label="Global Rank" />
//       </div>
//     </div>
//   </motion.div>
// );

// const StatCard = ({ icon: Icon, value, label }) => (
//   <div className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3">
//     <Icon className="h-5 w-5 text-indigo-400" />
//     <div>
//       <p className="text-lg font-semibold text-white">{value}</p>
//       <p className="text-xs text-slate-400">{label}</p>
//     </div>
//   </div>
// );

// const MotivationalQuote = ({ quote }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.2 }}
//     className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
//     <div className="relative">
//       <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
//         <BookOpen className="mr-2 text-purple-400" /> Daily Inspiration
//       </h2>
//       <blockquote className="italic text-slate-300 text-lg">{quote}</blockquote>
//     </div>
//   </motion.div>
// );

// const ProblemStats = ({ problemStats, totalProblems }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10" />
//     <div className="relative">
//       <h2 className="text-xl font-semibold mb-4 text-white">Problem Solving Progress</h2>
//       <div className="flex justify-between items-center mb-4">
//         <span className="text-slate-300">Solved</span>
//         <span className="font-bold text-white">{problemStats.total}/{totalProblems}</span>
//       </div>
//       <div className="space-y-2">
//         <ProgressBar label="Easy" solved={problemStats.easy.solved} total={problemStats.easy.total} color="green" />
//         <ProgressBar label="Medium" solved={problemStats.medium.solved} total={problemStats.medium.total} color="yellow" />
//         <ProgressBar label="Hard" solved={problemStats.hard.solved} total={problemStats.hard.total} color="red" />
//       </div>
//     </div>
//   </motion.div>
// );

// const ProgressBar = ({ label, solved, total, color }) => (
//   <div>
//     <div className="flex justify-between mb-1">
//       <span className="text-slate-300">{label}</span>
//       <span className="text-slate-300">{solved}/{total}</span>
//     </div>
//     <div className="w-full bg-slate-700 rounded-full h-2.5">
//       <div
//         className={`bg-${color}-500 h-2.5 rounded-full`}
//         style={{ width: `${(solved / total) * 100}%` }}
//       ></div>
//     </div>
//   </div>
// );

// const ActivityHeatmap = ({ data }) => {
//   const today = new Date();
//   const startDate = new Date(today.getFullYear(), 0, 1);

//   const getColor = (count) => {
//     if (!count || count === 0) return 'color-empty';
//     if (count < 2) return 'color-scale-1';
//     if (count < 4) return 'color-scale-2';
//     if (count < 6) return 'color-scale-3';
//     return 'color-scale-4';
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.4 }}
//       className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
//       <div className="relative">
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
//           <Calendar className="mr-2 text-blue-400" /> Your Activity
//         </h2>
//         <CalendarHeatmap
//           startDate={startDate}
//           endDate={today}
//           values={data}
//           classForValue={(value) => getColor(value ? value.count : 0)}
//           tooltipDataAttrs={(value) => {
//             if (!value || !value.date) {
//               return null;
//             }
//             return {
//               'data-tip': `${value.date}: ${value.count} problems solved`,
//             };
//           }}
//         />
//         <ReactTooltip />
//         <style jsx>{`
//           .react-calendar-heatmap .color-empty { fill: rgba(255, 255, 255, 0.1); }
//           .react-calendar-heatmap .color-scale-1 { fill: rgba(0, 255, 0, 0.3); }
//           .react-calendar-heatmap .color-scale-2 { fill: rgba(0, 255, 0, 0.5); }
//           .react-calendar-heatmap .color-scale-3 { fill: rgba(0, 255, 0, 0.7); }
//           .react-calendar-heatmap .color-scale-4 { fill: rgba(0, 255, 0, 0.9); }
//         `}</style>
//       </div>
//     </motion.div>
//   );
// };


// const RecentSubmissions = ({ submissions }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10" />
//       <div className="relative">
//         <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
//           <Terminal className="mr-2 text-orange-400" /> Recent Submissions
//         </h2>
//         <ul className="space-y-3 overflow-y-auto max-h-[300px]">
//           <AnimatePresence>
//             {submissions.map((problem, index) => (
//               <motion.li
//                 key={problem._id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className="p-3 rounded-md bg-slate-700/30 transition duration-300"
//               >
//                 <Link to={`/problems/${problem._id}`} className="text-lg font-semibold text-white hover:text-indigo-400 transition duration-300">
//                   {problem.title}
//                 </Link>
//                 <p className="text-sm text-slate-400">
//                   {problem.difficulty} | {problem.topic}
//                 </p>
//               </motion.li>
//             ))}
//           </AnimatePresence>
//         </ul>
//       </div>
//     </motion.div>
//   );
// };

// const TodoList = ({ todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 0.8 }}
//     className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
//     <div className="relative">
//       <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
//         <CheckSquare className="mr-2 text-pink-400" /> Todo List
//       </h2>
//       <div className="flex mb-4">
//         <input
//           type="text"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           className="flex-grow mr-2 p-2 rounded-md bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//           placeholder="Add a new task..."
//         />
//         <button
//           onClick={addTodo}
//           className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
//         >
//           Add
//         </button>
//       </div>
//       <ul className="space-y-2 max-h-60 overflow-y-auto">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className="flex items-center justify-between p-2 rounded-md bg-slate-700/30 hover:bg-slate-700/50 transition duration-300"
//           >
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={todo.completed}
//                 onChange={() => toggleTodo(todo.id)}
//                 className="mr-2"
//               />
//               <span className={todo.completed ? "line-through text-slate-400" : "text-white"}>
//                 {todo.text}
//               </span>
//             </div>
//             <button
//               onClick={() => deleteTodo(todo.id)}
//               className="text-red-400 hover:text-red-500 transition duration-300"
//             >
//               <Trash2 size={18} />
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   </motion.div>
// );

// const QuickActions = () => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5, delay: 1.2 }}
//     className="mt-6 relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
//     <div className="relative">
//       <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
//         <Zap className="mr-2 text-yellow-400" /> Quick Actions
//       </h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <QuickActionButton to="/problems" icon={Terminal} text="Solve Problems" />
//         <QuickActionButton to="/leaderboard" icon={Award} text="Leaderboard" />
//         <QuickActionButton to="/topics" icon={Book} text="Study Topics" />
//         <QuickActionButton href="https://github.com/your-repo" icon={Github} text="Contribute" external />
//       </div>
//     </div>
//   </motion.div>
// );

// const QuickActionButton = ({ to, href, icon: Icon, text, external }) => {
//   const baseClasses = "bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-3 rounded-lg transition duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-sm";

//   if (external) {
//     return (
//       <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
//         <Icon className="mr-1 text-lg" /> <span className="truncate">{text}</span>
//       </a>
//     );
//   }

//   return (
//     <Link to={to} className={baseClasses}>
//       <Icon className="mr-1 text-lg" /> <span className="truncate">{text}</span>
//     </Link>
//   );
// };

// export default UserDashboard;