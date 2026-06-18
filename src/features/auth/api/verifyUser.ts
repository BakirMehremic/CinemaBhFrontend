import { authApi } from "../../../common/api/baseApi.ts";
import type { CurrentUser } from "../types/currentUser.ts";
import type { VerifyRequest } from "../types/requestTypes.ts";

export default async function verifyUser(
  data: VerifyRequest,
): Promise<CurrentUser> {
  const response = await authApi.post<CurrentUser>("/verify", data);
  return response.data;
}
