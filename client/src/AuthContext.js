// import React, { createContext, useState, useEffect } from 'react';
// import api from './utils/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

// const checkAuthStatus = async () => {
//     const token = localStorage.getItem('token');
//     console.log("token: ",token);
//     if (token) {
//       try {
//         api.defaults.headers.common['x-auth-token'] = token;
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

//   useEffect(() => {
//     checkAuthStatus();
//   }, [checkAuthStatus]);
  

// const login = (token, userID) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('userID', userID);
//     api.defaults.headers.common['x-auth-token'] = token;
//     setIsAuthenticated(true);
//     checkAuthStatus();
//   };
  
// const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userID');
//     setIsAuthenticated(false);
//     setUser(null);
//   };
  

//   const refreshToken = async () => {
//     try {
//       const response = await api.post('/auth/refresh-token');
//       const { token } = response.data;
//       localStorage.setItem('token', token);
//       api.defaults.headers.common['x-auth-token'] = token;
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       logout();
//     }
//   };
  
//   useEffect(() => {
//     const tokenRefreshInterval = setInterval(refreshToken, 23 * 60 * 60 * 1000); // Refresh every 23 hours
//     return () => clearInterval(tokenRefreshInterval);
//   }, []);
  

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// ---------------------------------------------

import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from './utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize the logout function using useCallback
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    setIsAuthenticated(false);
    setUser(null);
  }, []); // Dependencies are empty because this function doesn't depend on other variables


  // Memoize the checkAuthStatus function using useCallback
  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    console.log("token: ", token);
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
  }, [logout]); // Add 'logout' as a dependency since it is used inside this function

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = (token, userID) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userID);
    api.defaults.headers.common['x-auth-token'] = token;
    setIsAuthenticated(true);
    checkAuthStatus();
  };

  // Refresh the token at regular intervals
  const refreshToken = useCallback(async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      const { token } = response.data;
      localStorage.setItem('token', token);
      api.defaults.headers.common['x-auth-token'] = token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  }, [logout]); // Add 'logout' as a dependency because it's used in this function

  useEffect(() => {
    const tokenRefreshInterval = setInterval(refreshToken, 23 * 60 * 60 * 1000); // Refresh every 23 hours
    return () => clearInterval(tokenRefreshInterval);
  }, [refreshToken]); // Add 'refreshToken' as a dependency

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
