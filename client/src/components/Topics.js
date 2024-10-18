// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";

// const Topics = () => {
//   const [topics, setTopics] = useState([]);
//   const [expandedTopic, setExpandedTopic] = useState(null);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const res = await axios.get("/api/topics");
//         setTopics(res.data);
//       } catch (err) {
//         console.error("Error fetching topics:", err);
//       }
//     };
//     fetchTopics();
//   }, []);

//   const toggleTopic = (topicId) => {
//     setExpandedTopic(expandedTopic === topicId ? null : topicId);
//   };

//   return (
//     <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold mb-8 text-green-400">Topics</h2>
//         <ul className="space-y-4">
//           {topics.map((topic) => (
//             <li
//               key={topic._id}
//               className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
//             >
//               <div
//                 className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700 transition duration-300"
//                 onClick={() => toggleTopic(topic._id)}
//               >
//                 <h3 className="text-xl font-semibold text-green-400">
//                   {topic.name}
//                 </h3>
//                 {expandedTopic === topic._id ? (
//                   <FaChevronUp className="text-green-400" />
//                 ) : (
//                   <FaChevronDown className="text-green-400" />
//                 )}
//               </div>
//               {expandedTopic === topic._id && (
//                 <div
//                   className="p-4 bg-gray-700"
//                   dangerouslySetInnerHTML={{ __html: topic.content }}
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Topics;


// // --------------------------------------------

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

// const Topics = () => {
//   const [topics, setTopics] = useState([]);
//   const [expandedTopic, setExpandedTopic] = useState(null);

//   useEffect(() => {
//     // const fetchTopics = async () => {
//     //   try {
//     //     // const res = await axios.get("https://api.github.com/repos/bradtraversy/50projects50days/contents/README.md");
//     //     const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/arrays");
//     //     if (Array.isArray(res.data)) {
//     //       const topicsData = await Promise.all(
//     //         res.data.map(async (file) => {
//     //           const content = await axios.get(file.download_url);
//     //           return {
//     //             name: file.name.replace(".md", ""),
//     //             content: content.data,
//     //           };
//     //         })
//     //       );
//     //       setTopics(topicsData);
//     //     } else {
//     //       console.error("Unexpected response format:", res.data);
//     //     }
//     //   } catch (err) {
//     //     console.error("Error fetching topics:", err);
//     //   }
//     // };

//     const fetchTopics = async () => {
//       try {
//         const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/arrays");
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
//           setTopics([{
//             name: res.data.name.replace(".md", ""),
//             content: decodedContent
//           }]);
//         } else {
//           console.error("Unexpected response format:", res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching topics:", err);
//       }
//     };


//     fetchTopics();
//   }, []);

//   const toggleTopic = (topicName) => {
//     setExpandedTopic(expandedTopic === topicName ? null : topicName);
//   };

//   return (
//     <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <h2 className="text-3xl font-bold mb-8 text-green-400">Topics</h2>
//         <ul className="space-y-4">
//           {topics.map((topic) => (
//             <li
//               key={topic.name}
//               className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
//             >
//               <div
//                 className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700 transition duration-300"
//                 onClick={() => toggleTopic(topic.name)}
//               >
//                 <h3 className="text-xl font-semibold text-green-400">
//                   {topic.name}
//                 </h3>
//                 {expandedTopic === topic.name ? (
//                   <FaChevronUp className="text-green-400" />
//                 ) : (
//                   <FaChevronDown className="text-green-400" />
//                 )}
//               </div>
//               {expandedTopic === topic.name && (
//                 <div className="p-4 bg-gray-700">
//                   <ReactMarkdown
//                     components={{
//                       code({ node, inline, className, children, ...props }) {
//                         const match = /language-(\w+)/.exec(className || "");
//                         return !inline && match ? (
//                           <SyntaxHighlighter
//                             style={dracula}
//                             language={match[1]}
//                             PreTag="div"
//                             {...props}
//                           >
//                             {String(children).replace(/\n$/, "")}
//                           </SyntaxHighlighter>
//                         ) : (
//                           <code className={className} {...props}>
//                             {children}
//                           </code>
//                         );
//                       },
//                     }}
//                   >
//                     {topic.content}
//                   </ReactMarkdown>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Topics;

// ------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";

