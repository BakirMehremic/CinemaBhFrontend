import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import loginUser from "../api/loginUser.ts";
import type { LoginRequest } from "../types/requestTypes.ts";
import useAuth from "./useAuth.ts";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const context = useAuth();

  const login = async (credentials: LoginRequest) => {
    setUser(null);

    const user = await executeAuthRequest(() => loginUser(credentials), {
      setIsLoading,
      setError,
      setResendAt: context.setResendVerificationCodeAt,
      defaultErrorMessage: "Login failed. Please try again.",
    });

    if (!user) return null;

    setUser(user);
    return user;
  };

  return { login, isLoading, error, user };
}
