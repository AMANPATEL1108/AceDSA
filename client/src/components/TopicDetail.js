// import React, { useState, useEffect,useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";

// const TopicDetail = () => {
//   const [topic, setTopic] = useState(null);
//   const { topicName } = useParams();
//   const contentRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("");


//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
// const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
//         // const res = await axios.get(`https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/${topicName}`);
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
//           setTopic({
//             name: res.data.name.replace(".md", ""),
//             content: decodedContent
//           });
//         } else {
//           console.error("Unexpected response format:", res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching topic:", err);
//       }
//     };
//     fetchTopic();
//   }, [topicName]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const headings = contentRef.current.querySelectorAll("h2, h3");
//       let currentSection = "";
//       for (const heading of headings) {
//         const top = heading.getBoundingClientRect().top;
//         if (top > 60 && top < window.innerHeight / 2) {
//           currentSection = heading.id;
//           break;
//         }
//       }
//       setActiveSection(currentSection);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const TableOfContents = ({ content }) => {
//     const headings = content.match(/^##\s.+$/gm) || [];
//     return (
//       <nav className="toc">
//         <h3 className="text-xl font-bold mb-4 mt-12 text-indigo-300">Table of Contents</h3>
//         <ul className="space-y-2">
//           {headings.map((heading, index) => {
//             const title = heading.replace(/^##\s/, "");
//             const id = title.toLowerCase().replace(/\s/g, "-");
//             return (
//               <li key={index} className={activeSection === id ? "active" : ""}>
//                 <a href={`#${id}`} className="hover:text-indigo-400 transition-colors duration-200">{title}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     );
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-gray-300 font-sans">
//       <div className="max-w-6xl mx-auto px-4 py-8 flex">
//         <div className="w-3/4 pr-8" ref={contentRef}>
//           {topic && (
//             <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
//               <div className="p-8">
//                 <ReactMarkdown
//                   children={topic.content}
//                   remarkPlugins={[remarkGfm, remarkSlug]}
//                   rehypePlugins={[rehypeRaw]}
//                   components={{
//                     code({ node, inline, className, children, ...props }) {
//                       const match = /language-(\w+)/.exec(className || "");
//                       return !inline && match ? (
//                         <SyntaxHighlighter
//                           style={vscDarkPlus}
//                           language={match[1]}
//                           PreTag="div"
//                           className="rounded-md my-4"
//                           {...props}
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       ) : (
//                         <code className="bg-gray-700 px-1 rounded text-indigo-200" {...props}>
//                           {children}
//                         </code>
//                       );
//                     },
//                     h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-6 text-indigo-100 border-b border-indigo-700 pb-2" {...props} />,
//                     h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-10 mb-4 text-indigo-200" {...props} />,
//                     h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-8 mb-3 text-indigo-300" {...props} />,
//                     p: ({ node, ...props }) => <p className="mb-4 text-gray-300 leading-relaxed text-left" {...props} />,
//                     ul: ({ node, ...props }) => <div className="mb-4 text-gray-300 space-y-2" {...props} />,
//                     ol: ({ node, ...props }) => <div className="mb-4 text-gray-300 space-y-2" {...props} />,
//                     li: ({ node, ...props }) => (
//                       <div className="flex items-start">
//                         <span className="mr-2 text-indigo-400">•</span>
//                         <span {...props} />
//                       </div>
//                     ),
//                     a: ({ node, ...props }) => <a className="text-indigo-400 hover:underline" {...props} />,
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="w-1/4">
//           {topic && <TableOfContents content={topic.content} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;

// ----------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";

// const TopicDetail = () => {
//   const [topic, setTopic] = useState(null);
//   const { topicName } = useParams();
//   const contentRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("");

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
//           // Remove the table of contents from the main content
//           const contentWithoutTOC = decodedContent.replace(/## Table of Contents[\s\S]*?(?=##)/m, '');
//           setTopic({
//             name: res.data.name.replace(".md", ""),
//             content: contentWithoutTOC
//           });
//         } else {
//           console.error("Unexpected response format:", res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching topic:", err);
//       }
//     };
//     fetchTopic();
//   }, [topicName]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const headings = contentRef.current.querySelectorAll("h2, h3");
//       let currentSection = "";
//       for (const heading of headings) {
//         const top = heading.getBoundingClientRect().top;
//         if (top > 60 && top < window.innerHeight / 2) {
//           currentSection = heading.id;
//           break;
//         }
//       }
//       setActiveSection(currentSection);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const TableOfContents = ({ content }) => {
//     const headings = content.match(/^##\s.+$/gm) || [];
//     return (
//       <nav className="toc">
//         <h3 className="text-xl font-bold mb-4 mt-12 text-indigo-300">Table of Contents</h3>
//         <ul className="space-y-2">
//           {headings.map((heading, index) => {
//             const title = heading.replace(/^##\s/, "");
//             const id = title.toLowerCase().replace(/\s/g, "-");
//             return (
//               <li key={index} className={activeSection === id ? "active" : ""}>
//                 <a href={`#${id}`} className="hover:text-indigo-400 transition-colors duration-200">{title}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     );
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-gray-300 font-sans">
//       <div className="max-w-6xl mx-auto px-4 py-8 flex">
//         <div className="w-3/4 pr-8" ref={contentRef}>
//           {topic && (
//             <div className="bg-gray-800 shadow-xl rounded-lg overflow-hidden">
//               <div className="p-8">
//                 <ReactMarkdown
//                   children={topic.content}
//                   remarkPlugins={[remarkGfm, remarkSlug]}
//                   rehypePlugins={[rehypeRaw]}
//                   components={{
//                     code({ node, inline, className, children, ...props }) {
//                       const match = /language-(\w+)/.exec(className || "");
//                       return !inline && match ? (
//                         <SyntaxHighlighter
//                           style={vscDarkPlus}
//                           language={match[1]}
//                           PreTag="div"
//                           className="rounded-md my-4"
//                           {...props}
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       ) : (
//                         <code className="bg-gray-700 px-1 rounded text-indigo-200" {...props}>
//                           {children}
//                         </code>
//                       );
//                     },
//                     h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-6 text-indigo-100 border-b border-indigo-700 pb-2" {...props} />,
//                     h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-10 mb-4 text-indigo-200" {...props} />,
//                     h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-8 mb-3 text-indigo-300" {...props} />,
//                     p: ({ node, ...props }) => <p className="mb-4 text-gray-300 leading-relaxed text-left" {...props} />,
//                     ul: ({ node, ...props }) => <div className="mb-4 text-gray-300 space-y-2" {...props} />,
//                     ol: ({ node, ...props }) => <div className="mb-4 text-gray-300 space-y-2" {...props} />,
//                     li: ({ node, ...props }) => (
//                       <div className="flex items-start">
//                         <span className="mr-2 text-indigo-400">•</span>
//                         <span {...props} />
//                       </div>
//                     ),
//                     a: ({ node, ...props }) => <a className="text-indigo-400 hover:underline" {...props} />,
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="w-1/4">
//           {topic && <TableOfContents content={topic.content} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;

// ----------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronRight, Menu, X, Clock, BookOpen, ExternalLink, Check, AlertCircle, Info } from 'lucide-react';

// const TopicDetail = () => {
//   const [topic, setTopic] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const { topicName } = useParams();
//   const contentRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("");
//   const [readingTime, setReadingTime] = useState(0);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
//           const contentWithoutTOC = decodedContent.replace(/## Table of Contents[\s\S]*?(?=##)/m, '');
//           setTopic({
//             name: res.data.name.replace(".md", ""),
//             content: contentWithoutTOC
//           });

//           // Calculate reading time
//           const wordsPerMinute = 200;
//           const wordCount = contentWithoutTOC.trim().split(/\s+/).length;
//           setReadingTime(Math.ceil(wordCount / wordsPerMinute));
//         }
//       } catch (err) {
//         console.error("Error fetching topic:", err);
//       }
//     };
//     fetchTopic();
//   }, [topicName]);

//   const TableOfContents = ({ content }) => {
//     const headings = content.match(/^##\s.+$/gm) || [];

//     return (
//       <motion.nav
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="toc relative"
//       >
//         <div className="sticky top-8">
//           <div className="flex items-center gap-3 mb-6">
//             <BookOpen className="w-6 h-6 text-cyan-400" />
//             <h3 className="text-xl font-mono font-bold text-cyan-400">
//               Contents
//             </h3>
//           </div>

//           <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
//             <Clock className="w-4 h-4" />
//             <span>{readingTime} min read</span>
//           </div>

//           <ul className="space-y-2">
//             {headings.map((heading, index) => {
//               const title = heading.replace(/^##\s/, "");
//               const id = title.toLowerCase().replace(/\s/g, "-");
//               return (
//                 <motion.li
//                   key={index}
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`
//                     relative pl-4 border-l-2 transition-all duration-300
//                     ${activeSection === id 
//                       ? 'border-cyan-400 text-cyan-400' 
//                       : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'}
//                   `}
//                 >
//                   <a href={`#${id}`} className="block py-2 text-sm font-mono">
//                     {title}
//                   </a>
//                 </motion.li>
//               );
//             })}
//           </ul>
//         </div>
//       </motion.nav>
//     );
//   };

