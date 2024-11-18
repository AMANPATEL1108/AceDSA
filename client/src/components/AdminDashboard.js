import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import api from "../utils/api";
import { 
  FaUsers, FaCode, FaChartLine, FaPlus, 
  FaDownload, FaSearch, FaFilter 
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = React.memo(({ data, type, options }) => {
  const ChartComponent = type === "bar" ? Bar : Pie;
  return <ChartComponent data={data} options={options} />;
});

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    fetchExtendedStats();
  }, []);

  const fetchExtendedStats = async () => {
    try {
      const [statsRes, activityRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/user-activity")
      ]);
      setStats(statsRes.data);
      setUserActivity(activityRes.data);
    } catch (error) {
      console.error("Error fetching extended stats:", error);
    }
  };

  const exportData = async (type) => {
    try {
      const response = await api.get(`/admin/export/${type}`);
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-export.json`;
      a.click();
    } catch (error) {
      console.error(`Error exporting ${type}:`, error);
    }
  };

  const userProblemData = {
    labels: ["Users", "Problems"],
    datasets: [
      {
        data: [stats.totalUsers, stats.totalProblems],
        backgroundColor: ["#10B981", "#3B82F6"],
      },
    ],
  };

  const difficultyData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [stats.easyProblems, stats.mediumProblems, stats.hardProblems],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#D1D5DB",
        },
      },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-gray-100 min-h-screen"
    >
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-400">Admin Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-green-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="bg-gray-800 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="users">Users</option>
            <option value="problems">Problems</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FaUsers />}
          />
          <StatsCard
            title="Total Problems"
            value={stats.totalProblems}
            icon={<FaCode />}
          />
          <StatsCard
            title="Active Users"
            value={stats.activeUsers}
            icon={<FaChartLine />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Users vs Problems
            </h3>
            <div className="h-64">
              <Chart data={userProblemData} type="pie" options={chartOptions} />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              Problem Difficulty
            </h3>
            <div className="h-64">
              <Chart data={difficultyData} type="pie" options={chartOptions} />
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
          <AdminButton
            icon={<FaDownload />}
            text="Export Data"
            onClick={() => exportData('all')}
          />
        </div>
      </main>
    </motion.div>
  );
}

const StatsCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-800 p-6 rounded-lg shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-green-400">{value}</p>
      </div>
      <div className="text-green-400 text-2xl">{icon}</div>
    </div>
  </motion.div>
);

const AdminButton = ({ icon, text, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="w-full bg-gray-800 text-green-400 py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center shadow-lg"
  >
    {icon}
    <span className="ml-2">{text}</span>
  </motion.button>
);

export default AdminDashboard;