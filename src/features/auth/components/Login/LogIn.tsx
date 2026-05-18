import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail } from "lucide-react";
import { useContext, useState } from "react";
import { useLogin } from "../../hooks/useLogin.ts";
import { AuthContext } from "../../context/authContext.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const context = useContext(AuthContext);

  if (!context) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ email, password });
    context.login(result.user);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          Icon={Mail}
          label={"Mail"}
          placeholder={"adassa"}
          type={"text"}
          required={false}
          onChange={(val) => setEmail(val)}
        />
        <TextInput
          Icon={Lock}
          label={"Password"}
          placeholder={"Enter Password"}
          type={"password"}
          required={false}
          onChange={(val) => setPassword(val)}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Submit"}
        </button>
      </form>
    </>
  );
}
