// src/lib/axios.ts

import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.malricpharma.co.ke", // or wherever your backend lives
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       try {
//         const res = await refreshToken(); // Get new token from server
//         // Update token and retry original request
//         const newToken = res.data.token;
//         error.config.headers.Authorization = `Bearer ${newToken}`;
//         return api.request(error.config);
//       } catch (refreshErr) {
//         console.error("Refresh failed:", refreshErr);
//         return Promise.reject(refreshErr);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
