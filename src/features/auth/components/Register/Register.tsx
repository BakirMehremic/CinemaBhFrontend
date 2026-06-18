import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useRegister } from "../../hooks/useRegister.ts";
import styles from "./Register.module.css";
import useAuth from "../../hooks/useAuth.ts";
import { INPUT_LIMITS } from "../../constant/inputSizeConst.ts";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const { register, error } = useRegister();
  const context = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMatchError("");

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }

    context.setIsLoading(true);

    const result = await register({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    if (result) {
      context.setVerificationEmail(email);
      context.setAuthDrawerState("VERIFY_ACCOUNT");
    }
  };

  return (
    <form id="authForm" onSubmit={handleSubmit}>
      <TextInput
        Icon={User}
        label="First Name"
        placeholder="John"
        type="text"
        required={true}
        onChange={setFirstName}
        minLength={INPUT_LIMITS.NAME.MIN}
        maxLength={INPUT_LIMITS.NAME.MAX}
      />
      <TextInput
        Icon={User}
        label="Last Name"
        placeholder="Doe"
        type="text"
        required={true}
        onChange={setLastName}
        minLength={INPUT_LIMITS.NAME.MIN}
        maxLength={INPUT_LIMITS.NAME.MAX}
      />
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
        placeholder="Create Password"
        type="password"
        required={true}
        onChange={setPassword}
        minLength={INPUT_LIMITS.PASSWORD.MIN}
        maxLength={INPUT_LIMITS.PASSWORD.MAX}
      />
      <TextInput
        Icon={Lock}
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        required={true}
        onChange={setConfirmPassword}
        minLength={INPUT_LIMITS.PASSWORD.MIN}
        maxLength={INPUT_LIMITS.PASSWORD.MAX}
      />

      {passwordMatchError && (
        <div className={styles.validationError}>
          <p>{passwordMatchError}</p>
        </div>
      )}

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
