"use client";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

// Convert "05:30 AM" to Date today
const to24HourDate = (time, period) => {
  if (!time) return null;
  let [hour, minute] = time.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
};

// Get current & upcoming prayers
const getPrayerStatus = (namazTiming) => {
  const prayers = ["fajr", "zohar", "asr", "maghrib", "isha","tahajjud"]; // skip sunrise
  const now = new Date();
  let prayerTimes = [];

  prayers.forEach((prayer) => {
    const entry = namazTiming[prayer];
    if (entry?.time) {
      const d = to24HourDate(entry.time, entry.period);
      if (d) prayerTimes.push({ prayer, time: d });
    }
  });

  prayerTimes.sort((a, b) => a.time - b.time);

  let current = null;
  let upcoming = null;

  for (let i = 0; i < prayerTimes.length; i++) {
    if (now < prayerTimes[i].time) {
      upcoming = prayerTimes[i];
      current = i === 0 ? prayerTimes[prayerTimes.length - 1] : prayerTimes[i - 1];
      break;
    }
  }

  // if all passed → current = last (Isha), upcoming = tomorrow's first (Fajr)
  if (!upcoming) {
    current = prayerTimes[prayerTimes.length - 1];
    upcoming = prayerTimes[0];
    upcoming.time.setDate(upcoming.time.getDate() + 1); // move fajr to tomorrow
  }

  return { current, upcoming };
};

// Format countdown
const formatTimeDiff = (targetTime) => {
  const now = new Date();
  const diffMs = targetTime - now;
  if (diffMs <= 0) return "Now";

  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours > 0 ? hours + "h " : ""}${minutes}m`;
};

const UpcomingPrayer = ({ namazTiming }) => {
  const [status, setStatus] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!namazTiming) return;

    const { current, upcoming } = getPrayerStatus(namazTiming);
    setStatus({ current, upcoming });
    setCountdown(formatTimeDiff(upcoming.time));

    const interval = setInterval(() => {
      setCountdown(formatTimeDiff(upcoming.time));
    }, 60000); // every minute

    return () => clearInterval(interval);
  }, [namazTiming]);

  if (!status) return <Loading />;

  return (
    <div className="p-2 bg-blue-100 rounded-lg text-center shadow-md shadow-blue-200 my-2 hover:shadow-lg hover:shadow-blue-300 hover:scale-95 text-black">
      <h3 className="text-lg font-medium">Your Amazing Update...!</h3>
      <p className="capitalize">Current : {status.current.prayer}</p>
      <p className="capitalize">Next : {status.upcoming.prayer}</p>
      <p className="text-green-600 font-medium">
        Starts in {countdown}
      </p>
      <p className="text-sm text-end text-gray-600">Check masjid near you...</p>
    </div>
  );
};

export default UpcomingPrayer;
