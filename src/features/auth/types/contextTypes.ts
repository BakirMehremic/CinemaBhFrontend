import type { CurrentUser } from "./currentUser.ts";
import type { AuthDrawerState } from "./authDrawerState.ts";

export type AuthContextType = {
  isAuthDrawerOpen: boolean;
  openAuthDrawer: () => void;
  closeAuthDrawer: () => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  currentUser: CurrentUser | null;
  authDrawerState: AuthDrawerState;

  login: (user: CurrentUser) => void;
  logout: () => Promise<void>;
  setAuthDrawerState: (state: AuthDrawerState) => void;

  resendVerificationCodeAt: string | null;
  setResendVerificationCodeAt: (resendAt: string | null) => void;
  verificationEmail: string | null;
  setVerificationEmail: (email: string | null) => void;
};
