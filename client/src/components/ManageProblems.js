import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaDownload,
  FaTimes,
} from "react-icons/fa";
import api from "../utils/api";
import toast from "react-hot-toast";

function ManageProblems() {
  const [problems, setProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [topic, setTopic] = useState("all");
  const [sortBy, setSortBy] = useState("id");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await api.get("/admin/problems", {
        headers: {
          "x-auth-token": token,
        },
      });
      setProblems(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch problems");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProblem = async (problemId) => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.delete(`/admin/problems/${problemId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setProblems((prevProblems) =>
        prevProblems.filter((problem) => problem._id !== problemId)
      );
      toast.success("Problem deleted successfully");
    } catch (error) {
      toast.error("Failed to delete problem");
    }
  };

  const handleBulkDelete = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      await api.post(
        "/admin/problems/bulk-delete",
        { problemIds: selectedProblems },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setProblems((prevProblems) =>
        prevProblems.filter(
          (problem) => !selectedProblems.includes(problem._id)
        )
      );
      setSelectedProblems([]);
      toast.success("Selected problems deleted successfully");
    } catch (error) {
      toast.error("Failed to delete problems");
    }
  };

  const openEditModal = (problem) => {
    // Create a deep copy of the problem to prevent direct state mutation
    const problemCopy = JSON.parse(JSON.stringify(problem));
    setEditingProblem(problemCopy);
    setIsEditModalOpen(true);
  };

  const handleUpdateProblem = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      await api.put(`/admin/problems/${editingProblem._id}`, editingProblem, {
        headers: {
          "x-auth-token": token,
        },
      });

      setProblems((prevProblems) =>
        prevProblems.map((prob) =>
          prob._id === editingProblem._id ? editingProblem : prob
        )
      );

      setIsEditModalOpen(false);
      toast.success("Problem updated successfully");
    } catch (error) {
      toast.error("Failed to update problem");
    }
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "text-green-400",
      Medium: "text-yellow-400",
      Hard: "text-red-400",
    };
    return colors[difficulty] || "text-gray-400";
  };

  // Update the form input handlers to use controlled components
  const handleInputChange = (field, value) => {
    setEditingProblem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const EditModal = () => (
    <AnimatePresence>
      {isEditModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-lg w-full max-w-4xl my-8 mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-green-400">Edit Problem</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleUpdateProblem}
              className="space-y-4 max-h-[70vh] overflow-y-auto"
            >
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={editingProblem?.title || ""}
                    onChange={(e) =>
                      setEditingProblem({
                        ...editingProblem,
                        title: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Topic</label>
                  <input
                    type="text"
                    value={editingProblem?.topic || ""}
                    onChange={(e) =>
                      setEditingProblem({
                        ...editingProblem,
                        topic: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={editingProblem?.difficulty || ""}
                    onChange={(e) =>
                      setEditingProblem({
                        ...editingProblem,
                        difficulty: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    LeetCode Link
                  </label>
                  <input
                    type="url"
                    value={editingProblem?.leetcode_link || ""}
                    onChange={(e) =>
                      setEditingProblem({
                        ...editingProblem,
                        leetcode_link: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  value={editingProblem?.description || ""}
                  onChange={(e) =>
                    setEditingProblem({
                      ...editingProblem,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                />
              </div>

              {/* Examples */}
              <div>
                <label className="block text-gray-300 mb-2">Examples</label>
                {editingProblem?.example?.map((ex, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">
                        Input
                      </label>
                      <input
                        type="text"
                        value={ex.input}
                        onChange={(e) => {
                          const newExamples = [...editingProblem.example];
                          newExamples[index].input = e.target.value;
                          setEditingProblem({
                            ...editingProblem,
                            example: newExamples,
                          });
                        }}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">
                        Output
                      </label>
                      <input
                        type="text"
                        value={ex.output}
                        onChange={(e) => {
                          const newExamples = [...editingProblem.example];
                          newExamples[index].output = e.target.value;
                          setEditingProblem({
                            ...editingProblem,
                            example: newExamples,
                          });
                        }}
                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <label className="block text-gray-300 mb-2">Constraints</label>
                {editingProblem?.constraints?.map((constraint, index) => (
                  <input
                    key={index}
                    type="text"
                    value={constraint}
                    onChange={(e) => {
                      const newConstraints = [...editingProblem.constraints];
                      newConstraints[index] = e.target.value;
                      setEditingProblem({
                        ...editingProblem,
                        constraints: newConstraints,
                      });
                    }}
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg mb-2"
                  />
                ))}
              </div>

              {/* Solution Approach */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Solution Approach
                </label>
                <textarea
                  value={editingProblem?.solution_approach || ""}
                  onChange={(e) =>
                    setEditingProblem({
                      ...editingProblem,
                      solution_approach: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                />
              </div>

              {/* Code Snippet */}
              <div>
                <label className="block text-gray-300 mb-2">Code Snippet</label>
                <textarea
                  value={editingProblem?.code_snippet?.javascript || ""}
                  onChange={(e) =>
                    setEditingProblem({
                      ...editingProblem,
                      code_snippet: { javascript: e.target.value },
                    })
                  }
                  rows={6}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-mono"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Update Problem
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
                        setSelectedProblems(
                          e.target.checked ? problems.map((p) => p._id) : []
                        );
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
                    className="border-t border-gray-700 text-white"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedProblems.includes(problem._id)}
                        onChange={(e) => {
                          setSelectedProblems((prev) =>
                            e.target.checked
                              ? [...prev, problem._id]
                              : prev.filter((id) => id !== problem._id)
                          );
                        }}
                      />
                    </td>
                    <td className="p-4">{problem.id}</td>
                    <td className="p-4">{problem.title}</td>
                    <td
                      className={`p-4 ${getDifficultyColor(
                        problem.difficulty
                      )}`}
                    >
                      {problem.difficulty}
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">
                        {problem.topic}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {/* <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            navigate(`/admin/edit-problem/${problem._id}`)
                          }
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FaEdit />
                        </motion.button> */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event bubbling
                            openEditModal(problem);
                          }}
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
      <EditModal />
    </motion.div>
  );
}

export default ManageProblems;
