import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/auth/user', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setUser(res.data);
        setSolvedProblems(res.data.solvedProblems);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>User Dashboard</h2>
      {user && (
        <div>
          <h3>Welcome, {user.username}!</h3>
          <p>Email: {user.email}</p>
          <p>Solved Problems: {solvedProblems.length}</p>
          <nav>
            <ul>
              <li><Link to="/problems">Problems</Link></li>
              <li><Link to="/topics">Topics</Link></li>
              <li><Link to="/edit-profile">Edit Profile</Link></li>
              <li><Link to="/logout">Logout</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
