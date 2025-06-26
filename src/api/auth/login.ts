import { api } from "../../utils/axios";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/api/auth/login", payload);
  return response.data;
};