import type { MessageResponse } from "../../../common/types/responseTypes.ts";
import { authApi } from "../../../common/api/baseApi.ts";

export default async function logoutUser(): Promise<MessageResponse> {
  const response = await authApi.post<MessageResponse>("/logout");
  return response.data;
}
