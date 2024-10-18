// import React, { useRef, useState, useEffect } from 'react';
// import { FaMusic, FaPlay, FaPause } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const MusicPlayer = ({ theme }) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const iframeRef = useRef(null);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       iframe.style.display = 'none';
//     }
//   }, []);

//   const toggleMusic = () => {
//     const iframe = iframeRef.current;
//     if (iframe) {
//       if (isPlaying) {
//         iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
//       } else {
//         iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 1 }}
//       className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
//     >
//       <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
//         <FaMusic className="mr-2" /> Focus Music
//       </h2>
//       <div className="flex items-center justify-evenly">
//         <button
//           onClick={toggleMusic}
//           className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center`}
//         >
//           {isPlaying ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
//           {isPlaying ? 'Pause' : 'Play'} Lofi Radio
//         </button>
//         {isPlaying && <MusicAnimation />}
//       </div>
//       <iframe
//         ref={iframeRef}
//         width="1"
//         height="1"
//         src="https://www.youtube.com/embed/jfKfPfyJRdk?enablejsapi=1"
//         title="lofi hip hop radio"
//         frameBorder="0"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//         allowFullScreen
//       ></iframe>
//     </motion.div>
//   );
// };

// const MusicAnimation = () => {
//   return (
//     <div className="flex items-center space-x-2">
//       {[1, 2, 3].map((bar) => (
//         <motion.div
//           key={bar}
//           className="w-2 bg-green-500 rounded-full"
//           animate={{
//             height: ["20px", "40px", "20px"],
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             repeatType: "reverse",
//             delay: bar * 0.2,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default MusicPlayer;

// -------------------------------------------------------

import React, { useRef, useState, useEffect } from 'react';
import { FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MusicPlayer = ({ theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.style.display = 'none';
    }
  }, []);

  const toggleMusic = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (isPlaying) {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className={`${theme.cardBg} ${theme.border} border rounded-lg p-6`}
    >
      <h2 className={`text-xl font-semibold mb-4 flex items-center ${theme.text}`}>
        <FaMusic className="mr-2" /> Focus Music
      </h2>
      <div className="flex items-center justify-between">
        <button
          onClick={toggleMusic}
          className={`${theme.buttonBg} ${theme.buttonHover} text-white font-bold py-2 px-2 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center`}
        >
          {isPlaying ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
          {isPlaying ? 'Pause' : 'Play'} Lofi Radio
        </button>
        {isPlaying && <MusicAnimation />}
      </div>
      <iframe
        ref={iframeRef}
        width="1"
        height="1"
        src="https://www.youtube.com/embed/jfKfPfyJRdk?enablejsapi=1"
        title="lofi hip hop radio"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </motion.div>
  );
};

// const MusicAnimation = () => {
//   return (
//     <div className="flex items-center space-x-2">
//       {[1, 2, 3].map((bar) => (
//         <motion.div
//           key={bar}
//           className="w-2 bg-green-500 rounded-full"
//           animate={{
//             height: ["20px", "40px", "20px"],
//           }}
//           transition={{
//             duration: 1,
//             repeat: Infinity,
//             repeatType: "reverse",
//             delay: bar * 0.2,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

const MusicAnimation = () => {
  return (
    <div className="flex items-center space-x-2 h-10">
      {[1, 2, 3].map((bar) => (
        <motion.div
          key={bar}
          className="w-2 bg-green-500 rounded-full"
          initial={{ height: "20px" }}
          animate={{
            height: ["20px", "40px", "20px"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: bar * 0.2,
          }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
};

export default MusicPlayer;