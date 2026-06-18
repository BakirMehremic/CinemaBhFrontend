import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin.ts";
import styles from "./Login.module.css";
import { useAuth } from "../../hooks/useAuth.ts";
import { INPUT_LIMITS } from "../../constant/inputSizeConst.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginApi, error } = useLogin();

  const context = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    context.setIsLoading(true);

    const authenticatedUser = await loginApi({ email, password });

    if (authenticatedUser) {
      context.login(authenticatedUser);
      setTimeout(() => {
        context.closeAuthDrawer();
      }, 1500);
    }

    context.setIsLoading(false);
  };

  return (
    <form id="authForm" onSubmit={handleSubmit}>
      <TextInput
        Icon={Mail}
        label="Email"
        placeholder="johndoe@example.com"
        type="email"
        required={true}
        onChange={setEmail}
        minLength={INPUT_LIMITS.EMAIL.MIN}
        maxLength={INPUT_LIMITS.EMAIL.MAX}
      />
      <TextInput
        Icon={Lock}
        label="Password"
        placeholder="Enter Password"
        type="password"
        required={true}
        onChange={setPassword}
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
  );
}
