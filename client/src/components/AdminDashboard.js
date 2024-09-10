import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newProblem, setNewProblem] = useState({ title: '', difficulty: '', leetcode_link: '', description: '', topic: '' });
  const [newTopic, setNewTopic] = useState({ name: '', content: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleProblemSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/problems', newProblem);
      setNewProblem({ title: '', difficulty: '', leetcode_link: '', description: '', topic: '' });
      // Update problems list or show success message
    } catch (err) {
      console.error('Error adding problem:', err);
    }
  };

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/topics', newTopic);
      setNewTopic({ name: '', content: '' });
      // Update topics list or show success message
    } catch (err) {
      console.error('Error adding topic:', err);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username} - {user.email}</li>
        ))}
      </ul>
      <h3>Add New Problem</h3>
      <form onSubmit={handleProblemSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newProblem.title}
          onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Difficulty"
          value={newProblem.difficulty}
          onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="LeetCode Link"
          value={newProblem.leetcode_link}
          onChange={(e) => setNewProblem({ ...newProblem, leetcode_link: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newProblem.description}
          onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Topic"
          value={newProblem.topic}
          onChange={(e) => setNewProblem({ ...newProblem, topic: e.target.value })}
          required
        />
        <button type="submit">Add Problem</button>
      </form>
      <h3>Add New Topic</h3>
      <form onSubmit={handleTopicSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newTopic.name}
          onChange={(e) => setNewTopic({ ...newTopic, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newTopic.content}
          onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
          required
        />
        <button type="submit">Add Topic</button>
      </form>
    </div>
  );
}

export default AdminDashboard;
