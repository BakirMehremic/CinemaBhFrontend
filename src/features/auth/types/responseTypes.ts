export type ResendAtResponse<T> = {
  payload: T;
  resend_verification_code_at: string;
};

export type UserNotVerifiedResponse = {
  message: string;
  resend_verification_code_at: string;
};

export type UnverifiedErrorResponse = {
  resend_verification_code_at: string;
};
