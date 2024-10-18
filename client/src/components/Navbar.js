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

// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import toast from "react-hot-toast";
// import Logo from './Logo';

// function Navbar() {
//   const { isAuthenticated, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.error("Logged out successfully");
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50">
//       {/* ... (existing nav content) */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link
//             to="/"
//             className="text-2xl font-bold text-green-400 hover:text-green-300 transition duration-300"
//           >
//             {/* AceDSA */}
//             <Logo />
//           </Link>
//           <ul className="flex space-x-6 text-lg font-medium items-center">
//             {!isAuthenticated ? (
//               <>
//                 <li>
//                   <Link
//                     to="/"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/problems"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Problems
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/topics"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Topics
//                   </Link>
//                 </li>
//               </>
//             )
//               :
//               <>
//                 <li>
//                   <Link
//                     to="/problems"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Problems
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/topics"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Topics
//                   </Link>
//                 </li>
//               </>}
//             {isAuthenticated ? (
//               <>
//                 <li>
//                   <Link to="/dashboard" className="hover:text-green-400 transition duration-300">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition duration-300">
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link to="/login" className="text-white px-3 py-1.5 rounded-md hover:text-green-400 transition duration-300">
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/register" className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition duration-300">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//             {/* ... (rest of the nav content) */}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// ------------------------------------------------------------

// import React, { useContext,Fragment } from "react";
// import { Link, useNavigate, NavLink } from "react-router-dom";
// import { AuthContext } from "../AuthContext";
// import toast from "react-hot-toast";
// import Logo from './Logo';
// import { Menu, Transition } from '@headlessui/react';

// function Navbar() {
//   const { isAuthenticated, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   return (
//     <nav className="bg-gray-900 text-gray-100 shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Logo className="h-8 w-auto" />
//             <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">AceDSA</span>
//           </Link>
//           <div className="hidden md:flex items-center space-x-4">
//             <NavLink to="/" className="nav-link" end>Home</NavLink>
//             <NavLink to="/problems" className="nav-link">Problems</NavLink>
//             <NavLink to="/topics" className="nav-link">Topics</NavLink>
//             {isAuthenticated && (
//               <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
//             )}
//           </div>
//           <div className="hidden md:block">
//             {isAuthenticated ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               >
//                 Logout
//               </button>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className="text-gray-300 hover:text-white transition duration-300"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//           <div className="md:hidden">
//             <Menu as="div" className="relative inline-block text-left">
//               <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
//                 Menu
//               </Menu.Button>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   {/* Add mobile menu items here */}
//                 </Menu.Items>
//               </Transition>
//             </Menu>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

