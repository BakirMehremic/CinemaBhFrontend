import { usersApi } from "../../../common/api/baseApi.ts";
import type { ResendAtResponse } from "../types/responseTypes.ts";
import type { MessageResponse } from "../../../common/types/responseTypes.ts";

export default async function resendVerification(
  email: string,
): Promise<ResendAtResponse<MessageResponse>> {
  const response = await usersApi.post<ResendAtResponse<MessageResponse>>(
    "/verify/resend",
    email,
  );
  return response.data;
}
