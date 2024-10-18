// import React from "react";
// import { motion } from "framer-motion";

// const ProblemDescription = ({ problem }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h3 className="text-2xl font-bold mb-4 text-green-400">Problem Description</h3>
//       <p className="text-gray-300 leading-relaxed mb-6">{problem.description}</p>

//       <h4 className="text-xl font-bold mb-2 text-green-400">Examples</h4>
//       {problem.example.map((example, index) => (
//         <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
//           <pre className="text-gray-300 overflow-x-auto">
//             <strong>Example {index + 1}:</strong>
//             <br />
//             <strong>Input:</strong> {example.input}
//             <br />
//             <strong>Output:</strong> {example.output}
//           </pre>
//         </div>
//       ))}

//       <h4 className="text-xl font-bold mb-2 text-green-400">Constraints</h4>
//       <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
//         {problem.constraints.map((constraint, index) => (
//           <li key={index}>{constraint}</li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// };

// export default ProblemDescription;

import React from "react";
import { motion } from "framer-motion";

const ProblemDescription = ({ problem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6"
    >
      {/* Problem Description Section */}
      <h3 className="text-2xl font-bold mb-4 text-green-400 text-left">Problem Description</h3>
      <p className="text-gray-300 leading-relaxed mb-6 text-left">{problem.description}</p>

      {/* Examples Section */}
      <h4 className="text-xl font-bold mb-2 text-green-400 text-left">Examples</h4>
      {problem.example.map((example, index) => (
        <div key={index} className="bg-gray-700 p-4 rounded-lg mb-4">
          <strong>Example {index + 1}:</strong>
          <div className="text-gray-300">
            <strong>Input:</strong> <span className="text-blue-400">{example.input}</span>
            <br />
            <strong>Output:</strong> <span className="text-blue-400">{example.output}</span>
          </div>
        </div>
      ))}

      {/* Constraints Section */}
      <h4 className="text-xl font-bold mb-2 text-green-400 text-left">Constraints</h4>
      <ul className="list-disc list-inside text-gray-300 mb-6 text-left">
        {problem.constraints.map((constraint, index) => (
          <li key={index} className="mb-1">{constraint}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProblemDescription;
