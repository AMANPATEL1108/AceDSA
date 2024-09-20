import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [expandedTopic, setExpandedTopic] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axios.get("/api/topics");
        setTopics(res.data);
      } catch (err) {
        console.error("Error fetching topics:", err);
      }
    };
    fetchTopics();
  }, []);

  const toggleTopic = (topicId) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  return (
    <div className="bg-gray-900 text-gray-100 font-mono min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-green-400">Topics</h2>
        <ul className="space-y-4">
          {topics.map((topic) => (
            <li
              key={topic._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-700 transition duration-300"
                onClick={() => toggleTopic(topic._id)}
              >
                <h3 className="text-xl font-semibold text-green-400">
                  {topic.name}
                </h3>
                {expandedTopic === topic._id ? (
                  <FaChevronUp className="text-green-400" />
                ) : (
                  <FaChevronDown className="text-green-400" />
                )}
              </div>
              {expandedTopic === topic._id && (
                <div
                  className="p-4 bg-gray-700"
                  dangerouslySetInnerHTML={{ __html: topic.content }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Topics;
