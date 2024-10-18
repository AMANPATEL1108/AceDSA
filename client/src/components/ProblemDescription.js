// import React from 'react';

// const ProblemDescription = ({ problem }) => {
//   const formatDescription = (description) => {
//     // Split the description into paragraphs
//     const paragraphs = description.split('\n\n');
    
//     return paragraphs.map((paragraph, index) => {
//       // Check if the paragraph is a code block
//       if (paragraph.trim().startsWith('```')) {
//         const [, language, ...codeLines] = paragraph.split('\n');
//         const code = codeLines.slice(0, -1).join('\n');
//         return (
//           <pre key={index} className="bg-gray-800 p-4 rounded-md overflow-x-auto my-4">
//             <code className={`language-${language.trim()}`}>
//               {code}
//             </code>
//           </pre>
//         );
//       }
      
//       // Check if the paragraph is a list
//       if (paragraph.trim().startsWith('*')) {
//         const listItems = paragraph.split('\n');
//         return (
//           <ul key={index} className="list-disc list-inside my-4 space-y-2">
//             {listItems.map((item, itemIndex) => (
//               <li key={itemIndex}>{item.replace('*', '').trim()}</li>
//             ))}
//           </ul>
//         );
//       }
      
//       // Regular paragraph
//       return (
//         <p key={index} className="mb-4">
//           {paragraph}
//         </p>
//       );
//     });
//   };

//   return (
//     <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
//       <div className="text-gray-300 leading-relaxed">
//         {formatDescription(problem.description)}
//       </div>
//     </div>
//   );
// };

// export default ProblemDescription;

// ----------------------------------------------------------

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Book, Code, List } from 'lucide-react';

// const ProblemDescription = ({ problem }) => {
//   const formatDescription = (description) => {
//     const paragraphs = description.split('\n\n');
    
//     return paragraphs.map((paragraph, index) => {
//       // Code block handling
//       if (paragraph.trim().startsWith('```')) {
//         const [, language, ...codeLines] = paragraph.split('\n');
//         const code = codeLines.slice(0, -1).join('\n');
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             key={index}
//             className="relative my-6"
//           >
//             <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/50 to-purple-500/50 opacity-20" />
//             <div className="relative overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm">
//               <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-2">
//                 <Code className="h-4 w-4 text-indigo-400" />
//                 <span className="text-sm text-slate-400">{language.trim()}</span>
//               </div>
//               <pre className="overflow-x-auto p-4">
//                 <code className={`language-${language.trim()} text-slate-200`}>
//                   {code}
//                 </code>
//               </pre>
//             </div>
//           </motion.div>
//         );
//       }
      
//       // List handling
//       if (paragraph.trim().startsWith('*')) {
//         const listItems = paragraph.split('\n');
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             key={index}
//             className="my-4"
//           >
//             <div className="flex items-center gap-2 mb-2">
//               <List className="h-4 w-4 text-indigo-400" />
//               <span className="text-sm font-medium text-slate-300">List Items</span>
//             </div>
//             <ul className="space-y-2">
//               {listItems.map((item, itemIndex) => (
//                 <li 
//                   key={itemIndex}
//                   className="flex items-start gap-2 text-slate-300"
//                 >
//                   <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500/50" />
//                   <span>{item.replace('*', '').trim()}</span>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         );
//       }
      
//       // Regular paragraph
//       return (
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: index * 0.1 }}
//           key={index}
//           className="mb-4 text-slate-300 leading-relaxed"
//         >
//           {paragraph}
//         </motion.p>
//       );
//     });
//   };

//   return (
//     <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
//       <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      
//       <div className="mx-auto max-w-4xl px-4 py-8">
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="relative overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm"
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10" />
          
//           <div className="relative">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="rounded-lg bg-indigo-500/10 p-2">
//                 <Book className="h-5 w-5 text-indigo-400" />
//               </div>
//               <h2 className="text-xl font-semibold text-slate-200">
//                 Problem Description
//               </h2>
//             </div>
            
//             <div className="prose prose-invert max-w-none">
//               {formatDescription(problem.description)}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProblemDescription;

// -----------------------------------------------------------------

import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, List, FileText, Shield } from 'lucide-react';

