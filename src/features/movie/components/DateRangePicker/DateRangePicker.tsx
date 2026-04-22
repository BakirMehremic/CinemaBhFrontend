import React, { useEffect, useRef, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import styles from "./DateRangePicker.module.css";

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface Props {
  onApply: (range: DateRange) => void;
  placeholder?: string;
}

const DateRangePicker: React.FC<Props> = ({
  onApply,
  placeholder = "Select dates",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const [tempRange, setTempRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const today = startOfToday();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (day: Date) => {
    if (isBefore(day, today)) return; // Only future dates

    if (!tempRange.from || (tempRange.from && tempRange.to)) {
      setTempRange({ from: day, to: null });
    } else if (isBefore(day, tempRange.from)) {
      setTempRange({ from: day, to: null });
    } else {
      setTempRange({ ...tempRange, to: day });
    }
  };

  const handleApply = () => {
    setSelectedRange(tempRange);
    onApply(tempRange);
    setIsOpen(false);
  };

  const renderHeader = () => (
    <div className={styles.calendarHeader}>
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        type="button"
      >
        <ChevronLeft size="1.2vw" />
      </button>
      <span className={styles.currentMonthName}>
        {format(currentMonth, "MMMM yyyy")}
      </span>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        type="button"
      >
        <ChevronRight size="1.2vw" />
      </button>
    </div>
  );

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className={styles.calendarGrid}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className={styles.dayOfWeek}>
            {d}
          </div>
        ))}
        {calendarDays.map((day, idx) => {
          const isSelected =
            (tempRange.from && isSameDay(day, tempRange.from)) ||
            (tempRange.to && isSameDay(day, tempRange.to));
          const inRange =
            tempRange.from &&
            tempRange.to &&
            isWithinInterval(day, { start: tempRange.from, end: tempRange.to });
          const isDisabled = isBefore(day, today);

          return (
            <div
              key={idx}
              className={`${styles.day} 
                ${isSelected ? styles.selectedDay : ""} 
                ${inRange ? styles.inRangeDay : ""} 
                ${isDisabled ? styles.disabledDay : ""}`}
              onClick={() => handleDateClick(day)}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.dropdownPlaceholder}>
          <Calendar className={styles.icon} />
          {selectedRange.from
            ? `${format(selectedRange.from, "dd.MM.yyyy")} - ${selectedRange.to ? format(selectedRange.to, "dd.MM.yyyy") : "..."}`
            : placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className={styles.arrowIcon} />
        ) : (
          <ChevronDown className={styles.arrowIcon} />
        )}
      </button>

      {isOpen && (
        <div className={styles.datePickerMenu}>
          <div className={styles.rangeDisplay}>
            <div className={styles.dateBox}>
              <label>Start Date</label>
              <div>
                {tempRange.from ? format(tempRange.from, "MMM dd, yyyy") : "--"}
              </div>
            </div>
            <div className={styles.dateBox}>
              <label>End Date</label>
              <div>
                {tempRange.to ? format(tempRange.to, "MMM dd, yyyy") : "--"}
              </div>
            </div>
          </div>

          <div className={styles.calendarContainer}>
            {renderHeader()}
            {renderDays()}
          </div>

          <div className={styles.footer}>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={styles.applyBtn}
              onClick={handleApply}
              disabled={!tempRange.to}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
