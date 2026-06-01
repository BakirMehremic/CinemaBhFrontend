import type { CurrentUser } from "./currentUser.ts";
import type { AuthDrawerState } from "./authDrawerState.ts";
import type { Dispatch, SetStateAction } from "react";

export type AuthContextType = {
  isAuthDrawerOpen: boolean;
  openAuthDrawer: () => void;
  closeAuthDrawer: () => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  currentUser: CurrentUser | null;
  authDrawerState: AuthDrawerState;

  login: (user: CurrentUser) => void;
  logout: () => void;
  setAuthDrawerState: (state: AuthDrawerState) => void;

  resendVerificationCodeAt: string | null;
  setResendVerificationCodeAt: Dispatch<SetStateAction<string | null>>;
  verificationEmail: string | null;
  setVerificationEmail: Dispatch<SetStateAction<string | null>>;
};
