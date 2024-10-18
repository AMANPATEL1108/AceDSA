// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaGithub,
//   FaCode,
//   FaUserPlus,
//   FaChartLine,
//   FaUsers,
//   FaLightbulb,
//   FaPuzzlePiece,
//   FaRocket,
// } from "react-icons/fa";



// const Home = () => {
//   const navigate = useNavigate();

  

//   return (
//     <div className="bg-gray-900 text-gray-100 font-mono">
//       {/* Hero Section */}
//       <header className="bg-gray-800 py-20">
//         <div className="max-w-4xl mx-auto text-center px-4">
//           <h1 className="text-5xl font-extrabold mb-6 text-green-400">
//             Revolutionize Your Coding Journey with AceDSA
//           </h1>
//           <p className="text-xl mb-8 text-gray-300">
//             Join the open-source movement. Contribute, learn, and track your
//             progress in Data Structures and Algorithms.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <button
//               className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
//               onClick={() => navigate("/register")}
//             >
//               Get Started
//             </button>
//             <button
//               className="bg-gray-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300"
//               onClick={() => navigate("/topics")}
//             >
//               Explore Topics
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
//             Why Choose AceDSA?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<FaGithub className="text-4xl text-green-400" />}
//               title="Open-Source Collaboration"
//               description="Contribute directly to our GitHub repository. Add DSA topics and coding questions to help the community grow."
//             />
//             <FeatureCard
//               icon={<FaCode className="text-4xl text-green-400" />}
//               title="Curated Learning Path"
//               description="Access a structured curriculum of DSA topics and coding challenges, curated by the community for optimal learning."
//             />
//             <FeatureCard
//               icon={<FaChartLine className="text-4xl text-green-400" />}
//               title="Progress Tracking"
//               description="Monitor your growth with detailed progress analytics. Set goals and achieve milestones in your coding journey."
//             />
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
//             How AceDSA Works
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <StepCard
//               icon={<FaUserPlus className="text-4xl text-green-400" />}
//               title="Sign Up"
//               description="Create your account to join the AceDSA community and start contributing."
//             />
//             <StepCard
//               icon={<FaGithub className="text-4xl text-green-400" />}
//               title="Contribute"
//               description="Add DSA topics or coding questions directly to our GitHub repository."
//             />
//             <StepCard
//               icon={<FaPuzzlePiece className="text-4xl text-green-400" />}
//               title="Practice"
//               description="Solve problems, implement algorithms, and strengthen your coding skills."
//             />
//             <StepCard
//               icon={<FaChartLine className="text-4xl text-green-400" />}
//               title="Track Progress"
//               description="Monitor your contributions and problem-solving progress on your dashboard."
//             />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-gray-800">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-6 text-green-400">
//             About AceDSA
//           </h2>
//           <p className="text-xl mb-8 text-gray-300">
//             AceDSA(Collaborative Programming Practice Platform) is an innovative
//             open-source project designed to revolutionize how developers learn
//             and practice Data Structures and Algorithms. Our mission is to
//             create a vibrant, community-driven ecosystem where knowledge is
//             shared freely and progress is celebrated collectively.
//           </p>
//           <button className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300">
//             Learn More About Our Mission
//           </button>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12 text-green-400">
//             What Our Community Says
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <TestimonialCard
//               quote="AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!"
//               author="Alex Chen, Software Engineer"
//             />
//             <TestimonialCard
//               quote="Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration."
//               author="Priya Sharma, CS Student"
//             />
//             <TestimonialCard
//               quote="The progress tracking feature keeps me motivated. It's like having a personal coding coach!"
//               author="Michael Brown, Full Stack Developer"
//             />
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-green-600 text-white text-center">
//         <div className="max-w-4xl mx-auto px-4">
//           <h2 className="text-4xl font-bold mb-6">
//             Ready to Elevate Your Coding Skills?
//           </h2>
//           <p className="text-xl mb-8">
//             Join AceDSA today and become part of a thriving community of
//             developers committed to growth and collaboration.
//           </p>
//           <button className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300">
//             Sign Up Now
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4 text-green-400">AceDSA</h3>
//               <p>
//                 Empowering developers through open-source collaboration and
//                 continuous learning.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Quick Links
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#features"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#how-it-works"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     How It Works
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#about"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     About
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Community
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Discord
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Forum
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Legal
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Cookie Policy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center">
//             <p>&copy; 2024 AceDSA Project. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }) => (
//   <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//     <div className="flex items-center justify-center mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </div>
// );

// const StepCard = ({ icon, title, description }) => (
//   <div className="text-center">
//     <div className="flex items-center justify-center mb-4">{icon}</div>
//     <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </div>
// );

// const TestimonialCard = ({ quote, author }) => (
//   <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//     <p className="text-gray-300 italic mb-4">"{quote}"</p>
//     <p className="font-semibold text-green-400">- {author}</p>
//   </div>
// );

// export default Home;


// -----------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGithub, FaCode, FaUserPlus, FaChartLine, FaUsers, FaLightbulb, FaPuzzlePiece, FaRocket } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isVisible, setIsVisible] = useState({});

