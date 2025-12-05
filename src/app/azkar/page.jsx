"use client";
import { useState, useMemo } from "react";
import AzkarCard from "@/components/AzkarCard";
import { sampleAzkar } from "@/data/sampleAzkar";
import { BiChevronRight } from "react-icons/bi";
import {
  FaSun,
  FaMoon,
  FaBed,
  FaCloudSun,
  FaMosque,
  FaUtensils,
  FaGlassWhiskey,
} from "react-icons/fa";
import { GiPrayerBeads } from "react-icons/gi";
import { BsMegaphone } from "react-icons/bs";
import { MdLogin, MdLogout } from "react-icons/md";

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
  ];

  // Filter azkar by selected category
  const filteredAzkar = useMemo(() => {
    if (!selectedCategory) return [];
    return sampleAzkar.filter((azkar) => azkar.category === selectedCategory);
  }, [selectedCategory]);

  // Category List View
  if (!selectedCategory) {
    return (
      <div className="min-h-screen pattern-bg pb-24">
        <div className="max-w-4xl mx-auto p-4">
          <div className="mt-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center gradient-text mb-2">
              Daily Azkar
            </h1>
            <p className="text-center text-gray-600">
              Your daily companion for remembrance of Allah
            </p>
          </div>

          <div className="mt-6 card-gold p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Daily Adhkar Collection
            </h3>
            <p className="text-gray-700">
              Select a category to view the specific azkar and supplications
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, index) => {
              const IconComponent = cat.icon;
              const categoryCount = sampleAzkar.filter(
                (a) => a.category === cat.id
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="card-islamic p-6 text-left hover:scale-105 transition-all group fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`bg-gradient-to-br ${cat.color} p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {cat.label}
                        </h3>
                        <BiChevronRight className="w-6 h-6 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {cat.description}
                      </p>
                      <span className="inline-block bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-semibold">
                        {categoryCount} {categoryCount === 1 ? "Dua" : "Duas"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 card-islamic p-6">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaMosque className="w-5 h-5 text-emerald-600" />
              About Daily Azkar
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">
              The Prophet Muhammad ﷺ taught us various supplications (azkar) for
              different times and situations. These azkar help us maintain a
              constant connection with Allah throughout our daily activities.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Reciting azkar brings blessings and protection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Each dua has specific benefits mentioned in Hadith</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>
                  Regular practice strengthens your relationship with Allah
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Azkar Detail View
  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const IconComponent = currentCategory?.icon || FaMosque;

  return (
    <div className="min-h-screen pattern-bg pb-24">
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
          className={`bg-gradient-to-br ${currentCategory?.color} p-8 rounded-2xl shadow-lg text-white`}
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

            {/* Count Summary */}
            {/* <div className="mt-8 card-gold p-6 text-center">
              <p className="text-gray-700">
                <span className="font-bold text-emerald-600 text-2xl">{filteredAzkar.length}</span>
                <span className="text-gray-600 ml-2">
                  {filteredAzkar.length === 1 ? 'supplication' : 'supplications'} in this category
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                May Allah accept your dhikr and grant you His blessings
              </p>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default AzkarPage;
