import React, { useState, useEffect } from "react";
import api from "../utils/api";

function ProblemManagement({ onGoBack }) {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await api.get("/admin/problems");
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Problem Management
      </h2>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr className="text-left">
            <th className="p-4">ID</th>
            <th className="p-4">Title</th>
            <th className="p-4">Difficulty</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id} className="border-t">
              <td className="p-4">{problem._id}</td>
              <td className="p-4">{problem.title}</td>
              <td className="p-4">{problem.difficulty}</td>
              <td className="p-4">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
        onClick={onGoBack}
      >
        Go Back
      </button>
    </div>
  );
}

export default ProblemManagement;
