// import React,{useEffect} from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Problems from "./components/Problems";
// import ProblemDetail from "./components/ProblemDetail";
// import Topics from "./components/Topics";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import UserDashboard from "./components/UserDashboard";
// import AdminLogin from "./components/AdminLogin";
// import AdminDashboard from "./components/AdminDashboard";
// import AddUser from "./components/AddUser";
// import AddProblem from "./components/AddProblem";
// import ManageUsers from "./components/ManageUsers";
// import ManageProblems from "./components/ManageProblems";
// import CodeEditor from "./components/CodeEditor";
// import "./App.css";

// // Admin protected route
// function ProtectedAdminRoute({ children }) {
//   const adminToken = localStorage.getItem("adminToken");
//   return adminToken ? children : <Navigate to="/admin/login" />;
// }

// // User protected route
// function ProtectedUserRoute({ children }) {
//   const userToken = localStorage.getItem("token");
//   return userToken ? children : <Navigate to="/login" />;
// }

// // Public route for unauthenticated users
// function PublicRoute({ children }) {
//   const userToken = localStorage.getItem("token");
//   return userToken ? <Navigate to="/dashboard" /> : children;
// }

// function App() {
//   const path = window.location.pathname;
//   return (
//     <Router>
//       <div className="App">
//         {!(path === "/dashboard") && <Navbar />} {/* Hide Navbar for /dashboard route */}
//         <Toaster position="top-right" />
//         <Routes>
//           {/* Public routes */}
//           <Route
//             path="/"
//             element={
//               <PublicRoute>
//                 <Home />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <PublicRoute>
//                 <Register />
//               </PublicRoute>
//             }
//           />

//           {/* Protected routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedUserRoute>
//                 <UserDashboard />
//               </ProtectedUserRoute>
//             }
//           />
//           {/* <Route path="/problems" element={<ProtectedUserRoute><Problems /></ProtectedUserRoute>} />
//           <Route path="/problems/:id" element={<ProtectedUserRoute><ProblemDetail /></ProtectedUserRoute>} />
//           <Route path="/topics" element={<ProtectedUserRoute><Topics /></ProtectedUserRoute>} />
//           <Route path="/editor" element={<ProtectedUserRoute><CodeEditor /></ProtectedUserRoute>} /> */}
//           {/* <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} /> */}
//           <Route path="/problems" element={<Problems />} />
//           <Route path="/problems/:id" element={<ProblemDetail />} />
//           <Route path="/topics" element={<Topics />} />

//           {/* Admin routes */}
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedAdminRoute>
//                 <AdminDashboard />
//               </ProtectedAdminRoute>
//             }
//           />
//           <Route path="/admin/add-user" element={<ProtectedAdminRoute><AddUser /></ProtectedAdminRoute>} />
//           <Route path="/admin/add-problem" element={<ProtectedAdminRoute><AddProblem /></ProtectedAdminRoute>} />
        //   <Route path="/admin/manage-users" element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
        //   <Route path="/admin/manage-problems" element={<ProtectedAdminRoute><ManageProblems /></ProtectedAdminRoute>} />
        // </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// --------------------------------------
import React,{useContext,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import ProblemsByTopic from './components/ProblemsByTopic';
import { AuthContext } from "./AuthContext";
import TopicDetail from "./components/TopicDetail";
import "./App.css";

// function ProtectedUserRoute({ children }) {
//   const { isAuthenticated, loading } = useContext(AuthContext);
//   if (loading) return <div>Loading...</div>;
//   return isAuthenticated ? children : <Navigate to="/login" />;
// }
function ProtectedUserRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace />;
}


function ProtectedAdminRoute({ children }) {
  // const { isAuthenticated, user } = useContext(AuthContext);
  const adminToken = localStorage.getItem('adminToken');
  return adminToken ? children : <Navigate to="/admin/login" />;
}

function HomeOrRedirect() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />;
}


function App() {

  const location = useLocation();
  const hideNavbarPaths = ['/dashboard','/admin','/admin/login'];

  return (
    <AuthProvider>
      {/* <Router> */}
        <div className="App">
        {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
          {/* <Navbar /> */}
          <Toaster position="top-center" />
          <Routes>
            {/* Public routes */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<HomeOrRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/problems" element={<Problems />} />
            <Route path="/problems/:id" element={<ProblemDetail />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:topicName" element={<TopicDetail />} />
            <Route path="/problems/topic/:topic" element={<ProblemsByTopic />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            <Route path="/admin/manage-users" element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
          <Route path="/admin/manage-problems" element={<ProtectedAdminRoute><ManageProblems /></ProtectedAdminRoute>} />
        
            {/* ... (other admin routes) */}
          </Routes>
        </div>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;



// import React, { useContext } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider, AuthContext } from "./AuthContext";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Problems from "./components/Problems";
// import ProblemDetail from "./components/ProblemDetail/ProblemDetail";
// import Topics from "./components/Topics";
// import ProblemsByTopic from "./components/ProblemsByTopic";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import UserDashboard from "./components/UserDashboard";
// import AdminLogin from "./components/AdminLogin";
// import AdminDashboard from "./components/AdminDashboard";
// import AddUser from "./components/AddUser";
// import AddProblem from "./components/AddProblem";
// import ManageUsers from "./components/ManageUsers";
// import ManageProblems from "./components/ManageProblems";

// function ProtectedUserRoute({ children }) {
//   const { isAuthenticated, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading) return <div>Loading...</div>;

//   return isAuthenticated ? children : <Navigate to="/" state={{ from: location }} replace />;
// }

// function ProtectedAdminRoute({ children }) {
//   const { isAuthenticated, user } = useContext(AuthContext);
//   return isAuthenticated && user.role === 'admin' ? children : <Navigate to="/admin/login" />;
// }

// function HomeOrRedirect() {
//   const { isAuthenticated, loading } = useContext(AuthContext);

//   if (loading) return <div>Loading...</div>;

//   return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />;
// }

// function App() {
//   const location = useLocation();
//   const hideNavbarPaths = ['/dashboard'];

//   return (
//     <AuthProvider>
//       <div className="App">
//         {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
//         <Toaster position="top-center" />
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<HomeOrRedirect />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/problems/:id" element={<ProblemDetail />} />
//           <Route path="/problems" element={<Topics />} />
//           <Route path="/problems/topic/:topic" element={<ProblemsByTopic />} />

//           {/* Protected routes */}
//           <Route path="/dashboard" element={<ProtectedUserRoute><UserDashboard /></ProtectedUserRoute>} />

//           {/* Admin routes */}
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
//           <Route path="/admin/manage-users" element={<ProtectedAdminRoute><ManageUsers /></ProtectedAdminRoute>} />
//           <Route path="/admin/manage-problems" element={<ProtectedAdminRoute><ManageProblems /></ProtectedAdminRoute>} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
