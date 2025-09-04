"use client";
import { useState } from "react";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import axios from "axios";

const NamazTimingsForm = ({ User }) => {
  const prayers = ["Fajr", "Sunrise", "Zohar", "Asr", "Maghrib", "Isha"];
  const [selected, setSelected] = useState("no");
  // Map frontend label → backend field
  const prayerMap = {
    Fajr: "fajr",
    Sunrise: "sunrise",
    Zohar: "zohar",
    Asr: "asr",
    Maghrib: "maghrib",
    Isha: "isha",
  };

  const [timings, setTimings] = useState(
    prayers.reduce((acc, prayer) => {
      acc[prayer] = { time: "", period: "AM" };
      return acc;
    }, {})
  );

  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);

  // Validate HH:MM format
  const isValidTime = (time) => /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

  const handleChange = (prayer, field, value) => {
    setTimings((prev) => ({
      ...prev,
      [prayer]: { ...prev[prayer], [field]: value },
    }));
  };

  const handleSaveTimings = async (e) => {
    e.preventDefault();

    // validation before API call
    for (const prayer of prayers) {
      if (!isValidTime(timings[prayer].time)) {
        alert(`${prayer} time is invalid. Use HH:MM format`);
        return;
      }
    }

    setLoading(true);
    try {
      const payload = {
        namazTiming: prayers.reduce((acc, prayer) => {
          acc[prayerMap[prayer]] = {
            time: timings[prayer].time,
            period: timings[prayer].period,
          };
          return acc;
        }, {}),
      };

      const res = await axios.put(`/api/namaz?userId=${User.id}`, payload);

      if (!res.data?.success) {
        console.info(res.data?.message || "Update failed");
        return;
      }
      alert("Namaz timing updated successfully ✅");

      // reset form
      setTimings(
        prayers.reduce((acc, prayer) => {
          acc[prayer] = { time: "", period: "AM" };
          return acc;
        }, {})
      );
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnnouncement = async () => {
    if (!announcement.trim()) {
      alert("Please enter an announcement");
      return;
    }
    setSavingAnnouncement(true);
    try {
      const res = await axios.post(`/api/announcement?userId=${User.id}`, {
        announcement,
      });
      if (!res.data?.success) {
        alert(res.data?.message || "Failed to save announcement");
        return;
      }
      alert("Announcement saved ✅");
      setAnnouncement("");
    } catch (err) {
      console.error(err);
      alert("Error saving announcement");
    } finally {
      setSavingAnnouncement(false);
    }
  };

  return (
    <div className="w-full h-screen p-4 bg-white text-black">
      <CommonHeader>Timings & Announcement</CommonHeader>
      <h5 className="text-center mt-2 font-medium">Welcome {User.userName}</h5>

      {/* Timings Form */}
      <form onSubmit={handleSaveTimings}>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {prayers.map((prayer) => (
            <div key={prayer}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {prayer}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name={`${prayer}-time`}
                  placeholder="HH:MM"
                  value={timings[prayer]?.time}
                  onChange={(e) => handleChange(prayer, "time", e.target.value)}
                  className="w-full border border-gray-400 rounded px-2 py-1 bg-gray-100 outline-none"
                />
                <select
                  value={timings[prayer]?.period}
                  name={`${prayer}-period`}
                  onChange={(e) =>
                    handleChange(prayer, "period", e.target.value)
                  }
                  className="border border-gray-400 rounded px-2 py-1 bg-gray-100 outline-none"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full md:w-40 py-2 rounded-lg border-2 ${
            loading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Saving..." : "Save Timings"}
        </button>
      </form>

      {/* Announcement Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Announcement</h3>
        <textarea
          placeholder="Enter announcement..."
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full border rounded px-2 py-2 bg-gray-100 outline-none"
        />
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={selected}
              onClick={() => {console.log(selected)
                setSelected(!selected)}} // toggle on/off
              readOnly // prevents React warning
            />
            Important
          </label>
        </div>
        <button
          onClick={handleSaveAnnouncement}
          disabled={savingAnnouncement}
          className={`mt-2 w-full md:w-44 py-2 rounded-lg ${
            savingAnnouncement
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {savingAnnouncement ? "Saving..." : "Save Announcement"}
        </button>
      </div>
    </div>
  );
};

export default NamazTimingsForm;