//   const ContentBlock = ({ type = "info", children }) => {
//     const styles = {
//       info: "bg-blue-950/30 border-blue-500/50 text-blue-200",
//       warning: "bg-yellow-950/30 border-yellow-500/50 text-yellow-200",
//       success: "bg-emerald-950/30 border-emerald-500/50 text-emerald-200",
//     };

//     const icons = {
//       info: <Info className="w-5 h-5" />,
//       warning: <AlertCircle className="w-5 h-5" />,
//       success: <Check className="w-5 h-5" />,
//     };

//     return (
//       <div className={`my-6 rounded-lg border ${styles[type]} p-4`}>
//         <div className="flex items-start gap-3">
//           {icons[type]}
//           <div>{children}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     // <div className="bg-[#0a0a16] min-h-screen text-gray-300 font-mono">
//     <div className="bg-[#0a0a16] min-h-screen text-gray-300 font-mono">
//       {/* Header */}
//       <motion.header 
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="bg-[#0d0d1f]/80 backdrop-blur-lg border-b border-cyan-900/30 sticky top-0 z-50"
//       >
//         <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-cyan-400 text-xl font-bold">{topic?.name || 'Loading...'}</h1>
//           <button 
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden text-cyan-400 hover:text-cyan-300"
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>
//       </motion.header>

//       {/* <div className="max-w-6xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="lg:w-3/4 order-2 lg:order-1"
//             ref={contentRef}
//           >
//             {topic && (
//               <div className="bg-[#0d0d1f] shadow-2xl rounded-lg overflow-hidden border border-cyan-900/30">
//                 <div className="p-8">
//                   <ReactMarkdown
//                     children={topic.content}
//                     remarkPlugins={[remarkGfm, remarkSlug]}
//                     rehypePlugins={[rehypeRaw]}
//                     components={{
//                       code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || "");
//                         return !inline && match ? (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <SyntaxHighlighter
//                               style={synthwave84}
//                               language={match[1]}
//                               PreTag="div"
//                               className="rounded-md my-4 shadow-lg"
//                               showLineNumbers={true}
//                               {...props}
//                             >
//                               {String(children).replace(/\n$/, "")}
//                             </SyntaxHighlighter>
//                           </motion.div>
//                         ) : (
//                           <code className="bg-cyan-950/30 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-sm" {...props}>
//                             {children}
//                           </code>
//                         );
//                       },
//                       h1: ({ node, ...props }) => (
//                         <motion.h1 
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className="text-4xl font-bold mb-6 text-cyan-300 border-b border-cyan-900/50 pb-4"
//                           {...props}
//                         />
//                       ),
//                       h2: ({ node, ...props }) => (
//                         <motion.h2 
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className="text-3xl font-semibold mt-12 mb-6 text-cyan-400"
//                           {...props}
//                         />
//                       ),
//                       h3: ({ node, ...props }) => (
//                         <h3 className="text-2xl font-semibold mt-8 mb-4 text-cyan-500" {...props} />
//                       ),
//                       p: ({ node, ...props }) => (
//                         <p className="mb-6 text-gray-300 leading-relaxed text-justify tracking-wide" {...props} />
//                       ),
//                       ul: ({ node, ...props }) => (
//                         <div className="mb-6 text-gray-300 space-y-3" {...props} />
//                       ),
//                       ol: ({ node, ...props }) => (
//                         <div className="mb-6 text-gray-300 space-y-3" {...props} />
//                       ),
//                       li: ({ node, ...props }) => (
//                         <div className="flex items-start gap-3 group">
//                           <ChevronRight className="w-4 h-4 mt-1 text-cyan-400 transition-transform group-hover:translate-x-1" />
//                           <span className="flex-1" {...props} />
//                         </div>
//                       ),
//                       a: ({ node, ...props }) => (
//                         <a 
//                           className="text-cyan-400 hover:text-cyan-300 underline decoration-2 underline-offset-4 decoration-cyan-900 hover:decoration-cyan-700 transition-colors" 
//                           {...props}
//                         />
//                       ),
//                     }}
//                   />
//                 </div>
//               </div>
//             )}
//           </motion.div> */}

