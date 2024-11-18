import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaUserTag,
  FaCheck,
  FaUsers,
} from "react-icons/fa";
import api from "../utils/api";
import toast from "react-hot-toast";

const userTemplates = [
  {
    role: "student",
    permissions: ["solve_problems", "view_solutions", "submit_code"],
  },
  {
    role: "teacher",
    permissions: ["create_problems", "review_solutions", "manage_students"],
  },
  { role: "admin", permissions: ["full_access"] },
];

const userGroups = [
  "Beginners",
  "Intermediate",
  "Advanced",
  "Competitive Programmers",
];

function AddUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await api.post("/admin/users", formData);
      toast.success("User created successfully!");
      navigate("/admin/manage-users");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create user");
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-gray-800 rounded-lg shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-green-400">Add New User</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin/manage-users")}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaArrowLeft className="mr-2" /> Back to Users
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    icon={<FaUser />}
                    label="Username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    icon={<FaEnvelope />}
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <InputField
                    icon={<FaLock />}
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="space-y-2">
                    <label className="block text-gray-400">Role</label>
                    <div className="relative">
                      <FaUserTag className="absolute left-3 top-3 text-gray-400" />
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-400 rounded focus:ring-green-400 bg-gray-700 border-gray-600"
                  />
                  <label className="text-gray-400">Active Account</label>
                </div>

                <div className="flex justify-end">
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
                      <FaCheck className="mr-2" />
                    )}
                    {isSubmitting ? "Creating..." : "Create User"}
                  </motion.button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Templates
                </h3>
                <div className="space-y-2">
                  {userTemplates.map((template) => (
                    <motion.button
                      key={template.role}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTemplate(template)}
                      className={`w-full p-3 rounded-lg flex items-center ${
                        selectedTemplate?.role === template.role
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 text-gray-200"
                      }`}
                    >
                      <FaUserTag className="mr-2" />
                      {template.role.charAt(0).toUpperCase() +
                        template.role.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold text-green-400 mb-4">
                  Groups
                </h3>
                <div className="space-y-2">
                  {userGroups.map((group) => (
                    <motion.button
                      key={group}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedGroups((prev) =>
                          prev.includes(group)
                            ? prev.filter((g) => g !== group)
                            : [...prev, group]
                        );
                      }}
                      className={`w-full p-3 rounded-lg flex items-center ${
                        selectedGroups.includes(group)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-600 text-gray-200"
                      }`}
                    >
                      <FaUsers className="mr-2" />
                      {group}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

export default AddUser;
