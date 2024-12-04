// axiosConfig.js
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
// console.log(baseURL)
const axiosInstance = axios.create({
  baseURL: baseURL,
  // You can add other default configurations here if needed
});
// Automatically add the token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token; // Directly set the token
  }
  return config;
});

export default axiosInstance;
