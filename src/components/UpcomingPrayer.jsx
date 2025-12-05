"use client";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaClock } from "react-icons/fa";

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
  const prayers = ["fajr", "zohar", "asr", "maghrib", "isha", "tahajjud"];
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

  if (!upcoming) {
    current = prayerTimes[prayerTimes.length - 1];
    upcoming = prayerTimes[0];
    upcoming.time.setDate(upcoming.time.getDate() + 1);
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

const getPrayerIcon = (prayer) => {
  if (prayer === "fajr" || prayer === "tahajjud") return <FaMoon className="w-5 h-5" />;
  if (prayer === "maghrib" || prayer === "isha") return <FaMoon className="w-5 h-5" />;
  return <FaSun className="w-5 h-5" />;
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
    }, 60000);

    return () => clearInterval(interval);
  }, [namazTiming]);

  if (!status) return <Loading />;

  return (
    <div className="p-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl text-gray-600 shadow-xl my-2 card-islamic border-none">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
          <FaClock className="w-5 h-5" />
          Prayer Times
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Current Prayer */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Current</p>
            <div className="flex items-center justify-center gap-2">
              {getPrayerIcon(status.current.prayer)}
              <p className="text-lg font-bold capitalize">{status.current.prayer}</p>
            </div>
          </div>

          {/* Next Prayer */}
          <div className="bg-amber-400 rounded-xl p-4 shadow-md">
            <p className="text-xs uppercase tracking-wide opacity-90 mb-1">Next</p>
            <div className="flex items-center justify-center gap-2">
              {getPrayerIcon(status.upcoming.prayer)}
              <p className="text-lg font-bold capitalize">{status.upcoming.prayer}</p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <p className="text-sm opacity-90 mb-1">Next prayer in</p>
          <p className="text-3xl font-bold pulse-gold">{countdown}</p>
        </div>

        <p className="text-xs mt-3 opacity-75 italic">
          May Allah accept your prayers 🤲
        </p>
      </div>
    </div>
  );
};

export default UpcomingPrayer;
