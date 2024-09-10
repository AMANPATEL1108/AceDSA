import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await axios.get('/api/topics');
      setTopics(res.data);
    };
    fetchTopics();
  }, []);

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic._id}>
            <h3>{topic.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: topic.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Topics;
