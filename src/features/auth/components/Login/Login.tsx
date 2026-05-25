import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin.ts";
import styles from "./Login.module.css";
import useAuth from "../../hooks/useAuth.ts";
import { INPUT_LIMITS } from "../../constant/inputSizeConst.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginApi, error } = useLogin();

  const context = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authenticatedUser = await loginApi({ email, password });
      if (authenticatedUser) {
        context.login(authenticatedUser);
        setTimeout(() => {
          context.closeAuthDrawer();
        }, 1500);
      }
    } catch (err) {
      const rawErrorMessages = err.response?.data;
      if (
        rawErrorMessages?.resend_verification_code_at ||
        rawErrorMessages?.message === "Please verify your account"
      ) {
        context.setVerificationEmail(email);
        context.setResendVerificationCodeAt(
          rawErrorMessages?.resend_verification_code_at,
        );
        context.setAuthDrawerState("VERIFY_ACCOUNT");
      }
    }
  };

  return (
    <>
      <form id="authForm" onSubmit={handleSubmit}>
        <TextInput
          Icon={Mail}
          label={"Mail"}
          placeholder={"johndoe@example.com"}
          type={"text"}
          required={false}
          onChange={(val) => setEmail(val)}
          minLength={INPUT_LIMITS.EMAIL.MIN}
          maxLength={INPUT_LIMITS.EMAIL.MAX}
        />
        <TextInput
          Icon={Lock}
          label={"Password"}
          placeholder={"Enter Password"}
          type={"password"}
          required={false}
          onChange={(val) => setPassword(val)}
          minLength={INPUT_LIMITS.PASSWORD.MIN}
          maxLength={INPUT_LIMITS.PASSWORD.MAX}
        />
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
