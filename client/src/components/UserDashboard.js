import React,{useContext} from "react";
import { FaChartLine, FaPuzzlePiece, FaCode, FaTrophy, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const navigate = useNavigate();
  // function logout(){
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userID');

  //   navigate('/');
  // }
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.error("Logged out successfully");
    navigate('/');
  };
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="py-4 px-6 text-center bg-gray-900">
          <h1 className="text-2xl font-bold text-green-400">AceDSA</h1>
          <p className="text-sm mt-2 text-gray-400">Master DSA, one problem at a time</p>
        </div>
        <nav className="mt-10 flex-1">
          <ul>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="/dashboard" className="flex items-center space-x-2">
                <FaChartLine className="text-green-400" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="/problems" className="flex items-center space-x-2">
                <FaPuzzlePiece className="text-green-400" />
                <span>Problems</span>
              </a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700 ">
              <a href="/topics" className="flex items-center space-x-2">
                <FaCode className="text-green-400" />
                <span>Topics</span>
              </a>
            </li>
            <li className="px-6 py-2 hover:bg-gray-700">
              <a href="/leaderboard" className="flex items-center space-x-2">
                <FaTrophy className="text-green-400" />
                <span>Leaderboard</span>
              </a>
            </li>
            <li onClick={logout} className="cursor-pointer px-6 py-2 hover:bg-gray-700">
              <a className="flex items-center space-x-2">
                <FaSignOutAlt className="text-green-400" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="py-4 px-6 text-sm text-gray-400 bg-gray-900">
          <p>&copy; 2024 AceDSA</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Start a Problem
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
              View Topics
            </button>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Progress Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Your Progress
            </h3>
            <p className="text-sm text-gray-600 mb-4">Level up with DSA</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    60% Completed
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-gray-600">
                    120/200 Problems
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                <div
                  style={{ width: "60%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                ></div>
              </div>
            </div>
          </div>

          {/* Problem Solved Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Problems Solved
            </h3>
            <p className="text-sm text-gray-600 mb-4">Great job so far!</p>
            <div className="text-3xl font-bold text-green-500">
              120 <span className="text-xl text-gray-600">/ 200</span>
            </div>
          </div>

          {/* Leaderboard Rank */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Leaderboard Rank
            </h3>
            <p className="text-sm text-gray-600 mb-4">Compete globally</p>
            <div className="text-3xl font-bold text-green-500">
              #15 <span className="text-xl text-gray-600">/ 1000</span>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-700 mb-6">
            Recent Activity
          </h3>
          <ul className="divide-y divide-gray-200">
            <li className="py-3">
              <span className="text-gray-600">Solved</span> <strong>Binary Search Problem</strong> - 1 hour ago
            </li>
            <li className="py-3">
              <span className="text-gray-600">Started</span> <strong>Sorting Algorithms Practice</strong> - 3 hours ago
            </li>
            <li className="py-3">
              <span className="text-gray-600">Reviewed</span> <strong>Dynamic Programming Notes</strong> - Yesterday
            </li>
            <li className="py-3">
              <span className="text-gray-600">Added</span> <strong>Graphs Problem Set</strong> to your practice list - 2 days ago
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
