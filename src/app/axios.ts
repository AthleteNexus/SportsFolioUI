import axios from 'axios';


// Use Vite environment variable for API base URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add more headers if needed, e.g. Authorization
  },
});

// Example of a request interceptor (e.g. for auth tokens)
api.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Example of a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    // if (error.response?.status === 401) { ... }
    return Promise.reject(error);
  }
);

export default api;