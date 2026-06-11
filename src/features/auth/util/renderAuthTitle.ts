import type { AuthDrawerState } from "../types/authDrawerState.ts";

export function renderAuthTitle(state: AuthDrawerState) {
  switch (state) {
    case "REGISTER":
      return "Create Account";
    case "LOG_IN":
      return "Welcome Back";
    case "VERIFY_ACCOUNT":
      return "Verify Account";
    case "SUCCESS":
      return "Success! 🎉";
    default:
      return "";
  }
}
