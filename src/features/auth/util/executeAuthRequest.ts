import axios from "axios";
import type { AuthError } from "../types/authErrorTypes.ts";
import handleAuthError from "./handleAuthError.ts";
import type { AuthRequestOptions } from "../types/authRequestOptions.ts";

export async function executeAuthRequest<T>(
  requestFn: () => Promise<T>,
  options: AuthRequestOptions,
): Promise<T | null> {
  const { setIsLoading, setError, setResendAt, defaultErrorMessage } = options;

  setIsLoading(true);
  setError(null);

  try {
    return await requestFn();
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const errorResponse: AuthError = handleAuthError(
        err,
        defaultErrorMessage,
      );

      setError(errorResponse.errors);

      if (errorResponse.resendAt) {
        setResendAt(errorResponse.resendAt);
      }
    } else if (err instanceof Error) {
      setError([err.message]);
    } else {
      setError(["An unexpected error occurred."]);
    }

    return null;
  } finally {
    setIsLoading(false);
  }
}
