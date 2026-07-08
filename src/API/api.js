import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token; // Send token in 'token' header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const registerUser = (data) => API.post("/register", data);
export const loginUser = (data) => API.post("/login", data);

// Example data fetch
export const fetchRoomData = () => API.get("/roomDatas");
export const fetchCategories = () => API.get("/categories");

// post data

export const fetchMonthlyData = (data) => API.post("/monthlyData", data);
export const createMonthlyBill = (data) => API.post("/monthlyBill", data);

// Update by ID
export const updateMeterReadingById = (id, data) =>
  API.put(`/meterReadings/${id}`, data);
export const updatePaymentById = (id, data) =>
  API.put(`/monthlyBill/${id}`, data);

// Delete by ID
export const DeleteMeterReadingById = (id, data) =>
  API.delete(`/meterReadings/${id}`, data);
