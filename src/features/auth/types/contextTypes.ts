import type { CurrentUser } from "./currentUser.ts";
import type { AuthDrawerState } from "./authDrawerState.ts";

export type AuthContextType = {
  isAuthDrawerOpen: boolean;
  openAuthDrawer: () => void;
  closeAuthDrawer: () => void;

  currentUser: CurrentUser | null;
  authDrawerState: AuthDrawerState;

  login: (user: CurrentUser) => void;
  logout: () => void;
  setAuthDrawerState: (state: AuthDrawerState) => void;
};
