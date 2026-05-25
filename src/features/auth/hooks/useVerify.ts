import { useState } from "react";
import useAuth from "./useAuth.ts";
import type { VerifyRequest } from "../types/requestTypes.ts";
import verifyUser from "../api/verifyUser.ts";
import handleAuthError from "../util/handleAuthError.ts";

export function useVerify() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const auth = useAuth();

  const verify = async (data: VerifyRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      return await verifyUser(data);
    } catch (err: any) {
      const errorMessages = handleAuthError(
        err,
        "Verification failed. Please check your code.",
        auth.setResendVerificationCodeAt,
      );
      setError(errorMessages);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { verify, isLoading, error };
}
