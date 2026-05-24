import type { LoginRequest } from "../types/requestTypes.ts";
import { usersApi } from "../../../common/api/baseApi.ts";
import type { CurrentUser } from "../types/currentUser.ts";
import type { ResendAtResponse } from "../types/responseTypes.ts";

export default async function loginUser(
  credentials: LoginRequest,
): Promise<ResendAtResponse<CurrentUser>> {
  const response = await usersApi.post<ResendAtResponse<CurrentUser>>(
    "/login",
    credentials,
  );
  return response.data;
}
