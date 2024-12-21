// // axiosConfig.js
// import axios from "axios";

// const baseURL = import.meta.env.VITE_BASE_URL;
// // console.log(baseURL)
// const axiosInstance = axios.create({
//   baseURL: baseURL,
//   // You can add other default configurations here if needed
// });
// // Automatically add the token to every request
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.token = token; // Directly set the token
//   }
//   return config;
// });

// export default axiosInstance;
// axiosConfig.js
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

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

// Handle responses globally
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through valid responses
  (error) => {
    // Check for 401 Unauthorized status
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("token"); // Remove token from local storage
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Propagate the error for further handling
  }
);

export default axiosInstance;
