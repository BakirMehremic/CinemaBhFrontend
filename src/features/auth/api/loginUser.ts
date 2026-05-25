import type { LoginRequest } from "../types/requestTypes.ts";
import { usersApi } from "../../../common/api/baseApi.ts";
import type { CurrentUser } from "../types/currentUser.ts";

export default async function loginUser(
  credentials: LoginRequest,
): Promise<CurrentUser> {
  const response = await usersApi.post<CurrentUser>("/login", credentials);
  return response.data;
}