//   useEffect(() => {
//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(testimonialInterval);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['features', 'how-it-works', 'about', 'testimonials'];
//       sections.forEach((section) => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           setIsVisible((prev) => ({
//             ...prev,
//             [section]: rect.top < window.innerHeight && rect.bottom >= 0,
//           }));
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const testimonials = [
//     {
//       quote: "AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!",
//       author: "Alex Chen, Software Engineer"
//     },
//     {
//       quote: "Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration.",
//       author: "Priya Sharma, CS Student"
//     },
//     {
//       quote: "The progress tracking feature keeps me motivated. It's like having a personal coding coach!",
//       author: "Michael Brown, Full Stack Developer"
//     }
//   ];

//   return (
//     <div className="bg-gray-900 text-gray-100 font-mono">
//       {/* Hero Section */}
//       <header className="bg-gray-800 py-20 relative overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto text-center px-4 relative z-10"
//         >
//           <h1 className="text-5xl font-extrabold mb-6 text-green-400">
//             Revolutionize Your Coding Journey with AceDSA
//           </h1>
//           <p className="text-xl mb-8 text-gray-300">
//             Join the open-source movement. Contribute, learn, and track your
//             progress in Data Structures and Algorithms.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
//               onClick={() => navigate("/register")}
//             >
//               Get Started
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300"
//               onClick={() => navigate("/topics")}
//             >
//               Explore Topics
//             </motion.button>
//           </div>
//         </motion.div>
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500" style={{ transform: "skewY(-12deg)", transformOrigin: "0" }}></div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             Why Choose AceDSA?
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<FaGithub className="text-4xl text-green-400" />}
//               title="Open-Source Collaboration"
//               description="Contribute directly to our GitHub repository. Add DSA topics and coding questions to help the community grow."
//             />
//             <FeatureCard
//               icon={<FaCode className="text-4xl text-green-400" />}
//               title="Curated Learning Path"
//               description="Access a structured curriculum of DSA topics and coding challenges, curated by the community for optimal learning."
//             />
//             <FeatureCard
//               icon={<FaChartLine className="text-4xl text-green-400" />}
//               title="Progress Tracking"
//               description="Monitor your growth with detailed progress analytics. Set goals and achieve milestones in your coding journey."
//             />
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible['how-it-works'] ? 1 : 0, y: isVisible['how-it-works'] ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             How AceDSA Works
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <StepCard
//               icon={<FaUserPlus className="text-4xl text-green-400" />}
//               title="Sign Up"
//               description="Create your account to join the AceDSA community and start contributing."
//             />
//             <StepCard
//               icon={<FaGithub className="text-4xl text-green-400" />}
//               title="Contribute"
//               description="Add DSA topics or coding questions directly to our GitHub repository."
//             />
//             <StepCard
//               icon={<FaPuzzlePiece className="text-4xl text-green-400" />}
//               title="Practice"
//               description="Solve problems, implement algorithms, and strengthen your coding skills."
//             />
//             <StepCard
//               icon={<FaChartLine className="text-4xl text-green-400" />}
//               title="Track Progress"
//               description="Monitor your contributions and problem-solving progress on your dashboard."
//             />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-gray-800">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold mb-6 text-green-400"
//           >
//             About AceDSA
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 20 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl mb-8 text-gray-300"
//           >
//             AceDSA (Collaborative Programming Practice Platform) is an innovative
//             open-source project designed to revolutionize how developers learn
//             and practice Data Structures and Algorithms. Our mission is to
//             create a vibrant, community-driven ecosystem where knowledge is
//             shared freely and progress is celebrated collectively.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300"
//           >
//             Learn More About Our Mission
//           </motion.button>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.testimonials ? 1 : 0, y: isVisible.testimonials ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             What Our Community Says
//           </motion.h2>
//           <div className="relative h-64">
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={currentTestimonial}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute inset-0"
//               >
//                 <TestimonialCard {...testimonials[currentTestimonial]} />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-green-600 text-white text-center">
//         <div className="max-w-4xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold mb-6"
//           >
//             Ready to Elevate Your Coding Skills?
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl mb-8"
//           >
//             Join AceDSA today and become part of a thriving community of
//             developers committed to growth and collaboration.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
//           >
//             Sign Up Now
//           </motion.button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4 text-green-400">AceDSA</h3>
//               <p>
//                 Empowering developers through open-source collaboration and
//                 continuous learning.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Quick Links
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#features"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#how-it-works"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     How It Works
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#about"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     About
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Community
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Discord
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Forum
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Legal
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Privacy Policy
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Cookie Policy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center">
//             <p>&copy; 2024 AceDSA Project. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//   >
//     <motion.div
//       whileHover={{ scale: 1.1 }}
//       className="flex items-center justify-center mb-4"
//     >
//       {icon}
//     </motion.div>
//     <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const StepCard = ({ icon, title, description }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="text-center"
//   >
//     <motion.div
//       whileHover={{ scale: 1.1, rotate: 360 }}
//       transition={{ duration: 0.5 }}
//       className="flex items-center justify-center mb-4"
//     >
//       {icon}
//     </motion.div>
//     <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const TestimonialCard = ({ quote, author }) => (
//   <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col justify-between">
//     <p className="text-gray-300 italic mb-4">"{quote}"</p>
//     <p className="font-semibold text-green-400">- {author}</p>
//   </div>
// );

// // New component for animated code snippet
// const AnimatedCodeSnippet = () => {
//   const [currentLine, setCurrentLine] = useState(0);
//   const codeLines = [
//     'def bubble_sort(arr):',
//     '    n = len(arr)',
//     '    for i in range(n):',
//     '        for j in range(0, n-i-1):',
//     '            if arr[j] > arr[j+1]:',
//     '                arr[j], arr[j+1] = arr[j+1], arr[j]',
//     '    return arr'
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentLine((prevLine) => (prevLine + 1) % codeLines.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//       <pre className="text-green-400">
//         {codeLines.map((line, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: index <= currentLine ? 1 : 0.3, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {line}
//           </motion.div>
//         ))}
//       </pre>
//     </div>
//   );
// };

// // Add this new section just before the CTA section
// const CodeSnippetSection = () => (
//   <section className="py-20 bg-gray-800">
//     <div className="max-w-6xl mx-auto px-4">
//       <motion.h2
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-3xl font-bold text-center mb-12 text-green-400"
//       >
//         Learn by Example
//       </motion.h2>
//       <div className="flex flex-col md:flex-row items-center justify-between">
//         <div className="md:w-1/2 mb-8 md:mb-0">
//           <AnimatedCodeSnippet />
//         </div>
//         <div className="md:w-1/2 md:pl-8">
//           <h3 className="text-2xl font-semibold mb-4 text-green-400">Master Algorithms Step by Step</h3>
//           <p className="text-gray-300 mb-4">
//             At AceDSA, we believe in learning by doing. Our platform provides you with
//             real-world coding examples and step-by-step explanations to help you
//             understand complex algorithms and data structures.
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300"
//           >
//             Explore More Examples
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// // Add this line just before the CTA section in the main component
// <CodeSnippetSection />

// export default Home;

// --------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGithub, FaCode, FaUserPlus, FaChartLine, FaUsers, FaLightbulb, FaPuzzlePiece, FaRocket, FaArrowRight, FaBook } from 'react-icons/fa';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const Home = () => {
//   const navigate = useNavigate();
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isVisible, setIsVisible] = useState({});
//   const [activeTab, setActiveTab] = useState('daily');

