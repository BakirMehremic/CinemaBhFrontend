import { useState } from "react";
import type { CurrentUser } from "../types/currentUser.ts";
import loginUser from "../api/loginUser.ts";
import type { LoginRequest } from "../types/requestTypes.ts";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [user, setUser] = useState<CurrentUser | null>(null);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await loginUser(credentials);
      const user = data.payload;

      setUser(user);
      return user;
    } catch (err) {
      const rawErrorData = err.response?.data;
      let errorMessages: string[] = ["Login failed. Please try again."];

      if (rawErrorData) {
        if (Array.isArray(rawErrorData)) {
          errorMessages = rawErrorData.map(
            (item) => item.message || "Validation error",
          );
        } else if (rawErrorData.message) {
          errorMessages = [rawErrorData.message];
        }
      }

      setError(errorMessages);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, user };
}
