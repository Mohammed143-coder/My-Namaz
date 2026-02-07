"use client";
import { useState, useMemo } from "react";
import AzkarCard from "@/components/AzkarCard";
import { sampleAzkar } from "@/data/azkarData";

import {
  FaSun,
  FaMoon,
  FaBed,
  FaCloudSun,
  FaMosque,
  FaUtensils,
  FaGlassWhiskey,
  FaTshirt,
  FaPlaneDeparture,
  FaRegSmile,
} from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";
import { BsMegaphone } from "react-icons/bs";
import { MdExitToApp, MdHome, MdLogin, MdLogout } from "react-icons/md";
import CommonHeader from "@/components/CommonHeader";

const AzkarPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: "morning",
      label: "Morning Azkar",
      icon: FaSun,
      color: "from-amber-400 to-orange-500",
      description: "Start your day with remembrance",
    },
    {
      id: "evening",
      label: "Evening Azkar",
      icon: FaMoon,
      color: "from-indigo-500 to-purple-600",
      description: "End your day with gratitude",
    },
    {
      id: "before-sleeping",
      label: "Before Sleeping",
      icon: FaBed,
      color: "from-blue-500 to-indigo-600",
      description: "Sleep in peace and protection",
    },
    {
      id: "waking-up",
      label: "Upon Waking Up",
      icon: FaCloudSun,
      color: "from-yellow-400 to-amber-500",
      description: "Thank Allah for a new day",
    },
    {
      id: "after-prayer",
      label: "After Prayer",
      icon: GiPrayerBeads,
      color: "from-emerald-500 to-green-600",
      description: "Complete your salah with dhikr",
    },
    {
      id: "after-adhan",
      label: "After Adhan",
      icon: BsMegaphone,
      color: "from-teal-500 to-cyan-600",
      description: "Respond to the call to prayer",
    },
    {
      id: "entering-mosque",
      label: "Entering Mosque",
      icon: MdLogin,
      color: "from-emerald-600 to-teal-700",
      description: "Enter the house of Allah",
    },
    {
      id: "leaving-mosque",
      label: "Leaving Mosque",
      icon: MdLogout,
      color: "from-green-500 to-emerald-600",
      description: "Leave with blessings",
    },
    {
      id: "eating",
      label: "Eating Dua",
      icon: FaUtensils,
      color: "from-rose-500 to-pink-600",
      description: "Before and after meals",
    },
    {
      id: "drinking",
      label: "Drinking Dua",
      icon: FaGlassWhiskey,
      color: "from-blue-400 to-cyan-500",
      description: "Remember Allah while drinking",
    },

    // Newly added categories
    {
      id: "putting-on-clothes",
      label: "Putting on Clothes",
      icon: FaTshirt,
      color: "from-purple-500 to-fuchsia-600",
      description: "Thank Allah for clothing",
    },
    {
      id: "entering-house",
      label: "Entering the House",
      icon: MdHome,
      color: "from-emerald-400 to-teal-500",
      description: "Seek blessings when entering home",
    },
    {
      id: "leaving-house",
      label: "Leaving the House",
      icon: MdExitToApp,
      color: "from-orange-500 to-red-500",
      description: "Seek Allah’s protection when going out",
    },
    {
      id: "safar",
      label: "Travelling (Safar)",
      icon: FaPlaneDeparture,
      color: "from-sky-500 to-blue-600",
      description: "Duas for a safe and blessed journey",
    },
    {
      id: "seeing-mirror",
      label: "Seeing the Mirror",
      icon: FaRegSmile,
      color: "from-pink-400 to-rose-500",
      description: "Gratitude for creation and appearance",
    },
  ];

  // Filter azkar by selected category
  const filteredAzkar = useMemo(() => {
    if (!selectedCategory) return [];
    return sampleAzkar.filter((azkar) => azkar.category === selectedCategory);
  }, [selectedCategory]);

  // Category List View
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-white pb-24 pattern-bg">
        <div className="max-w-6xl mx-auto p-4">
          {/* Header */}
          <div className="mt-6 mb-8">
            <CommonHeader>Daily Azkar</CommonHeader>
          </div>

          {/* My Favorite Azkar Section */}
          <div className="flex items-center justify-between shadow-xl rounded-3xl p-6 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-emerald-600 mb-2">
                Azkar Collections
              </h2>
              <p className="text-gray-500 italic text-sm">
                Your Daily companion for remembrance of Allah
              </p>
            </div>
            <div className="text-6xl">📖</div>
          </div>

          {/* Azkar List Section */}
          <div className="bg-white/80 rounded-3xl pt-6 px-4 pb-6">
            <h3 className="text-xl font-semibold text-gray-600 mb-6">
              Azkar List
            </h3>

            <div className="space-y-3">
              {categories.map((cat, index) => {
                const IconComponent = cat.icon;
                const categoryCount = sampleAzkar.filter(
                  (a) => a.category === cat.id,
                ).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl flex-shrink-0">
                        {cat.id === "morning" && "🌤️"}
                        {cat.id === "evening" && "🌙"}
                        {cat.id === "before-sleeping" && "🛏️"}
                        {cat.id === "waking-up" && "🌅"}
                        {cat.id === "after-prayer" && "🧎"}
                        {cat.id === "after-adhan" && "🤲"}
                        {cat.id === "entering-mosque" && "🕌"}
                        {cat.id === "leaving-mosque" && "🕌"}
                        {cat.id === "eating" && "🍽️"}
                        {cat.id === "drinking" && "🥤"}

                        {/* Newly added categories */}
                        {cat.id === "putting-on-clothes" && "👕"}
                        {cat.id === "entering-house" && "🏠"}
                        {cat.id === "leaving-house" && "🚪"}
                        {cat.id === "safar" && "✈️"}
                        {cat.id === "seeing-mirror" && "🪞"}
                      </div>

                      <div className="flex-1 text-left">
                        <h4 className="text-lg font-semibold text-gray-600 mb-1">
                          {cat.label}
                        </h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Azkar Detail View
  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const IconComponent = currentCategory?.icon || FaMosque;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto p-4">
        {/* Simple Back Button */}
        <div className="mt-4 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all"
          >
            ← Back to Categories
          </button>
        </div>

        {/* Category Header */}
        <div
          className={`bg-gradient-to-br ${currentCategory?.color} p-6 rounded-2xl shadow-lg text-white`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <IconComponent className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                {currentCategory?.label}
              </h2>
              <p className="text-white/90 mt-1 text-lg">
                {currentCategory?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAzkar.length === 0 ? (
          <div className="card-islamic p-12 text-center mt-6">
            <IconComponent className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-semibold mb-2">
              No azkar available yet
            </p>
            <p className="text-sm text-gray-500">
              This category will be populated with authentic azkar soon,
              insha'Allah.
            </p>
          </div>
        ) : (
          <>
            {/* Azkar List */}
            <div className="mt-6 space-y-6">
              {filteredAzkar.map((azkar, index) => (
                <AzkarCard key={index} azkar={azkar} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AzkarPage;
