"use client";

import { useState, useEffect } from "react";
import moment from "moment-hijri";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMoon,
  FaCalendarAlt,
} from "react-icons/fa";

// Moon phase calculation
const getMoonPhase = (hijriDay) => {
  const day = parseInt(hijriDay);
  if (day <= 3) return "🌑";
  if (day <= 7) return "🌒";
  if (day <= 10) return "🌓";
  if (day <= 13) return "🌔";
  if (day <= 17) return "🌕";
  if (day <= 20) return "🌖";
  if (day <= 24) return "🌗";
  if (day <= 28) return "🌘";
  return "🌑";
};

export default function IslamicMonthlyCalendar() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCalendarData();
  }, [currentDate]);

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      setError(null);
      const year = currentDate.year();
      const month = currentDate.month() + 1; // 1-indexed

      const response = await fetch(
        `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Krishnagiri&country=India&method=2`,
      );
      const data = await response.json();

      if (data.code === 200) {
        setCalendarData(data.data);
      } else {
        throw new Error("Failed to fetch calendar data");
      }
    } catch (err) {
      console.error("Error fetching calendar:", err);
      setError("Unable to load calendar data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month"));
  };

  // Generate the grid including padding days for the start and end of the month
  const generateGrid = () => {
    if (!calendarData.length) return [];

    const firstDayOfMonth = moment(currentDate).startOf("month").day(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = calendarData.length;

    const grid = [];

    // Add empty cells for the previous month's days
    for (let i = 0; i < firstDayOfMonth; i++) {
      grid.push({ type: "empty" });
    }

    // Add current month's days
    calendarData.forEach((dayData) => {
      grid.push({
        type: "day",
        gregorian: dayData.date.gregorian,
        hijri: dayData.date.hijri,
        isToday: moment().format("DD-MM-YYYY") === dayData.date.gregorian.date,
      });
    });

    // Fill the rest of the week if necessary
    const totalCellsNeeded = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    for (let i = grid.length; i < totalCellsNeeded; i++) {
      grid.push({ type: "empty" });
    }

    return grid;
  };
  const gridDays = generateGrid();

  return (
    <div className="card-islamic p-3 md:p-6 min-h-full">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1.5 md:p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition border border-transparent hover:border-emerald-200"
            aria-label="Previous month"
          >
            <FaChevronLeft className="w-3.5 h-3.5 md:w-5 md:h-5" />
          </button>

          <div className="text-center">
            <h3 className="text-base md:text-2xl font-bold text-gray-800">
              {currentDate.locale("en").format("MMMM YYYY")}
            </h3>
            {calendarData.length > 0 && (
              <p className="text-xs md:text-base text-emerald-600 font-semibold flex items-center justify-center gap-1">
                <FaMoon className="w-3 h-3" />
                {calendarData[0].date.hijri.month.en} -{" "}
                {calendarData[calendarData.length - 1].date.hijri.month.en}{" "}
                {calendarData[0].date.hijri.year} AH
              </p>
            )}
          </div>

          <button
            onClick={goToNextMonth}
            className="p-1.5 md:p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition border border-transparent hover:border-emerald-200"
            aria-label="Next month"
          >
            <FaChevronRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
            <div
              key={idx}
              className="text-center font-bold text-emerald-700 text-[10px] md:text-sm uppercase tracking-wider"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      {loading ? (
        <div className="grid grid-cols-7 gap-1 md:gap-2 animate-pulse">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 bg-red-50 rounded-xl border border-red-100">
          <p>{error}</p>
          <button
            onClick={fetchCalendarData}
            className="mt-2 text-sm underline"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {gridDays.map((dayData, index) => {
            if (dayData.type === "empty") {
              return <div key={index} className="aspect-square"></div>;
            }

            const { gregorian, hijri, isToday } = dayData;
            const holidays = hijri.holidays || [];
            const moonPhase = getMoonPhase(hijri.day);
            const isRamadan = hijri.month.number === 9;
            const isUrs = holidays?.some(h =>
  h.toLowerCase().includes("urs")
);
            

            return (
              <div
                key={index}
                className={`
                  relative aspect-square border rounded-md md:rounded-xl p-1 md:p-2 transition-all hover:shadow-lg group
                  ${
                    isToday
                      ? "border-2 border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100 ring-offset-1"
                      : holidays.length > 0
                        ? "bg-amber-50 border-amber-300 shadow-sm"
                        : isRamadan
                          ? "bg-emerald-50/30 border-emerald-100"
                          : "border-gray-100 bg-white hover:border-emerald-200"
                  }
                `}
              >
                {/* Gregorian Day (Top Left) */}
                <div className="absolute top-1 left-1 md:top-2 md:left-2">
                  <span
                    className={`text-[10px] md:text-lg font-bold ${isToday ? "text-emerald-700" : "text-gray-500 group-hover:text-emerald-500"}`}
                  >
                    {gregorian.day}
                  </span>
                </div>

                {/* Hijri Day (Bottom Right) */}
                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 text-right">
                  <div className="flex flex-col items-end leading-none">
                    <span className="text-[8px] md:text-xs text-gray-400 mb-2">
                      {moonPhase}
                    </span>
                    <span
                      className={`text-[10px] md:text-base font-bold ${isToday ? "text-emerald-600" : "text-emerald-700"}`}
                    >
                      {hijri.day}
                    </span>
                  </div>
                </div>

                {/* Festival / Holiday Label */}
                {holidays.length > 0 && !isUrs && (
                  <div className="absolute inset-0 flex items-end justify-center p-1 pointer-events-none">
                    <div className="bg-amber-100/80 text-amber-800 text-[6px] md:text-[9px] font-bold px-1 py-0.5 rounded text-center leading-tight shadow-sm border border-amber-300 uppercase tracking-tighter">
                      {holidays[0]}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Legend & Info */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-3 text-[10px] md:text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 border-2 border-emerald-500 bg-emerald-50 rounded"></div>
            <span className="text-gray-600 font-medium">Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 border-2 border-amber-300 bg-amber-50 rounded"></div>
            <span className="text-gray-600 font-medium">Islamic Festival</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 border border-emerald-200 bg-emerald-50/30 rounded"></div>
            <span className="text-gray-600 font-medium">Ramadan</span>
          </div>
        </div>

        {/* <div className="text-[10px] md:text-xs text-emerald-600 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
          <FaCalendarAlt className="w-3 h-3" />
          Adjustments based on Aladhan API (0 delay)
        </div> */}
      </div>
    </div>
  );
}
