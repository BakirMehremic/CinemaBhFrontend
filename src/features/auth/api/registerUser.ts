import { usersApi } from "../../../common/api/baseApi.ts";
import type { RegisterRequest } from "../types/requestTypes.ts";
import type { ResendAtResponse } from "../types/responseTypes.ts";
import type { MessageDataResponse } from "../../../common/types/responseTypes.ts";
import type { CurrentUser } from "../types/currentUser.ts";

export async function registerUser(
  data: RegisterRequest,
): Promise<ResendAtResponse<MessageDataResponse<CurrentUser>>> {
  const response = await usersApi.post<
    ResendAtResponse<MessageDataResponse<CurrentUser>>
  >("/register", data);
  return response.data;
}
