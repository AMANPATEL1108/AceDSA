import React from "react";
import { motion } from "framer-motion";
import { formatTime } from "../../utils/formatTime";

const SubmissionHistory = ({ submissions, setCode }) => {
  return (
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
              <p>Duration: {formatTime(submission.duration / 1000)}</p>
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
  );
};

export default SubmissionHistory;
