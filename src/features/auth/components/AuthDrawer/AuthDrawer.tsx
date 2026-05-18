import { useContext } from "react";
import styles from "./AuthDrawer.module.css";
import { AuthContext } from "../../context/authContext.ts";
import { ArrowLeft } from "lucide-react";
import logo from "../../../../assets/logo.svg";
import type { AuthDrawerState } from "../../types/authDrawerState.ts";
import ForgotPassword from "../ForgotPassword/ForgotPassword.tsx";
import Register from "../Register/Register.tsx";
import Login from "../Login/LogIn.tsx";

export default function AuthDrawer() {
  const context = useContext(AuthContext);

  if (!context) return null;

  const { isAuthDrawerOpen, closeAuthDrawer } = context;

  const titleMap: Record<AuthDrawerState, string> = {
    REGISTER: "Create Account",
    LOG_IN: "Welcome Back",
    FORGOT_PASSWORD: "Forgot Password",
  };
  const componentMap: Record<AuthDrawerState, React.ReactNode> = {
    REGISTER: <Register />,
    LOG_IN: <Login />,
    FORGOT_PASSWORD: <ForgotPassword />,
  };
  return (
    <>
      <div
        className={`${styles.backdrop} ${isAuthDrawerOpen ? styles.backdropVisible : ""}`}
        onClick={closeAuthDrawer}
      />

      <div
        className={`${styles.drawer} ${isAuthDrawerOpen ? styles.drawerOpen : ""}`}
      >
        <img src={logo} alt="CinemaBh" className={styles.logoImage} />
        <div className={styles.titleRow}>
          <div className={styles.arrowContainer}>
            <ArrowLeft className={styles.leftArrow} onClick={closeAuthDrawer} />
          </div>
          <h2 className={styles.title}>{titleMap[context.authDrawerState]}</h2>
        </div>
        <div className={styles.formContainer}>
          {componentMap[context.authDrawerState as AuthDrawerState]}
        </div>
        <div className={styles.actions}>
          <div className={styles.forgotPasswordText}>Forgot Password?</div>
          <button className={styles.submitBtn}>Submit</button>
        </div>
        <div className={styles.dontHaveAccountText}>
          Dont Have An Account?{" "}
          <span className={styles.underlineText}>Sign Up</span>
        </div>
        <div className={styles.divider}>or</div>
        <div className={styles.continueText} onClick={closeAuthDrawer}>
          Continue without <span className={styles.boldText}>Signing In</span>
        </div>
      </div>
    </>
  );
}
