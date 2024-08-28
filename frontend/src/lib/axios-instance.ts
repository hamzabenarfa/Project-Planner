import axios from "axios";
import { initAxios } from "./axios-interceptor";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

(async () => {
  try {
    await initAxios(api);
  } catch (error) {
    console.error("Failed to initialize Axios:", error);
  }
})();

export default api;
