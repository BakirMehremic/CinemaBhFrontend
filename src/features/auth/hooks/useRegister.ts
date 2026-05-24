import { useContext, useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import registerUser from "../api/registerUser.ts";
import type { RegisterRequest } from "../types/requestTypes.ts";
import { AuthContext } from "../context/authContext.ts";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useRegister must be used within an AuthProvider");
  const { setResendVerificationCodeAt } = context;
  const register = async (data: RegisterRequest) => {
    setIsLoading(true);

    try {
      const response = await registerUser(data);
      if (response.resend_verification_code_at) {
        setResendVerificationCodeAt(response.resend_verification_code_at);
      }

      const userData = response.payload.data;

      setUser(userData);
      return userData;
    } catch (err) {
      const errMsg =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, user };
}
