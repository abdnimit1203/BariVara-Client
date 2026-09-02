import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebaseConfig";
import { signOutUser } from "../firebase/auth";

const baseURL = import.meta.env.VITE_BASE_URL;

// Single authoritative Axios client instance
const client = axios.create({
  baseURL: baseURL,
});

// Request interceptor: attach the current Firebase ID token as a standard
// Authorization: Bearer header (replaces the old custom `token` header).
client.interceptors.request.use(
  async (config) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with smart 401 handling
let isToastActive = false;

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      const hadUser = !!auth.currentUser;
      await signOutUser().catch(() => {});

      if (hadUser && !isToastActive) {
        isToastActive = true;
        toast.error("আপনার লগইন সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে আবার লগইন করুন।");
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
