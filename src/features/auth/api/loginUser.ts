import type { LoginRequest } from "../types/requestTypes.ts";
import { authApi } from "../../../common/api/baseApi.ts";
import type { CurrentUser } from "../types/currentUser.ts";

export async function loginUser(
  credentials: LoginRequest,
): Promise<CurrentUser> {
  const response = await authApi.post<CurrentUser>("/login", credentials);
  return response.data;
}
