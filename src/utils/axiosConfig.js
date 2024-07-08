// axiosConfig.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  // You can add other default configurations here if needed
});

export default axiosInstance;
