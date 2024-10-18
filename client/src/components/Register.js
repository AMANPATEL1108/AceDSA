// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { FaUser, FaEnvelope, FaLock, FaGithub } from "react-icons/fa";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/api/auth/register", { username, email, password });
//       toast.success("User registered successfully");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response.data.msg);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
//             Create your AceDSA account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-300">
//             Or{" "}
//             <Link
//               to="/login"
//               className="font-medium text-green-400 hover:text-green-300"
//             >
//               sign in to your account
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-800"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-800"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-800"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-700"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-gray-900 text-gray-400">
//                 Or continue with
//               </span>
//             </div>
//           </div>
//           <div className="mt-6">
//             <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-100 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
//               <FaGithub className="h-5 w-5 mr-2" />
//               Sign up with GitHub
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;


// ----------------------------------------

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { FaUser, FaEnvelope, FaLock, FaGithub } from "react-icons/fa";
// import api from "../utils/api";

// function Register() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const generateAvatarUrl = (name) => {
//     return `http://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(name)}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const avatarUrl = generateAvatarUrl(username);
//       console.log(avatarUrl);
//       await api.post("/auth/register", { username, email, password, avatar: avatarUrl });
//       toast.success("User registered successfully");
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response.data.msg);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-green-400">
//             Create your AceDSA account
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-300">
//             Or{" "}
//             <Link
//               to="/login"
//               className="font-medium text-green-400 hover:text-green-300"
//             >
//               sign in to your account
//             </Link>
//           </p>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaUser className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-800"
//                   placeholder="Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="email-address" className="sr-only">
//                 Email address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaEnvelope className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email-address"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-800"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaLock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-gray-100 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm bg-gray-800"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Register
//             </button>
//           </div>
//         </form>
//         <div className="mt-6">
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-700"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-gray-900 text-gray-400">
//                 Or continue with
//               </span>
//             </div>
//           </div>
//           <div className="mt-6">
//             <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-100 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
//               <FaGithub className="h-5 w-5 mr-2" />
//               Sign up with GitHub
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

// -------------------------------------------

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Github, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../utils/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const generateAvatarUrl = (name) => {
    return `http://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(name)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);
    setError(null);
    try {
      const avatarUrl = generateAvatarUrl(username);
      await api.post("/auth/register", { username, email, password, avatar: avatarUrl });
      toast.success("User registered successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response.data.msg || "An error occurred during registration");
      toast.error(err.response.data.msg || "An error occurred during registration");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      {/* Top Banner */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-center text-4xl font-bold text-white"
            >
              Create your AceDSA account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center text-lg text-slate-400"
            >
              Or{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                sign in to your account
              </Link>
            </motion.p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-3 pl-10 pr-4 text-slate-200 placeholder-slate-400 transition-colors duration-300 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-3 pl-10 pr-4 text-slate-200 placeholder-slate-400 transition-colors duration-300 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-3 pl-10 pr-4 text-slate-200 placeholder-slate-400 transition-colors duration-300 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isRegistering}
                className={`group relative flex w-full justify-center rounded-lg border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isRegistering ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isRegistering ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </motion.form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#1E293B] rounded-lg px-2 text-slate-400">Or continue with</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={() => {
                  // Implement GitHub registration logic here
                  toast.error("GitHub registration not implemented yet");
                }}
                className="flex w-full items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur-sm transition-colors duration-300 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Github className="mr-2 h-5 w-5" />
                Sign up with GitHub
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Register;