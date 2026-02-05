"use client";

import { useState, useEffect } from "react";
import moment from "moment-hijri";
import { FaChevronLeft, FaChevronRight, FaMoon } from "react-icons/fa";

// Important Islamic dates (Hijri month and day)
const ISLAMIC_EVENTS = {
  "1-1": { name: "Islamic New Year", color: "bg-purple-100 border-purple-500" },
  "1-10": { name: "Ashura", color: "bg-red-100 border-red-500" },
  "3-12": { name: "Mawlid", color: "bg-green-100 border-green-500" },
  "7-27": { name: "Isra Mi'raj", color: "bg-blue-100 border-blue-500" },
  "8-15": { name: "Mid-Sha'ban", color: "bg-indigo-100 border-indigo-500" },
  "9-1": { name: "Ramadan", color: "bg-emerald-200 border-emerald-600" },
  "9-21": { name: "Laylat al-Qadr", color: "bg-yellow-100 border-yellow-600" },
  "9-23": { name: "Laylat al-Qadr", color: "bg-yellow-100 border-yellow-600" },
  "9-25": { name: "Laylat al-Qadr", color: "bg-yellow-100 border-yellow-600" },
  "9-27": { name: "Laylat al-Qadr", color: "bg-amber-100 border-amber-600" },
  "9-29": { name: "Laylat al-Qadr", color: "bg-yellow-100 border-yellow-600" },
  "10-1": { name: "Eid al-Fitr", color: "bg-pink-100 border-pink-600" },
  "12-9": { name: "Arafah", color: "bg-orange-100 border-orange-600" },
  "12-10": { name: "Eid al-Adha", color: "bg-rose-100 border-rose-600" },
};

// Moon phase calculation
const getMoonPhase = (hijriDay) => {
  if (hijriDay <= 3) return "🌑";
  if (hijriDay <= 7) return "🌒";
  if (hijriDay <= 10) return "🌓";
  if (hijriDay <= 13) return "🌔";
  if (hijriDay <= 17) return "🌕";
  if (hijriDay <= 20) return "🌖";
  if (hijriDay <= 24) return "🌗";
  if (hijriDay <= 28) return "🌘";
  return "🌑";
};

// Convert Arabic/Urdu numerals to English numerals
const toEnglishNumber = (str) => {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return String(str)
    .split("")
    .map((char) => {
      const index = arabicNumerals.indexOf(char);
      return index !== -1 ? englishNumerals[index] : char;
    })
    .join("");
};

export default function IslamicMonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    // Configure moment-hijri to use English locale
    moment.locale("en");
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const startOfMonth = moment(currentDate).startOf("iMonth");
    const endOfMonth = moment(currentDate).endOf("iMonth");
    const startDate = moment(startOfMonth).startOf("week");
    const endDate = moment(endOfMonth).endOf("week");

    const days = [];
    let day = moment(startDate);

    while (day.isSameOrBefore(endDate)) {
      days.push({
        gregorian: day.format("D"),
        hijri: toEnglishNumber(day.format("iD")),
        hijriMonth: toEnglishNumber(day.format("iM")),
        isCurrentMonth: day.isSame(currentDate, "iMonth"),
        isToday: day.isSame(moment(), "day"),
        date: moment(day),
      });
      day = day.add(1, "day");
    }

    setCalendarDays(days);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "iMonth"));
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "iMonth"));
  };

  const getEventForDate = (hijriMonth, hijriDay) => {
    const key = `${hijriMonth}-${hijriDay}`;
    return ISLAMIC_EVENTS[key];
  };

  const isRamadan = (hijriMonth) => hijriMonth === "9";

  return (
    <div className="card-islamic p-3 md:p-6">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Previous month"
          >
            <FaChevronLeft className="w-3.5 h-3.5 md:w-5 md:h-5 text-gray-600" />
          </button>

          <div className="text-center">
            <h3 className="text-base md:text-2xl font-bold text-gray-800">
              {currentDate.locale("en").format("MMMM YYYY")}
            </h3>
            <p className="text-xs md:text-base text-emerald-600 font-semibold">
              {toEnglishNumber(currentDate.locale("en").format("iMMMM iYYYY"))}
            </p>
          </div>

          <button
            onClick={goToNextMonth}
            className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Next month"
          >
            <FaChevronRight className="w-3.5 h-3.5 md:w-5 md:h-5 text-gray-600" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-0.5 md:gap-2 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
            <div
              key={idx}
              className="text-center font-semibold text-gray-600 text-[10px] md:text-sm"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-2">
        {calendarDays.map((dayData, index) => {
          const event = getEventForDate(dayData.hijriMonth, dayData.hijri);
          const moonPhase = getMoonPhase(parseInt(dayData.hijri));
          const isRamadanMonth = isRamadan(dayData.hijriMonth);

          return (
            <div
              key={index}
              className={`
                aspect-square border rounded-md md:rounded-lg p-0.5 md:p-1 text-center transition hover:shadow-md
                ${!dayData.isCurrentMonth ? "opacity-40" : ""}
                ${
                  dayData.isToday
                    ? "border-2 border-emerald-600 bg-emerald-50"
                    : event
                      ? event.color + " border-2"
                      : isRamadanMonth && dayData.isCurrentMonth
                        ? "bg-emerald-50/50 border-emerald-200"
                        : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div className="flex flex-col h-full justify-between text-[8px] md:text-xs leading-none md:leading-normal">
                <div className="flex justify-between items-start">
                  <span
                    className={`font-semibold ${dayData.isToday ? "text-emerald-700" : "text-gray-700"}`}
                  >
                    {dayData.hijri}
                   
                  </span>
                  <span className="text-[8px] opacity-80">{moonPhase}</span>
                </div>

                <div className="text-center pt-0.5">
                  <div
                    className={`text-[9px] md:text-sm font-bold ${dayData.isToday ? "text-emerald-600" : "text-gray-600"}`}
                  >
                     {dayData.gregorian}
                  </div>
                  {event && (
                    <div className="text-[7px] md:text-[8px] font-semibold text-gray-700 leading-tight mt-0.5">
                      {event.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
        <h4 className="text-xs md:text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <FaMoon className="text-emerald-600" />
          Legend
        </h4>
        <div className="grid grid-cols-2 gap-1.5 md:gap-2 text-[10px] md:text-xs">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-emerald-600 bg-emerald-50 rounded flex-shrink-0"></div>
            <span className="truncate">Today</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-pink-600 bg-pink-100 rounded flex-shrink-0"></div>
            <span className="truncate">Eid</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-emerald-600 bg-emerald-50/50 rounded flex-shrink-0"></div>
            <span className="truncate">Ramadan</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-amber-600 bg-yellow-100 rounded flex-shrink-0"></div>
            <span className="truncate">Special Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
