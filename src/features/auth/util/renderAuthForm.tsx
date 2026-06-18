import type { AuthDrawerState } from "../types/authDrawerState";
import Register from "../components/Register/Register.tsx";
import Login from "../components/Login/Login.tsx";
import VerifyAccount from "../components/VerifyAccount/VerifyAccount.tsx";

export function renderAuthForm(state: AuthDrawerState) {
  switch (state) {
    case "REGISTER":
      return <Register />;
    case "LOG_IN":
      return <Login />;
    case "VERIFY_ACCOUNT":
      return <VerifyAccount />;
    case "SUCCESS":
      return null;
  }
}
