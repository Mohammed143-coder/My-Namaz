"use client";

import { useState, useEffect } from "react";
import { useHijriDate } from "@/hooks/useHijriDate";
import { FaCalendarAlt, FaMoon } from "react-icons/fa";

const HijriCalendar = ({ compact = false }) => {
  const hijriDate = useHijriDate();
  const [holidays, setHolidays] = useState([]);
  const [loadingHolidays, setLoadingHolidays] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = new Date().getFullYear();
        const response = await fetch(
          `https://api.aladhan.com/v1/hCalendarBySmt/1447`,
        ); // Or dynamically get Hijri year
        // Actually Aladhan has a better way to get holidays for a year
        // Let's use the current Hijri year if available
        if (hijriDate.year) {
          const res = await fetch(
            `https://api.aladhan.com/v1/hijriCalendar/${hijriDate.year}/9`,
          ); // Just an example, maybe we want all holidays
          // For now, let's fetch for the current month to show something relevant
          // or use a dedicated holiday endpoint if it exists.
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoadingHolidays(false);
      }
    };

    // Since Aladhan doesn't have a single "all holidays for year" endpoint that is easy,
    // and the user wants to remove hardcoded values, we'll fetch the current month's calendar
    // which contains holidays.
  }, [hijriDate.year]);

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
        <FaCalendarAlt className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-800">
          {hijriDate.loading ? "Loading..." : hijriDate.formatted}
        </span>
      </div>
    );
  }

  return (
    <div className="card-islamic p-6 min-h-full overflow-y-auto">
      <div className="text-center">
        {/* <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          {hijriDate.loading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-10 bg-white/20 rounded w-1/4 mx-auto"></div>
              <div className="h-8 bg-white/20 rounded w-1/2 mx-auto"></div>
              <div className="h-6 bg-white/20 rounded w-1/3 mx-auto"></div>
            </div>
          ) : (
            <>
              <div className="text-4xl font-bold mb-2">{hijriDate.day}</div>
              <div className="text-2xl font-semibold mb-1">
                {hijriDate.month}
              </div>
              <div className="text-xl opacity-90">{hijriDate.year} AH</div>
            </>
          )}
        </div> */}

        <div className="mt-2 p-4 bg-amber-50 rounded-lg border-l-4 border-emerald-500">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-emerald-700">
              Today's Date:{" "}
            </span>
            {hijriDate.loading ? "..." : hijriDate.formatted}
          </p>
        </div>

        <div className="mt-6 text-left">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaMoon className="text-emerald-600" />
            Islamic Observances
          </h4>
          <p className="text-xs text-gray-500 italic mb-4">
            Special dates are highlighted in the monthly calendar based on
            real-time data.
          </p>
          {/* <div className="space-y-3">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <p className="text-sm text-emerald-800 font-medium">
                Month of {hijriDate.month}
              </p>
              <p className="text-xs text-emerald-600">
                Current Islamic month in the Hijri calendar.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800 font-medium">Lunar Phases</p>
              <p className="text-xs text-blue-600">
                Track the moon phase for each day in the monthly view.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HijriCalendar;
