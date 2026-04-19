import styles from "./DatePicker.module.css";
import { useState } from "react";
import type { DatePickerProps } from "./types/datePickerTypes.ts";

export default function DatePicker({ onSelect }: DatePickerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const dates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      isoDate: date.toLocaleDateString("en-CA"),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      monthAndDay: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });

  const handleDateSelect = (index: number) => {
    setActiveIndex(index);
    onSelect(dates[index].isoDate);
  };

  return (
    <div className={styles.container}>
      {dates.map((item, index) => (
        <div
          key={index}
          className={index === activeIndex ? styles.activeBox : styles.box}
          onClick={() => handleDateSelect(index)}
        >
          <div
            className={
              index === activeIndex ? styles.activeMonthDay : styles.monthDay
            }
          >
            {item.monthAndDay}
          </div>
          <div
            className={index === activeIndex ? styles.activeDate : styles.date}
          >
            {item.day}
          </div>
        </div>
      ))}
    </div>
  );
}
