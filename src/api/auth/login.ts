import { api } from "../../utils/axios";
import type {
  LoginPayload,
  AuthResponse,
  ServerResponse,
} from "../../types/api";
import { handleServerResponse } from "../../types/api";

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await api.post<ServerResponse<AuthResponse>>(
    "/auth/login",
    payload
  );
  return handleServerResponse(response.data);
};
