import { type ReactNode, useCallback, useState } from "react";
import { AuthContext } from "./authContext";
import type { CurrentUser } from "../types/currentUser.ts";
import type { AuthDrawerState } from "../types/authDrawerState.ts";
import { logoutUser } from "../api/logoutUser.ts";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const openAuthDrawer = useCallback(() => {
    setIsAuthDrawerOpen(true);
  }, []);

  const closeAuthDrawer = useCallback(() => {
    setIsAuthDrawerOpen(false);
  }, []);
  const [resendVerificationCodeAt, setResendVerificationCodeAt] = useState<
    string | null
  >(null);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  );
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [drawerState, setDrawerState] = useState<AuthDrawerState>("LOG_IN");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
    setDrawerState("SUCCESS");
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setResendVerificationCodeAt(null);
    setVerificationEmail(null);
    setDrawerState("LOG_IN");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthDrawerOpen,
        openAuthDrawer,
        closeAuthDrawer,
        isLoading,
        setIsLoading,
        currentUser,
        authDrawerState: drawerState,
        login,
        logout,
        setAuthDrawerState: setDrawerState,
        resendVerificationCodeAt,
        setResendVerificationCodeAt,
        verificationEmail,
        setVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
