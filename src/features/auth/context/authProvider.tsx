import { type ReactNode, useState } from "react";
import { AuthContext } from "./authContext";
import type { CurrentUser } from "../types/currentUser.ts";
import type { AuthDrawerState } from "../types/authDrawerState.ts";
import logoutUser from "../api/logoutUser.ts";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const openAuthDrawer = () => setIsAuthDrawerOpen(true);
  const closeAuthDrawer = () => setIsAuthDrawerOpen(false);
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
    setCurrentUser(null);
    setResendVerificationCodeAt(null);
    setVerificationEmail(null);
    setDrawerState("LOG_IN");
    await logoutUser();
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
