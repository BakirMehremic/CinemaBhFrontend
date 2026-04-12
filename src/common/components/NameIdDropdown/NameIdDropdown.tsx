import type { NameIdDropdownProps } from "./types/NameIdDropdownTypes.ts";
import type { NameIdPair } from "../../types/responseTypes.ts";
import { useState } from "react";
import styles from "./NameIdDropdown.module.css";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NameIdDropdown({
  options,
  onSelect,
  placeholder,
  Icon,
}: NameIdDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<NameIdPair | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: NameIdPair) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleClear = () => {
    setSelected(null);
    setIsOpen(false);
    onSelect(null as any);
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        type="button"
      >
        <span className={styles.dropdownPlaceholder}>
          <Icon className={styles.icon} />
          {selected ? selected.name : placeholder}
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
              key={option.id}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