//   useEffect(() => {
//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(testimonialInterval);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['features', 'how-it-works', 'about', 'testimonials', 'stats', 'code-snippet'];
//       sections.forEach((section) => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           setIsVisible((prev) => ({
//             ...prev,
//             [section]: rect.top < window.innerHeight && rect.bottom >= 0,
//           }));
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const testimonials = [
//     {
//       quote: "AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!",
//       author: "Alex Chen, Software Engineer"
//     },
//     {
//       quote: "Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration.",
//       author: "Priya Sharma, CS Student"
//     },
//     {
//       quote: "The progress tracking feature keeps me motivated. It's like having a personal coding coach!",
//       author: "Michael Brown, Full Stack Developer"
//     }
//   ];

//   const statsData = {
//     daily: [
//       { name: 'Mon', users: 4000, problems: 2400 },
//       { name: 'Tue', users: 3000, problems: 1398 },
//       { name: 'Wed', users: 2000, problems: 9800 },
//       { name: 'Thu', users: 2780, problems: 3908 },
//       { name: 'Fri', users: 1890, problems: 4800 },
//       { name: 'Sat', users: 2390, problems: 3800 },
//       { name: 'Sun', users: 3490, problems: 4300 },
//     ],
//     weekly: [
//       { name: 'Week 1', users: 20000, problems: 15000 },
//       { name: 'Week 2', users: 25000, problems: 18000 },
//       { name: 'Week 3', users: 30000, problems: 22000 },
//       { name: 'Week 4', users: 35000, problems: 28000 },
//     ],
//     monthly: [
//       { name: 'Jan', users: 100000, problems: 80000 },
//       { name: 'Feb', users: 120000, problems: 95000 },
//       { name: 'Mar', users: 140000, problems: 110000 },
//       { name: 'Apr', users: 160000, problems: 130000 },
//     ],
//   };

//   return (
//     <div className="bg-gray-900 text-gray-100 font-mono">
//       {/* Hero Section */}
//       <header className="bg-gray-800 py-20 relative overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto text-center px-4 relative z-10"
//         >
//           <h1 className="text-5xl font-extrabold mb-6 text-green-400">
//             Revolutionize Your Coding Journey with AceDSA
//           </h1>
//           <p className="text-xl mb-8 text-gray-300">
//             Join the open-source movement. Contribute, learn, and track your
//             progress in Data Structures and Algorithms.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300 flex items-center"
//               onClick={() => navigate("/register")}
//             >
//               Get Started <FaArrowRight className="ml-2" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-700 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300 flex items-center"
//               onClick={() => navigate("/topics")}
//             >
//               Explore Topics <FaBook className="ml-2" />
//             </motion.button>
//           </div>
//         </motion.div>
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500" style={{ transform: "skewY(-12deg)", transformOrigin: "0" }}></div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             Why Choose AceDSA?
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<FaGithub className="text-4xl text-green-400" />}
//               title="Open-Source Collaboration"
//               description="Contribute directly to our GitHub repository. Add DSA topics and coding questions to help the community grow."
//             />
//             <FeatureCard
//               icon={<FaCode className="text-4xl text-green-400" />}
//               title="Curated Learning Path"
//               description="Access a structured curriculum of DSA topics and coding challenges, curated by the community for optimal learning."
//             />
//             <FeatureCard
//               icon={<FaChartLine className="text-4xl text-green-400" />}
//               title="Progress Tracking"
//               description="Monitor your growth with detailed progress analytics. Set goals and achieve milestones in your coding journey."
//             />
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible['how-it-works'] ? 1 : 0, y: isVisible['how-it-works'] ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             How AceDSA Works
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <StepCard
//               icon={<FaUserPlus className="text-4xl text-green-400" />}
//               title="Sign Up"
//               description="Create your account to join the AceDSA community and start contributing."
//             />
//             <StepCard
//               icon={<FaGithub className="text-4xl text-green-400" />}
//               title="Contribute"
//               description="Add DSA topics or coding questions directly to our GitHub repository."
//             />
//             <StepCard
//               icon={<FaPuzzlePiece className="text-4xl text-green-400" />}
//               title="Practice"
//               description="Solve problems, implement algorithms, and strengthen your coding skills."
//             />
//             <StepCard
//               icon={<FaChartLine className="text-4xl text-green-400" />}
//               title="Track Progress"
//               description="Monitor your contributions and problem-solving progress on your dashboard."
//             />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-gray-800">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold mb-6 text-green-400"
//           >
//             About AceDSA
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 20 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl mb-8 text-gray-300"
//           >
//             AceDSA is an innovative open-source project designed to revolutionize
//             how developers learn and practice Data Structures and Algorithms. Our
//             mission is to create a vibrant, community-driven ecosystem where
//             knowledge is shared freely and progress is celebrated collectively.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-green-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition duration-300 flex items-center mx-auto"
//           >
//             Learn More About Our Mission <FaArrowRight className="ml-2" />
//           </motion.button>
//         </div>
//       </section>

//       {/* Statistics Section */}
//       <section id="stats" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.stats ? 1 : 0, y: isVisible.stats ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             AceDSA in Numbers
//           </motion.h2>
//           <div className="flex justify-center mb-8">
//             <button
//               className={`px-4 py-2 rounded-l-md ${activeTab === 'daily' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
//               onClick={() => setActiveTab('daily')}
//             >
//               Daily
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === 'weekly' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
//               onClick={() => setActiveTab('weekly')}
//             >
//               Weekly
//             </button>
//             <button
//               className={`px-4 py-2 rounded-r-md ${activeTab === 'monthly' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300'}`}
//               onClick={() => setActiveTab('monthly')}
//             >
//               Monthly
//             </button>
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={statsData[activeTab]}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
//                   itemStyle={{ color: '#9CA3AF' }}
//                 />
//                 <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} />
//                 <Line type="monotone" dataKey="problems" stroke="#3B82F6" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="text-center mt-8">
//             <p className="text-gray-300">
//               <span className="text-green-400 font-bold">Users</span> and{' '}
//               <span className="text-blue-400 font-bold">Problems Solved</span> over time
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.testimonials ? 1 : 0, y: isVisible.testimonials ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             What Our Community Says
//           </motion.h2>
//           <div className="relative h-64">
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={currentTestimonial}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute inset-0"
//               >
//                 <TestimonialCard {...testimonials[currentTestimonial]} />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//     {/* Code Snippet Section */}
//     <section id="code-snippet" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible['code-snippet'] ? 1 : 0, y: isVisible['code-snippet'] ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-green-400"
//           >
//             Learn by Example
//           </motion.h2>
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="md:w-1/2 mb-8 md:mb-0">
//               <AnimatedCodeSnippet />
//             </div>
//             <div className="md:w-1/2 md:pl-8">
//               <h3 className="text-2xl font-semibold mb-4 text-green-400">Master Algorithms Step by Step</h3>
//               <p className="text-gray-300 mb-4">
//                 At AceDSA, we believe in learning by doing. Our platform provides you with
//                 real-world coding examples and step-by-step explanations to help you
//                 understand complex algorithms and data structures.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600 transition duration-300 flex items-center"
//               >
//                 Explore More Examples <FaArrowRight className="ml-2" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-green-600 text-white text-center">
//         <div className="max-w-4xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold mb-6"
//           >
//             Ready to Elevate Your Coding Skills?
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl mb-8"
//           >
//             Join AceDSA today and become part of a thriving community of
//             developers committed to growth and collaboration.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-green-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition duration-300 flex items-center mx-auto"
//           >
//             Sign Up Now <FaUserPlus className="ml-2" />
//           </motion.button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4 text-green-400">AceDSA</h3>
//               <p>
//                 Empowering developers through open-source collaboration and
//                 continuous learning.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Quick Links
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#features"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#how-it-works"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     How It Works
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#about"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     About
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Community
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Discord
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Forum
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Blog
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-green-400">
//                 Legal
//               </h4>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="hover:text-green-400 transition duration-300"
//                   >
//                     Cookie Policy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-gray-800 text-center">
//             <p>&copy; 2024 AceDSA Project. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
//   >
//     <motion.div
//       whileHover={{ scale: 1.1 }}
//       className="flex items-center justify-center mb-4"
//     >
//       {icon}
//     </motion.div>
//     <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const StepCard = ({ icon, title, description }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="text-center"
//   >
//     <motion.div
//       whileHover={{ scale: 1.1, rotate: 360 }}
//       transition={{ duration: 0.5 }}
//       className="flex items-center justify-center mb-4"
//     >
//       {icon}
//     </motion.div>
//     <h3 className="text-xl font-semibold mb-2 text-green-400">{title}</h3>
//     <p className="text-gray-300">{description}</p>
//   </motion.div>
// );

