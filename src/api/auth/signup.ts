// src/api/auth/signup.ts

import { api } from "../../utils/axios";
import type { SignupPayload, ServerResponse } from "../../types/api";
import { handleServerResponse } from "../../types/api";

// Signup only returns user info (no token typically)
type SignupResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
  };
};

export const signupUser = async (
  payload: SignupPayload
): Promise<SignupResponse> => {
  const response = await api.post<ServerResponse<SignupResponse>>(
    "/auth/register",
    payload
  );
  return handleServerResponse(response.data);
};
