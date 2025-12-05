"use client";
import { useState } from "react";
import CommonHeader from "./CommonHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import RadioButton from "./RadioButton";

const NamazTimingsForm = ({ User }) => {
  const prayersWithAzanNamaz = ["Fajr", "Zohar", "Asr", "Maghrib", "Isha"];
  const [isImportant, setIsImportant] = useState(false);

  // State for prayers
  const [timingsWithAzan, setTimingsWithAzan] = useState(
    prayersWithAzanNamaz.reduce((acc, prayer) => {
      acc[prayer] = {
        azanTime: { time: "", period: "AM" },
        namazTime: { time: "", period: "AM" },
      };
      return acc;
    }, {})
  );

  // Sunrise
  const [sunriseTime, setSunriseTime] = useState({ time: "", period: "AM" });

  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);

  const isValidTime = (time) =>
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

  const handleAzanNamazChange = (prayer, type, field, value) => {
    setTimingsWithAzan((prev) => ({
      ...prev,
      [prayer]: {
        ...prev[prayer],
        [type]: { ...prev[prayer][type], [field]: value },
      },
    }));
  };

  const handleSunriseChange = (field, value) => {
    setSunriseTime((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveTimings = async (e) => {
    e.preventDefault();

    for (const prayer of prayersWithAzanNamaz) {
      if (!isValidTime(timingsWithAzan[prayer].azanTime.time)) {
        alert(`${prayer} Azan time invalid`);
        return;
      }
      if (!isValidTime(timingsWithAzan[prayer].namazTime.time)) {
        alert(`${prayer} Namaz time invalid`);
        return;
      }
    }

    if (!isValidTime(sunriseTime.time)) {
      alert("Sunrise time invalid");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        namazTiming: {
          fajr: timingsWithAzan.Fajr,
          sunrise: sunriseTime,
          zohar: timingsWithAzan.Zohar,
          asr: timingsWithAzan.Asr,
          maghrib: timingsWithAzan.Maghrib,
          isha: timingsWithAzan.Isha,
        },
      };

      const res = await axios.put(`/api/namaz?userId=${User.id}`, payload);

      if (!res.data?.success) {
        alert(res.data?.message || "Update failed");
        return;
      }

      alert("Namaz timing updated successfully");

      setTimingsWithAzan(
        prayersWithAzanNamaz.reduce((acc, prayer) => {
          acc[prayer] = {
            azanTime: { time: "", period: "AM" },
            namazTime: { time: "", period: "AM" },
          };
          return acc;
        }, {})
      );

      setSunriseTime({ time: "", period: "AM" });
    } catch (error) {
      alert("Error saving timings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnnouncement = async () => {
    if (!announcement.trim()) {
      alert("Enter announcement");
      return;
    }

    setSavingAnnouncement(true);

    try {
      const res = await axios.post(`/api/announcement?userId=${User.id}`, {
        message: announcement,
        type: isImportant ? "important" : "common",
        userId: User.id,
      });

      if (!res.data?.success) {
        alert(res.data?.message || "Failed to save");
        return;
      }

      alert("Announcement saved");
      setAnnouncement("");
      setIsImportant(false);
    } catch (err) {
      alert("Error saving announcement");
    } finally {
      setSavingAnnouncement(false);
    }
  };

  return (
    <div className="w-full min-h-screen pb-24 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <h5 className="text-2xl font-bold">Welcome, {User.userName} 👋</h5>
          <p className="text-emerald-50 mt-2">Manage your masjid timings</p>
        </div>

        {/* Timings Form */}
        <form onSubmit={handleSaveTimings} className="mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-emerald-100">
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl p-3">
                <span className="text-3xl">🕌</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Prayer Timings
                </h3>
                <p className="text-sm text-gray-600">
                  Set Azan & Namaz time for each prayer
                </p>
              </div>
            </div>

            {/* Prayers Loop */}
            {prayersWithAzanNamaz.map((prayer) => (
              <div
                key={prayer}
                className="mb-6 p-5 bg-gradient-to-r from-gray-50 to-emerald-50 rounded-xl border border-emerald-100 hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">📿</span> {prayer}
                </h4>

                {/* GRID FIXED (Full Width but Properly Centered) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Azan */}
                  <div className="w-full">
                    <label className="block text-sm font-semibold">
                      Azan Time
                    </label>
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        placeholder="HH:MM"
                        value={timingsWithAzan[prayer].azanTime.time}
                        onChange={(e) =>
                          handleAzanNamazChange(
                            prayer,
                            "azanTime",
                            "time",
                            e.target.value
                          )
                        }
                        className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2.5"
                      />
                      <select
                        value={timingsWithAzan[prayer].azanTime.period}
                        onChange={(e) =>
                          handleAzanNamazChange(
                            prayer,
                            "azanTime",
                            "period",
                            e.target.value
                          )
                        }
                        className="w-24 border-2 border-emerald-200 rounded-lg px-3 py-2.5"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Namaz */}
                  <div className="w-full">
                    <label className="block text-sm font-semibold">
                      Namaz Time
                    </label>
                    <div className="flex gap-2 w-full">
                      <input
                        type="text"
                        placeholder="HH:MM"
                        value={timingsWithAzan[prayer].namazTime.time}
                        onChange={(e) =>
                          handleAzanNamazChange(
                            prayer,
                            "namazTime",
                            "time",
                            e.target.value
                          )
                        }
                        className="w-full border-2 border-emerald-200 rounded-lg px-4 py-2.5"
                      />
                      <select
                        value={timingsWithAzan[prayer].namazTime.period}
                        onChange={(e) =>
                          handleAzanNamazChange(
                            prayer,
                            "namazTime",
                            "period",
                            e.target.value
                          )
                        }
                        className="w-24 border-2 border-emerald-200 rounded-lg px-3 py-2.5"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* SUNRISE FIXED ALIGNMENT */}
            <div className="mb-6 p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
                🌅 Sunrise
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full">
                  <label className="block text-sm font-semibold">Time</label>
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      placeholder="HH:MM"
                      value={sunriseTime.time}
                      onChange={(e) =>
                        handleSunriseChange("time", e.target.value)
                      }
                      className="w-full border-2 border-orange-200 rounded-lg px-4 py-2.5"
                    />
                    <select
                      value={sunriseTime.period}
                      onChange={(e) =>
                        handleSunriseChange("period", e.target.value)
                      }
                      className="w-24 border-2 border-orange-200 rounded-lg px-3 py-2.5"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3.5 rounded-xl font-bold text-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white"
            >
              {loading ? "Saving..." : "Save Timings"}
            </button>
          </div>
        </form>

        {/* ANNOUNCEMENT */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 mb-6">
          <h3 className="text-xl font-bold mb-4">Announcement</h3>

          <textarea
            placeholder="Enter announcement..."
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 mb-4"
            rows={5}
          />

          <RadioButton
            label="Mark as Important"
            checked={isImportant}
            onChange={setIsImportant}
            name="announcement-type"
          />

          <button
            type="button"
            onClick={handleSaveAnnouncement}
            className="mt-4 w-full md:w-auto px-8 py-3.5 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          >
            {savingAnnouncement ? "Saving..." : "Save Announcement"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NamazTimingsForm;
