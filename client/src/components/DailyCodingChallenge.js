// import React, { useState, useEffect } from 'react';
// import { FaPuzzlePiece } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';

// const DailyCodingChallenge = ({ theme, user }) => {
//   const [challenge, setChallenge] = useState(null);

//   useEffect(() => {
//     const fetchChallenge = async () => {
//       try {
//         const response = await api.get('/problems');
//         const allProblems = response.data;
//         const unsolvedProblems = allProblems.filter(problem => !user.solvedProblems.includes(problem._id));

//         if (unsolvedProblems.length > 0) {
//           const randomIndex = Math.floor(Math.random() * unsolvedProblems.length);
//           setChallenge(unsolvedProblems[randomIndex]);
//         }
//       } catch (error) {
//         console.error('Error fetching daily challenge:', error);
//       }
//     };

//     fetchChallenge();
//   }, [user.solvedProblems]);

//   if (!challenge) return null;

//   return (
//     <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}>
//       <h3 className={`${theme.text} text-xl font-bold mb-4 flex items-center`}>
//         <FaPuzzlePiece className="mr-2" /> Problem of the Day
//       </h3>
//       <h4 className={`${theme.text} text-lg font-semibold mb-2`}>{challenge.title}</h4>
//       <p className={`${theme.text} mb-4 opacity-80`}>{challenge.description.substring(0, 100)}...</p>
//       <div className="flex justify-between items-center">
//         <span className={`${theme.text} text-sm`}>Difficulty: {challenge.difficulty}</span>
//         <Link
//           to={`/problems/${challenge._id}`}
//           className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded transition duration-300`}
//         >
//           Solve Now
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default DailyCodingChallenge;

// -------------------------------------

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/api';
// import { FaPuzzlePiece, FaCode } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const getDifficultyColor = (difficulty) => {
//     switch (difficulty.toLowerCase()) {
//         case 'easy': return 'bg-green-200 text-green-800';
//         case 'medium': return 'bg-yellow-200 text-yellow-800';
//         case 'hard': return 'bg-red-200 text-red-800';
//         default: return 'bg-gray-200 text-gray-800';
//     }
// };


// const DailyCodingChallenge = ({ theme, user }) => {
//     const [challenge, setChallenge] = useState(null);

//     useEffect(() => {
//         const fetchChallenge = async () => {
//             try {
//                 const response = await api.get('/problems');
//                 const allProblems = response.data;
//                 const unsolvedProblems = allProblems.filter(problem => !user.solvedProblems.includes(problem._id));

//                 if (unsolvedProblems.length > 0) {
//                     const randomIndex = Math.floor(Math.random() * unsolvedProblems.length);
//                     setChallenge(unsolvedProblems[randomIndex]);
//                 }
//             } catch (error) {
//                 console.error('Error fetching daily challenge:', error);
//             }
//         };

//         fetchChallenge();
//     }, [user.solvedProblems]);

//     if (!challenge) return null;

//     return (
//         <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.6 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//         <div className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}>
//             <h3 className={`${theme.text} text-xl font-bold mb-4 flex items-center`}>
//                 <FaPuzzlePiece className="mr-2" /> Problem of the Day
//             </h3>
//             <h4 className={`${theme.text} text-lg font-semibold mb-2`}>{challenge.title}</h4>
//             <div className="flex justify-around items-center mt-4">
//                 <span className={`${theme.text} text-sm font-medium px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
//                     {challenge.difficulty}
//                 </span>
//                 <Link
//                     to={`/problems/${challenge._id}`}
//                     className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center`}
//                 >
//                     <FaCode className="mr-2" /> Solve Now
//                 </Link>
//             </div>
//         </div>
//         </motion.div>
//     );
// };

// export default DailyCodingChallenge;

// --------------------------------------------

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FaPuzzlePiece, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'bg-green-700 text-green-800';
        case 'medium': return 'bg-yellow-200 text-yellow-800';
        case 'hard': return 'bg-red-500 text-red-800';
        default: return 'bg-gray-200 text-gray-800';
    }
};

const DailyCodingChallenge = ({ theme, user }) => {
    const [challenge, setChallenge] = useState(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const response = await api.get('/problems');
                const allProblems = response.data;
                const unsolvedProblems = allProblems.filter(problem => !user.solvedProblems.includes(problem._id));

                if (unsolvedProblems.length > 0) {
                    const randomIndex = Math.floor(Math.random() * unsolvedProblems.length);
                    setChallenge(unsolvedProblems[randomIndex]);
                }
            } catch (error) {
                console.error('Error fetching daily challenge:', error);
            }
        };

        fetchChallenge();
    }, [user.solvedProblems]);

    if (!challenge) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
        >
            <h3 className={`${theme.text} text-xl font-bold mb-4 flex items-center`}>
                <FaPuzzlePiece className="mr-2" /> Problem of the Day
            </h3>
            <h4 className={`${theme.text} text-lg font-semibold mb-2`}>{challenge.title}</h4>
            <div className="flex justify-around items-center mt-4">
                <span className={`${theme.text} text-sm font-medium px-2 py-1 rounded ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                </span>
                <Link
                    to={`/problems/${challenge._id}`}
                    className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-4 rounded-md transition duration-300 flex items-center`}
                >
                    <FaCode className="mr-2" /> Solve Now
                </Link>
            </div>
        </motion.div>
    );
};

export default DailyCodingChallenge