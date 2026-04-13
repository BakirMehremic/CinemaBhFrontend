import type { NameIdPair } from "../../../types/responseTypes.ts";
import type { LucideIcon } from "lucide-react";

export type NameIdDropdownProps = {
  options: NameIdPair[];
  onSelect: (option: NameIdPair) => void;
  placeholder: string;
  Icon: LucideIcon;
  width?: string;
};