// const TestimonialCard = ({ quote, author }) => (
//   <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col justify-between">
//     <p className="text-gray-300 italic mb-4">"{quote}"</p>
//     <p className="font-semibold text-green-400">- {author}</p>
//   </div>
// );

// const AnimatedCodeSnippet = () => {
//   const [currentLine, setCurrentLine] = useState(0);
//   const codeLines = [
//     'def bubble_sort(arr):',
//     '    n = len(arr)',
//     '    for i in range(n):',
//     '        for j in range(0, n-i-1):',
//     '            if arr[j] > arr[j+1]:',
//     '                arr[j], arr[j+1] = arr[j+1], arr[j]',
//     '    return arr'
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentLine((prevLine) => (prevLine + 1) % codeLines.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//       <pre className="text-green-400">
//         {codeLines.map((line, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: index <= currentLine ? 1 : 0.3, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {line}
//           </motion.div>
//         ))}
//       </pre>
//     </div>
//   );
// };

// export default Home;

// ------------------------------------------------------

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaGithub, FaCode, FaTwitter, FaLinkedin, FaUserPlus, FaChartLine, FaUsers, FaLightbulb, FaPuzzlePiece, FaRocket, FaArrowRight, FaBook, FaTerminal } from 'react-icons/fa';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import Particles from "react-tsparticles";
// import { loadSlim } from "tsparticles-slim";

// const Home = () => {
//   const navigate = useNavigate();
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [isVisible, setIsVisible] = useState({});
//   const [activeTab, setActiveTab] = useState('daily');
//   const [terminalText, setTerminalText] = useState('');

//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {
//     await console.log(container);
//   }, []);

//   useEffect(() => {
//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(testimonialInterval);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ['features', 'how-it-works', 'about', 'testimonials', 'stats', 'code-snippet'];
//       sections.forEach((section) => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           setIsVisible((prev) => ({
//             ...prev,
//             [section]: rect.top < window.innerHeight && rect.bottom >= 0,
//           }));
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const text = "Welcome to AceDSA. Your journey to mastering Data Structures and Algorithms begins here...";
//     let index = 0;
//     const intervalId = setInterval(() => {
//       setTerminalText((prev) => prev + text[index]);
//       index++;
//       if (index === text.length) clearInterval(intervalId);
//     }, 50);
//     return () => clearInterval(intervalId);
//   }, []);

//   const testimonials = [
//     {
//       quote: "AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!",
//       author: "Alex Chen, Software Engineer"
//     },
//     {
//       quote: "Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration.",
//       author: "Priya Sharma, CS Student"
//     },
//     {
//       quote: "The progress tracking feature keeps me motivated. It's like having a personal coding coach!",
//       author: "Michael Brown, Full Stack Developer"
//     }
//   ];

//   const statsData = {
//     daily: [
//       { name: 'Mon', users: 4000, problems: 2400 },
//       { name: 'Tue', users: 3000, problems: 1398 },
//       { name: 'Wed', users: 2000, problems: 9800 },
//       { name: 'Thu', users: 2780, problems: 3908 },
//       { name: 'Fri', users: 1890, problems: 4800 },
//       { name: 'Sat', users: 2390, problems: 3800 },
//       { name: 'Sun', users: 3490, problems: 4300 },
//     ],
//     weekly: [
//       { name: 'Week 1', users: 20000, problems: 15000 },
//       { name: 'Week 2', users: 25000, problems: 18000 },
//       { name: 'Week 3', users: 30000, problems: 22000 },
//       { name: 'Week 4', users: 35000, problems: 28000 },
//     ],
//     monthly: [
//       { name: 'Jan', users: 100000, problems: 80000 },
//       { name: 'Feb', users: 120000, problems: 95000 },
//       { name: 'Mar', users: 140000, problems: 110000 },
//       { name: 'Apr', users: 160000, problems: 130000 },
//     ],
//   };

//  return (
//     <div className="bg-gray-900 text-cyan-300 font-mono">
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         loaded={particlesLoaded}
//         options={{
//           background: {
//             color: {
//               value: "transparent",
//             },
//           },
//           fpsLimit: 120,
//           interactivity: {
//             events: {
//               onClick: {
//                 enable: true,
//                 mode: "push",
//               },
//               onHover: {
//                 enable: true,
//                 mode: "repulse",
//               },
//               resize: true,
//             },
//             modes: {
//               push: {
//                 quantity: 4,
//               },
//               repulse: {
//                 distance: 200,
//                 duration: 0.4,
//               },
//             },
//           },
//           particles: {
//             color: {
//               value: "#00ffff",
//             },
//             links: {
//               color: "#00ffff",
//               distance: 150,
//               enable: true,
//               opacity: 0.5,
//               width: 1,
//             },
//             move: {
//               direction: "none",
//               enable: true,
//               outModes: {
//                 default: "bounce",
//               },
//               random: false,
//               speed: 6,
//               straight: false,
//             },
//             number: {
//               density: {
//                 enable: true,
//                 area: 800,
//               },
//               value: 80,
//             },
//             opacity: {
//               value: 0.5,
//             },
//             shape: {
//               type: "circle",
//             },
//             size: {
//               value: { min: 1, max: 5 },
//             },
//           },
//           detectRetina: true,
//         }}
//       />

//       {/* Hero Section */}
//       <header className="bg-gray-800 py-20 relative overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto text-center px-4 relative z-10"
//         >
//           <h1 className="text-5xl font-extrabold mb-6 text-cyan-400">
//             Revolutionize Your Coding Journey with AceDSA
//           </h1>
//           <div className="bg-gray-900 p-4 rounded-lg shadow-lg mb-8">
//             <pre className="text-cyan-300">
//               <FaTerminal className="inline-block mr-2" />
//               {terminalText}
//             </pre>
//           </div>
//           <div className="flex justify-center space-x-4">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-cyan-500 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-cyan-600 transition duration-300 flex items-center"
//               onClick={() => navigate("/register")}
//             >
//               Get Started <FaArrowRight className="ml-2" />
//             </motion.button>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gray-700 text-cyan-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300 flex items-center"
//               onClick={() => navigate("/topics")}
//             >
//               Explore Topics <FaBook className="ml-2" />
//             </motion.button>
//           </div>
//         </motion.div>
//       </header>

