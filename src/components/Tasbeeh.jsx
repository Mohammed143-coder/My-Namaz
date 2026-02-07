"use client";
import { useState, useEffect } from "react";
import CommonHeader from "./CommonHeader";
import { HiRefresh } from "react-icons/hi";
import { BiMinus, BiPlus, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import confetti from "canvas-confetti";

const Tasbeeh = () => {
  const dhikrOptions = [
    {
      id: "subhanallah",
      arabic: "سُبْحَانَ اللَّهِ",
      transliteration: "SubhanAllah",
      translation: "Glory be to Allah",
      target: 33,
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "alhamdulillah",
      arabic: "الْحَمْدُ لِلَّهِ",
      transliteration: "Alhamdulillah",
      translation: "All praise is due to Allah",
      target: 33,
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "allahuakbar",
      arabic: "اللَّهُ أَكْبَرُ",
      transliteration: "Allahu Akbar",
      translation: "Allah is the Greatest",
      target: 34,
      color: "from-emerald-500 to-green-600",
    },
    {
      id: "lailahaillallah",
      arabic: "لَا إِلٰهَ إِلَّا اللَّهُ",
      transliteration: "La ilaha illallah",
      translation: "There is no deity except Allah",
      target: 100,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "astaghfirullah",
      arabic: "أَسْتَغْفِرُ اللَّهَ",
      transliteration: "Astaghfirullah",
      translation: "I seek forgiveness from Allah",
      target: 100,
      color: "from-amber-500 to-orange-600",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [counts, setCounts] = useState({});
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const selectedDhikr = dhikrOptions[currentIndex];
  const currentCount = counts[selectedDhikr.id] || 0;

  // Check if ALL targets are met
  const allTargetsMet = dhikrOptions.every((dhikr) => {
    return (counts[dhikr.id] || 0) >= dhikr.target;
  });

  // Trigger confetti when all targets are first met
  useEffect(() => {
    if (allTargetsMet && !hasCelebrated) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
      setHasCelebrated(true);
    } else if (!allTargetsMet) {
      setHasCelebrated(false);
    }
  }, [allTargetsMet, hasCelebrated]);

  // Navigate to next dhikr
  const nextDhikr = () => {
    setCurrentIndex((prev) => (prev + 1) % dhikrOptions.length);
  };

  // Navigate to previous dhikr
  const prevDhikr = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + dhikrOptions.length) % dhikrOptions.length,
    );
  };

  // Load counts from localStorage on mount
  useEffect(() => {
    const savedCounts = localStorage.getItem("tasbeeh-counts");
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts));
    } else {
      const initialCounts = {};
      dhikrOptions.forEach((dhikr) => {
        initialCounts[dhikr.id] = 0;
      });
      setCounts(initialCounts);
    }
  }, []);

  // Save counts to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(counts).length > 0) {
      localStorage.setItem("tasbeeh-counts", JSON.stringify(counts));
    }
  }, [counts]);

  const increment = () => {
    setCounts((prev) => ({
      ...prev,
      [selectedDhikr.id]: (prev[selectedDhikr.id] || 0) + 1,
    }));
  };

  const decrement = () => {
    setCounts((prev) => ({
      ...prev,
      [selectedDhikr.id]: Math.max(0, (prev[selectedDhikr.id] || 0) - 1),
    }));
  };

  const reset = () => {
    setCounts((prev) => ({
      ...prev,
      [selectedDhikr.id]: 0,
    }));
  };

  const resetAll = () => {
    const resetCounts = {};
    dhikrOptions.forEach((dhikr) => {
      resetCounts[dhikr.id] = 0;
    });
    setCounts(resetCounts);
  };

  // Calculate progress percentage
  const progress = Math.min((currentCount / selectedDhikr.target) * 100, 100);
  const isComplete = currentCount >= selectedDhikr.target;

  return (
    <section className="min-h-screen text-black p-4 pattern-bg pb-24">
      <CommonHeader>Digital Tasbeeh</CommonHeader>

      <main className="max-w-2xl mx-auto mt-6">
        {/* Daily Goal Success Banner */}
        {allTargetsMet && (
          <div className="mb-6 bg-gradient-to-r from-amber-100 to-yellow-50 border-2 border-amber-400 p-4 rounded-xl text-center animate-bounce-slight shadow-lg">
            <h3 className="text-xl font-bold text-amber-700 mb-1">
              🎉 Masha'Allah! Daily Goal Achieved
            </h3>
            <p className="text-amber-800 text-sm">
              You have completed all Tasbeeh targets for today. May Allah accept
              your efforts!
            </p>
          </div>
        )}

        {/* Main Counter Card */}
        <div
          className={`card-islamic p-6 md:p-10 mb-6 relative ${isComplete ? "pulse-gold card-gold" : ""} ${allTargetsMet ? "ring-4 ring-amber-400 ring-offset-2" : ""}`}
        >
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevDhikr}
              className="p-2 md:p-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-all"
              aria-label="Previous dhikr"
            >
              <BiChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Dhikr Indicators */}
            <div className="flex gap-1.5 md:gap-2">
              {dhikrOptions.map((dhikr, index) => (
                <div
                  key={dhikr.id}
                  className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 md:w-8 bg-emerald-500"
                      : "w-1.5 md:w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextDhikr}
              className="p-2 md:p-3 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-all"
              aria-label="Next dhikr"
            >
              <BiChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>

          {/* 1. Arabic Text Section */}
          <div className="mb-8 text-center min-h-[120px] md:min-h-[160px] flex items-center justify-center">
            <h2 className="text-4xl md:text-7xl font-bold arabic-text text-emerald-600 leading-tight py-2">
              {selectedDhikr.arabic}
            </h2>
          </div>

          {/* 2. English Text Section */}
          <div className="mb-10 text-center space-y-2">
            <p className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide">
              {selectedDhikr.transliteration}
            </p>
            <p className="text-sm md:text-base text-gray-500 font-medium">
              "{selectedDhikr.translation}"
            </p>
          </div>

          {/* 3. Buttons & Counter Section */}
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Main Interactive Elements */}
            <div className="relative flex items-center justify-center gap-4 md:gap-10 w-full">
              {/* Decrement (Left) */}
              <button
                onClick={decrement}
                disabled={currentCount === 0}
                className="p-4 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                aria-label="Decrease count"
              >
                <BiMinus className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Main Counter Ring */}
              <div
                className="relative cursor-pointer group"
                onClick={increment}
              >
                {/* Progress Ring SVG */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 transition-transform duration-200 group-active:scale-95">
                  <svg className="transform -rotate-90 w-full h-full">
                    {/* Background Circle */}
                    <circle
                      cx="50%"
                      cy="50%"
                      r="46%"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-100"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="50%"
                      cy="50%"
                      r="46%"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 46}%`} // Approximation for responsive sizing logic or just use fixed
                      strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress / 100)}%`} // This logic needs fixed radius, let's use fixed pixel values for consistency with replace
                      className={`${isComplete ? "text-amber-500" : "text-emerald-500"} transition-all duration-300 drop-shadow-sm`}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Inner Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-white shadow-inner border-4 border-gray-50">
                    <span
                      className={`text-6xl md:text-8xl font-bold ${isComplete ? "text-amber-500" : "text-emerald-600"}`}
                    >
                      {currentCount}
                    </span>
                    <span className="text-xs md:text-sm text-gray-400 font-medium mt-1 uppercase tracking-wider">
                      Count
                    </span>
                  </div>
                </div>

                {/* Tap Hint */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Tap to count
                </div>
              </div>

              {/* Reset (Right) */}
              <button
                onClick={reset}
                className="p-4 rounded-full bg-red-50 hover:bg-red-100 text-red-500 transition-all active:scale-95"
                aria-label="Reset count"
              >
                <HiRefresh className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Target Display */}
            <div className="bg-emerald-50 px-6 py-2 rounded-full text-emerald-700 text-sm font-semibold border border-emerald-100">
              Target: {selectedDhikr.target}
            </div>
          </div>
        </div>

        {/* All Counts Summary */}
        <div className="card-islamic p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald-700">
              All Dhikr Progress
            </h3>
            <button
              onClick={resetAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition flex items-center gap-1"
            >
              <HiRefresh className="w-4 h-4" />
              Reset All
            </button>
          </div>

          <div className="space-y-3">
            {dhikrOptions.map((dhikr, index) => {
              const count = counts[dhikr.id] || 0;
              const percentage = Math.min((count / dhikr.target) * 100, 100);

              return (
                <button
                  key={dhikr.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    index === currentIndex
                      ? "bg-emerald-50 border-2 border-emerald-500"
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {dhikr.transliteration}
                      </p>
                      <p className="text-sm text-gray-600">
                        {dhikr.translation}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-600">
                        {count}
                      </p>
                      <p className="text-xs text-gray-500">/ {dhikr.target}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${dhikr.color} transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </section>
  );
};

export default Tasbeeh;
