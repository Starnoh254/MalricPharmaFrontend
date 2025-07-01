// src/types/api.ts
// Shared API types for consistent server communication

// Generic server response wrapper
export interface ServerResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
}

// User types
export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

// Auth types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// API Error types
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Helper function to handle server responses
export const handleServerResponse = <T>(response: ServerResponse<T>): T => {
  if (response.status !== "success") {
    throw new Error(response.message || "Request failed");
  }
  return response.data;
};
