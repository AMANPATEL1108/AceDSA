import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Problems from './components/Problems';
import Topics from './components/Topics';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function ProtectedAdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem('adminToken');
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;