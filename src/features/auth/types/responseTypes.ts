export type ResendAtResponse<T> = {
  payload: T;
  resend_verification_code_at: string;
};
