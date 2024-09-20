import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState(new Set());

  useEffect(() => {
    const fetchProblemsAndUserProgress = async () => {
      try {
        // Fetch problems
        const res = await api.get("/problems");
        setProblems(res.data);

        // Fetch user ID from local storage
        const userID = localStorage.getItem("userID");

        if (userID) {
          // Fetch user's solved problems based on their ID
          const solvedRes = await api.get(`/problems/${userID}/solved-problems`);
          setSolvedProblems(new Set(solvedRes.data));
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchProblemsAndUserProgress();
  }, []);

  const solvedCount = solvedProblems.size;
  const totalProblems = problems.length;
  const completionPercentage =
    totalProblems > 0 ? (solvedCount / totalProblems) * 100 : 0;

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4 text-green-400">Problems</h2>
        {/* Progress Bar Section */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <p className="text-xl mb-2">
            Progress: {solvedCount} / {totalProblems} problems solved
          </p>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-right mt-1">
            {completionPercentage.toFixed(1)}% complete
          </p>
        </div>

        {/* Problems Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left w-16">Status</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left w-24">Difficulty</th>
                <th className="px-4 py-3 text-left w-32">Topic</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem._id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition duration-300"
                >
                  <td className="px-4 py-3">
                    <FaCheckCircle
                      className={`text-2xl ${
                        solvedProblems.has(problem._id)
                          ? "text-green-400"
                          : "text-gray-500"
                      }`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/problems/${problem._id}`}
                      state={{ isSolved: solvedProblems.has(problem._id) }}
                      className="text-green-400 hover:text-green-300 transition duration-300"
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{problem.difficulty}</td>
                  <td className="px-4 py-3">{problem.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problems;