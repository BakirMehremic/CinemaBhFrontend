import { useState } from "react";
import { useAuth } from "./useAuth.ts";
import type { VerifyRequest } from "../types/requestTypes.ts";
import verifyUser from "../api/verifyUser.ts";
import { executeAuthRequest } from "../util/executeAuthRequest.ts";

export function useVerify() {
  const [error, setError] = useState<string[] | null>(null);
  const context = useAuth();

  const verify = async (data: VerifyRequest) => {
    return executeAuthRequest(() => verifyUser(data), {
      setIsLoading: context.setIsLoading,
      setError,
      setResendAt: context.setResendVerificationCodeAt,
      defaultErrorMessage: "Verification failed. Please check your code.",
    });
  };

  return { verify, error };
}
