import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

function AddProblem() {
  const [newProblem, setNewProblem] = useState({
    id: "",
    title: "",
    difficulty: "",
    leetcode_link: "",
    description: "",
    topic: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewProblem({ ...newProblem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/problems", newProblem);
      toast.success("Problem added successfully");
      setNewProblem({
        id: "",
        title: "",
        difficulty: "",
        leetcode_link: "",
        description: "",
        topic: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-400">Add New Problem</h1>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            type="number"
            name="id"
            value={newProblem.id}
            onChange={handleInputChange}
            placeholder="Problem ID"
            required
          />
          <InputField
            type="text"
            name="title"
            value={newProblem.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <select
            name="difficulty"
            value={newProblem.difficulty}
            onChange={handleInputChange}
            required
            className="w-full bg-gray-800 text-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <InputField
            type="url"
            name="leetcode_link"
            value={newProblem.leetcode_link}
            onChange={handleInputChange}
            placeholder="LeetCode Link"
            required
          />
          <textarea
            name="description"
            value={newProblem.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="w-full bg-gray-800 text-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
          />
          <InputField
            type="text"
            name="topic"
            value={newProblem.topic}
            onChange={handleInputChange}
            placeholder="Topic"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="bg-gray-700 text-gray-100 px-6 py-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Go Back
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Add Problem
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

const InputField = ({ type, name, value, onChange, placeholder, required }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full bg-gray-800 text-gray-100 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
  />
);

export default AddProblem;
