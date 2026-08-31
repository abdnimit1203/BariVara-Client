import axios from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL;

// Single authoritative Axios client instance
const client = axios.create({
  baseURL: baseURL,
});

// Request interceptor to attach JWT token
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with smart 401 handling
let isToastActive = false;

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    const requestUrl = error.config ? error.config.url : "";

    // If 401 occurs on login endpoint, let it pass to Login.jsx component
    const isLoginEndpoint = requestUrl && (requestUrl.includes("/login") || requestUrl.endsWith("/login"));

    if (status === 401 && !isLoginEndpoint) {
      const hadToken = !!localStorage.getItem("token");
      localStorage.removeItem("token");
      localStorage.removeItem("loginInfo");
      window.dispatchEvent(new Event("auth-change"));

      if (hadToken && !isToastActive) {
        isToastActive = true;
        toast.error("আপনার লগইন সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে আবার লগইন করুন।");
        setTimeout(() => {
          isToastActive = false;
        }, 4000);
      }

      // Clean redirect to login if not already there
      if (window.location.pathname !== "/login") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
