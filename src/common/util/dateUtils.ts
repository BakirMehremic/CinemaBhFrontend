import { MILLISECONDS_IN_DAY } from "../constants/timeConstants.ts";

export function formatUpcomingDate(dateStr: string) {
  const date = new Date(dateStr);

  if (Number.isNaN(date.getDay())) {
    return null;
  }

  const now = new Date();

  const diffDays = (date.getTime() - now.getTime()) / MILLISECONDS_IN_DAY;

  const isWithin7Days = diffDays <= 7 && diffDays >= 0;

  if (isWithin7Days) {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
