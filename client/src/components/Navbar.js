// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Logo from '../components/Logo';

// function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   },[]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userID");
//     setIsAuthenticated(false);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50">
// <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//   <div className="flex justify-between items-center h-16">
//     <Link
//       to="/"
//       className="text-2xl font-bold text-green-400 hover:text-green-300 transition duration-300"
//     >
//       {/* AceDSA */}
//       <Logo />
//     </Link>
//     <ul className="flex space-x-6 text-lg font-medium items-center">
//       {!isAuthenticated ? (
//         <>
//           <li>
//             <Link
//               to="/"
//               className="hover:text-green-400 transition duration-300"
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/problems"
//               className="hover:text-green-400 transition duration-300"
//             >
//               Problems
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/topics"
//               className="hover:text-green-400 transition duration-300"
//             >
//               Topics
//             </Link>
//           </li>
//         </>
//       )
//         :
//         <>
//           <li>
//             <Link
//               to="/problems"
//               className="hover:text-green-400 transition duration-300"
//             >
//               Problems
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/topics"
//               className="hover:text-green-400 transition duration-300"
//             >
//               Topics
//             </Link>
//           </li>
//         </>}


//             {isAuthenticated ? (
//               <>
//               <li>
//               <Link
//                 to="/dashboard"
//                 className="hover:text-green-400 transition duration-300"
//               >
//                 Dashboard
//               </Link>
//             </li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition duration-300"
//                 >
//                   Logout
//                 </button>
//               </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     to="/login"
//                     className="text-white px-3 py-1.5 rounded-md hover:text-green-400 transition duration-300"
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/register"
//                     className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition duration-300"
//                   >
//                     Register
//                   </Link>
//                 </li>
//               </>
//       )}
//     </ul>
//   </div>
// </div>
//     </nav>
//   );
// }

// export default Navbar;


// --------------------------------------

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import toast from "react-hot-toast";
import Logo from './Logo';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.error("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50">
      {/* ... (existing nav content) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-green-400 hover:text-green-300 transition duration-300"
          >
            {/* AceDSA */}
            <Logo />
          </Link>
          <ul className="flex space-x-6 text-lg font-medium items-center">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/problems"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Problems
                  </Link>
                </li>
                <li>
                  <Link
                    to="/topics"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Topics
                  </Link>
                </li>
              </>
            )
              :
              <>
                <li>
                  <Link
                    to="/problems"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Problems
                  </Link>
                </li>
                <li>
                  <Link
                    to="/topics"
                    className="hover:text-green-400 transition duration-300"
                  >
                    Topics
                  </Link>
                </li>
              </>}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard" className="hover:text-green-400 transition duration-300">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition duration-300">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white px-3 py-1.5 rounded-md hover:text-green-400 transition duration-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition duration-300">
                    Register
                  </Link>
                </li>
              </>
            )}
            {/* ... (rest of the nav content) */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
