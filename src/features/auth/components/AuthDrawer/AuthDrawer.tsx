import styles from "./AuthDrawer.module.css";
import { ArrowLeft } from "lucide-react";
import logo from "../../../../assets/logo.svg";
import useAuth from "../../hooks/useAuth.ts";
import { useEffect } from "react";
import LoadingSpinner from "../../../../common/components/LoadingSpinner/LoadingSpinner.tsx";
import { renderAuthForm } from "../../util/renderAuthForm.tsx";
import { renderAuthTitle } from "../../util/renderAuthTitle.ts";

export default function AuthDrawer() {
  const context = useAuth();
  const { isAuthDrawerOpen, closeAuthDrawer, isLoading } = context;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAuthDrawer();
      }
    };

    if (isAuthDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthDrawerOpen, closeAuthDrawer]);

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
          <h2 className={styles.title}>
            {renderAuthTitle(context.authDrawerState)}
          </h2>
        </div>
        <div className={styles.formContainer}>
          {renderAuthForm(context.authDrawerState)}
        </div>
        {!isSuccess && (
          <>
            <div className={styles.actions}>
              {!isLoading ? (
                <button
                  type="submit"
                  form="authForm"
                  className={styles.submitBtn}
                >
                  Submit
                </button>
              ) : (
                <LoadingSpinner />
              )}
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
            <>
              <div className={styles.divider}>or</div>
              <div className={styles.continueText} onClick={closeAuthDrawer}>
                Continue without{" "}
                <span className={styles.boldText}>Signing In</span>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
}
