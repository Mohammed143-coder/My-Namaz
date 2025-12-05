"use client";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useState } from "react";
import MasjidList from "./MasjidList";
import Announcement from "@/components/Home/Announcement";
import UpcomingPrayer from "../UpcomingPrayer";

const Home = () => {
  const [searchMasjid, setSearchMasjid] = useState("");

  const namazTiming = {
    fajr: { time: "04:40", period: "AM" },
    sunrise: { time: "06:00", period: "AM" },
    zohar: { time: "12:45", period: "PM" },
    asr: { time: "04:30", period: "PM" },
    maghrib: { time: "06:10", period: "PM" },
    isha: { time: "07:35", period: "PM" },
    tahajjud: { time: "01:25", period: "AM" }
  };

  return (
    <main className="min-h-screen text-charcoal mt-16 md:mt-20 pattern-bg pb-24">
      <div className="w-full px-2 md:px-4 max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="relative mt-20 md:mt-24 xl:mt-4 mb-4">
          <input
            value={searchMasjid}
            type="text"
            className="w-full p-3 pr-10 border-2 border-emerald-300 text-charcoal rounded-xl outline-none bg-white shadow-sm transition-all focus:border-gold-accent focus:shadow-md"
            placeholder='Search "masjid" by "name" or "location"'
            onChange={(e) => setSearchMasjid(e.target.value)}
          />
          <AiOutlineFileSearch className="absolute w-5 h-5 top-4 right-4 text-emerald-600" />
        </div>

        {/* Upcoming Prayer */}
        <div className="mb-4">
          <UpcomingPrayer namazTiming={namazTiming}/>
        </div>

        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Masjid List - Left/Top */}
          <div className="w-full md:w-2/3">
            <div className="card-islamic border-2 shadow-md">
              <h5 className="ml-2 mt-2 font-semibold text-emerald-700 py-2 px-2">
                All Masjids (Krishnagiri)
              </h5>
              {/* Scrollable container for masjid list ONLY */}
              <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                <MasjidList searchMasjid={searchMasjid} />
              </div>
            </div>
          </div>

          {/* Announcements - Right/Bottom */}
          <div className="w-full md:w-1/3">
            <div className="card-islamic shadow-lg border-2">
              <h5 className="ml-2 mt-2 font-semibold text-emerald-700 py-2 px-2 flex items-center gap-2">
                📢 Announcements
              </h5>
              {/* Scrollable container for announcements ONLY */}
              <div className="overflow-y-auto p-2" style={{ maxHeight: '400px' }}>
                <Announcement />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
