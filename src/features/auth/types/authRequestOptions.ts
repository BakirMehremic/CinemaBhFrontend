import type { AxiosError } from "axios";
import type { UnverifiedErrorResponse } from "./responseTypes.ts";

export type AuthRequestOptions = {
  setIsLoading: (loading: boolean) => void;
  setError: (errors: string[] | null) => void;
  setResendAt: (resendAt: string) => void;
  defaultErrorMessage: string;
  onUnverified?: (err: AxiosError<UnverifiedErrorResponse>) => void;
};
