import { useState } from "react";
import useAuth from "./useAuth.ts";
import type { VerifyRequest } from "../types/requestTypes.ts";
import verifyUser from "../api/verifyUser.ts";

export function useVerify() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const auth = useAuth();

  const verify = async (data: VerifyRequest) => {
    return executeAuthRequest(verifyUser(data), {
      setIsLoading,
      setError,
      setResendAt: auth.setResendVerificationCodeAt,
      defaultErrorMessage: "Verification failed. Please check your code.",
    });
  };

  return { verify, isLoading, error };
}
