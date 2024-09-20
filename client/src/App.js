import React,{useContext} from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import ManageUsers from "./components/ManageUsers";
import ManageProblems from "./components/ManageProblems";
import { AuthContext } from "./AuthContext";
import "./App.css";

function ProtectedUserRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace />;
}


function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, user } = useContext(AuthContext);
  return isAuthenticated && user.role === 'admin' ? children : <Navigate to="/admin/login" />;
}


function App() {

  const location = useLocation();
  const hideNavbarPaths = ['/dashboard'];

  return (
    <AuthProvider>
        <div className="App">
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
          <Toaster position="top-center" />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/topics" element={<Topics />} />

            <Route path="/dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/manage-users" element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
          <Route path="/admin/manage-problems" element={<ProtectedAdminRoute><ManageProblems /></ProtectedAdminRoute>} />
        
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;
