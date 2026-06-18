import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import { loginUser } from "../api/loginUser.ts";
import type { LoginRequest } from "../types/requestTypes.ts";
import useAuth from "./useAuth.ts";
import { executeAuthRequest } from "../util/executeAuthRequest.ts";

export function useLogin() {
  const [error, setError] = useState<string[] | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const context = useAuth();

  const login = async (credentials: LoginRequest) => {
    setUser(null);

    const user = await executeAuthRequest(() => loginUser(credentials), {
      setIsLoading: context.setIsLoading,
      setError,
      setResendAt: context.setResendVerificationCodeAt,
      defaultErrorMessage: "Login failed. Please try again.",
      onUnverified: (err) => {
        context.setVerificationEmail(credentials.email);
        context.setResendVerificationCodeAt(
          err.response?.data.resend_verification_code_at || "",
        );
        context.setAuthDrawerState("VERIFY_ACCOUNT");
      },
    });

    if (!user) return null;

    setUser(user);
    return user;
  };

  return { login, error, user };
}
