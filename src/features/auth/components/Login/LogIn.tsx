import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail } from "lucide-react";
import { useContext, useState } from "react";
import { useLogin } from "../../hooks/useLogin.ts";
import { AuthContext } from "../../context/authContext.ts";
import styles from "./Login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { login, error } = useLogin();

  const context = useContext(AuthContext);

  if (!context) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await login({ email, password });
    if (user) {
      context.login(user);
      setIsSuccess(true);
      setTimeout(() => {
        context.closeAuthDrawer();
        setIsSuccess(false);
      }, 1500);
    }
    context.login(user);
  };

  if (isSuccess) {
    return (
      <div style={{ color: "green", textAlign: "center", padding: "20px" }}>
        <h3>✓ Login Successful!</h3>
        <p>Welcome back, {context.currentUser?.first_name || "User"}.</p>
      </div>
    );
  }

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
          minLength={8}
          maxLength={254}
        />
        <TextInput
          Icon={Lock}
          label={"Password"}
          placeholder={"Enter Password"}
          type={"password"}
          required={false}
          onChange={(val) => setPassword(val)}
          minLength={8}
          maxLength={48}
        />
        <div className={styles.validationError}>{error}</div>
      </form>
    </>
  );
}
