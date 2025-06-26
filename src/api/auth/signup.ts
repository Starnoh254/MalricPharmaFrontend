// src/api/auth/signup.ts

import { api } from "../../utils/axios";

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

type SignupResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
  const response = await api.post("/api/auth/signup", payload);
  return response.data;
};
