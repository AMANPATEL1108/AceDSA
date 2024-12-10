import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCode,
  FaChartLine,
  FaPlus,
  FaDownload,
  FaSearch,
  FaFilter,
  FaDesktop,
  FaMobileAlt,
  FaTabletAlt,
} from "react-icons/fa";

// Separate component definitions
const StatsCard = ({ title, value, icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`${color} p-6 rounded-xl shadow-lg border-l-4 border-teal-400`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-300 mb-2">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="text-3xl opacity-70">{icon}</div>
    </div>
  </motion.div>
);

const AdminButton = ({ icon, text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="w-full bg-gray-800 text-teal-400 py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center shadow-lg"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </motion.button>
);

const PlatformBar = ({ platform, percentage }) => {
  const platformIcons = {
    desktop: <FaDesktop />,
    mobile: <FaMobileAlt />,
    tablet: <FaTabletAlt />,
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="text-gray-400 w-16 flex items-center">
        {platformIcons[platform]}
        <span className="ml-2 capitalize">{platform}</span>
      </div>
      <div className="flex-1 bg-gray-700 rounded-full h-3">
        <div
          className="bg-teal-500 rounded-full h-3"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-gray-400 w-10 text-right">{percentage}%</div>
    </div>
  );
};

const DifficultyBar = ({ difficulty, count, total }) => {
  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  const percentage = ((count / total) * 100).toFixed(1);

  return (
    <div className="flex items-center space-x-4">
      <div className="text-gray-400 w-16 capitalize">{difficulty}</div>
      <div className="flex-1 bg-gray-700 rounded-full h-3">
        <div
          className={`${difficultyColors[difficulty]} rounded-full h-3`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-gray-400 w-10 text-right">{count}</div>
    </div>
  );
};

// Main component
function AdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Static data based on the requirement
  const stats = {
    totalUsers: 1,
    totalProblems: 53,
    activeUsers: 1,
    platformBreakdown: {
      desktop: 62,
      mobile: 28,
      tablet: 10,
    },
    problemBreakdown: {
      easy: 18,
      medium: 22,
      hard: 13,
    },
  };

  const exportData = () => {
    const dataToExport = JSON.stringify(stats, null, 2);
    const blob = new Blob([dataToExport], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "admin-dashboard-export.json";
    a.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 min-h-screen"
    >
      <header className="bg-gray-800 shadow-md py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-teal-400">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
              onClick={exportData}
            >
              <FaDownload className="inline mr-2" /> Export Data
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FaUsers className="text-teal-400" />}
            color="bg-teal-900/50"
          />
          <StatsCard
            title="Total Problems"
            value={stats.totalProblems}
            icon={<FaCode className="text-indigo-400" />}
            color="bg-indigo-900/50"
          />
          <StatsCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<FaChartLine className="text-pink-400" />}
            color="bg-pink-900/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-teal-400">
              Platform Usage
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.platformBreakdown).map(
                ([platform, percentage]) => (
                  <PlatformBar
                    key={platform}
                    platform={platform}
                    percentage={percentage}
                  />
                )
              )}
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-teal-400">
              Problem Difficulty Distribution
            </h3>
            <div className="space-y-4">
              {Object.entries(stats.problemBreakdown).map(
                ([difficulty, count]) => (
                  <DifficultyBar
                    key={difficulty}
                    difficulty={difficulty}
                    count={count}
                    total={stats.totalProblems}
                  />
                )
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminButton
            icon={<FaUsers className="mr-2" />}
            text="Manage Users"
            onClick={() => navigate("/admin/manage-users")}
          />
          <AdminButton
            icon={<FaCode className="mr-2" />}
            text="Manage Problems"
            onClick={() => navigate("/admin/manage-problems")}
          />
          <AdminButton
            icon={<FaPlus className="mr-2" />}
            text="Add User"
            onClick={() => navigate("/admin/add-user")}
          />
          <AdminButton
            icon={<FaPlus className="mr-2" />}
            text="Add Problem"
            onClick={() => navigate("/admin/add-problem")}
          />
        </div>
      </main>
    </motion.div>
  );
}

export default AdminDashboard;