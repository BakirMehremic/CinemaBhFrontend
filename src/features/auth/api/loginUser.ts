import type { LoginResponse } from "../types/responseTypes.ts";
import type { LoginRequest } from "../types/requestTypes.ts";
import { usersApi } from "../../../common/api/baseApi.ts";

export const loginUser = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await usersApi.post<LoginResponse>("/login", credentials);
  return response.data;
};
