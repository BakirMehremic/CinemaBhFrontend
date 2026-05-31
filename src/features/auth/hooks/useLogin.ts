import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import { loginUser } from "../api/loginUser.ts";
import type { LoginRequest } from "../types/requestTypes.ts";
import { handleAuthError } from "../util/handleAuthError.ts";
import { useAuth } from "./useAuth.ts";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const context = useAuth();

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const user = await loginUser(credentials);
      setUser(user);
      return user;
    } catch (err: any) {
      const errorMessages = handleAuthError(
        err,
        "Login failed. Please try again.",
        context.setResendVerificationCodeAt,
      );
      setError(errorMessages);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, user };
}
