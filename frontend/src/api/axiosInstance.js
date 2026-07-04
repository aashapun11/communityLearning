// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// attach token to every request automatically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle responses
axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    // Token expired or unauthorized
    if (
      error.response?.status === 401 &&
      error.config.url !== "/auth/login"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;