// <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Content */}
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="lg:w-3/4 order-2 lg:order-1 max-w-[900px]"
//             ref={contentRef}
//           >
//             {topic && (
//               <div className="space-y-6">
//                 {/* Title Section */}
//                 <motion.div 
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="mb-12"
//                 >
//                   <h1 className="text-5xl font-bold mb-6 text-gray-100 font-sans">
//                     {topic.name}
//                   </h1>
//                   <div className="flex items-center gap-4 text-gray-400">
//                     <div className="flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       <span className="text-sm">{readingTime} min read</span>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Main Content */}
//                 <div className="prose prose-lg prose-invert max-w-none">
//                   <ReactMarkdown
//                     children={topic.content}
//                     remarkPlugins={[remarkGfm, remarkSlug]}
//                     rehypePlugins={[rehypeRaw]}
//                     components={{
//                       code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || "");
//                         return !inline && match ? (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <div className="relative group">
//                               <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <button className="px-3 py-1 text-xs bg-cyan-900/50 text-cyan-300 rounded-md hover:bg-cyan-900/70 transition-colors">
//                                   Copy
//                                 </button>
//                               </div>
//                               <SyntaxHighlighter
//                                 style={synthwave84}
//                                 language={match[1]}
//                                 PreTag="div"
//                                 className="rounded-lg my-6 shadow-lg !bg-[#1a1a2e] !p-6 !m-0"
//                                 showLineNumbers={true}
//                                 {...props}
//                               >
//                                 {String(children).replace(/\n$/, "")}
//                               </SyntaxHighlighter>
//                             </div>
//                           </motion.div>
//                         ) : (
//                           <code className="px-1.5 py-0.5 rounded bg-gray-800 text-cyan-300 font-mono text-[0.9em]" {...props}>
//                             {children}
//                           </code>
//                         );
//                       },
//                       h1: ({ node, ...props }) => (
//                         <motion.h1 
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className="text-4xl font-bold mt-16 mb-6 text-gray-100 font-sans tracking-tight"
//                           {...props}
//                         />
//                       ),
//                       h2: ({ node, ...props }) => (
//                         <motion.h2 
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           className="text-3xl font-bold mt-12 mb-6 text-gray-200 font-sans tracking-tight"
//                           {...props}
//                         />
//                       ),
//                       h3: ({ node, ...props }) => (
//                         <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-300 font-sans tracking-tight" {...props} />
//                       ),
//                       p: ({ node, ...props }) => (
//                         <p className="mb-6 leading-7 text-gray-300 text-lg font-sans max-w-[65ch]" {...props} />
//                       ),
//                       ul: ({ node, ...props }) => (
//                         <ul className="mb-6 space-y-3 list-none ml-6" {...props} />
//                       ),
//                       ol: ({ node, ...props }) => (
//                         <ol className="mb-6 space-y-3 list-decimal ml-6 marker:text-cyan-400 marker:font-bold" {...props} />
//                       ),
//                       li: ({ node, ordered, ...props }) => (
//                         <li className="relative">
//                           {!ordered && (
//                             <span className="absolute -left-6 top-[0.6em] w-2 h-2 rounded-full bg-cyan-400" />
//                           )}
//                           <span className="text-lg text-gray-300 font-sans" {...props} />
//                         </li>
//                       ),
//                       a: ({ node, href, ...props }) => (
//                         <a 
//                           href={href}
//                           className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 border-b-2 border-cyan-950 hover:border-cyan-900 transition-colors" 
//                           {...props}
//                         >
//                           {props.children}
//                           {href?.startsWith('http') && (
//                             <ExternalLink className="w-3 h-3" />
//                           )}
//                         </a>
//                       ),
//                       blockquote: ({ node, ...props }) => (
//                         <ContentBlock type="info" {...props} />
//                       ),
//                       img: ({ node, ...props }) => (
//                         <div className="my-8">
//                           <img 
//                             className="rounded-lg shadow-lg border border-gray-800" 
//                             {...props} 
//                           />
//                           {props.alt && (
//                             <p className="mt-2 text-sm text-gray-400 text-center">
//                               {props.alt}
//                             </p>
//                           )}
//                         </div>
//                       ),
//                       table: ({ node, ...props }) => (
//                         <div className="my-8 overflow-x-auto">
//                           <table className="min-w-full border border-gray-800 rounded-lg overflow-hidden" {...props} />
//                         </div>
//                       ),
//                       th: ({ node, ...props }) => (
//                         <th className="bg-gray-800 text-left p-4 font-mono text-cyan-300 border-b border-gray-700" {...props} />
//                       ),
//                       td: ({ node, ...props }) => (
//                         <td className="p-4 border-b border-gray-800" {...props} />
//                       ),
//                     }}
//                   />
//                 </div>

//                 {/* Navigation Footer */}
//                 <div className="mt-16 pt-8 border-t border-gray-800">
//                   <div className="flex justify-between items-center">
//                     <button className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300">
//                       Previous Lesson
//                     </button>
//                     <button className="px-6 py-3 rounded-lg bg-cyan-900 hover:bg-cyan-800 transition-colors text-cyan-100">
//                       Next Lesson
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>

//           {/* Table of Contents Sidebar */}
//           <AnimatePresence>
//             {(isMenuOpen || window.innerWidth >= 1024) && (
//               <motion.div 
//                 initial={{ x: 300, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: 300, opacity: 0 }}
//                 className="lg:w-1/4 order-1 lg:order-2"
//               >
// {topic && <TableOfContents content={topic.content} />}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;

// ----------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Terminal, Code2, ExternalLink, Copy, Check, AlertTriangle, 
//   Info, ChevronRight, Menu, X, Clock, BookOpen, ChevronLeft,
//   FileText, Hash, Coffee
// } from 'lucide-react';

// const TopicDetail = () => {
//   const [topic, setTopic] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [copiedCode, setCopiedCode] = useState(null);
//   const { topicName } = useParams();
//   const contentRef = useRef(null);
//   const [activeSection, setActiveSection] = useState("");
//   const [readingTime, setReadingTime] = useState(0);

//   // Previous fetch and scroll logic remains the same


//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
//           const contentWithoutTOC = decodedContent.replace(/## Table of Contents[\s\S]*?(?=##)/m, '');
//           setTopic({
//             name: res.data.name.replace(".md", ""),
//             content: contentWithoutTOC
//           });

//           // Calculate reading time
//           const wordsPerMinute = 200;
//           const wordCount = contentWithoutTOC.trim().split(/\s+/).length;
//           setReadingTime(Math.ceil(wordCount / wordsPerMinute));
//         }
//       } catch (err) {
//         console.error("Error fetching topic:", err);
//       }
//     };
//     fetchTopic();
//   }, [topicName]);

//   const TableOfContents = ({ content }) => {
//     const headings = content.match(/^##\s.+$/gm) || [];

//     return (
//       <motion.nav
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="toc relative"
//       >
//         <div className="sticky top-8">
//           <div className="flex items-center gap-3 mb-6">
//             <BookOpen className="w-6 h-6 text-cyan-400" />
//             <h3 className="text-xl font-mono font-bold text-cyan-400">
//               Contents
//             </h3>
//           </div>

//           <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
//             <Clock className="w-4 h-4" />
//             <span>{readingTime} min read</span>
//           </div>

//           <ul className="space-y-2">
//             {headings.map((heading, index) => {
//               const title = heading.replace(/^##\s/, "");
//               const id = title.toLowerCase().replace(/\s/g, "-");
//               return (
//                 <motion.li
//                   key={index}
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`
//                     relative pl-4 border-l-2 transition-all duration-300
//                     ${activeSection === id 
//                       ? 'border-cyan-400 text-cyan-400' 
//                       : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'}
//                   `}
//                 >
//                   <a href={`#${id}`} className="block py-2 text-sm font-mono">
//                     {title}
//                   </a>
//                 </motion.li>
//               );
//             })}
//           </ul>
//         </div>
//       </motion.nav>
//     );
//   };

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(null), 2000);
//   };

//   const ContentBlock = ({ type = "info", children }) => {
//     const styles = {
//       info: "bg-[#193549] border-[#64B5F6] text-blue-200",
//       warning: "bg-[#493E1D] border-[#F0B429] text-yellow-200",
//       success: "bg-[#1B4332] border-[#2DD4BF] text-emerald-200",
//     };

//     const icons = {
//       info: <Info className="w-5 h-5" />,
//       warning: <AlertTriangle className="w-5 h-5" />,
//       success: <Check className="w-5 h-5" />,
//     };

//     return (
//       <div className={`my-6 rounded-lg border ${styles[type]} p-4`}>
//         <div className="flex items-start gap-3">
//           {icons[type]}
//           <div className="font-mono text-sm">{children}</div>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200">
//       {/* Top Banner */}
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" />

//       {/* Header */}
//       <motion.header 
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 sticky top-0 z-50"
//       >
//         <div className="max-w-[1400px] mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
//                 <Terminal className="w-5 h-5 text-indigo-400" />
//                 <span className="text-indigo-400 font-semibold">
//                   {topic?.name || 'Loading...'}
//                 </span>
//               </div>
//               <div className="hidden md:flex items-center gap-3 text-slate-400 text-sm">
//                 <Coffee className="w-4 h-4" />
//                 <span>{readingTime} min read</span>
//               </div>
//             </div>
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
//             >
//               {isMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <div className="max-w-[1400px] mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Content Area */}
//           <motion.main 
//             className="flex-1 order-2 lg:order-1"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div className="max-w-[850px]">
//               {topic && (
//                 <div className="space-y-8">
//                   {/* Title Section */}
//                   <div className="border-slate-700/50">
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center gap-3 mb-4 text-slate-400"
//                     >
//                       <FileText className="w-5 h-5" />
//                       <span className="text-sm font-medium">Documentation</span>
//                     </motion.div>
//                     <h1 className="text-4xl font-bold text-white mb-4">
//                       {topic.name}
//                     </h1>
//                   </div>

