"use client";
import { useState, useEffect } from "react";
import moment from "moment-hijri";

export const useHijriDate = () => {
  const [hijriDate, setHijriDate] = useState({
    day: "",
    month: "",
    year: "",
    formatted: "",
    loading: true,
  });

  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Krishnagiri&country=India&method=2",
        );
        const data = await response.json();

        if (data.code === 200) {
          const hijri = data.data.date.hijri;
          setHijriDate({
            day: hijri.day,
            month: hijri.month.en,
            year: hijri.year,
            formatted: `${hijri.day} ${hijri.month.en} ${hijri.year}`,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Error fetching Hijri date:", error);
        // Fallback to moment-hijri if API fails
        moment.locale("en");
        const now = moment();
        setHijriDate({
          day: now.format("iD"),
          month: now.format("iMMMM"),
          year: now.format("iYYYY"),
          formatted: now.format("iD iMMMM iYYYY"),
          loading: false,
        });
      }
    };

    fetchHijriDate();

    // Update at midnight
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
    );
    const msToMidnight = night.getTime() - now.getTime();

    const midnightTimer = setTimeout(() => {
      fetchHijriDate();
      // Set up daily interval after first midnight
      const dailyInterval = setInterval(fetchHijriDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyInterval);
    }, msToMidnight);

    return () => clearTimeout(midnightTimer);
  }, []);

  return hijriDate;
};

export default useHijriDate;
