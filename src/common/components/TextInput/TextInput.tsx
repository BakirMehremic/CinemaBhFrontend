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
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <Icon size={20} className={styles.icon} />
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
        />
      </div>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </div>
  );
}
