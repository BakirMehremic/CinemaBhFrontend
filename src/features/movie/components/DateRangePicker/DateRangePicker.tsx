import { useEffect, useRef, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  parseISO,
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
import type {
  DateRangeProps,
  DateRangeStrings,
} from "./types/dateRangePickerTypes";

export default function DateRangePicker({
  onApply,
  placeholder = "Select dates",
}: DateRangeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<DateRangeStrings>({
    from: null,
    to: null,
  });
  const [tempRange, setTempRange] = useState<DateRangeStrings>({
    from: null,
    to: null,
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const tomorrow = addDays(startOfToday(), 1);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateClick = (day: Date) => {
    if (isBefore(day, tomorrow)) return;
    const dateStr = format(day, "yyyy-MM-dd");

    if (!tempRange.from || (tempRange.from && tempRange.to)) {
      setTempRange({ from: dateStr, to: null });
    } else if (isBefore(day, parseISO(tempRange.from))) {
      setTempRange({ from: dateStr, to: null });
    } else {
      setTempRange({ ...tempRange, to: dateStr });
    }
  };

  const handleApply = () => {
    setSelectedRange(tempRange);
    onApply(tempRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    const clearedRange = { from: null, to: null };
    setSelectedRange(clearedRange);
    setTempRange(clearedRange);
    onApply(clearedRange);
    setIsOpen(false);
  };

  const formatForDisplay = (date: Date) => {
    return format(date, "yyyy/MM/dd");
  };
  const monthStart = startOfMonth(currentMonth);
  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart),
    end: endOfWeek(endOfMonth(monthStart)),
  });

  const tFrom = tempRange.from ? parseISO(tempRange.from) : null;
  const tTo = tempRange.to ? parseISO(tempRange.to) : null;
  const sFrom = selectedRange.from ? parseISO(selectedRange.from) : null;
  const sTo = selectedRange.to ? parseISO(selectedRange.to) : null;

  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.dropdownPlaceholder}>
          <Calendar className={styles.icon} />
          {sFrom
            ? `${formatForDisplay(sFrom)} - ${sTo ? formatForDisplay(sTo) : "..."}`
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
              <span className={tFrom ? styles.selectedDate : ""}>
                {tFrom ? formatForDisplay(tFrom) : "--"}
              </span>
            </div>
            <div className={styles.dateBox}>
              <label>End Date</label>
              <span className={tTo ? styles.selectedDate : ""}>
                {tTo ? formatForDisplay(tTo) : "--"}
              </span>
            </div>
          </div>

          <div className={styles.calendarContainer}>
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
            <div className={styles.calendarGrid}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className={styles.dayOfWeek}>
                  {d}
                </div>
              ))}
              {calendarDays.map((day, idx) => {
                const isSel =
                  (tFrom && isSameDay(day, tFrom)) ||
                  (tTo && isSameDay(day, tTo));
                const inRange =
                  tFrom &&
                  tTo &&
                  isWithinInterval(day, { start: tFrom, end: tTo });
                const isStart = tFrom && isSameDay(day, tFrom);
                const isEnd = tTo && isSameDay(day, tTo);
                const isSingle = isStart && isEnd;
                const isDisabled = isBefore(day, tomorrow);

                return (
                  <div
                    key={idx}
                    className={`
                    ${styles.day}
                    ${isSel ? styles.selectedDay : ""}
                    ${inRange ? styles.inRangeDay : ""}
                    ${isDisabled ? styles.disabledDay : ""}
                    ${isStart && !isSingle ? styles.right : ""}
                    ${isEnd && !isSingle ? styles.left : ""}
                  `}
                    onClick={() => handleDateClick(day)}
                  >
                    {format(day, "d")}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.footer}>
            <button
              className={styles.cancelBtn}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>

            {(tempRange.from !== null || tempRange.to !== null) && (
              <button
                className={styles.cancelBtn}
                onClick={handleClear}
                type="button"
              >
                Clear
              </button>
            )}

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
}
