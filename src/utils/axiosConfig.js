import client from "../API/client";

// Re-export single authoritative client as axiosInstance for backwards compatibility
export const axiosInstance = client;
export default client;