// const Topics = () => {
//   const [topic, setTopic] = useState(null);
//   const [activeSection, setActiveSection] = useState("");
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/arrays");
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
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const headings = contentRef.current.querySelectorAll("h2, h3");
//       let currentSection = "";
//       for (const heading of headings) {
//         const top = heading.getBoundingClientRect().top;
//         if (top > 0 && top < window.innerHeight / 2) {
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
//         <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
//         <ul>
//           {headings.map((heading, index) => {
//             const title = heading.replace(/^##\s/, "");
//             const id = title.toLowerCase().replace(/\s/g, "-");
//             return (
//               <li key={index} className={activeSection === id ? "active" : ""}>
//                 <a href={`#${id}`}>{title}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     );
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto px-4 py-8 flex">
//         <div className="w-3/4 pr-8" ref={contentRef}>
//           {topic && (
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//               <div className="p-6">
//                 <ReactMarkdown
//                   children={topic.content}
//                   remarkPlugins={[remarkGfm]}
//                   rehypePlugins={[rehypeRaw]}
//                   components={{
//                     code({ node, inline, className, children, ...props }) {
//                       const match = /language-(\w+)/.exec(className || "");
//                       return !inline && match ? (
//                         <SyntaxHighlighter
//                           style={dracula}
//                           language={match[1]}
//                           PreTag="div"
//                           {...props}
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       ) : (
//                         <code className={className} {...props}>
//                           {children}
//                         </code>
//                       );
//                     },
//                     h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 text-gray-800" {...props} />,
//                     h2: ({ node, ...props }) => <h2 id={props.children[0].toLowerCase().replace(/\s/g, "-")} className="text-3xl font-semibold mt-8 mb-4 text-gray-800" {...props} />,
//                     h3: ({ node, ...props }) => {
//                       const id = props.children && props.children[0] && typeof props.children[0] === 'string'
//                         ? props.children[0].toLowerCase().replace(/\s/g, "-")
//                         : ''
//                       return <h3 id={id} className="text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />
//                     }, p: ({ node, ...props }) => <p className="mb-4 text-gray-700" {...props} />,
//                     ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
//                     ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
//                     li: ({ node, ...props }) => <li className="mb-2" {...props} />,
//                     a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
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

// export default Topics;

// --------------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";

// const Topics = () => {
//   const [topic, setTopic] = useState(null);
//   const [activeSection, setActiveSection] = useState("");
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/arrays");
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
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
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       const headings = contentRef.current.querySelectorAll("h2, h3");
//       let currentSection = "";
//       for (const heading of headings) {
//         const top = heading.getBoundingClientRect().top;
//         if (top > 0 && top < window.innerHeight / 2) {
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
//         <h3 className="text-xl font-semibold mb-4 text-gray-300">Table of Contents</h3>
//         <ul>
//           {headings.map((heading, index) => {
//             const title = heading.replace(/^##\s/, "");
//             const id = title.toLowerCase().replace(/\s/g, "-");
//             return (
//               <li key={index} className={activeSection === id ? "active" : ""}>
//                 <a href={`#${id}`}>{title}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     );
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-gray-300">
//       <div className="max-w-6xl mx-auto px-4 py-8 flex">
//         <div className="w-3/4 pr-8" ref={contentRef}>
//           {topic && (
//             <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
//               <div className="p-6">
//                 <ReactMarkdown
//                   children={topic.content}
//                   remarkPlugins={[remarkGfm, remarkSlug]}
//                   rehypePlugins={[rehypeRaw]}
//                   components={{
//                     code({ node, inline, className, children, ...props }) {
//                       const match = /language-(\w+)/.exec(className || "");
//                       return !inline && match ? (
//                         <SyntaxHighlighter
//                           style={dracula}
//                           language={match[1]}
//                           PreTag="div"
//                           {...props}
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       ) : (
//                         <code className="bg-gray-700 px-1 rounded" {...props}>
//                           {children}
//                         </code>
//                       );
//                     },
//                     h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 text-gray-100" {...props} />,
//                     h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-100" {...props} />,
//                     h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-100" {...props} />,
//                     p: ({ node, ...props }) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
//                     ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-300" {...props} />,
//                     ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-gray-300" {...props} />,
//                     li: ({ node, ...props }) => <li className="mb-2" {...props} />,
//                     a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
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

// export default Topics;

// ---------------------------------------------------------------------


// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";

// const Topics = () => {
//   const [topic, setTopic] = useState(null);
//   const [activeSection, setActiveSection] = useState("");
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/arrays");
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
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
//   }, []);

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
//         <h3 className="text-xl font-semibold mb-4 text-gray-300">Table of Contents</h3>
//         <ul className="space-y-2">
//           {headings.map((heading, index) => {
//             const title = heading.replace(/^##\s/, "");
//             const id = title.toLowerCase().replace(/\s/g, "-");
//             return (
//               <li key={index} className={activeSection === id ? "active" : ""}>
//                 <a href={`#${id}`} className="hover:text-blue-400 transition-colors duration-200">{title}</a>
//               </li>
//             );
//           })}
//         </ul>
//       </nav>
//     );
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-gray-300">
//       <header className="bg-gray-800 py-4 sticky top-0 z-10">
//         <div className="max-w-6xl mx-auto px-4">
//           <h1 className="text-2xl font-bold text-gray-100">Arrays</h1>
//         </div>
//       </header>
//       <div className="max-w-6xl mx-auto px-4 py-8 flex">
//         <div className="w-3/4 pr-8" ref={contentRef}>
//           {topic && (
//             <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
//               <div className="p-6">
//                 <ReactMarkdown
//                   children={topic.content}
//                   remarkPlugins={[remarkGfm, remarkSlug]}
//                   rehypePlugins={[rehypeRaw]}
//                   components={{
//                     code({ node, inline, className, children, ...props }) {
//                       const match = /language-(\w+)/.exec(className || "");
//                       return !inline && match ? (
//                         <SyntaxHighlighter
//                           style={dracula}
//                           language={match[1]}
//                           PreTag="div"
//                           {...props}
//                         >
//                           {String(children).replace(/\n$/, "")}
//                         </SyntaxHighlighter>
//                       ) : (
//                         <code className="bg-gray-700 px-1 rounded" {...props}>
//                           {children}
//                         </code>
//                       );
//                     },
//                     h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mb-4 text-gray-100" {...props} />,
//                     h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-100" {...props} />,
//                     h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-100" {...props} />,
//                     p: ({ node, ...props }) => <p className="mb-4 text-gray-300 leading-relaxed text-left" {...props} />,
//                     ul: ({ node, ...props }) => <div className="mb-4 text-gray-300 space-y-2" {...props} />,
//                     ol: ({ node, ...props }) => <div className="mb-4 text-gray-300 space-y-2" {...props} />,
//                     li: ({ node, ...props }) => (
//                       <div className="flex items-start">
//                         <span className="mr-2 text-blue-400">•</span>
//                         <span {...props} />
//                       </div>
//                     ),
//                     a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" {...props} />,
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

// export default Topics;

// ------------------------------------------------------------------------------------------

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
// import remarkSlug from "remark-slug";

// const Topics = () => {
//   const [topic, setTopic] = useState(null);
//   const [activeSection, setActiveSection] = useState("");
//   const contentRef = useRef(null);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7/arrays");
//         if (res.data && res.data.content) {
//           const decodedContent = atob(res.data.content);
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
//   }, []);

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

// export default Topics;

// ---------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const Topics = () => {
//   const [topics, setTopics] = useState([]);

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         // const res = await axios.get("https://api.github.com/repos/Gurupatel007/Materials/contents/SEM-7");
//         const res = await axios.get("https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData");
//         const topicsList = res.data.filter(item => item.type === "file" && item.name.endsWith(".md"));
//         setTopics(topicsList);z
//       } catch (err) {
//         console.error("Error fetching topics:", err);
//       }
//     };
//     fetchTopics();
//   }, []);

//   return (
//     <div className="bg-gray-900 min-h-screen text-gray-300 font-sans">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <ul className="space-y-4">
//           {topics.map((topic) => (
//             <li key={topic.name} className="bg-gray-800 rounded-lg shadow-md">
//               <Link to={`/topics/${topic.name.replace(".md", "")}`} className="block p-4 hover:bg-gray-700 transition duration-300">
//                 <h2 className="text-xl font-semibold text-indigo-300">{topic.name.replace(".md", "")}</h2>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Topics;

// ---------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, Search, Clock, Terminal, ChevronRight, 
  Layout, Loader2, AlertCircle, BookOpen
} from "lucide-react";
import axios from "axios";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock categories - replace with actual categories from your data
  const categories = [
    { id: "all", name: "All Topics", icon: Layout },
    { id: "algorithms", name: "Algorithms", icon: Terminal },
    { id: "datastructures", name: "Data Structures", icon: BookOpen },
  ];

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api.github.com/repos/Gurupatel007/AceDSA/contents/client/src/topicsData"
        );
        const topicsList = res.data
          .filter(item => item.type === "file" && item.name.endsWith(".md"))
          .map(topic => ({
            ...topic,
            category: topic.name.toLowerCase().includes("algorithm") ? "algorithms" : "datastructures",
            estimatedReadTime: Math.floor(Math.random() * 20) + 5 // Mock reading time - replace with actual calculation
          }));
        setTopics(topicsList);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching topics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const TopicCard = ({ topic }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative"
    >
      <Link 
        to={`/topics/${topic.name.replace(".md", "")}`}
        className="block"
      >
        <div className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-500/10 p-2">
                  <Book className="h-5 w-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-slate-200">
                  {topic.name.replace(".md", "").replace(/-/g, " ")}
                </h3>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{topic.estimatedReadTime} min read</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="h-4 w-4" />
                <span className="capitalize">{topic.category}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      {/* Top Banner */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold text-white"
          >
            Learning Resources
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            Explore our comprehensive collection of tutorials and guides
          </motion.p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-700/50 bg-slate-800/50 py-3 pl-12 pr-4 text-slate-200 placeholder-slate-400 transition-colors duration-300 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </motion.div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-400"
                      : "border-slate-700/50 bg-slate-800/50 text-slate-400 hover:border-slate-600/50 hover:bg-slate-700/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Topics Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>Error loading topics: {error}</p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.name} topic={topic} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!loading && !error && filteredTopics.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <Search className="mb-4 h-12 w-12 text-slate-400" />
            <h3 className="mb-2 text-lg font-semibold text-slate-200">No topics found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Topics;