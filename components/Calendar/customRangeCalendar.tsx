"use client";

import {FC, useState, useEffect, useCallback, useMemo} from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfToday,
} from "date-fns";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";

interface CustomCalendarProps {
  selected: {startDate: Date | null; endDate: Date | null};
  onSelect: (range: {startDate: Date | null; endDate: Date | null}) => void;
  numberOfMonths: number;
}

const CustomCalendar: FC<CustomCalendarProps> = ({
  selected,
  onSelect,
  numberOfMonths,
}) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [months, setMonths] = useState<Date[]>([]);

  useEffect(() => {
    const monthArray = Array.from({length: numberOfMonths}, (_, i) =>
      add(currentMonth, {months: i})
    );
    setMonths(monthArray);
  }, [currentMonth, numberOfMonths]);

  const handleDayClick = useCallback(
    (day: Date) => {
      const {startDate, endDate} = selected;

      if (!startDate || (startDate && endDate)) {
        onSelect({startDate: day, endDate: null});
      } else {
        if (isBefore(day, startDate)) {
          onSelect({startDate: day, endDate: null});
        } else {
          onSelect({startDate, endDate: day});
        }
      }
    },
    [selected, onSelect]
  );

  const isInRange = useCallback(
    (day: Date) => {
      const {startDate, endDate} = selected;
      return startDate && endDate && day >= startDate && day <= endDate;
    },
    [selected]
  );

  const isRangeStart = useCallback(
    (day: Date) => isEqual(day, selected.startDate ? selected.startDate : ""),
    [selected]
  );

  const isRangeEnd = useCallback(
    (day: Date) => isEqual(day, selected.endDate ? selected.endDate : ""),
    [selected]
  );

  const previousMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => add(prevMonth, {months: -1}));
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => add(prevMonth, {months: 1}));
  }, []);

  const colStartClasses = useMemo(
    () => [
      "",
      "col-start-2",
      "col-start-3",
      "col-start-4",
      "col-start-5",
      "col-start-6",
      "col-start-7",
    ],
    []
  );

  const isBeforeToday = useCallback(
    (day: Date) => isBefore(day, today),
    [today]
  );

  const isPrevMonthDisabled = useMemo(() => {
    const prevMonth = add(currentMonth, {months: -1});
    return isBefore(prevMonth, startOfMonth(today));
  }, [currentMonth, today]);

  return (
    <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
      <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200">
        <div className="md:pr-14">
          <div className="flex items-center">
            <h2 className="flex flex-auto font-semibold text-gray-900">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={previousMonth}
              type="button"
              className={cn(
                "flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
                isPrevMonthDisabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={isPrevMonthDisabled}
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          {months.map((month) => {
            const firstDayCurrentMonth = startOfMonth(month);
            const days = eachDayOfInterval({
              start: firstDayCurrentMonth,
              end: endOfMonth(firstDayCurrentMonth),
            });

            return (
              <div key={month.toString()} className="mt-10">
                <div className="grid grid-cols-7 text-xs leading-6 text-center text-gray-500">
                  <div>S</div>
                  <div>M</div>
                  <div>T</div>
                  <div>W</div>
                  <div>T</div>
                  <div>F</div>
                  <div>S</div>
                </div>
                <div className="grid grid-cols-7 mt-2 text-sm">
                  {days.map((day, dayIdx) => (
                    <div
                      key={day.toString()}
                      className={cn(
                        dayIdx === 0 && colStartClasses[getDay(day)],
                        "py-2"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleDayClick(day)}
                        disabled={isBeforeToday(day)}
                        className={cn(
                          isInRange(day) && "bg-blue-100 text-blue-600",
                          isRangeStart(day) && "border-2 border-blue-600",
                          isRangeEnd(day) && "border-2 border-blue-600",
                          isToday(day) &&
                            !isRangeStart(day) &&
                            "text-indigo-600",
                          isSameMonth(day, firstDayCurrentMonth)
                            ? "text-gray-900"
                            : "text-gray-400",
                          isToday(day) && "font-semibold",
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-full",
                          isBeforeToday(day) && "cursor-not-allowed opacity-50",
                          // Hover styles
                          !selected.startDate
                            ? "hover:bg-purple-500"
                            : !selected.endDate
                            ? "hover:bg-orange-500"
                            : "hover:bg-gray-200"
                        )}
                      >
                        <time dateTime={format(day, "yyyy-MM-dd")}>
                          {format(day, "d")}
                        </time>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
