import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import { loginUser } from "../api/loginUser.ts";
import type { LoginRequest } from "../types/requestTypes.ts";
import { baseApi } from "../../../common/api/baseApi.ts";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await loginUser(credentials);
      const { csrfToken, user: userData } = data;

      if (csrfToken) {
        const appendCsrfHeader = (instance: any) => {
          instance.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        };
        appendCsrfHeader(baseApi);
      }

      setUser(userData);

      return data;
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || "Invalid credentials. Please try again.";
      setError(errMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, user };
}