//       {/* Features Section */}
//       <section id="features" className="py-20 bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.features ? 1 : 0, y: isVisible.features ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-cyan-400"
//           >
//             Why Choose AceDSA?
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={<FaGithub className="text-4xl text-cyan-400" />}
//               title="Open-Source Collaboration"
//               description="Contribute directly to our GitHub repository. Add DSA topics and coding questions to help the community grow."
//             />
//             <FeatureCard
//               icon={<FaCode className="text-4xl text-cyan-400" />}
//               title="Curated Learning Path"
//               description="Access a structured curriculum of DSA topics and coding challenges, curated by the community for optimal learning."
//             />
//             <FeatureCard
//               icon={<FaChartLine className="text-4xl text-cyan-400" />}
//               title="Progress Tracking"
//               description="Monitor your growth with detailed progress analytics. Set goals and achieve milestones in your coding journey."
//             />
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how-it-works" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible['how-it-works'] ? 1 : 0, y: isVisible['how-it-works'] ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-cyan-400"
//           >
//             How AceDSA Works
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <StepCard
//               icon={<FaUserPlus className="text-4xl text-cyan-400" />}
//               title="Sign Up"
//               description="Create your account to join the AceDSA community and start contributing."
//             />
//             <StepCard
//               icon={<FaGithub className="text-4xl text-cyan-400" />}
//               title="Contribute"
//               description="Add DSA topics or coding questions directly to our GitHub repository."
//             />
//             <StepCard
//               icon={<FaPuzzlePiece className="text-4xl text-cyan-400" />}
//               title="Practice"
//               description="Solve problems, implement algorithms, and strengthen your coding skills."
//             />
//             <StepCard
//               icon={<FaChartLine className="text-4xl text-cyan-400" />}
//               title="Track Progress"
//               description="Monitor your contributions and problem-solving progress on your dashboard."
//             />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="py-20 bg-gray-800">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold mb-6 text-cyan-400"
//           >
//             About AceDSA
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.about ? 1 : 0, y: isVisible.about ? 0 : 20 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-xl mb-8 text-cyan-300"
//           >
//             AceDSA is an innovative open-source project designed to revolutionize
//             how developers learn and practice Data Structures and Algorithms. Our
//             mission is to create a vibrant, community-driven ecosystem where
//             knowledge is shared freely and progress is celebrated collectively.
//           </motion.p>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-cyan-500 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-cyan-600 transition duration-300 flex items-center mx-auto"
//           >
//             Learn More About Our Mission <FaArrowRight className="ml-2" />
//           </motion.button>
//         </div>
//       </section>

//       {/* Statistics Section */}
//       <section id="stats" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.stats ? 1 : 0, y: isVisible.stats ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-cyan-400"
//           >
//             AceDSA in Numbers
//           </motion.h2>
//           <div className="flex justify-center mb-8">
//             <button
//               className={`px-4 py-2 rounded-l-md ${activeTab === 'daily' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-700 text-cyan-300'}`}
//               onClick={() => setActiveTab('daily')}
//             >
//               Daily
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === 'weekly' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-700 text-cyan-300'}`}
//               onClick={() => setActiveTab('weekly')}
//             >
//               Weekly
//             </button>
//             <button
//               className={`px-4 py-2 rounded-r-md ${activeTab === 'monthly' ? 'bg-cyan-500 text-gray-900' : 'bg-gray-700 text-cyan-300'}`}
//               onClick={() => setActiveTab('monthly')}
//             >
//               Monthly
//             </button>
//           </div>
//           <div className="h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={statsData[activeTab]}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
//                   itemStyle={{ color: '#9CA3AF' }}
//                 />
//                 <Line type="monotone" dataKey="users" stroke="#06B6D4" strokeWidth={2} />
//                 <Line type="monotone" dataKey="problems" stroke="#3B82F6" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="text-center mt-8">
//             <p className="text-cyan-300">
//               <span className="text-cyan-400 font-bold">Users</span> and{' '}
//               <span className="text-blue-400 font-bold">Problems Solved</span> over time
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section id="testimonials" className="py-20 bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible.testimonials ? 1 : 0, y: isVisible.testimonials ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-cyan-400"
//           >
//             What Our Community Says
//           </motion.h2>
//           <div className="relative h-64">
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={currentTestimonial}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.5 }}
//                 className="absolute inset-0"
//               >
//                 <TestimonialCard {...testimonials[currentTestimonial]} />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </section>

//       {/* Code Snippet Section */}
//       <section id="code-snippet" className="py-20 bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: isVisible['code-snippet'] ? 1 : 0, y: isVisible['code-snippet'] ? 0 : 20 }}
//             transition={{ duration: 0.8 }}
//             className="text-3xl font-bold text-center mb-12 text-cyan-400"
//           >
//             Learn by Example
//           </motion.h2>
//           <div className="flex flex-col md:flex-row items-center justify-between">
//             <div className="md:w-1/2 mb-8 md:mb-0">
//               <AnimatedCodeSnippet />
//             </div>
//             <div className="md:w-1/2 md:pl-8">
//               <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Master Algorithms Step by Step</h3>
//               <p className="text-cyan-300 mb-4">
//                 At AceDSA, we believe in learning by doing. Our platform provides you with
//                 real-world coding examples and step-by-step explanations to help you
//                 understand complex algorithms and data structures.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="bg-cyan-500 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-cyan-600 transition duration-300 flex items-center"
//               >
//                 Explore More Examples <FaArrowRight className="ml-2" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-cyan-600 text-gray-900 text-center">
//         <div className="max-w-4xl mx-auto px-4">
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-4xl font-bold mb-6"
//           >
//                                     Ready to Ace Your DSA Journey?
//                       </motion.h2>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="bg-gray-900 text-cyan-300 px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300 flex items-center mx-auto"
//                         onClick={() => navigate("/register")}
//                       >
//                         Get Started Now <FaArrowRight className="ml-2" />
//                       </motion.button>
//                     </div>
//                   </section>
            
//                   {/* Footer Section */}
//                   <footer className="py-10 bg-gray-800 text-center text-cyan-300">
//                     <div className="max-w-4xl mx-auto px-4">
//                       <p>&copy; {new Date().getFullYear()} AceDSA. All rights reserved.</p>
//                       <div className="flex justify-center space-x-4 mt-4">
//                         <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
//                           <FaGithub className="text-2xl" />
//                         </a>
//                         <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
//                           <FaTwitter className="text-2xl" />
//                         </a>
//                         <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
//                           <FaLinkedin className="text-2xl" />
//                         </a>
//                       </div>
//                     </div>
//                   </footer>
//                 </div>
//               );
//             };
            
