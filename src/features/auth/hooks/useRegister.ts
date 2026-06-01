import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import registerUser from "../api/registerUser.ts";
import type { RegisterRequest } from "../types/requestTypes.ts";
import handleAuthError from "../util/handleAuthError.ts";
import useAuth from "./useAuth.ts";
import axios from "axios";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const context = useAuth();
  const register = async (data: RegisterRequest) => {
    setIsLoading(true);

    try {
      const response = await registerUser(data);
      if (response.resend_verification_code_at) {
        context.setResendVerificationCodeAt(
          response.resend_verification_code_at,
        );
      }

      const userData = response.payload.data;

      setUser(userData);
      return userData;
    } catch (err: unknown) {
      if (err instanceof axios.isAxiosError) {
        const errorMessages = handleAuthError(
          err,
          "Registration failed.",
          context.setResendVerificationCodeAt,
        );
        setError(errorMessages);
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, user };
}
