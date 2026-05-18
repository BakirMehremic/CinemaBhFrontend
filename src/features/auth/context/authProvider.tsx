import { type ReactNode, useState } from "react";
import { AuthContext } from "./authContext";
import type { CurrentUser } from "../types/currentUser.ts";
import type { AuthDrawerState } from "../types/authDrawerState.ts";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const openAuthDrawer = () => setIsAuthDrawerOpen(true);
  const closeAuthDrawer = () => setIsAuthDrawerOpen(false);
  const [drawerState, setDrawerState] = useState<AuthDrawerState>("LOG_IN");

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const login = (user: CurrentUser) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    // TOOD clear cookies
  };

  return (
    <AuthContext.Provider
      value={{
        authDrawerState: drawerState,
        setAuthDrawerState: setDrawerState,
        currentUser: currentUser,
        isAuthDrawerOpen,
        openAuthDrawer,
        closeAuthDrawer,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
