import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import api from "../utils/api";
import toast from "react-hot-toast";

function ManageProblems() {
  const [problems, setProblems] = useState([
    {
      _id: '1',
      id: '101',
      title: 'Two Sum',
      difficulty: 'Easy',
      topic: 'Arrays',
      leetcode_link: 'https://leetcode.com/problems/two-sum'
    },
    {
      _id: '2', 
      id: '102',
      title: 'Valid Parentheses',
      difficulty: 'Medium',
      topic: 'Strings',
      leetcode_link: 'https://leetcode.com/problems/valid-parentheses'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);

  const navigate = useNavigate();

  const handleDeleteProblem = async (problemId) => {
    try {
      await api.delete(`/admin/problems/${problemId}`);
      toast.success("Problem deleted successfully");
      setProblems(problems.filter(problem => problem._id !== problemId));
    } catch (error) {
      toast.error("Failed to delete problem");
    }
  };

  const handleBulkDelete = async () => {
    try {
      await api.post("/admin/problems/bulk-delete", { problemIds: selectedProblems });
      toast.success("Selected problems deleted successfully");
      setSelectedProblems([]);
      setProblems(problems.filter(problem => !selectedProblems.includes(problem._id)));
    } catch (error) {
      toast.error("Failed to delete problems");
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "text-green-400",
      Medium: "text-yellow-400",
      Hard: "text-red-400"
    };
    return colors[difficulty] || "text-gray-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 min-h-screen p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-green-400">Manage Problems</h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/add-problem")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              Add New Problem
            </motion.button>
            {selectedProblems.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBulkDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Selected ({selectedProblems.length})
              </motion.button>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="all">All Topics</option>
              <option value="Arrays">Arrays</option>
              <option value="Strings">Strings</option>
              <option value="LinkedList">Linked List</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="id">Sort by ID</option>
              <option value="title">Sort by Title</option>
              <option value="difficulty">Sort by Difficulty</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setSelectedProblems(e.target.checked ? problems.map(p => p._id) : []);
                      }}
                    />
                  </th>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Difficulty</th>
                  <th className="p-4 text-left">Topic</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {problems.map((problem) => (
                  <motion.tr
                    key={problem._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-gray-700"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProblems.includes(problem._id)}
                        onChange={(e) => {
                          setSelectedProblems(prev =>
                            e.target.checked
                              ? [...prev, problem._id]
                              : prev.filter(id => id !== problem._id)
                          );
                        }}
                      />
                    </td>
                    <td className="p-4">{problem.id}</td>
                    <td className="p-4">{problem.title}</td>
                    <td className={`p-4 ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                        {problem.topic}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => navigate(`/admin/edit-problem/${problem._id}`)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteProblem(problem._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ManageProblems;