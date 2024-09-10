import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      const res = await axios.get('/api/problems');
      setProblems(res.data);
    };
    fetchProblems();
  }, []);

  return (
    <div>
      <h2>Problems</h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>
            <a href={problem.leetcode_link} target="_blank" rel="noopener noreferrer">
              {problem.title} - {problem.difficulty}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Problems;