//                   {/* Main Content */}
//                   <div className="border p-10 border-slate-700/50 rounded-lg prose prose-invert prose-lg max-w-none">
//                     <ReactMarkdown
//                       children={topic.content}
//                       remarkPlugins={[remarkGfm, remarkSlug]}
//                       rehypePlugins={[rehypeRaw]}
//                       components={{
//                         code({ node, inline, className, children, ...props }) {
//                           const match = /language-(\w+)/.exec(className || "");
//                           const code = String(children).replace(/\n$/, "");

//                           return !inline && match ? (
//                             <div className="group relative my-8">
//                               {/* Code Block Header */}
//                               <div className="absolute top-0 left-0 right-0 h-12 bg-slate-800/50 rounded-t-lg border-b border-slate-700/50 flex items-center justify-between px-4">
//                                 <div className="flex items-center gap-3">
//                                   <Code2 className="w-4 h-4 text-slate-400" />
//                                   <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
//                                     {match[1]}
//                                   </span>
//                                 </div>
//                                 <button
//                                   onClick={() => handleCopyCode(code)}
//                                   className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-700/50 text-slate-300 rounded-md hover:bg-slate-600/50 transition-colors"
//                                 >
//                                   {copiedCode === code ? (
//                                     <>
//                                       <Check className="w-3 h-3" />
//                                       <span>Copied!</span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       <Copy className="w-3 h-3" />
//                                       <span>Copy code</span>
//                                     </>
//                                   )}
//                                 </button>
//                               </div>
//                               <div className="relative">
//                                 <SyntaxHighlighter
//                                   style={coldarkDark}
//                                   language={match[1]}
//                                   PreTag="div"
//                                   className="!rounded-lg !mt-0 !bg-slate-800/50 !pt-14 !px-4 !pb-4 border border-slate-700/50"
//                                   showLineNumbers={true}
//                                   wrapLines={true}
//                                   wrapLongLines={true}
//                                   customStyle={{
//                                     margin: 0,
//                                     background: 'transparent',
//                                     fontSize: '0.95rem',
//                                   }}
//                                   {...props}
//                                 >
//                                   {code}
//                                 </SyntaxHighlighter>
//                               </div>
//                             </div>
//                           ) : (
//                             <code className="px-1.5 py-0.5 rounded bg-slate-700/50 text-indigo-300 font-mono text-[0.9em]" {...props}>
//                               {children}
//                             </code>
//                           );
//                         },
//                         h2: ({ node, ...props }) => (
//                           <div className="group relative">
//                             <div className="absolute -left-8 hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity items-center h-full">
//                               <a href={`#${props.id}`} className="p-1 text-slate-500 hover:text-slate-300">
//                                 <Hash className="w-4 h-4" />
//                               </a>
//                             </div>
//                             <h2 
//                               className="scroll-mt-24 text-2xl font-bold text-white mt-12 mb-6" 
//                               {...props} 
//                             />
//                           </div>
//                         ),
//                         h3: ({ node, ...props }) => (
//                           <h3 
//                             className="scroll-mt-24 text-xl font-semibold text-slate-200 mt-8 mb-4" 
//                             {...props} 
//                           />
//                         ),
//                         p: ({ node, ...props }) => (
//                           <p 
//                             className="leading-7 text-slate-300 [&:not(:first-child)]:mt-6" 
//                             {...props} 
//                           />
//                         ),
//                         ul: ({ node, ...props }) => (
//                           <ul 
//                             className="my-6 ml-6 list-none [&>li]:mt-2" 
//                             {...props} 
//                           />
//                         ),
//                         ol: ({ node, ...props }) => (
//                           <ol 
//                             className="my-6 ml-6 list-decimal marker:text-slate-400 [&>li]:mt-2" 
//                             {...props} 
//                           />
//                         ),
//                         li: ({ node, ordered, ...props }) => (
//                           <li className="relative flex gap-x-3">
//                             {!ordered && (
//                               <span className="absolute -left-5 top-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
//                             )}
//                             <span className="text-slate-300" {...props} />
//                           </li>
//                         ),
//                         a: ({ node, href, ...props }) => (
//                           <a 
//                             href={href}
//                             className="font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 border-b border-slate-700 hover:border-indigo-400 transition-colors" 
//                             {...props}
//                           >
//                             {props.children}
//                             {href?.startsWith('http') && (
//                               <ExternalLink className="w-3 h-3" />
//                             )}
//                           </a>
//                         ),
//                         blockquote: ({ node, ...props }) => (
//                           <div className="my-6 border-l-2 border-indigo-500 pl-6 italic text-slate-300">
//                             {props.children}
//                           </div>
//                         ),
//                       }}
//                     />
//                   </div>

//                   {/* Navigation Footer */}
//                   <nav className="mt-16 pt-8 border-slate-700/50">
//                     <div className="flex justify-between items-center gap-4">
//                       <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 transition-colors text-slate-300">
//                         <ChevronLeft className="w-4 h-4" />
//                         <span>Previous</span>
//                       </button>
//                       <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/20 transition-colors text-indigo-400">
//                         <span>Next</span>
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </nav>
//                 </div>
//               )}
//             </div>
//           </motion.main>

//           {/* Table of Contents Sidebar */}
//           <AnimatePresence>
//             {(isMenuOpen || window.innerWidth >= 1024) && (
//               <motion.aside 
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 className="lg:w-64 order-1 lg:order-2"
//               >
//                 <div className="sticky top-24">
//                   <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
//                     <div className="flex items-center gap-3 mb-6">
//                       <BookOpen className="w-5 h-5 text-indigo-400" />
//                       <h3 className="font-semibold text-white">
//                         On this page
//                       </h3>
//                     </div>
//                     {/* Table of Contents items */}
//                                     {topic && <TableOfContents content={topic.content} />}
//                   </div>
//                 </div>
//               </motion.aside>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;

// ----------------------------------------------------------

// import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Terminal, Code2, ExternalLink, Copy, Check, AlertTriangle,
//   Info, ChevronRight, Menu, X, Clock, BookOpen, ChevronLeft,
//   FileText, Hash, Coffee, Search, ArrowUp
// } from 'lucide-react';
// import debounce from 'lodash/debounce';

// const TopicDetail = () => {
//   const [topic, setTopic] = useState(null);
//   const [allTopics, setAllTopics] = useState([]);
//   const [currentTopicIndex, setCurrentTopicIndex] = useState(-1);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [copiedCode, setCopiedCode] = useState(null);
//   const [activeSection, setActiveSection] = useState("");
//   const [readingTime, setReadingTime] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showScrollTop, setShowScrollTop] = useState(false);
//   const { topicName } = useParams();
//   const navigate = useNavigate();
//   const contentRef = useRef(null);
//   const [quiz, setQuiz] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);

//   useEffect(() => {
//     const fetchAllTopics = async () => {
//       try {
//         const res = await axios.get(
//           "https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData"
//         );
//         const topicsList = res.data
//           .filter(item => item.type === "file" && item.name.endsWith(".md"))
//           .map(topic => topic.name.replace(".md", ""));
//         setAllTopics(topicsList);
//       } catch (err) {
//         console.error("Error fetching all topics:", err);
//       }
//     };
//     fetchAllTopics();
//   }, []);

