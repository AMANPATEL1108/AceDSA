import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Problems from "./components/Problems";
import ProblemDetail from "./components/ProblemDetail";
import Topics from "./components/Topics";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AddUser from "./components/AddUser";
import AddProblem from "./components/AddProblem";
import ManageUsers from "./components/ManageUsers";
import ManageProblems from "./components/ManageProblems";
import CodeEditor from "./components/CodeEditor";
import ProblemsByTopic from "./components/ProblemsByTopic";
import { AuthContext } from "./AuthContext";
import TopicDetail from "./components/TopicDetail";
import "./App.css";

function ProtectedUserRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

function ProtectedAdminRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken ? children : <Navigate to="/admin/login" />;
}

function HomeOrRedirect() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />;
}

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/dashboard", "/admin", "/admin/login"];

  return (
    <AuthProvider>
      <div className="App">
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
        <Toaster position="top-center" />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomeOrRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topicName" element={<TopicDetail />} />
          <Route path="/problems/topic/:topic" element={<ProblemsByTopic />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedUserRoute>
                <UserDashboard />
              </ProtectedUserRoute>
            }
          />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/add-user"
            element={
              <ProtectedAdminRoute>
                <AddUser />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/add-problem"
            element={
              <ProtectedAdminRoute>
                <AddProblem />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <ProtectedAdminRoute>
                <ManageUsers />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/manage-problems"
            element={
              <ProtectedAdminRoute>
                <ManageProblems />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
