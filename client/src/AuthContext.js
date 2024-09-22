// import React, { createContext, useState, useEffect } from 'react';
// import api from './utils/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const response = await api.get('/auth/verify');
//         setIsAuthenticated(true);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error('Auth verification failed:', error);
//         logout();
//       }
//     }
//     setLoading(false);
//   };

//   const login = (userData, token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// -------------------------------------------------------

import React, { createContext, useState, useEffect } from 'react';
import api from './utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   const checkAuthStatus = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const response = await api.get('/auth/verify');
//         setIsAuthenticated(true);
//         console.log("user: ",response.data.user);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error('Auth verification failed:', error);
//         logout();
//       }
//     }
//     setLoading(false);
//   };
const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    console.log("token: ",token);
    if (token) {
      try {
        api.defaults.headers.common['x-auth-token'] = token;
        const response = await api.get('/auth/verify');
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        console.error('Auth verification failed:', error);
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);
  

//   const login = (token, userID) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userID', userID);
//     setIsAuthenticated(true);
//     checkAuthStatus();
//   };

const login = (token, userID) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    api.defaults.headers.common['x-auth-token'] = token;
    setIsAuthenticated(true);
    checkAuthStatus();
  };
  

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userID');
//     setIsAuthenticated(false);
//     setUser(null);
//   };
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setIsAuthenticated(false);
    setUser(null);
  };
  

  const refreshToken = async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };
  
  useEffect(() => {
    const tokenRefreshInterval = setInterval(refreshToken, 23 * 60 * 60 * 1000); // Refresh every 23 hours
    return () => clearInterval(tokenRefreshInterval);
  }, []);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
