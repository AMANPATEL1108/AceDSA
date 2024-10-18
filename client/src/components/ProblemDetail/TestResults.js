import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaChevronRight, FaChevronDown } from "react-icons/fa";

const TestResults = ({ testResults }) => {
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  return (
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
            className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition-all duration-300 ${
              result.passed
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
                      <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-300 text-left">
                        {JSON.stringify(testResults[selectedTestCase][section], null, 2)}
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
  );
};

export default TestResults;

