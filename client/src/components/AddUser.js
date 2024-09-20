import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";

function AddUser() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/users", { username, email, password });
      navigate("/admin/users");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-400">Add New User</h1>
        </div>
      </header>
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              icon={<FaUser className="text-gray-400" />}
            />
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<FaEnvelope className="text-gray-400" />}
            />
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<FaLock className="text-gray-400" />}
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
                Add User
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

const InputField = ({ type, placeholder, value, onChange, required, icon }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-gray-700 text-gray-100 py-2 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  </div>
);

export default AddUser;
