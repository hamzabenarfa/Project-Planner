import axios from "axios";
import { setupInterceptors } from "./axios-interceptor";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

setupInterceptors(api);


export default api;
