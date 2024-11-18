import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import api from "../utils/api";
import toast from "react-hot-toast";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [sortField, sortOrder]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/admin/users?sort=${sortField}&order=${sortOrder}`);
      setUsers(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      navigate("/admin/login");
    } else {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      handleError(error);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await api.post("/admin/users/bulk-delete", { userIds: selectedUsers });
      toast.success("Selected users deleted successfully");
      setSelectedUsers([]);
      fetchUsers();
    } catch (error) {
      handleError(error);
    }
  };

  const handleExportUsers = async () => {
    try {
      const response = await api.get("/admin/users/export", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      handleError(error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="text-3xl font-bold text-green-400">Manage Users</h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportUsers}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <FaDownload className="mr-2" /> Export Users
            </motion.button>
            {selectedUsers.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBulkDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete Selected ({selectedUsers.length})
              </motion.button>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
            <select
              onChange={(e) => setSortField(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="username">Username</option>
              <option value="email">Email</option>
              <option value="createdAt">Date Created</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              {sortOrder.toUpperCase()}
            </button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          setSelectedUsers(e.target.checked ? users.map(u => u._id) : []);
                        }}
                      />
                    </th>
                    <th className="p-4 text-left">Username</th>
                    <th className="p-4 text-left">Email</th>
                    <th className="p-4 text-left">Created At</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-gray-700"
                    >
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={(e) => {
                            setSelectedUsers(prev => 
                              e.target.checked 
                                ? [...prev, user._id]
                                : prev.filter(id => id !== user._id)
                            );
                          }}
                        />
                      </td>
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <FaEdit />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteUser(user._id)}
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
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ManageUsers;