export function handleAuthError(
  err: any,
  defaultFallback: string,
  setResendAt: (resendAt: string) => void,
): string[] {
  const rawErrorData = err.response?.data;

  if (rawErrorData?.resend_verification_code_at) {
    setResendAt(rawErrorData.resend_verification_code_at);
  }
  if (!rawErrorData) return [defaultFallback];

  if (Array.isArray(rawErrorData)) {
    return rawErrorData.map((item) => item.message || "Validation error");
  }

  if (rawErrorData.message) {
    return [rawErrorData.message];
  }

  return [defaultFallback];
}
