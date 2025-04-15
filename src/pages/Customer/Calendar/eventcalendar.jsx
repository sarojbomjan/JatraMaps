import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function EventCalendar({ events }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  useEffect(() => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayIndex = firstDay.getDay();

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ date: null, events: [] });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === i &&
          eventDate.getMonth() === currentMonth &&
          eventDate.getFullYear() === currentYear
        );
      });

      days.push({ date, events: dayEvents });
    }

    const totalDaysNeeded = 42;
    if (days.length < totalDaysNeeded) {
      for (let i = 0; i < totalDaysNeeded - days.length; i++) {
        days.push({ date: null, events: [] });
      }
    }

    setCalendarDays(days);
  }, [currentDate, events, currentMonth, currentYear]);

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getEventColor = (category) => {
    switch (category) {
      case "Tech":
        return "bg-blue-500";
      case "Music":
        return "bg-purple-500";
      case "Art":
        return "bg-green-500";
      case "Food":
        return "bg-orange-500";
      case "Charity":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="p-6 bg-[#e8f4f1] dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden text-gray-200">
      {/* Calendar header */}
      <div className="grid grid-cols-3 items-center mb-4 relative z-10">
        <div className="flex justify-start">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-white/50 transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center">
          {monthNames[currentMonth]} {currentYear}
        </h2>

        <div className="flex justify-end">
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-white/50 transition-colors flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((day, index) => (
          <div key={index} className="text-center font-medium text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-[60px] p-1 relative ${
              !day.date ? "opacity-30" : ""
            } ${
              isToday(day.date)
                ? "bg-white/50 dark:bg-gray-700/50 rounded-md"
                : ""
            }`}
          >
            <div className="text-center">
              {day.date ? day.date.getDate() : ""}
            </div>

            {day.events.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1 justify-center">
                {day.events.slice(0, 3).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex items-center gap-1 text-xs truncate text-gray-800 dark:text-gray-200"
                    title={event.title}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${getEventColor(
                        event.category
                      )}`}
                    />
                    <span className="truncate">{event.title}</span>
                  </div>
                ))}

                {day.events.length > 3 && (
                  <div className="text-xs text-center w-full">
                    +{day.events.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
