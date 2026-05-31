import { usersApi } from "../../../common/api/baseApi.ts";
import type { CurrentUser } from "../types/currentUser.ts";
import type { VerifyRequest } from "../types/requestTypes.ts";

export async function verifyUser(data: VerifyRequest): Promise<CurrentUser> {
  const response = await usersApi.post<CurrentUser>("/verify", data);
  return response.data;
}
