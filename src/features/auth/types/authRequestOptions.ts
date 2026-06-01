export type AuthRequestOptions = {
  setIsLoading: (loading: boolean) => void;
  setError: (errors: string[] | null) => void;
  setResendAt: (resendAt: string) => void;
  defaultErrorMessage: string;
};
