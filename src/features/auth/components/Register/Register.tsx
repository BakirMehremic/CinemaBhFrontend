import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail, User } from "lucide-react";
import { useContext, useState } from "react";
import { useRegister } from "../../hooks/useRegister.ts";
import { AuthContext } from "../../context/authContext.ts";
import styles from "./Register.module.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, error } = useRegister();

  const context = useContext(AuthContext);

  if (!context) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      console.log(result);

      if (result) {
        context.login(result);
        setIsSuccess(true);
        setTimeout(() => {
          context.closeAuthDrawer();
          setIsSuccess(false);
        }, 1500);
      }
    } catch (err) {
      // Error already handled in hook
    }
  };

  if (isSuccess) {
    return (
      <div style={{ color: "green", textAlign: "center", padding: "20px" }}>
        <h3>✓ Account Created!</h3>
        <p>
          Welcome to CinemaBh, {context.currentUser?.first_name || firstName}!
        </p>
      </div>
    );
  }

  return (
    <>
      <form id="authForm" onSubmit={handleSubmit}>
        <TextInput
          Icon={User}
          label={"First Name"}
          placeholder={"John"}
          type={"text"}
          required={true}
          onChange={(val) => setFirstName(val)}
          minLength={2}
          maxLength={254}
        />
        <TextInput
          Icon={User}
          label={"Last Name"}
          placeholder={"Doe"}
          type={"text"}
          required={true}
          onChange={(val) => setLastName(val)}
          minLength={2}
          maxLength={254}
        />
        <TextInput
          Icon={Mail}
          label={"Mail"}
          placeholder={"johndoe@example.com"}
          type={"text"}
          required={true}
          onChange={(val) => setEmail(val)}
          minLength={8}
          maxLength={254}
        />
        <TextInput
          Icon={Lock}
          label={"Password"}
          placeholder={"Create Password"}
          type={"password"}
          required={true}
          onChange={(val) => setPassword(val)}
          minLength={8}
          maxLength={48}
        />
        <div className={styles.validationError}>{error}</div>
      </form>
    </>
  );
}
