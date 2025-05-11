import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLink,
  FaBook,
  FaTags,
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";
import api from "../utils/api";
import toast from "react-hot-toast";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function AddProblem() {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    difficulty: "",
    leetcode_link: "",
    description: "",
    topic: "",
    example: {
      input: "",
      output: "",
    },
    constraints: [""],
    hints: [""],
    solution_approach: "",
    time_complexity: "",
    space_complexity: "",
    code_snippet: {
      javascript: "",
    },
    template: "",
    testCases: [{ input: "", output: "" }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCodeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      code_snippet: {
        ...prev.code_snippet,
        javascript: value,
      },
    }));
  };

  const handleArrayFieldChange = (field, index, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };







  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleTestCaseChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      testCases: prev.testCases.map((testCase, i) =>
        i === index ? { ...testCase, [field]: value } : testCase
      ),
    }));
  };

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", output: "" }],
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "id",
      "title",
      "difficulty",
      "description",
      "topic",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await api.post("/admin/problems", formData);
      toast.success("Problem created successfully!");
      navigate("/admin/manage-problems");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create problem");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gray-900 min-h-screen p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-gray-800 rounded-lg shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-400">
              Add New Problem
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/manage-problems")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Problems
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <InputField
                  icon={<FaCode />}
                  label="Problem ID"
                  name="id"
                  type="number"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <InputField
                  icon={<FaBook />}
                  label="Title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              <div className="space-y-2">
                <label className="block text-gray-400">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <InputField
                icon={<FaTags />}
                label="Topic"
                name="topic"
                type="text"
                value={formData.topic}
                onChange={handleChange}
                required
              />

              <div className="col-span-2">
                <InputField
                  icon={<FaLink />}
                  label="LeetCode Link"
                  name="leetcode_link"
                  type="url"
                  value={formData.leetcode_link}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-400 mb-2">
                  Solution Code
                </label>
                <CodeMirror
                  value={formData.code_snippet.javascript}
                  height="200px"
                  extensions={[javascript()]}
                  onChange={handleCodeChange}
                  theme="dark"
                  className="rounded-lg overflow-hidden"
                />
              </div>

              <div className="col-span-2 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-500 text-white px-6 py-2 rounded-lg flex items-center ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-green-600"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  ) : (
                    <FaSave className="mr-2" />
                  )}
                  {isSubmitting ? "Creating..." : "Create Problem"}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

const InputField = ({ icon, label, ...props }) => (
  <div className="space-y-2">
    <label className="block text-gray-400">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400"
      />
    </div>
  </div>
);

export default AddProblem;
