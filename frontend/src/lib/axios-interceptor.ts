import axiosInstance from "./axios-instance";
import { getTokenFromCookies, setCookies } from "./cookieUtils";
import axios from "axios";
export const setupInterceptors = (apiClient) => {
    // Request interceptor to attach access token
    apiClient.interceptors.request.use(
    async (config) => {
      try {
        const accessToken = await getTokenFromCookies("access_token");
        if (accessToken) {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
      } catch (error) {
        console.error("Error in request interceptor:", error);
      }
      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );
  // Response interceptor to handle token refresh
  apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
      const originalRequest = error.config;
  
      // Handle 401 errors and avoid retry loops
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
         
        try {
          // Retrieve refresh token from cookies
          const refreshToken = await getTokenFromCookies("refresh_token");
          if (!refreshToken) {
            throw new Error("Refresh token is missing");
          }
          console.log('refreshing')
          // Request a new access token
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
              withCredentials: true, // Ensure cookies are included
            }
          );
  
          const cookies = response.headers["set-cookie"];
  
          // Store the new access token
          setCookies(cookies);
          const accessToken = await getTokenFromCookies("access_token");
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Log refresh errors and handle accordingly
          console.error("Failed to refresh token:", refreshError);
          // Redirect to login or notify the user
          return Promise.reject(refreshError);
        }
      }
  
      // Propagate other errors
      return Promise.reject(error);
    }
  );
}