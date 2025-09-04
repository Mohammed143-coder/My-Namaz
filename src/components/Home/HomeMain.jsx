"use client";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PiMosqueDuotone } from "react-icons/pi";
import { GrFavorite } from "react-icons/gr";
import { useState } from "react";
import MasjidList from "./MasjidList";
import Announcement from "@/components/Home/Announcement";

const Home = () => {
  const [searchMasjid, setSearchMasjid] = useState("");

  const favoriteMasjids = [
    {
      icon: <PiMosqueDuotone className="w-8 h-8" />,
      name: "Masjid al-Haram",
      location: "Makkah, Saudi Arabia",
    },
    {
      icon: <PiMosqueDuotone className="w-8 h-8" />,
      name: "Al-Masjid an-Nabawi",
      location: "Madinah, Saudi Arabia",
    },
    {
      icon: <PiMosqueDuotone className="w-8 h-8" />,
      name: "Sultan Ahmed Mosque (Blue Mosque)",
      location: "Istanbul, Turkey",
    },
  ];

  return (
    <main className="text-black mt-16 md:mt-20 h-screen overflow-hidden flex flex-col">
      {/* Search Bar */}
      <div className="relative mx-2 flex-shrink-0">
        <input
          value={searchMasjid}
          type="text"
          className="w-full p-2 pr-10 border-2 border-gray-400 text-black rounded-lg outline-none"
          placeholder='Search "masjid" by "name" or "location"'
          onChange={(e) => setSearchMasjid(e.target.value)}
        />
        <AiOutlineFileSearch className="absolute w-5 h-5 top-3 right-3 text-gray-500" />
      </div>

      {/* Split screen: Masjids & Announcements */}
      <div className="flex flex-col md:flex-row md:gap-3 flex-1 min-h-0 px-2">
        
        {/* Left column (Masjids) */}
        <div className="md:w-[60%] flex flex-col gap-4 flex-1 min-h-0">
          {/* Favorites (non-scrollable) */}
          <div className="m-1 flex-shrink-0">
            <h5 className="ml-2 flex items-center gap-1 mt-2 font-medium text-black">
              Favorites <GrFavorite className="w-4 h-4" />
            </h5>
            <div className="p-1">
              {favoriteMasjids.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-black text-base gap-4 border border-gray-400 my-1 rounded-lg p-2"
                >
                  <div className="bg-gray-300 rounded-lg shadow-xl p-2">
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span>{item.name}</span>
                    <span className="text-sm text-gray-600">
                      {item.location.substring(0, 20)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Masjids (scrollable list) */}
          <div className="my-1 mx-2 flex-1 min-h-0 flex flex-col border md:border-0 rounded-lg">
            <h5 className="ml-2 mt-1 font-medium text-black flex-shrink-0 py-1">
              All Masjids (Krishnagiri)
            </h5>
            <div className="flex-1 overflow-y-auto">
              <MasjidList searchMasjid={searchMasjid} />
            </div>
          </div>
        </div>

        {/* Right column (Announcements - scrollable) */}
        <div className="md:w-[40%] m-2 flex flex-col flex-1 min-h-0 border border-gray-400 shadow rounded-lg">
           <h5 className="ml-2 mt-1 font-medium text-black flex-shrink-0 py-1">
              Announcement (Krishnagiri)
            </h5>
          <div className="flex-1 overflow-y-auto  min-h-0 mb-2">
            <Announcement />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;