//             const FeatureCard = ({ icon, title, description }) => (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="bg-gray-900 p-6 rounded-lg shadow-lg text-center"
//               >
//                 <div className="mb-4">{icon}</div>
//                 <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
//                 <p className="text-cyan-300">{description}</p>
//               </motion.div>
//             );
            
//             const StepCard = ({ icon, title, description }) => (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="bg-gray-900 p-6 rounded-lg shadow-lg text-center"
//               >
//                 <div className="mb-4">{icon}</div>
//                 <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
//                 <p className="text-cyan-300">{description}</p>
//               </motion.div>
//             );
            
//             const TestimonialCard = ({ quote, author }) => (
//               <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
//                 <p className="text-xl text-cyan-300 mb-4">"{quote}"</p>
//                 <p className="text-cyan-400 font-bold">{author}</p>
//               </div>
//             );
            
//             const AnimatedCodeSnippet = () => {
//               const codeSnippet = `
//               function twoSum(nums, target) {
//                 let numMap = {};
//                 for (let i = 0; i < nums.length; i++) {
//                   let complement = target - nums[i];
//                   if (complement in numMap) {
//                     return [numMap[complement], i];
//                   }
//                   numMap[nums[i]] = i;
//                 }
//                 return null;
//               }
//               `;
            
//               return (
//                 <pre className="bg-gray-800 p-4 rounded-lg shadow-lg text-cyan-300 overflow-x-auto">
//                   <code>{codeSnippet}</code>
//                 </pre>
//               );
//             };
            
//             export default Home;

// -------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Home as HomeIcon, 
//   Book, 
//   GitBranch, 
//   Users, 
//   BarChart, 
//   Code, 
//   ChevronRight,
//   Search,
//   Clock,
//   Loader2,AlertCircle
// } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const Home = () => {
//   const [activeTab, setActiveTab] = useState('daily');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);


//   const features = [
//     { icon: <GitBranch />, title: "Open-Source Collaboration", description: "Contribute to a growing knowledge base" },
//     { icon: <Book />, title: "Curated Learning Path", description: "Follow a structured curriculum" },
//     { icon: <BarChart />, title: "Progress Tracking", description: "Monitor your learning journey" },
//   ];

//   const howItWorks = [
//     { icon: <Users />, title: "Sign Up", description: "Create your account" },
//     { icon: <GitBranch />, title: "Contribute", description: "Add or improve content" },
//     { icon: <Code />, title: "Practice", description: "Solve coding problems" },
//     { icon: <BarChart />, title: "Track Progress", description: "Monitor your growth" },
//   ];

//   const statsData = {
//     daily: [
//       { name: 'Mon', users: 4000, problems: 2400 },
//       { name: 'Tue', users: 3000, problems: 1398 },
//       { name: 'Wed', users: 2000, problems: 9800 },
//       { name: 'Thu', users: 2780, problems: 3908 },
//       { name: 'Fri', users: 1890, problems: 4800 },
//       { name: 'Sat', users: 2390, problems: 3800 },
//       { name: 'Sun', users: 3490, problems: 4300 },
//     ],
//     weekly: [
//       { name: 'Week 1', users: 20000, problems: 15000 },
//       { name: 'Week 2', users: 25000, problems: 18000 },
//       { name: 'Week 3', users: 30000, problems: 22000 },
//       { name: 'Week 4', users: 35000, problems: 28000 },
//     ],
//     monthly: [
//       { name: 'Jan', users: 100000, problems: 80000 },
//       { name: 'Feb', users: 120000, problems: 95000 },
//       { name: 'Mar', users: 140000, problems: 110000 },
//       { name: 'Apr', users: 160000, problems: 130000 },
//     ],
//   };

//   // Add this effect near the other useEffect hooks (if any, or around line 20-25)
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       // If you have actual data to fetch, do it here
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };
//   fetchData();
// }, []);

// const AnimatedCodeSnippet = () => {
//   const [currentLine, setCurrentLine] = useState(0);
//   const codeLines = [
//     'function quickSort(arr) {',
//     '  if (arr.length <= 1) return arr;',
//     '  const pivot = arr[arr.length - 1];',
//     '  const left = [], right = [];',
//     '  for (let i = 0; i < arr.length - 1; i++) {',
//     '    if (arr[i] < pivot) left.push(arr[i]);',
//     '    else right.push(arr[i]);',
//     '  }',
//     '  return [...quickSort(left), pivot, ...quickSort(right)];',
//     '}'
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentLine((prevLine) => (prevLine + 1) % codeLines.length);
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-indigo-400">
//       <pre className="text-indigo-400 font-mono">
//         {codeLines.map((line, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: index <= currentLine ? 1 : 0.3, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {line}
//           </motion.div>
//         ))}
//       </pre>
//     </div>
//   );
// };

// // Add this component definition above the Home component (around line 90-100)
// const TestimonialCard = ({ quote, author }) => (
//   <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col justify-between border border-indigo-400">
//     <p className="text-slate-300 italic mb-4">"{quote}"</p>
//     <p className="font-semibold text-indigo-400">{author}</p>
//   </div>
// );

// // Add this inside the Home component, just before the return statement (around line 110-120)
// const testimonials = [
//   {
//     quote: "AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!",
//     author: "Alex Chen, Software Engineer"
//   },
//   {
//     quote: "Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration.",
//     author: "Priya Sharma, CS Student"
//   },
//   {
//     quote: "The progress tracking feature keeps me motivated. It's like having a personal coding coach!",
//     author: "Michael Brown, Full Stack Developer"
//   }
// ];

// // Add this effect inside the Home component, near other useEffect hooks (around line 30-35)
// useEffect(() => {
//   const testimonialInterval = setInterval(() => {
//     setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//   }, 5000);

//   return () => clearInterval(testimonialInterval);
// }, []);

//   return (
// <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
//     {/* Top Banner */}
//     <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

//     {loading ? (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
//       </div>
//     ) : error ? (
//       <div className="flex items-center justify-center h-screen">
//         <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
//           <div className="flex items-center gap-2">
//             <AlertCircle className="h-5 w-5" />
//             <p>Error loading content: {error}</p>
//           </div>
//         </div>
//       </div>
//     ) : (
//       <div className="mx-auto max-w-7xl px-4 py-12">
//         {/* Hero Section */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl font-bold mb-4 text-white">
//             Welcome to <span className="text-indigo-400">AceDSA</span>
//           </h1>
//           <p className="text-xl text-slate-400 mb-8">
//             Master Data Structures and Algorithms through open-source collaboration
//           </p>
//           <Link 
//             to="/topics"
//             className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
//           >
//             Explore Topics <ChevronRight className="ml-2 h-5 w-5" />
//           </Link>
//         </motion.div>

