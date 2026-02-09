"use client";

import { useState, useEffect } from "react";
import CommonHeader from "@/components/CommonHeader";
import MasjidList from "@/components/Home/MasjidList";
import { AiOutlineFileSearch } from "react-icons/ai";
import { PiMosqueDuotone } from "react-icons/pi";

const AllMasjidsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-white pb-24 pattern-bg">
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <CommonHeader>All Masjids</CommonHeader>

        {/* Search Bar */}
        <div className="relative mt-6 mb-8 group">
          <input
            value={searchQuery}
            type="text"
            className="w-full p-4 pr-12 border-2 border-emerald-100 text-charcoal rounded-2xl outline-none bg-white shadow-sm transition-all focus:border-emerald-500 focus:shadow-xl focus:scale-[1.01]"
            placeholder="Search masjids by name or location..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AiOutlineFileSearch className="absolute w-6 h-6 top-4 right-4 text-emerald-400 group-focus-within:text-emerald-600 transition-colors" />
        </div>

        {/* Listing Section */}
        <div className="card-islamic border-2 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden rounded-3xl">
          <div className="bg-emerald-600 p-4 flex items-center gap-3 text-white">
            <PiMosqueDuotone className="w-6 h-6" />
            <h2 className="font-bold text-lg">Masjid Directory (Krishnagiri)</h2>
          </div>

          <div className="p-2 min-h-[400px]">
            <MasjidList searchMasjid={debouncedQuery} />
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-2 rounded-lg text-amber-600 text-xl">
              💡
            </div>
            <div>
              <h3 className="font-bold text-amber-900 mb-1">Stay Connected</h3>
              <p className="text-amber-800 text-sm leading-relaxed">
                Add masjids to your favorites by tapping the heart icon. Your
                favorite masjids will appear on your home screen for quick
                access to prayer times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllMasjidsPage;
