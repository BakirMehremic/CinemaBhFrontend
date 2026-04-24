export type DateRangeStrings = {
  from: string | null;
  to: string | null;
};

export type DateRangeProps = {
  onApply: (range: DateRangeStrings) => void;
  placeholder?: string;
};