// -----------------------------------------------------

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Terminal, Code, Home, BookOpen, User, LogOut, LogIn, UserPlus, Menu, X, ChevronDown } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const NavItem = ({ to, icon: Icon, label }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
//         isActive
//           ? 'bg-green-500 text-white shadow-lg transform scale-105'
//           : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//       }`
//     }
//   >
//     <Icon className="w-5 h-5 mr-2" />
//     <span>{label}</span>
//   </NavLink>
// );

// const DropdownItem = ({ icon: Icon, label, onClick }) => (
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-300"
//     onClick={onClick}
//   >
//     <Icon className="w-5 h-5 mr-2" />
//     <span>{label}</span>
//   </motion.button>
// );

// const Navbar = () => {
//   const { isAuthenticated, logout, user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
//       const currentScroll = window.pageYOffset;
//       setScrollProgress((currentScroll / totalScroll) * 100);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     navigate('/');
//     setIsProfileOpen(false);
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

//   const navItems = [
//     { to: '/', icon: Home, label: 'Home' },
//     { to: '/problems', icon: Code, label: 'Problems' },
//     { to: '/topics', icon: BookOpen, label: 'Topics' },
//     ...(isAuthenticated ? [{ to: '/dashboard', icon: Terminal, label: 'Dashboard' }] : []),
//   ];

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
//             >
//               <Code className="w-5 h-5 text-white" />
//             </motion.div>
//             <span className="text-xl font-bold">
//               <span className="text-green-400">Ace</span>DSA
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-4">
//             {navItems.map((item) => (
//               <NavItem key={item.to} {...item} />
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={toggleProfile}
//                   className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-700"
//                 >
//                   <User className="w-5 h-5" />
//                   <span>{user?.name || 'User'}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </motion.button>
//                 <AnimatePresence>
//                   {isProfileOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2"
//                     >
//                       <DropdownItem icon={User} label="Profile" onClick={() => navigate('/profile')} />
//                       <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="nav-button bg-gray-700 hover:bg-gray-600">
//                   <LogIn className="w-5 h-5 mr-2" />
//                   Login
//                 </Link>
//                 <Link to="/register" className="nav-button bg-green-500 hover:bg-green-600">
//                   <UserPlus className="w-5 h-5 mr-2" />
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-gray-800"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item) => (
//                 <NavItem key={item.to} {...item} />
//               ))}
//               {isAuthenticated ? (
//                 <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
//               ) : (
//                 <>
//                   <NavItem to="/login" icon={LogIn} label="Login" />
//                   <NavItem to="/register" icon={UserPlus} label="Register" />
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         className="h-1 bg-green-500"
//         style={{ width: `${scrollProgress}%` }}
//         initial={{ width: '0%' }}
//         animate={{ width: `${scrollProgress}%` }}
//       />
//     </nav>
//   );
// };

// export default Navbar;

// ------------------------ above is the one of the best navbar code ----------------------------

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Terminal, Code, BookOpen, User, LogOut, LogIn, UserPlus, Menu, X, ChevronDown } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const NavItem = ({ to, icon: Icon, label }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
//         isActive
//           ? 'bg-green-500 text-white shadow-lg transform scale-105'
//           : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//       }`
//     }
//   >
//     <Icon className="w-5 h-5 mr-2" />
//     <span>{label}</span>
//   </NavLink>
// );

// const DropdownItem = ({ icon: Icon, label, onClick }) => (
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-300"
//     onClick={onClick}
//   >
//     <Icon className="w-5 h-5 mr-2" />
//     <span>{label}</span>
//   </motion.button>
// );

// const Navbar = () => {
//   const { isAuthenticated, logout, user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
//       const currentScroll = window.pageYOffset;
//       setScrollProgress((currentScroll / totalScroll) * 100);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     navigate('/problems');
//     setIsProfileOpen(false);
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

//   const navItems = [
//     { to: '/problems', icon: Code, label: 'Problems' },
//     { to: '/topics', icon: BookOpen, label: 'Topics' },
//     ...(isAuthenticated ? [{ to: '/dashboard', icon: Terminal, label: 'Dashboard' }] : []),
//   ];

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link to={isAuthenticated ? "/problems" : "/"} className="flex items-center space-x-2">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
//             >
//               <Code className="w-5 h-5 text-white" />
//             </motion.div>
//             <span className="text-xl font-bold">
//               <span className="text-green-400">Ace</span>DSA
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-4">
//             {navItems.map((item) => (
//               <NavItem key={item.to} {...item} />
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={toggleProfile}
//                   className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-700"
//                 >
//                   <User className="w-5 h-5" />
//                   <span>{user?.name || 'User'}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </motion.button>
//                 <AnimatePresence>
//                   {isProfileOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2"
//                     >
//                       {/* <DropdownItem icon={User} label="Profile" onClick={() => navigate('/profile')} /> */}
//                       <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <>
//                 <Link to="/login" className="nav-button bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300">
//                   <LogIn className="w-5 h-5 mr-2" />
//                   Login
//                 </Link>
//                 <Link to="/register" className="nav-button bg-green-500 text-white hover:bg-green-600 transition-colors duration-300">
//                   <UserPlus className="w-5 h-5 mr-2" />
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-gray-800"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item) => (
//                 <NavItem key={item.to} {...item} />
//               ))}
//               {isAuthenticated ? (
//                 <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
//               ) : (
//                 <>
//                   <NavItem to="/login" icon={LogIn} label="Login" />
//                   <NavItem to="/register" icon={UserPlus} label="Register" />
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         className="h-1 bg-green-500"
//         style={{ width: `${scrollProgress}%` }}
//         initial={{ width: '0%' }}
//         animate={{ width: `${scrollProgress}%` }}
//       />
//     </nav>
//   );
// };

// export default Navbar;

// --------------------------------------------------------

// import React, { useState, useEffect, useContext } from 'react';
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Terminal, Code, BookOpen, User, LogOut, LogIn, UserPlus, Menu, X, ChevronDown } from 'lucide-react';
// import { toast } from 'react-hot-toast';

// const NavItem = ({ to, icon: Icon, label }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
//         isActive
//           ? 'bg-green-500 text-white shadow-lg transform scale-105'
//           : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//       }`
//     }
//   >
//     <Icon className="w-5 h-5 mr-2" />
//     <span>{label}</span>
//   </NavLink>
// );

// const DropdownItem = ({ icon: Icon, label, onClick }) => (
//   <motion.button
//     whileHover={{ scale: 1.05 }}
//     whileTap={{ scale: 0.95 }}
//     className="flex items-center w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-300"
//     onClick={onClick}
//   >
//     <Icon className="w-5 h-5 mr-2" />
//     <span>{label}</span>
//   </motion.button>
// );

