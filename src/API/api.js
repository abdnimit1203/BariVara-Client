import client from "./client";

// Re-export client as API for backwards compatibility
export const API = client;

// Auth endpoints (legacy bcrypt flow — kept, unused by the current UI)
export const registerUser = (data) => client.post("/register", data);
export const loginUser = (data) => client.post("/login", data);

// Firebase-backed user/profile endpoints
export const fetchMyProfile = () => client.get("/users/me");
export const updateMyProfile = (data) => client.put("/users/me", data);
export const fetchAllUsers = () => client.get("/users");
export const updateUserRole = (id, role) => client.put(`/users/${id}/role`, { role });
export const updateUserAccountStatus = (id, accountStatus) =>
  client.put(`/users/${id}/status`, { accountStatus });

// Utility & Rate Settings (implementation_plan.md)
export const fetchUtilitySettings = () => client.get("/utilitySettings");
export const saveUtilitySettings = (data) => client.put("/utilitySettings", data);

// Example data fetch
export const fetchRoomData = () => client.get("/roomDatas");
export const fetchCategories = () => client.get("/categories");

// Room management (Settings)
export const createRoom = (data) => client.post("/rooms", data);
export const updateRoomById = (id, data) => client.put(`/rooms/${id}`, data);

// Monthly data & bills
export const fetchMonthlyData = (data) => client.post("/monthlyData", data);
export const createMonthlyBill = (data) => client.post("/monthlyBill", data);

// Updates
export const updateMeterReadingById = (id, data) =>
  client.put(`/meterReadings/${id}`, data);
export const updatePaymentById = (id, data) =>
  client.put(`/monthlyBill/${id}`, data);
export const updateLeaseholder = (roomId, leaseholderId, data) =>
  client.put(`/rooms/${roomId}/leaseholder/${leaseholderId}`, data);
export const vacateLeaseholder = (roomId, leaseholderId, data = {}) =>
  client.put(`/rooms/${roomId}/leaseholder/${leaseholderId}/vacate`, data);

// Deletions
export const DeleteMeterReadingById = (id, data) =>
  client.delete(`/meterReadings/${id}`, data);

export default client;
