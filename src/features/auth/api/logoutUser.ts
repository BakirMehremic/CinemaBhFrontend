import type { MessageResponse } from "../../../common/types/responseTypes.ts";
import { usersApi } from "../../../common/api/baseApi.ts";

export default async function logoutUser(): Promise<MessageResponse> {
  const response = await usersApi.post<MessageResponse>("/logout");
  return response.data;
}