//   useEffect(() => {
//     const index = allTopics.findIndex(topic => topic === topicName);
//     setCurrentTopicIndex(index);
//   }, [allTopics, topicName]);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
//           const contentWithoutTOC = decodedContent.replace(/## Table of Contents[\s\S]*?(?=##)/m, '');
//           setTopic({
//             name: res.data.name.replace(".md", ""),
//             content: contentWithoutTOC
//           });

//           const wordsPerMinute = 200;
//           const wordCount = contentWithoutTOC.trim().split(/\s+/).length;
//           setReadingTime(Math.ceil(wordCount / wordsPerMinute));

//           const quizRes = await axios.get(`/api/quizzes/${topicName}`);
//           setQuiz(quizRes.data);
//         }
//       } catch (err) {
//         console.error("Error fetching topic:", err);
//       }
//     };
//     fetchTopic();
//   }, [topicName]);

//   const handlePreviousTopic = () => {
//     if (currentTopicIndex > 0) {
//       const previousTopic = allTopics[currentTopicIndex - 1];
//       navigate(`/topics/${previousTopic}`);
//     }
//   };

//   const handleNextTopic = () => {
//     if (currentTopicIndex < allTopics.length - 1) {
//       const nextTopic = allTopics[currentTopicIndex + 1];
//       navigate(`/topics/${nextTopic}`);
//     }
//   };

//   const handleAnswerSelect = (questionIndex, answer) => {
//     setUserAnswers({ ...userAnswers, [questionIndex]: answer });
//   };

//   const handleSubmitQuiz = async () => {
//     try {
//       const response = await axios.post('/api/quizzes/submit', {
//         quizId: quiz._id,
//         userAnswers
//       });
//       setScore(response.data.score);
//     } catch (err) {
//       console.error("Error submitting quiz:", err);
//     }
//   };

//   // ... (rest of the component code remains the same)
//   const TableOfContents = ({ content }) => {
//     const headings = content.match(/^##\s.+$/gm) || [];

//     return (
//       <motion.nav
//         initial={{ x: 300, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="toc relative"
//       >
//         <div className="sticky top-8">

//           <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
//             <Clock className="w-4 h-4" />
//             <span>{readingTime} min read</span>
//           </div>

//           <ul className="space-y-2">
//             {headings.map((heading, index) => {
//               const title = heading.replace(/^##\s/, "");
//               const id = title.toLowerCase().replace(/\s/g, "-");
//               return (
//                 <motion.li
//                   key={index}
//                   initial={{ x: 50, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: index * 0.1 }}
//                   className={`
//                     relative pl-4 border-l-2 transition-all duration-300
//                     ${activeSection === id
//                       ? 'border-cyan-400 text-cyan-400'
//                       : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'}
//                   `}
//                 >
//                   <a href={`#${id}`} className="block py-2 text-sm font-mono">
//                     {title}
//                   </a>
//                 </motion.li>
//               );
//             })}
//           </ul>
//         </div>
//       </motion.nav>
//     );
//   };

//   const handleCopyCode = (code) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     setTimeout(() => setCopiedCode(null), 2000);
//   };

//   const ContentBlock = ({ type = "info", children }) => {
//     const styles = {
//       info: "bg-[#193549] border-[#64B5F6] text-blue-200",
//       warning: "bg-[#493E1D] border-[#F0B429] text-yellow-200",
//       success: "bg-[#1B4332] border-[#2DD4BF] text-emerald-200",
//     };

//     const icons = {
//       info: <Info className="w-5 h-5" />,
//       warning: <AlertTriangle className="w-5 h-5" />,
//       success: <Check className="w-5 h-5" />,
//     };

//     return (
//       <div className={`my-6 rounded-lg border ${styles[type]} p-4`}>
//         <div className="flex items-start gap-3">
//           {icons[type]}
//           <div className="font-mono text-sm">{children}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200">
//       {/* ... (existing header and content) */}
//       {/* Top Banner */}
//       <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" />

//       {/* Header */}
//       <motion.header
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         className="backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 sticky top-0 z-50"
//       >
//         <div className="max-w-[1400px] mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
//                 <Terminal className="w-5 h-5 text-indigo-400" />
//                 <span className="text-indigo-400 font-semibold">
//                   {topic?.name || 'Loading...'}
//                 </span>
//               </div>
//               <div className="hidden md:flex items-center gap-3 text-slate-400 text-sm">
//                 <Coffee className="w-4 h-4" />
//                 <span>{readingTime} min read</span>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
//             >
//               {isMenuOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </motion.header>

//       {/* Main Content */}
//       <div className="max-w-[1400px] mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Content Area */}
//           <motion.main
//             className="flex-1 order-2 lg:order-1"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <div className="max-w-[850px]">
//               {topic && (
//                 <div className="space-y-8">
//                   {/* Title Section */}
//                   <div className="border-slate-700/50">
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex items-center gap-3 mb-4 text-slate-400"
//                     >
//                       <FileText className="w-5 h-5" />
//                       <span className="text-sm font-medium">Documentation</span>
//                     </motion.div>
//                     <h1 className="text-4xl font-bold text-white mb-4">
//                       {topic.name}
//                     </h1>
//                   </div>

//                   {/* Main Content */}
//                   <div className="border p-10 border-slate-700/50 rounded-lg prose prose-invert prose-lg max-w-none">
//                     <ReactMarkdown
//                       children={topic.content}
//                       remarkPlugins={[remarkGfm, remarkSlug]}
//                       rehypePlugins={[rehypeRaw]}
//                       components={{
//                         code({ node, inline, className, children, ...props }) {
//                           const match = /language-(\w+)/.exec(className || "");
//                           const code = String(children).replace(/\n$/, "");

