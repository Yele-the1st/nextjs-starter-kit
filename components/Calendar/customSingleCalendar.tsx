"use client";

import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isDate,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomCalendarProps {
  mode?: "single"; // Set mode to single only
  defaultMonth?: Date;
  selected?: Date | null;
  onSelect?: (date: Date) => void;
  numberOfMonths?: number;
}

const CustomCalendar: FC<CustomCalendarProps> = ({
  mode = "single",
  defaultMonth,
  selected,
  onSelect,
  numberOfMonths = 4,
}) => {
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(
    format(defaultMonth || today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const handleSelect = (day: Date) => {
    if (onSelect) {
      // Single day selection
      onSelect(day);
    }
  };

  const handlePreviousMonth = () => {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  };

  const handleNextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const generateDaysForMonth = (monthStart: Date) => {
    return eachDayOfInterval({
      start: startOfMonth(monthStart),
      end: endOfMonth(monthStart),
    });
  };

  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  // Create an array for the number of months to display
  const monthDisplays = Array.from({ length: numberOfMonths }, (_, index) =>
    add(firstDayCurrentMonth, { months: index })
  );

  // Check if the current month is the same as the month for today
  const isCurrentMonth =
    format(firstDayCurrentMonth, "MMM-yyyy") === format(today, "MMM-yyyy");

  return (
    <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
      <div className="md:grid md:grid-cols-1 md:divide-x md:divide-gray-200 lg:grid-cols-2">
        {monthDisplays.map((monthStart, index) => (
          <div
            key={index}
            className={index > 0 ? "hidden lg:block lg:pl-14" : "md:pr-14"}
          >
            <div className="flex items-center">
              <h2 className="flex flex-auto font-semibold text-gray-900">
                {format(monthStart, "MMMM yyyy")}
              </h2>
              {index === 0 && (
                <button
                  onClick={handlePreviousMonth}
                  type="button"
                  className={cn(
                    "-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
                    isCurrentMonth && "cursor-not-allowed text-gray-300"
                  )}
                  disabled={isCurrentMonth}
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
              {index === 0 && (
                <button
                  onClick={handleNextMonth}
                  type="button"
                  className="-m-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {generateDaysForMonth(monthStart).map((day, dayIdx) => {
                const isSelected = isDate(selected)
                  ? isEqual(day, selected)
                  : false;
                const isDisabled = day < today;

                return (
                  <div
                    key={day.toString()}
                    className={cn(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-2"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => !isDisabled && handleSelect(day)}
                      className={cn(
                        isSelected && "text-white",
                        !isSelected && isToday(day) && "text-indigo-600",
                        !isSelected &&
                          !isToday(day) &&
                          isSameMonth(day, monthStart) &&
                          "text-gray-900",
                        !isSelected &&
                          !isToday(day) &&
                          !isSameMonth(day, monthStart) &&
                          "text-gray-400",
                        isSelected && isToday(day) && "bg-indigo-600",
                        isSelected && !isToday(day) && "bg-gray-900",
                        !isSelected && !isDisabled && "hover:bg-gray-200",
                        isDisabled && "text-gray-300 cursor-not-allowed",
                        (isSelected || isToday(day)) && "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                      disabled={isDisabled} // Apply disabled property
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
