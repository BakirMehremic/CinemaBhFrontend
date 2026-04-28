import { type ReactNode, useState } from "react";
import { AuthContext } from "./authContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const openAuthDrawer = () => setIsAuthDrawerOpen(true);
  const closeAuthDrawer = () => setIsAuthDrawerOpen(false);

  return (
    <AuthContext.Provider
      value={{ isAuthDrawerOpen, openAuthDrawer, closeAuthDrawer }}
    >
      {children}
    </AuthContext.Provider>
  );
}