const ProblemDescription = ({ problem }) => {

  const parseInputString = (inputStr) => {
    try {
      // If input is already an array, return it
      if (Array.isArray(inputStr)) {
        return inputStr;
      }

      // Remove any extra quotes around the entire string
      let cleanStr = inputStr.trim();
      if (cleanStr.startsWith('"') && cleanStr.endsWith('"')) {
        cleanStr = cleanStr.slice(1, -1);
      }

      // Parse the string as JSON if it's a valid JSON format
      if (cleanStr.startsWith('[') && cleanStr.endsWith(']')) {
        try {
          return JSON.parse(cleanStr);
        } catch (e) {
          // If JSON parse fails, try the manual parsing below
        }
      }

      // Split by commas, but not within arrays
      const values = [];
      let currentValue = '';
      let bracketCount = 0;

      for (let i = 0; i < cleanStr.length; i++) {
        const char = cleanStr[i];
        if (char === '[') bracketCount++;
        if (char === ']') bracketCount--;

        if (char === ',' && bracketCount === 0) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());

      // Parse each value
      return values.map(val => {
        try {
          if (val.startsWith('[') && val.endsWith(']')) {
            return JSON.parse(val);
          }
          // Try parsing as number if possible
          const num = Number(val);
          return isNaN(num) ? val : num;
        } catch {
          return val;
        }
      });
    } catch (error) {
      console.error('Error parsing input:', error);
      return [inputStr];
    }
  };

  const formatExampleInput = (input, paramNames = []) => {
    try {
      const parsedValues = parseInputString(input);
      
      // If we have no parameter names, just return the formatted values
      if (!paramNames || paramNames.length === 0) {
        return JSON.stringify(parsedValues);
      }

      // Match each parameter with its value
      return parsedValues
        .map((value, index) => {
          if (index < paramNames.length) {
            return `${paramNames[index]} = ${JSON.stringify(value)}`;
          }
          return null;
        })
        .filter(Boolean) // Remove null values
        .join(', ');
    } catch (error) {
      console.error('Error formatting example input:', error);
      return input;
    }
  };

  const formatExampleOutput = (output) => {
    try {
      // If output is already a string and starts with quotes, remove them
      if (typeof output === 'string') {
        let cleanOutput = output.trim();
        if (cleanOutput.startsWith('"') && cleanOutput.endsWith('"')) {
          cleanOutput = cleanOutput.slice(1, -1);
        }
        // If it's an array string, parse it and re-stringify for consistent formatting
        if (cleanOutput.startsWith('[') && cleanOutput.endsWith(']')) {
          try {
            return JSON.stringify(JSON.parse(cleanOutput));
          } catch {
            return cleanOutput;
          }
        }
        return cleanOutput;
      }
      return JSON.stringify(output);
    } catch (error) {
      console.error('Error formatting example output:', error);
      return output;
    }
  };

  const extractFunctionParams = (template) => {
    try {
      const functionMatch = template.match(/function\s*\((.*?)\)/);
      if (functionMatch && functionMatch[1]) {
        return functionMatch[1].split(',').map(param => param.trim());
      }
      return [];
    } catch (error) {
      console.error('Error extracting function parameters:', error);
      return [];
    }
  };


  const formatDescription = (description) => {
    const paragraphs = description.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Code block handling
      if (paragraph.trim().startsWith('```')) {
        const [, language, ...codeLines] = paragraph.split('\n');
        const code = codeLines.slice(0, -1).join('\n');
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="relative my-6"
          >
            <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500/50 to-purple-500/50 opacity-20" />
            <div className="relative overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/90 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-2">
                <Code className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-slate-400">{language.trim()}</span>
              </div>
              <pre className="overflow-x-auto p-4">
                <code className={`language-${language.trim()} text-slate-200`}>
                  {code}
                </code>
              </pre>
            </div>
          </motion.div>
        );
      }
      
      // List handling
      if (paragraph.trim().startsWith('*')) {
        const listItems = paragraph.split('\n');
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={index}
            className="my-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <List className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-medium text-slate-300">List Items</span>
            </div>
            <ul className="space-y-2">
              {listItems.map((item, itemIndex) => (
                <li 
                  key={itemIndex}
                  className="flex items-start gap-2 text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500/50" />
                  <span>{item.replace('*', '').trim()}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      }

      
      
      // Regular paragraph
      return (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          key={index}
          className="mb-4 text-slate-300 leading-relaxed"
        >
          {paragraph}
        </motion.p>
      );
    });
  };

  return (
    // <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <>
      {/* <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" /> */}
      
      <div className="mx-auto max-w-4xl px-4 py-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden"
        >
          <div className="absolute" />
          
          <div className="relative">
            {/* Problem Description Section */}
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-lg bg-indigo-500/10 p-2">
                <Book className="h-5 w-5 text-indigo-400" />
              </div>
              <h2 className="text-xl font-semibold text-slate-200">
                Problem Description
              </h2>
            </div>
            
            <div className="prose prose-invert max-w-none text-justify mb-8">
              {formatDescription(problem.description)}
            </div>

            {/* Examples Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <FileText className="h-5 w-5 text-emerald-400" />
                </div>
                <h4 className="text-xl font-semibold text-emerald-400">Examples</h4>
              </div>

              {problem.example.map((example, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  key={index}
                  className="relative mb-4"
                >
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-slate-500/50 to-slate-600/50 opacity-20" />
                  <div className="relative overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/90 p-4 backdrop-blur-sm">
                    <pre className="font-mono text-slate-300 overflow-x-auto">
                      <div className="mb-2">
                        <strong className="text-emerald-400">Example {index + 1}:</strong>
                      </div>
                      <div className="mb-2">
                        <strong className="text-indigo-400">Input: </strong>
                        {formatExampleInput(example.input, problem.paramNames)}
                      </div>
                      <div className="mb-2">
                        <strong className="text-indigo-400">Output: </strong>
                        {formatExampleOutput(example.output)}
                      </div>
                      {example.explanation && (
                        <div className="mt-2 text-slate-300">
                          <strong className="text-indigo-400">Explanation: </strong>
                          {example.explanation}
                        </div>
                      )}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Constraints Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="rounded-lg bg-emerald-500/10 p-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                </div>
                <h4 className="text-xl font-semibold text-emerald-400">Constraints</h4>
              </div>

              <motion.ul 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                {problem.constraints.map((constraint, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-2 text-slate-300"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
                    <span>{constraint}</span>
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.div>
      </div>
    {/* </div> */}
    </>
  );
};

export default ProblemDescription;