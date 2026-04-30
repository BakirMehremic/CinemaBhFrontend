export type DateRangeStrings = {
  from: string | undefined;
  to: string | undefined;
};

export type DateRangeProps = {
  onApply: (range: DateRangeStrings) => void;
  placeholder?: string;
};
