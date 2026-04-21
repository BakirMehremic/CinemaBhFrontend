import type { OptionsDropdownTypes } from "./types/OptionsDropdownTypes.ts";
import { useEffect, useRef, useState } from "react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const listRef = useRef<HTMLUListElement>(null);

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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef?.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const itemsCount = options.length;

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < itemsCount - 1 ? prev + 1 : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : itemsCount - 1));
      }

      if (e.key === "Enter") {
        e.preventDefault();
        handleSelect(options[highlightedIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, options, handleSelect]);

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlightedItem =
        listRef.current.children[highlightedIndex + (selected ? 1 : 0)];
      highlightedItem?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex, selected]);

  return (
    <div ref={dropdownRef} className={styles.dropdown} style={{ width }}>
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
        <ul ref={listRef} className={styles.dropdownMenu}>
          {selected && (
            <li className={styles.dropdownItem} onClick={handleClear}>
              Clear selection
            </li>
          )}

          {options.map((option, index) => (
            <li
              key={getId(option)}
              className={
                index === highlightedIndex
                  ? styles.dropdownItemHighlighted
                  : styles.dropdownItem
              }
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {getLabel(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