//                           return !inline && match ? (
//                             <div className="group relative my-8">
//                               {/* Code Block Header */}
//                               <div className="absolute top-0 left-0 right-0 h-12 bg-slate-800/50 rounded-t-lg border-b border-slate-700/50 flex items-center justify-between px-4">
//                                 <div className="flex items-center gap-3">
//                                   <Code2 className="w-4 h-4 text-slate-400" />
//                                   <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
//                                     {match[1]}
//                                   </span>
//                                 </div>
//                                 <button
//                                   onClick={() => handleCopyCode(code)}
//                                   className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-700/50 text-slate-300 rounded-md hover:bg-slate-600/50 transition-colors"
//                                 >
//                                   {copiedCode === code ? (
//                                     <>
//                                       <Check className="w-3 h-3" />
//                                       <span>Copied!</span>
//                                     </>
//                                   ) : (
//                                     <>
//                                       <Copy className="w-3 h-3" />
//                                       <span>Copy code</span>
//                                     </>
//                                   )}
//                                 </button>
//                               </div>
//                               <div className="relative">
//                                 <SyntaxHighlighter
//                                   style={coldarkDark}
//                                   language={match[1]}
//                                   PreTag="div"
//                                   className="!rounded-lg !mt-0 !bg-slate-800/50 !pt-14 !px-4 !pb-4 border border-slate-700/50"
//                                   showLineNumbers={true}
//                                   wrapLines={true}
//                                   wrapLongLines={true}
//                                   customStyle={{
//                                     margin: 0,
//                                     background: 'transparent',
//                                     fontSize: '0.95rem',
//                                   }}
//                                   {...props}
//                                 >
//                                   {code}
//                                 </SyntaxHighlighter>
//                               </div>
//                             </div>
//                           ) : (
//                             <code className="px-1.5 py-0.5 rounded bg-slate-700/50 text-indigo-300 font-mono text-[0.9em]" {...props}>
//                               {children}
//                             </code>
//                           );
//                         },
//                         h2: ({ node, ...props }) => (
//                           <div className="group relative">
//                             <div className="absolute -left-8 hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity items-center h-full">
//                               <a href={`#${props.id}`} className="p-1 text-slate-500 hover:text-slate-300">
//                                 <Hash className="w-4 h-4" />
//                               </a>
//                             </div>
//                             <h2
//                               className="scroll-mt-24 text-2xl font-bold text-white mt-12 mb-6"
//                               {...props}
//                             />
//                           </div>
//                         ),
//                         h3: ({ node, ...props }) => (
//                           <h3
//                             className="scroll-mt-24 text-xl font-semibold text-slate-200 mt-8 mb-4"
//                             {...props}
//                           />
//                         ),
//                         p: ({ node, ...props }) => (
//                           <p
//                             className="leading-7 text-slate-300 [&:not(:first-child)]:mt-6"
//                             {...props}
//                           />
//                         ),
//                         ul: ({ node, ...props }) => (
//                           <ul
//                             className="my-6 ml-6 list-none [&>li]:mt-2"
//                             {...props}
//                           />
//                         ),
//                         ol: ({ node, ...props }) => (
//                           <ol
//                             className="my-6 ml-6 list-decimal marker:text-slate-400 [&>li]:mt-2"
//                             {...props}
//                           />
//                         ),
//                         li: ({ node, ordered, ...props }) => (
//                           <li className="relative flex gap-x-3">
//                             {!ordered && (
//                               <span className="absolute -left-5 top-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
//                             )}
//                             <span className="text-slate-300" {...props} />
//                           </li>
//                         ),
//                         a: ({ node, href, ...props }) => (
//                           <a
//                             href={href}
//                             className="font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 border-b border-slate-700 hover:border-indigo-400 transition-colors"
//                             {...props}
//                           >
//                             {props.children}
//                             {href?.startsWith('http') && (
//                               <ExternalLink className="w-3 h-3" />
//                             )}
//                           </a>
//                         ),
//                         blockquote: ({ node, ...props }) => (
//                           <div className="my-6 border-l-2 border-indigo-500 pl-6 italic text-slate-300">
//                             {props.children}
//                           </div>
//                         ),
//                       }}
//                     />
//                   </div>

//                   {/* Navigation Footer */}
//                   <nav className="mt-16 pt-8 border-t border-slate-700/50">
//                     <div className="flex justify-between items-center gap-4">
//                       {currentTopicIndex > 0 && (
//                         <button
//                           onClick={handlePreviousTopic}
//                           className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 transition-colors text-slate-300"
//                         >
//                           <ChevronLeft className="w-4 h-4" />
//                           <span>Previous</span>
//                         </button>
//                       )}
//                       {currentTopicIndex < allTopics.length - 1 && (
//                         <button
//                           onClick={handleNextTopic}
//                           className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/20 transition-colors text-indigo-400"
//                         >
//                           <span>Next</span>
//                           <ChevronRight className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </nav>

//                   {/* ... (existing scroll-to-top button) */}

//                 </div>
                
//               )}
//               {quiz && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold mb-4">Quiz</h2>
//           {quiz.questions.map((question, index) => (
//             <div key={index} className="mb-4">
//               <p className="font-semibold">{question.question}</p>
//               {question.options.map((option, optionIndex) => (
//                 <label key={optionIndex} className="block">
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     onChange={() => handleAnswerSelect(index, option)}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           ))}
//           <button
//             onClick={handleSubmitQuiz}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Submit Quiz
//           </button>
//         </div>
//       )}
//       {score !== null && (
//         <div className="mt-4">
//           <p className="font-bold">Your score: {score}%</p>
//         </div>
//       )}
//             </div>
//           </motion.main>

//           {/* Table of Contents Sidebar */}
//           <AnimatePresence>
//             {(isMenuOpen || window.innerWidth >= 1024) && (
//               <motion.aside
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: 20 }}
//                 className="lg:w-64 order-1 lg:order-2"
//               >
//                 <div className="sticky top-24">
//                   <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
//                     <div className="flex items-center gap-3 mb-6">
//                       <BookOpen className="w-5 h-5 text-indigo-400" />
//                       <h3 className="font-semibold text-white">
//                         On this page
//                       </h3>
//                     </div>
//                     {/* Table of Contents items */}
//                     {topic && <TableOfContents content={topic.content} />}
//                   </div>
//                 </div>
//               </motion.aside>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicDetail;

// ----------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Code2, ExternalLink, Copy, Check, AlertTriangle,
  Info, ChevronRight, Menu, X, Clock, BookOpen, ChevronLeft,
  FileText, Hash, Coffee, Search, ArrowUp, Youtube
} from 'lucide-react';

