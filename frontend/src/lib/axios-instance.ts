import axios from "axios";
import { setupInterceptors } from "./axios-interceptor";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

setupInterceptors(axiosInstance);


export default axiosInstance;
