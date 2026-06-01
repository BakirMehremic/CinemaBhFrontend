import type { AuthError } from "../types/authErrorTypes.ts";

export default function handleAuthError(
  err: any,
  defaultFallback: string,
): AuthError {
  const rawErrorData = err.response?.data;
  const resendAt = rawErrorData?.resend_verification_code_at;

  if (!rawErrorData) {
    return { errors: [defaultFallback], resendAt };
  }

  if (Array.isArray(rawErrorData)) {
    return {
      errors: rawErrorData.map((item) => item.message || "Validation error"),
      resendAt,
    };
  }

  if (rawErrorData.message) {
    return { errors: [rawErrorData.message], resendAt };
  }

  return { errors: [defaultFallback], resendAt };
}
