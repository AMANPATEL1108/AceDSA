// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api', // Ensure this is correct
// });

// api.interceptors.request.use(
//     (config) => {
//         if (typeof localStorage !== 'undefined') {
//             const token = localStorage.getItem('adminToken');
//             console.log('Retrieved token:', token); // Debugging line
//             if (token) {
//                 config.headers['x-auth-token'] = token;
//             }
//         } else {
//             console.log('localStorage is not available');
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// export default api;

// ----------------------------------------------------

// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Ensure this is correct
// });

// // api.interceptors.request.use(
// //   (config) => {
// //     if (typeof localStorage !== 'undefined') {
// //       const token = localStorage.getItem('adminToken');
// //       console.log('Retrieved token:', token); // Debugging line
// //       if (token) {
// //         config.headers['x-auth-token'] = token;
// //       }
// //     } else {
// //       console.log('localStorage is not available');
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response.status === 401 && error.response.data.expired) {
//       try {
//         const response = await api.post('/auth/refresh-token');
//         const { token } = response.data;
//         localStorage.setItem('token', token);
//         api.defaults.headers.common['x-auth-token'] = token;
//         return api(error.config);
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError);
//         // Redirect to login page or handle as needed
        
//       }
//     }
//     return Promise.reject(error);
//   }
// );


// export default api;

// ---------------------------------------

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && error.response.data.expired) {
      try {
        const response = await api.post("/auth/refresh-token");
        const { token } = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["x-auth-token"] = token;
        return api(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;