// const Navbar = () => {
//   const { isAuthenticated, logout, user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
//       const currentScroll = window.pageYOffset;
//       setScrollProgress((currentScroll / totalScroll) * 100);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     toast.success('Logged out successfully');
//     navigate('/problems');
//     setIsProfileOpen(false);
//   };

//   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//   const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

//   const navItems = [
//     { to: '/problems', icon: Code, label: 'Problems' },
//     { to: '/topics', icon: BookOpen, label: 'Topics' },
//     ...(isAuthenticated ? [{ to: '/dashboard', icon: Terminal, label: 'Dashboard' }] : []),
//   ];

//   return (
//     <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link to={isAuthenticated ? "/problems" : "/"} className="flex items-center space-x-2">
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
//             >
//               <Code className="w-5 h-5 text-white" />
//             </motion.div>
//             <span className="text-xl font-bold">
//               <span className="text-green-400">Ace</span>DSA
//             </span>
//           </Link>

//           <div className="hidden md:flex items-center space-x-4">
//             {navItems.map((item) => (
//               <NavItem key={item.to} {...item} />
//             ))}
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated ? (
//               <div className="relative">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={toggleProfile}
//                   className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-gray-700"
//                 >
//                   <User className="w-5 h-5" />
//                   <span>{user?.name || 'User'}</span>
//                   <ChevronDown className="w-4 h-4" />
//                 </motion.button>
//                 <AnimatePresence>
//                   {isProfileOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2"
//                     >
//                       <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <>
//                 <NavLink
//                   to="/login"
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
//                       isActive
//                         ? 'bg-green-500 text-white shadow-lg transform scale-105'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                     }`
//                   }
//                 >
//                   <LogIn className="w-5 h-5 mr-2" />
//                   <span>Login</span>
//                 </NavLink>
//                 <NavLink
//                   to="/register"
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
//                       isActive
//                         ? 'bg-green-500 text-white shadow-lg transform scale-105'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white'
//                     }`
//                   }
//                 >
//                   <UserPlus className="w-5 h-5 mr-2" />
//                   <span>Register</span>
//                 </NavLink>
//               </>
//             )}
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-gray-800"
//           >
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               {navItems.map((item) => (
//                 <NavItem key={item.to} {...item} />
//               ))}
//               {isAuthenticated ? (
//                 <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
//               ) : (
//                 <>
//                   <NavItem to="/login" icon={LogIn} label="Login" />
//                   <NavItem to="/register" icon={UserPlus} label="Register" />
//                 </>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         className="h-1 bg-green-500"
//         style={{ width: `${scrollProgress}%` }}
//         initial={{ width: '0%' }}
//         animate={{ width: `${scrollProgress}%` }}
//       />
//     </nav>
//   );
// };

// export default Navbar;

// --------------------------------------------------------

import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, BookOpen, User, LogOut, LogIn, UserPlus, Menu, X, ChevronDown } from 'lucide-react';
import { toast } from 'react-hot-toast';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
        isActive
          ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`
    }
  >
    <Icon className="w-5 h-5 mr-2" />
    <span>{label}</span>
  </NavLink>
);

const DropdownItem = ({ icon: Icon, label, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700 hover:text-white rounded-lg transition-colors duration-300"
    onClick={onClick}
  >
    <Icon className="w-5 h-5 mr-2" />
    <span>{label}</span>
  </motion.button>
);

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.pageYOffset;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/problems');
    setIsProfileOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const navItems = [
    { to: '/problems', icon: Code, label: 'Problems' },
    { to: '/topics', icon: BookOpen, label: 'Topics' },
    ...(isAuthenticated ? [{ to: '/dashboard', icon: Terminal, label: 'Dashboard' }] : []),
  ];

  return (
    <nav className="bg-[#0F172A] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={isAuthenticated ? "/problems" : "/"} className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center"
            >
              <Code className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold">
              <span className="text-indigo-400">Ace</span>DSA
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg transition-colors duration-300 hover:bg-slate-700"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.name || 'User'}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl py-2"
                    >
                      <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`
                  }
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`
                  }
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  <span>Register</span>
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
              {isAuthenticated ? (
                <DropdownItem icon={LogOut} label="Logout" onClick={handleLogout} />
              ) : (
                <>
                  <NavItem to="/login" icon={LogIn} label="Login" />
                  <NavItem to="/register" icon={UserPlus} label="Register" />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: '0%' }}
        animate={{ width: `${scrollProgress}%` }}
      />
    </nav>
  );
};

export default Navbar;