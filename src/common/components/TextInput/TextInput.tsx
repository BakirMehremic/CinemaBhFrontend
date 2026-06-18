import type { TextInputProps } from "./types/TextInputTypes.ts";
import { useState } from "react";
import styles from "./TextInput.module.css";

export default function TextInput({
  label,
  placeholder,
  Icon,
  value,
  onChange,
  error,
  type,
  required,
  minLength,
  maxLength,
}: TextInputProps) {
  const [inputValue, setInputValue] = useState(value ?? "");
  const [lengthError, setLengthError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);

    if (minLength && newValue.length > 0 && newValue.length < minLength) {
      setLengthError(`Minimum ${minLength} characters required`);
    } else if (maxLength && newValue.length > maxLength) {
      setLengthError(`Maximum ${maxLength} characters allowed`);
    } else {
      setLengthError("");
    }
  };

  const displayError = error || lengthError;

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        {Icon && <Icon size={20} className={styles.icon} />}
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          required={required}
        />
      </div>

      {displayError && <div className={styles.error}>{displayError}</div>}
    </div>
  );
}
