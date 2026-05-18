import TextInput from "../../../../common/components/TextInput/TextInput.tsx";
import { Lock, Mail } from "lucide-react";

export default function Register() {
  return (
    <>
      <TextInput
        Icon={Mail}
        label={"First Name"}
        placeholder={"John"}
        type={"text"}
        required={false}
        minLength={10}
      />
      <TextInput
        Icon={Mail}
        label={"Last Name"}
        placeholder={"Doe"}
        type={"text"}
        required={false}
      />
      <TextInput
        Icon={Mail}
        label={"Mail"}
        placeholder={"johndoe@example.com"}
        type={"text"}
        required={false}
      />
      <TextInput
        Icon={Lock}
        label={"Password"}
        placeholder={"Enter Password"}
        type={"password"}
        required={false}
      />
    </>
  );
}
