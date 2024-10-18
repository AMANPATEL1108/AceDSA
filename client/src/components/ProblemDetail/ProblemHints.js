import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";

const ProblemHints = ({ hints }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-4 text-green-400">Hints</h3>
      <ul className="space-y-4">
        {hints.map((hint, index) => (
          <li key={index} className="bg-gray-700 p-4 rounded-lg">
            <FaLightbulb className="inline-block mr-2 text-yellow-400" />
            <span className="text-gray-300">{hint}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default ProblemHints;
