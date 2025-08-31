"use client";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PiMosqueDuotone } from "react-icons/pi";
import { GrFavorite } from "react-icons/gr";
import { useState } from "react";
import MasjidList from "./MasjidList";

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
    <main className="text-black overflow-y-auto mt-15 md:mt-18">
      <div className="mx-2">
        <input
          value={searchMasjid}
          type="text"
          className="w-full p-1 border-2 border-gray-400 text-black rounded-lg outline-none"
          placeholder='Search "masjid" by "name" or "location"'
          onChange={(e) => setSearchMasjid(e.target.value)}
        />
        <AiOutlineFileSearch className="absolute w-5 h-5 top-17 md:top-20 right-5 text-gray-500" />
      </div>
      <div className="m-2 h-[30%]">
        <h5 className="ml-2 flex items-center gap-1 mt-2 font-medium text-black">
          Favorites <GrFavorite className="w-4 h-4" />
        </h5>
        <div className="p-1">
          {favoriteMasjids.slice(0,2).map((item, index) => (
            <div
              key={index}
              className="flex items-center text-black text-base gap-4 border border-gray-400 my-1 rounded-lg p-1 "
            >
              <div className="bg-gray-300 rounded-lg shadow-xl p-1">
                {item.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span>{item.name}</span>
                <span>{item.location.substring(0, 20)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="m-2 h-[70%] overflow-y-auto text-black mb-10">
        <h5 className="ml-2 mt-1 font-medium text-black">
          All Masjids (Krishnagiri)
        </h5>
       <MasjidList searchMasjid={searchMasjid}/>
      </div>
    </main>
  );
};

export default Home;
