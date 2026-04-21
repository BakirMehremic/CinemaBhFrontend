import type { LucideIcon } from "lucide-react";

export type OptionsDropdownTypes<T> = {
  options: T[];
  onSelect: (option: T | null) => void;
  placeholder: string;
  Icon: LucideIcon;
  width?: string;

  getId: (item: T) => string | number;
  getLabel: (item: T) => string;
};
