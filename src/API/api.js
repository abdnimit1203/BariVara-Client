import client from "./client";

// Re-export client as API for backwards compatibility
export const API = client;

// Auth endpoints
export const registerUser = (data) => client.post("/register", data);
export const loginUser = (data) => client.post("/login", data);

// Example data fetch
export const fetchRoomData = () => client.get("/roomDatas");
export const fetchCategories = () => client.get("/categories");

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
