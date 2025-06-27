// src/utils/axios.ts
import axios from "axios";
import { env } from "../config/env";

// Create axios instance with environment-based configuration
export const api = axios.create({
  baseURL: env.apiBaseUrl, // Now uses environment variable
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  try {
    return localStorage.getItem("authToken");
  } catch (error) {
    console.error("Error accessing localStorage:", error);
    return null;
  }
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request logging in development
    if (env.isDevelopment && env.enableDebug) {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
      });
    }

    return config;
  },
  (error) => {
    if (env.isDevelopment) {
      console.error("❌ Request Error:", error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth and logging
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (env.isDevelopment && env.enableDebug) {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const refreshResponse = await api.post("/auth/refresh");
        const newToken = refreshResponse.data.token;

        // Store new token
        localStorage.setItem("authToken", newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear auth data
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        // Only redirect to login for protected endpoints
        const protectedEndpoints = ["/orders", "/profile", "/checkout"];
        const currentPath = window.location.pathname;
        const isProtectedEndpoint = protectedEndpoints.some((endpoint) =>
          originalRequest.url?.includes(endpoint)
        );

        // Redirect to login only if it's a protected endpoint or user is on a protected page
        if (
          (isProtectedEndpoint ||
            ["/cart", "/checkout", "/profile", "/orders"].includes(
              currentPath
            )) &&
          typeof window !== "undefined"
        ) {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      }
    }

    // Log errors in development
    if (env.isDevelopment) {
      console.error("❌ API Error:", {
        status: error.response?.status,
        message: error.message,
        url: error.config?.url,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);
