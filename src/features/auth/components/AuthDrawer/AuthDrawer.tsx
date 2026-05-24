import { useContext } from "react";
import styles from "./AuthDrawer.module.css";
import { AuthContext } from "../../context/authContext.ts";
import { ArrowLeft } from "lucide-react";
import logo from "../../../../assets/logo.svg";
import type { AuthDrawerState } from "../../types/authDrawerState.ts";
import Register from "../Register/Register.tsx";
import Login from "../Login/LogIn.tsx";

export default function AuthDrawer() {
  const context = useContext(AuthContext);

  if (!context) return null;

  const { isAuthDrawerOpen, closeAuthDrawer } = context;

  const titleMap: Record<AuthDrawerState, string> = {
    REGISTER: "Create Account",
    LOG_IN: "Welcome Back",
    VERIFY_ACCOUNT: "Verify Account",
    SUCCESS: "Success! 🎉",
  };
  const componentMap: Record<AuthDrawerState, React.ReactNode> = {
    REGISTER: <Register />,
    LOG_IN: <Login />,
    VERIFY_ACCOUNT: <Login />,
    SUCCESS: null,
  };

  const isLogin = context.authDrawerState === "LOG_IN";
  const isSuccess = context.authDrawerState === "SUCCESS";
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
        {!isSuccess && (
          <>
            <div className={styles.actions}>
              <button
                type="submit"
                form="authForm"
                className={styles.submitBtn}
              >
                Submit
              </button>
            </div>

            <div className={styles.dontHaveAccountText}>
              {isLogin
                ? "Don't Have An Account? "
                : "Already Have An Account? "}
              <span
                className={styles.underlineText}
                onClick={() =>
                  context.setAuthDrawerState(isLogin ? "REGISTER" : "LOG_IN")
                }
              >
                {isLogin ? "Sign Up" : "Log In"}
              </span>
            </div>

            {isLogin && (
              <>
                <div className={styles.divider}>or</div>
                <div className={styles.continueText} onClick={closeAuthDrawer}>
                  Continue without{" "}
                  <span className={styles.boldText}>Signing In</span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