const TopicDetail = () => {
  const [topic, setTopic] = useState(null);
  const [allTopics, setAllTopics] = useState([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const [readingTime, setReadingTime] = useState(0);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const { topicName } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  useEffect(() => {
    const fetchAllTopics = async () => {
      try {
        const res = await axios.get(
          "https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData"
        );
        const topicsList = res.data
          .filter(item => item.type === "file" && item.name.endsWith(".md"))
          .map(topic => topic.name.replace(".md", ""));
        setAllTopics(topicsList);
      } catch (err) {
        console.error("Error fetching all topics:", err);
      }
    };
    fetchAllTopics();
  }, []);

  useEffect(() => {
    const index = allTopics.findIndex(topic => topic === topicName);
    setCurrentTopicIndex(index);
  }, [allTopics, topicName]);

  // useEffect(() => {
  //   const fetchTopic = async () => {
  //     try {
  //       const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
  //       if (res.data && res.data.content) {
  //         const decodedContent = atob(res.data.content);
  //         const contentWithoutTOC = decodedContent.replace(/## Table of Contents[\s\S]*?(?=##)/m, '');
          
  //         // Extract YouTube URL from the content
  //         const youtubeUrlMatch = contentWithoutTOC.match(/\[YouTube Tutorial\]\((https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)\)/);
  //         const extractedYoutubeUrl = youtubeUrlMatch ? youtubeUrlMatch[1] : "";
          
  //         setTopic({
  //           name: res.data.name.replace(".md", ""),
  //           content: contentWithoutTOC
  //         });
  //         setYoutubeUrl(extractedYoutubeUrl);

  //         const wordsPerMinute = 200;
  //         const wordCount = contentWithoutTOC.trim().split(/\s+/).length;
  //         setReadingTime(Math.ceil(wordCount / wordsPerMinute));

  //         const quizRes = await axios.get(`/api/quizzes/${topicName}`);
  //         setQuiz(quizRes.data);
  //       }
  //     } catch (err) {
  //       console.error("Error fetching topic:", err);
  //     }
  //   };
  //   fetchTopic();
  // }, [topicName]);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const res = await axios.get(`https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData/${topicName}.md`);
        if (res.data && res.data.content) {
          // const decodedContent = atob(res.data.content);
          const decodedContent = atob(res.data.content);
          const contentWithoutTOC = decodedContent.replace(/## Table of Contents[\s\S]*?(?=##)/m, '');
          
          // Process content to replace YouTube link with embedded iframe
      //     const processedContent = contentWithoutTOC.replace(
      //       /\[YouTube Tutorial\]\((https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)\)/,
      //       (match, p1) => {
      //         const videoId = p1.split('v=')[1];
      //         // return `<div class="youtube-embed">
      //         //   <iframe
      //         //     width="100%"
      //         //     height="315"
      //         //     src="https://www.youtube.com/embed/${videoId}"
      //             // frameborder="0"
      //             // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //         //     allowfullscreen
      //         //   ></iframe>
      //         // </div>`;
      //         return `<div className="my-8">
      //   <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      //     <Youtube className="w-6 h-6 text-red-500" />
      //     <span>Video Tutorial</span>
      //   </h2>
      //   <div className="aspect-w-16 aspect-h-9">
      //     <iframe
      //       width="100%"
      //       height="315"
      //       src="https://www.youtube.com/embed/${videoId}"
      //       frameBorder="0"
      //       frameborder="0"
      //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //       className="rounded-lg"
      //     ></iframe>
      //   </div>
      // </div>`;
      //       }
      //     );
      const processedContent = contentWithoutTOC.replace(
        /## YouTube Tutorial\s*\[YouTube Tutorial\]\((https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)\)/,
        (match, p1) => {
          const videoId = p1.split('v=')[1];
          return `<div class="youtube-embed" data-video-id="${videoId}"></div>`;
        }
      );

          setTopic({
            name: res.data.name.replace(".md", ""),
            content: processedContent
          });

          const wordsPerMinute = 200;
          const wordCount = processedContent.trim().split(/\s+/).length;
          setReadingTime(Math.ceil(wordCount / wordsPerMinute));
        }
      } catch (err) {
        console.error("Error fetching topic:", err);
      }
    };
    fetchTopic();
  }, [topicName]);

  const handlePreviousTopic = () => {
    if (currentTopicIndex > 0) {
      const previousTopic = allTopics[currentTopicIndex - 1];
      navigate(`/topics/${previousTopic}`);
    }
  };

  const handleNextTopic = () => {
    if (currentTopicIndex < allTopics.length - 1) {
      const nextTopic = allTopics[currentTopicIndex + 1];
      navigate(`/topics/${nextTopic}`);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post('/api/quizzes/submit', {
        quizId: quiz._id,
        userAnswers
      });
      setScore(response.data.score);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const TableOfContents = ({ content }) => {
    const headings = content.match(/^##\s.+$/gm) || [];

    return (
      <motion.nav
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="toc relative"
      >
        <div className="sticky top-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{readingTime} min read</span>
          </div>

          <ul className="space-y-2">
            {headings.map((heading, index) => {
              const title = heading.replace(/^##\s/, "");
              const id = title.toLowerCase().replace(/\s/g, "-");
              return (
                <motion.li
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    relative pl-4 border-l-2 transition-all duration-300
                    ${activeSection === id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'}
                  `}
                >
                  <a href={`#${id}`} className="block py-2 text-sm font-mono">
                    {title}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.nav>
    );
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const ContentBlock = ({ type = "info", children }) => {
    const styles = {
      info: "bg-[#193549] border-[#64B5F6] text-blue-200",
      warning: "bg-[#493E1D] border-[#F0B429] text-yellow-200",
      success: "bg-[#1B4332] border-[#2DD4BF] text-emerald-200",
    };

    const icons = {
      info: <Info className="w-5 h-5" />,
      warning: <AlertTriangle className="w-5 h-5" />,
      success: <Check className="w-5 h-5" />,
    };

    return (
      <div className={`my-6 rounded-lg border ${styles[type]} p-4`}>
        <div className="flex items-start gap-3">
          {icons[type]}
          <div className="font-mono text-sm">{children}</div>
        </div>
      </div>
    );
  };

  const YouTubeTutorial = ({ url }) => {
    if (!url) return null;

    const videoId = url.split('v=')[1];
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          <span>Video Tutorial</span>
        </h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    );
  };

    //                     components={{
  //                       code({ node, inline, className, children, ...props }) {
  
  const Documentation = ({ topic, readingTime }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [copiedCode, setCopiedCode] = useState('');
  
    const handleCopyCode = (code) => {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(''), 3000);
    };
  }

  // return (
  //   <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200">
  //     <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" />

  //     <motion.header
  //       initial={{ y: -100 }}
  //       animate={{ y: 0 }}
  //       className="backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 sticky top-0 z-50"
  //     >
  //       <div className="max-w-[1400px] mx-auto px-4 py-4">
  //         <div className="flex justify-between items-center">
  //           <div className="flex items-center gap-4">
  //             <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
  //               <Terminal className="w-5 h-5 text-indigo-400" />
  //               <span className="text-indigo-400 font-semibold">
  //                 {topic?.name || 'Loading...'}
  //               </span>
  //             </div>
  //             <div className="hidden md:flex items-center gap-3 text-slate-400 text-sm">
  //               <Coffee className="w-4 h-4" />
  //               <span>{readingTime} min read</span>
  //             </div>
  //           </div>
  //           <button
  //             onClick={() => setIsMenuOpen(!isMenuOpen)}
  //             className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
  //           >
  //             {isMenuOpen ? <X /> : <Menu />}
  //           </button>
  //         </div>
  //       </div>
  //     </motion.header>

  //     <div className="max-w-[1400px] mx-auto px-4 py-8">
  //       <div className="flex flex-col lg:flex-row gap-8">
  //         <motion.main
  //           className="flex-1 order-2 lg:order-1"
  //           initial={{ opacity: 0 }}
  //           animate={{ opacity: 1 }}
  //         >
  //           <div className="max-w-[850px]">
  //             {topic && (
  //               <div className="space-y-8">
  //                 <div className="border-slate-700/50">
  //                   <motion.div
  //                     initial={{ opacity: 0, y: 20 }}
  //                     animate={{ opacity: 1, y: 0 }}
  //                     className="flex items-center gap-3 mb-4 text-slate-400"
  //                   >
  //                     <FileText className="w-5 h-5" />
  //                     <span className="text-sm font-medium">Documentation</span>
  //                   </motion.div>
  //                   <h1 className="text-4xl font-bold text-white mb-4">
  //                     {topic.name}
  //                   </h1>
  //                 </div>

  //                 <div className="border p-10 border-slate-700/50 rounded-lg prose prose-invert prose-lg max-w-none">
  //                   <ReactMarkdown
  //                     children={topic.content}
  //                     remarkPlugins={[remarkGfm, remarkSlug]}
  //                     rehypePlugins={[rehypeRaw]}
  return (
      <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-slate-200">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-1" />
  
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="backdrop-blur-xl bg-slate-900/80 border-b border-slate-700/50 sticky top-0 z-50"
        >
          {/* Header content remains the same */}
        </motion.header>
  
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.main
              className="flex-1 order-2 lg:order-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="max-w-[850px]">
                {topic && (
                  <div className="space-y-8">
                    <div className="border-slate-700/50">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-4 text-slate-400"
                      >
                        <FileText className="w-5 h-5" />
                        <span className="text-sm font-medium">Documentation</span>
                      </motion.div>
                      <h1 className="text-4xl font-bold text-white mb-4 text-left">
                        {topic.name}
                      </h1>
                    </div>
  
                    <div className="border p-10 border-slate-700/50 rounded-lg prose prose-invert prose-lg max-w-none">
                      <ReactMarkdown
                        children={topic.content}
                        remarkPlugins={[remarkGfm, remarkSlug]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          const code = String(children).replace(/\n$/, "");

                          return !inline && match ? (
                            <div className="group relative my-8">
                              <div className="absolute top-0 left-0 right-0 h-12 bg-slate-800/50 rounded-t-lg border-b border-slate-700/50 flex items-center justify-between px-4">
                                <div className="flex items-center gap-3">
                                  <Code2 className="w-4 h-4 text-slate-400" />
                                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                    {match[1]}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleCopyCode(code)}
                                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-slate-700/50 text-slate-300 rounded-md hover:bg-slate-600/50 transition-colors"
                                >
                                  {copiedCode === code ? (
                                    <>
                                      <Check className="w-3 h-3" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy code</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="relative">
                                <SyntaxHighlighter
                                  style={coldarkDark}
                                  language={match[1]}
                                  PreTag="div"
                                  className="!rounded-lg !mt-0 !bg-slate-800/50 !pt-14 !px-4 !pb-4 border border-slate-700/50"
                                  showLineNumbers={true}
                                  wrapLines={true}
                                  wrapLongLines={true}
                                  customStyle={{
                                    margin: 0,
                                    background: 'transparent',
                                    fontSize: '0.95rem',
                                  }}
                                  {...props}
                                >
                                  {code}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                          ) : (
                            <code className="px-1.5 py-0.5 rounded bg-slate-700/50 text-indigo-300 font-mono text-[0.9em]" {...props}>
                              {children}
                            </code>
                          );
                        },
                        // h2: ({ node, ...props }) => (
                        //   <div className="group relative">
                        //     <div className="absolute -left-8 hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity items-center h-full">
                        //       <a href={`#${props.id}`} className="p-1 text-slate-500 hover:text-slate-300">
                        //         <Hash className="w-4 h-4" />
                        //       </a>
                        //     </div>
                        //     <h2
                        //       className="scroll-mt-24 text-2xl font-bold text-white mt-12 mb-6"
                        //       {...props}
                        //     />
                        //   </div>
                        // ),
                        // h3: ({ node, ...props }) => (
                        //   <h3
                        //     className="scroll-mt-24 text-xl font-semibold text-slate-200 mt-8 mb-4"
                        //     {...props}
                        //   />
                        // ),
                        // p: ({ node, ...props }) => (
                        //   <p
                        //     className="leading-7 text-slate-300 [&:not(:first-child)]:mt-6"
                        //     {...props}
                        //   />
                        // ),
                        // ul: ({ node, ...props }) => (
                        //   <ul
                        //     className="my-6 ml-6 list-none [&>li]:mt-2"
                        //     {...props}
                        //   />
                        // ),
                        // ol: ({ node, ...props }) => (
                        //   <ol
                        //     className="my-6 ml-6 list-decimal marker:text-slate-400 [&>li]:mt-2"
                        //     {...props}
                        //   />
                        // ),
                        // li: ({ node, ordered, ...props }) => (
                        //   <li className="relative flex gap-x-3">
                        //     {!ordered && (
                        //       <span className="absolute -left-5 top-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        //     )}
                        //     <span className="text-slate-300" {...props} />
                        //   </li>
                        // ),
                        // a: ({ node, href, ...props }) => (
                        //   <a
                        //     href={href}
                        //     className="font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 border-b border-slate-700 hover:border-indigo-400 transition-colors"
                        //     {...props}
                        //   >
                        //     {props.children}
                        //     {href?.startsWith('http') && (
                        //       <ExternalLink className="w-3 h-3" />
                        //     )}
                        //   </a>
                        // ),
                        // blockquote: ({ node, ...props }) => (
                        //   <div className="my-6 border-l-2 border-indigo-500 pl-6 italic text-slate-300">
                        //     {props.children}
                        //   </div>
                        // ),
                        // // div: ({ node, className, ...props }) => {
                        // //   if (className === 'youtube-embed') {
                        // //     return (
                        // //       <div className="my-8 aspect-w-16 aspect-h-9">
                        // //         <div {...props} />
                        // //       </div>
                        // //     );
                        // //   }
                        // //   return <div {...props} />;
                        // // },
                        // div: ({ node, className, ...props }) => {
                        //   if (className === 'youtube-embed') {
                        //     const videoId = props['data-video-id'];
                        //     return (
                        //       <div className="my-8 max-w-full">
                        //         <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        //           <Youtube className="w-6 h-6 text-red-500" />
                        //           <span>Video Tutorial</span>
                        //         </h2>
                        //         <div className="aspect-w-16 aspect-h-9 relative">
                        //           <iframe
                        //             src={`https://www.youtube.com/embed/${videoId}`}
                        //             frameBorder="0"
                        //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        //             allowFullScreen
                        //             className="absolute top-0 left-0 w-full h-full rounded-lg"
                        //           ></iframe>
                        //         </div>
                        //       </div>
                        //     );
                        //   }
                        //   return <div {...props} />;
                        // },
                        h2: ({ node, ...props }) => (
                          <div className="group relative">
                            <div className="absolute -left-8 hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity items-center h-full">
                              <a href={`#${props.id}`} className="p-1 text-slate-500 hover:text-slate-300">
                                <Hash className="w-4 h-4" />
                              </a>
                            </div>
                            <h2
                              className="scroll-mt-24 text-2xl font-bold text-white mt-12 mb-6 text-left"
                              {...props}
                            />
                          </div>
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="scroll-mt-24 text-xl font-semibold text-slate-200 mt-8 mb-4 text-left"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            className="leading-7 text-slate-300 [&:not(:first-child)]:mt-6 text-justify"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="my-6 ml-6 list-none [&>li]:mt-2 text-left"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="my-6 ml-6 list-decimal marker:text-slate-400 [&>li]:mt-2 text-left"
                            {...props}
                          />
                        ),
                        li: ({ node, ordered, ...props }) => (
                          <li className="relative flex gap-x-3 text-left">
                            {!ordered && (
                              <span className="absolute -left-5 top-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                            )}
                            <span className="text-slate-300" {...props} />
                          </li>
                        ),
                        a: ({ node, href, ...props }) => (
                          <a
                            href={href}
                            className="font-medium text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 border-b border-slate-700 hover:border-indigo-400 transition-colors"
                            {...props}
                          >
                            {props.children}
                            {href?.startsWith('http') && (
                              <ExternalLink className="w-3 h-3" />
                            )}
                          </a>
                        ),
                        blockquote: ({ node, ...props }) => (
                          <div className="my-6 border-l-2 border-indigo-500 pl-6 italic text-slate-300 text-left">
                            {props.children}
                          </div>
                        ),
                        div: ({ node, className, ...props }) => {
                          if (className === 'youtube-embed') {
                            const videoId = props['data-video-id'];
                            return (
                              <div className="my-8 max-w-full">
                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-left">
                                  <Youtube className="w-6 h-6 text-red-500" />
                                  <span>Video Tutorial</span>
                                </h2>
                                <div className="aspect-w-16 aspect-h-9 relative">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                  ></iframe>
                                </div>
                              </div>
                            );
                          }
                          return <div {...props} />;
                        },
                      }}
                    />
                  </div>

                  <nav className="mt-16 pt-8 border-t border-slate-700/50">
                    <div className="flex justify-between items-center gap-4">
                      {currentTopicIndex > 0 && (
                        <button
                          onClick={handlePreviousTopic}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-700/50 transition-colors text-slate-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Previous</span>
                        </button>
                      )}
                      {currentTopicIndex < allTopics.length - 1 && (
                        <button
                          onClick={handleNextTopic}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-lg border border-indigo-500/20 transition-colors text-indigo-400"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </nav>
                </div>
              )}
              {quiz && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Quiz</h2>
                  {quiz.questions.map((question, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold">{question.question}</p>
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="block">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            onChange={() => handleAnswerSelect(index, option)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  ))}
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit Quiz
                  </button>
                </div>
              )}
              {score !== null && (
                <div className="mt-4">
                  <p className="font-bold">Your score: {score}%</p>
                </div>
              )}
            </div>
          </motion.main>

          <AnimatePresence>
            {(isMenuOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:w-64 order-1 lg:order-2"
              >
                <div className="sticky top-24">
                  <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-6">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                      <h3 className="font-semibold text-white">
                        On this page
                      </h3>
                    </div>
                    {topic && <TableOfContents content={topic.content} />}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;