import type { OptionsDropdownTypes } from "./types/OptionsDropdownTypes.ts";
import { useState } from "react";
import styles from "./OptionsDropdown.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OptionsDropdown<T>({
  options,
  onSelect,
  placeholder,
  Icon,
  width = "20.97vw",
  getId,
  getLabel,
}: OptionsDropdownTypes<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: T) => {
    setSelected(option);
    setIsOpen(false);
    onSelect(option);
  };

  const handleClear = () => {
    setSelected(null);
    setIsOpen(false);
    onSelect(null);
  };
  return (
    <div className={styles.dropdown} style={{ width }}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles.dropdownPlaceholder}>
          <Icon className={styles.icon} />
          {selected ? getLabel(selected) : placeholder}
        </span>

        {isOpen ? (
          <ChevronUp className={styles.arrowIcon} />
        ) : (
          <ChevronDown className={styles.arrowIcon} />
        )}
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {selected && (
            <li className={styles.dropdownItem} onClick={handleClear}>
              Clear selection
            </li>
          )}

          {options.map((option) => (
            <li
              key={getId(option)}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {getLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
