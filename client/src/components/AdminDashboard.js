import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { FaUsers, FaCode, FaChartLine, FaPlus } from "react-icons/fa";

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

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
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

  const renderDashboard = () => (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-12 text-green-400">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 w-full">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
    </div>
  );

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <header className="bg-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-green-400">Admin Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderDashboard()}
      </main>
    </div>
  );
}

const AdminButton = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-gray-800 text-green-400 py-4 px-6 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center justify-center"
  >
    {icon}
    {text}
  </button>
);

export default AdminDashboard;
