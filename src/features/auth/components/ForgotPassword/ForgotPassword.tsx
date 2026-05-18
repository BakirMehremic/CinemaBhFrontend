import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  return (
    <>
      <h1>forgot password</h1>
      <TextInput
        Icon={Mail}
        label={"Mail"}
        placeholder={"adassa"}
        type={"text"}
      />
    </>
  );
}
