import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function ManageProblems() {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await api.get("/admin/problems");
      setProblems(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/admin/login");
      } else {
        console.error("Error fetching problems:", error);
      }
    }
  };

  const handleDeleteProblem = async (problemId) => {
    try {
      await api.delete(`/admin/problems/${problemId}`);
      fetchProblems();
    } catch (error) {
      console.error("Error deleting problem:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Problems
      </h2>
      {problems.length > 0 ? (
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="text-left bg-gray-200">
              <th className="p-4">Title</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem._id} className="border-t">
                <td className="p-4">{problem.title}</td>
                <td className="p-4">{problem.difficulty}</td>
                <td className="p-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleDeleteProblem(problem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No problems found.</p>
      )}
      <button
        className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600"
        onClick={() => navigate("/admin")}
      >
        Go Back
      </button>
    </div>
  );
}

export default ManageProblems;
