import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import registerUser from "../api/registerUser.ts";
import type { RegisterRequest } from "../types/requestTypes.ts";
import useAuth from "./useAuth.ts";
import { executeAuthRequest } from "../util/executeAuthRequest.ts";

export function useRegister() {
  const [error, setError] = useState<string[] | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const context = useAuth();
  const register = async (data: RegisterRequest) => {
    const response = await executeAuthRequest(() => registerUser(data), {
      setIsLoading: context.setIsLoading,
      setError,
      setResendAt: context.setResendVerificationCodeAt,
      defaultErrorMessage: "Registration failed.",
    });

    if (!response) return null;

    if (response.resend_verification_code_at) {
      context.setResendVerificationCodeAt(response.resend_verification_code_at);
    }

    const userData = response.payload.data;
    setUser(userData);

    return userData;
  };

  return { register, error, user };
}
