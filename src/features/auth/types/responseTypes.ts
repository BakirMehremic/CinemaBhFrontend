import type { CurrentUser } from "./currentUser.ts";

export type LoginResponse = {
  csrfToken: string;
  user: CurrentUser;
};