//         {/* Features Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-8 text-white">Key Features</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-700/50"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//                 <div className="relative">
//                   <div className="flex items-center gap-3 mb-4">
//                     <div className="rounded-lg bg-indigo-500/10 p-2">
//                       {React.cloneElement(feature.icon, { className: "h-5 w-5 text-indigo-400" })}
//                     </div>
//                     <h3 className="font-semibold text-slate-200">{feature.title}</h3>
//                   </div>
//                   <p className="text-slate-400">{feature.description}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-8 text-white">How It Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             {howItWorks.map((step, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center"
//               >
//                 <div className="flex justify-center mb-4">
//                   <div className="rounded-full bg-indigo-500/10 p-3">
//                     {React.cloneElement(step.icon, { className: "h-6 w-6 text-indigo-400" })}
//                   </div>
//                 </div>
//                 <h3 className="font-semibold text-slate-200 mb-2">{step.title}</h3>
//                 <p className="text-slate-400">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </section>

//         <section className="mb-16">
//   <h2 className="text-3xl font-bold text-center mb-8 text-white">What Our Users Say</h2>
//   <div className="relative h-64">
//     <AnimatePresence initial={false}>
//       <motion.div key={currentTestimonial}
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -50 }}
//         transition={{ duration: 0.5 }}
//         className="absolute inset-0"
//       >
//         <TestimonialCard {...testimonials[currentTestimonial]} />
//       </motion.div>
//     </AnimatePresence>
//   </div>
// </section>

//         {/* Statistics Section */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold text-center mb-8 text-white">Platform Statistics</h2>
//           <div className="flex justify-center mb-8">
//             {['daily', 'weekly', 'monthly'].map((tab) => (
//               <button
//                 key={tab}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === tab 
//                     ? 'bg-indigo-500 text-white' 
//                     : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
//                 } transition-colors duration-300`}
//                 onClick={() => setActiveTab(tab)}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </button>
//             ))}
//           </div>
//           <div className="h-80 bg-slate-800/50 rounded-lg p-4">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={statsData[activeTab]}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="name" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
//                   itemStyle={{ color: '#9CA3AF' }}
//                 />
//                 <Line type="monotone" dataKey="users" stroke="#818CF8" strokeWidth={2} />
//                 <Line type="monotone" dataKey="problems" stroke="#F472B6" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//           <div className="text-center mt-4">
//             <p className="text-slate-400">
//               <span className="text-indigo-400 font-semibold">Users</span> and{' '}
//               <span className="text-pink-400 font-semibold">Problems Solved</span> over time
//             </p>
//           </div>
//         </section>

//         <section className="mb-16">
//   <h2 className="text-3xl font-bold text-center mb-8 text-white">Learn by Example</h2>
//   <div className="flex flex-col md:flex-row items-center justify-between">
//     <div className="md:w-1/2 mb-8 md:mb-0">
//       <AnimatedCodeSnippet />
//     </div>
//     <div className="md:w-1/2 md:pl-8">
//       <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Master Algorithms Step by Step</h3>
//       <p className="text-slate-300 mb-4">
//         At AceDSA, we believe in learning by doing. Our platform provides you with
//         real-world coding examples and step-by-step explanations to help you
//         understand complex algorithms and data structures.
//       </p>
//       <Link
//         to="/topics"
//         className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
//       >
//         Explore More Examples <ChevronRight className="ml-2 h-5 w-5" />
//       </Link>
//     </div>
//   </div>
// </section>

//         {/* CTA Section */}
//         <section className="text-center">
//           <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Journey?</h2>
//           <p className="text-xl text-slate-400 mb-8">
//             Join AceDSA today and become part of our thriving community of developers.
//           </p>
//           <Link 
//             to="/register"
//             className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors duration-300"
//           >
//             Get Started <ChevronRight className="ml-2 h-5 w-5" />
//           </Link>
//         </section>
//       </div>
//     )}
//       <footer className="bg-slate-800/50 text-slate-300 py-12 mt-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-2xl font-bold mb-4 text-indigo-400">AceDSA</h3>
//               <p>Empowering developers through open-source collaboration and continuous learning.</p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><Link to="/" className="hover:text-indigo-400 transition-colors duration-300">Home</Link></li>
//                 <li><Link to="/topics" className="hover:text-indigo-400 transition-colors duration-300">Topics</Link></li>
//                 <li><Link to="/contribute" className="hover:text-indigo-400 transition-colors duration-300">Contribute</Link></li>
//                 <li><Link to="/about" className="hover:text-indigo-400 transition-colors duration-300">About</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-indigo-400">Community</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">GitHub</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Discord</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Forum</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Blog</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-indigo-400">Legal</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Terms of Service</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a></li>
//                 <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Cookie Policy</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-8 pt-8 border-t border-slate-700 text-center">
//             <p>© {new Date().getFullYear()} AceDSA Project. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

