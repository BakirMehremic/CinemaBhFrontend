import { type ChangeEvent, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.ts";
import { useVerify } from "../../hooks/useVerify.ts";
import styles from "./VerifyAccount.module.css";
import resendVerification from "../../api/resendVerification.ts";

export default function VerifyAccount() {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const context = useAuth();
  const { verify, isLoading, error } = useVerify();

  useEffect(() => {
    if (!context.resendVerificationCodeAt) {
      setSecondsLeft(0);
      return;
    }

    const calculateTimeLeft = () => {
      const difference =
        new Date(context.resendVerificationCodeAt!).getTime() -
        new Date().getTime();
      const seconds = Math.max(0, Math.ceil(difference / 1000));
      setSecondsLeft(seconds);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [context.resendVerificationCodeAt]);

  const handleResend = async () => {
    if (!context.verificationEmail || secondsLeft > 0 || isResending) return;

    setIsResending(true);
    try {
      const response = await resendVerification(context.verificationEmail);

      if (response.resend_verification_code_at) {
        context.setResendVerificationCodeAt(
          response.resend_verification_code_at,
        );
      }
    } catch (err) {
      console.error("Failed to resend code:", err);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (currentCode: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (currentCode.length !== 6 || !context.verificationEmail) return;

    context.setIsLoading(true);

    const verifiedUser = await verify({
      email: context.verificationEmail,
      verification_code: currentCode,
    });

    if (!verifiedUser) {
      setCode("");
      return;
    }

    context.login(verifiedUser);
    setTimeout(() => {
      context.closeAuthDrawer();
      setCode("");
    }, 1500);
    context.setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // keep only numbers

    if (val.length <= 6) {
      setCode(val);
      if (val.length === 6) {
        handleSubmit(val);
      }
    }
  };

  return (
    <>
      <form id="authForm" onSubmit={(e) => handleSubmit(code, e)}>
        <p className={styles.infoText}>
          We sent a 6-digit code to <br />
          <strong>{context.verificationEmail || "your email address"}</strong>
        </p>

        <div className={styles.codeContainer}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={handleChange}
            className={styles.hiddenInput}
            disabled={isLoading || isResending}
            autoFocus
          />

          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.codeBox} ${
                code.length === index ? styles.codeBoxFocused : ""
              }`}
            >
              {code[index] || ""}
            </div>
          ))}
        </div>

        <div className={styles.resendTextContainer}>
          {secondsLeft > 0 && !isResending ? (
            <p>
              Resend code in <strong>{secondsLeft}s</strong>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className={styles.resendButton}
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>

        {error && (
          <div className={styles.validationError}>
            {error.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}
      </form>
    </>
  );
}
