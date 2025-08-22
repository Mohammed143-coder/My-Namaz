"use client";
import { useState } from "react";
import { FaPersonPraying } from "react-icons/fa6";

const NamazTimingsForm = () => {
  const prayers = ["Fajr", "Sunrise", "Zohar", "Asar", "Maghrib", "Isha"];
  const [timings, setTimings] = useState(
    prayers.reduce((acc, prayer) => {
      acc[prayer] = { time: "", period: "AM" };
      return acc;
    }, {})
  );

  const [announcement, setAnnouncement] = useState("");

  const handleChange = (prayer, field, value) => {
    setTimings((prev) => ({
      ...prev,
      [prayer]: { ...prev[prayer], [field]: value },
    }));
  };

  const handleSaveTimings = (formData) => {
    const timings = {};
    prayers?.forEach((prayer) => {
      timings[prayer] = {
        time: formData?.get(`${prayer}-time`),   // ✅ matches input name
      period: formData?.get(`${prayer}-period`)
      };
    });

    console.log("Saved Timings:", timings);
  };

  const handleSaveAnnouncement = () => {
    console.log("Saved Announcement:", announcement);
    alert("Announcement saved ✅");
  };

  return (
    <div className="w-full h-screen p-4 bg-white shadow-xl text-black">
      <h2 className="flex items-center justify-center gap-2 text-lg text-blue-400 font-semibold mb-4">Namaz Timings <FaPersonPraying /></h2>
      <form onSubmit={handleSaveTimings}>
        <div className="grid grid-cols-2 gap-4 mt-10">
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
          className="mt-6 w-full md:w-40 bg-black text-white py-2 rounded-lg hover:bg-blue-600 border-2"
        >
          Save Timings
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
        <button
          onClick={handleSaveAnnouncement}
          className="mt-2 w-full md:w-44  bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Save Announcement
        </button>
      </div>
    </div>
  );
};

export default NamazTimingsForm;