// ----------------------------------------

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Home as HomeIcon, 
  Book, 
  GitBranch, 
  Users, 
  BarChart, 
  Code, 
  ChevronRight,
  Search,
  Clock,
  Loader2,
  AlertCircle,
  ArrowRight,
  Star,
  Coffee,
  Brain,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
  const codeRef = useRef(null);
  const testimonialRef = useRef(null);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const features = [
    { icon: <GitBranch />, title: "Open-Source Collaboration", description: "Contribute to a growing knowledge base" },
    { icon: <Book />, title: "Curated Learning Path", description: "Follow a structured curriculum" },
    { icon: <BarChart />, title: "Progress Tracking", description: "Monitor your learning journey" },
    { icon: <Coffee />, title: "Daily Challenges", description: "Solve a new problem every day" },
    { icon: <Brain />, title: "AI-Powered Recommendations", description: "Get personalized learning suggestions" },
    { icon: <Star />, title: "Gamification", description: "Earn badges and climb leaderboards" },
  ];

  const howItWorks = [
    { icon: <Users />, title: "Sign Up", description: "Create your account" },
    { icon: <GitBranch />, title: "Contribute", description: "Add or improve content" },
    { icon: <Code />, title: "Practice", description: "Solve coding problems" },
    { icon: <BarChart />, title: "Track Progress", description: "Monitor your growth" },
  ];

  const statsData = {
    daily: [
      { name: 'Mon', users: 4000, problems: 2400 },
      { name: 'Tue', users: 3000, problems: 1398 },
      { name: 'Wed', users: 2000, problems: 9800 },
      { name: 'Thu', users: 2780, problems: 3908 },
      { name: 'Fri', users: 1890, problems: 4800 },
      { name: 'Sat', users: 2390, problems: 3800 },
      { name: 'Sun', users: 3490, problems: 4300 },
    ],
    weekly: [
      { name: 'Week 1', users: 20000, problems: 15000 },
      { name: 'Week 2', users: 25000, problems: 18000 },
      { name: 'Week 3', users: 30000, problems: 22000 },
      { name: 'Week 4', users: 35000, problems: 28000 },
    ],
    monthly: [
      { name: 'Jan', users: 100000, problems: 80000 },
      { name: 'Feb', users: 120000, problems: 95000 },
      { name: 'Mar', users: 140000, problems: 110000 },
      { name: 'Apr', users: 160000, problems: 130000 },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AnimatedCodeSnippet = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const codeLines = [
      'function quickSort(arr) {',
      '  if (arr.length <= 1) return arr;',
      '  const pivot = arr[arr.length - 1];',
      '  const left = [], right = [];',
      '  for (let i = 0; i < arr.length - 1; i++) {',
      '    if (arr[i] < pivot) left.push(arr[i]);',
      '    else right.push(arr[i]);',
      '  }',
      '  return [...quickSort(left), pivot, ...quickSort(right)];',
      '}'
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentLine((prevLine) => (prevLine + 1) % codeLines.length);
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-indigo-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 animate-pulse" />
        <pre className="text-indigo-400 font-mono relative z-10">
          {codeLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: index <= currentLine ? 1 : 0.3, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {line}
            </motion.div>
          ))}
        </pre>
      </div>
    );
  };

  const TestimonialCard = ({ quote, author }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col justify-between border border-indigo-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 animate-pulse" />
      <p className="text-slate-300 italic mb-4 relative z-10">"{quote}"</p>
      <p className="font-semibold text-indigo-400 relative z-10">{author}</p>
    </div>
  );

  const testimonials = [
    {
      quote: "AceDSA has transformed the way I approach DSA learning. The community support is unparalleled!",
      author: "Alex Chen, Software Engineer"
    },
    {
      quote: "Contributing to AceDSA has not only improved my coding skills but also my understanding of open-source collaboration.",
      author: "Priya Sharma, CS Student"
    },
    {
      quote: "The progress tracking feature keeps me motivated. It's like having a personal coding coach!",
      author: "Michael Brown, Full Stack Developer"
    }
  ];

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 fixed top-0 left-0 right-0 z-50" />

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-screen">
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>Error loading content: {error}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 80%)",
              mixBlendMode: "screen",
            }}
          />

          <motion.div 
            ref={heroRef}
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 bg-cover bg-center opacity-10" />
            <div className="text-center z-10 px-4">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl font-bold mb-4 text-white"
              >
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AceDSA</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-slate-400 mb-8"
              >
                Master Data Structures and Algorithms through open-source collaboration
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link 
                  to="/topics"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Topics <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {showScrollIndicator && (
            <motion.div 
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              <ArrowRight className="h-8 w-8 text-indigo-400 animate-bounce" />
            </motion.div>
          )}

          <div className="max-w-7xl mx-auto px-4 py-24">
            <motion.section 
              ref={featuresRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h2 className="text-4xl font-bold text-center mb-12 text-white">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-700/50 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-lg bg-indigo-500/10 p-2 group-hover:bg-indigo-500/20 transition-colors duration-300">
                          {React.cloneElement(feature.icon, { className: "h-6 w-6 text-indigo-400" })}
                        </div>
                        <h3 className="font-semibold text-slate-200 text-lg">{feature.title}</h3>
                      </div>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              ref={statsRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h2 className="text-4xl font-bold text-center mb-12 text-white">Platform Statistics</h2>
              <div className="flex justify-center mb-8 space-x-4">
                {['daily', 'weekly', 'monthly'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-6 py-2 rounded-full ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-indigo-500to-purple-500 text-white shadow-lg' 
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    } transition-all duration-300 transform hover:scale-105`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <div className="h-96 bg-slate-800/50 rounded-lg p-4 shadow-xl">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={statsData[activeTab]}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818CF8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="problemGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F472B6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F472B6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                      itemStyle={{ color: '#9CA3AF' }}
                    />
                    <Line type="monotone" dataKey="users" stroke="#818CF8" strokeWidth={3} dot={{ fill: '#818CF8', strokeWidth: 2 }} activeDot={{ r: 8 }} fillOpacity={1} fill="url(#userGradient)" />
                    <Line type="monotone" dataKey="problems" stroke="#F472B6" strokeWidth={3} dot={{ fill: '#F472B6', strokeWidth: 2 }} activeDot={{ r: 8 }} fillOpacity={1} fill="url(#problemGradient)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <p className="text-slate-400">
                  <span className="text-indigo-400 font-semibold">Users</span> and{' '}
                  <span className="text-pink-400 font-semibold">Problems Solved</span> over time
                </p>
              </div>
            </motion.section>

            <motion.section 
              ref={codeRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h2 className="text-4xl font-bold text-center mb-12 text-white">Learn by Example</h2>
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <AnimatedCodeSnippet />
                </div>
                <div className="lg:w-1/2 lg:pl-12">
                  <h3 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Master Algorithms Step by Step</h3>
                  <p className="text-slate-300 mb-6 text-lg">
                    At AceDSA, we believe in learning by doing. Our platform provides you with
                    real-world coding examples and step-by-step explanations to help you
                    understand complex algorithms and data structures.
                  </p>
                  <Link
                    to="/topics"
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Explore More Examples <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.section>

            <motion.section 
              ref={testimonialRef}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-24"
            >
              <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
              <div className="relative h-64">
                <AnimatePresence initial={false}>
                  <motion.div 
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <TestimonialCard {...testimonials[currentTestimonial]} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Journey?</h2>
              <p className="text-xl text-slate-400 mb-8">
                Join AceDSA today and become part of our thriving community of developers.
              </p>
              <Link 
                to="/register"
                className="inline-flex items-center px-8 py-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started <ChevronRight className="ml-2 h-6 w-6" />
              </Link>
            </motion.section>
          </div>

          <footer className="bg-slate-800/50 text-slate-300 py-16 mt-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50" />
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AceDSA</h3>
                  <p className="mb-4">Empowering developers through open-source collaboration and continuous learning.</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors duration-300">
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-indigo-400">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link to="/" className="hover:text-indigo-400 transition-colors duration-300">Home</Link></li>
                    <li><Link to="/topics" className="hover:text-indigo-400 transition-colors duration-300">Topics</Link></li>
                    <li><Link to="/contribute" className="hover:text-indigo-400 transition-colors duration-300">Contribute</Link></li>
                    <li><Link to="/about" className="hover:text-indigo-400 transition-colors duration-300">About</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-indigo-400">Community</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">GitHub</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Discord</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Forum</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Blog</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-indigo-400">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-indigo-400 transition-colors duration-300">Cookie Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-700 text-center">
                <p>© {new Date().getFullYear()} AceDSA Project. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;