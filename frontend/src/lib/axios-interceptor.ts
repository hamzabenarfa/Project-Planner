import axiosInstance from "./axios-instance";
import { getTokenFromCookies, removeCookies, setCookies } from "./cookieUtils";
import axios from "axios";
export const setupInterceptors = (apiClient) => {
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
    (error: any) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );
  apiClient.interceptors.response.use(
    (response: any) => response, // Pass through successful responses
    async (error: any) => {
      const originalRequest = error.config;

      // Handle 401 errors and avoid retry loops
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = await getTokenFromCookies("refresh_token");
          if (!refreshToken) {
            throw new Error("Refresh token is missing");
          }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
              withCredentials: true,
            }
          );

          const cookies = response.headers["set-cookie"];

          setCookies(cookies);
          const accessToken = await getTokenFromCookies("access_token");

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError.response.data);
          

          if (refreshError.response.status === 403) {
            removeCookies(["access_token", "refresh_token"]);
          }
          return Promise.reject(refreshError);
        }
      }

      // Propagate other errors
      return Promise.reject(error);
    }
  );
};
