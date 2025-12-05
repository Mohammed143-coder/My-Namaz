'use client'
import { useState, useEffect } from 'react'
import CommonHeader from './CommonHeader'
import { HiRefresh } from 'react-icons/hi'
import { BiMinus, BiPlus, BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const Tasbeeh = () => {
  const dhikrOptions = [
    { 
      id: 'subhanallah',
      arabic: 'سُبْحَانَ اللَّهِ',
      transliteration: 'SubhanAllah',
      translation: 'Glory be to Allah',
      target: 33,
      color: 'from-emerald-500 to-green-600'
    },
    { 
      id: 'alhamdulillah',
      arabic: 'الْحَمْدُ لِلَّهِ',
      transliteration: 'Alhamdulillah',
      translation: 'All praise is due to Allah',
      target: 33,
      color: 'from-emerald-500 to-green-600'
    },
    { 
      id: 'allahuakbar',
      arabic: 'اللَّهُ أَكْبَرُ',
      transliteration: 'Allahu Akbar',
      translation: 'Allah is the Greatest',
      target: 34,
      color: 'from-emerald-500 to-green-600'
    },
    { 
      id: 'lailahaillallah',
      arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ',
      transliteration: 'La ilaha illallah',
      translation: 'There is no deity except Allah',
      target: 100,
      color: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'astaghfirullah',
      arabic: 'أَسْتَغْفِرُ اللَّهَ',
      transliteration: 'Astaghfirullah',
      translation: 'I seek forgiveness from Allah',
      target: 100,
      color: 'from-amber-500 to-orange-600'
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [counts, setCounts] = useState({})

  const selectedDhikr = dhikrOptions[currentIndex]
  const currentCount = counts[selectedDhikr.id] || 0

  // Navigate to next dhikr
  const nextDhikr = () => {
    setCurrentIndex((prev) => (prev + 1) % dhikrOptions.length)
  }

  // Navigate to previous dhikr
  const prevDhikr = () => {
    setCurrentIndex((prev) => (prev - 1 + dhikrOptions.length) % dhikrOptions.length)
  }

  // Load counts from localStorage on mount
  useEffect(() => {
    const savedCounts = localStorage.getItem('tasbeeh-counts')
    if (savedCounts) {
      setCounts(JSON.parse(savedCounts))
    } else {
      const initialCounts = {}
      dhikrOptions.forEach(dhikr => {
        initialCounts[dhikr.id] = 0
      })
      setCounts(initialCounts)
    }
  }, [])

  // Save counts to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(counts).length > 0) {
      localStorage.setItem('tasbeeh-counts', JSON.stringify(counts))
    }
  }, [counts])

  const increment = () => {
    setCounts(prev => ({
      ...prev,
      [selectedDhikr.id]: (prev[selectedDhikr.id] || 0) + 1
    }))
  }

  const decrement = () => {
    setCounts(prev => ({
      ...prev,
      [selectedDhikr.id]: Math.max(0, (prev[selectedDhikr.id] || 0) - 1)
    }))
  }

  const reset = () => {
    setCounts(prev => ({
      ...prev,
      [selectedDhikr.id]: 0
    }))
  }

  const resetAll = () => {
    const resetCounts = {}
    dhikrOptions.forEach(dhikr => {
      resetCounts[dhikr.id] = 0
    })
    setCounts(resetCounts)
  }

  // Calculate progress percentage
  const progress = Math.min((currentCount / selectedDhikr.target) * 100, 100)
  const isComplete = currentCount >= selectedDhikr.target

  return (
    <section className="min-h-screen text-black p-4 pattern-bg pb-24">
      <CommonHeader>Digital Tasbeeh</CommonHeader>
      
      <main className="max-w-2xl mx-auto mt-6">
        {/* Main Counter Card */}
        <div className={`card-islamic p-8 mb-6 relative ${isComplete ? 'pulse-gold card-gold' : ''}`}>
          
          {/* Navigation and Arabic Text */}
          <div className="flex items-center justify-between mb-6">
            {/* Previous Button */}
            <button
              onClick={prevDhikr}
              className="p-3 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-all"
              aria-label="Previous dhikr"
            >
              <BiChevronLeft className="w-8 h-8 text-emerald-700" />
            </button>

            {/* Arabic Text */}
            <div className="text-center flex-1 mx-4">
              <h2 className="text-5xl md:text-6xl font-bold arabic-text text-emerald-700 mb-3">
                {selectedDhikr.arabic}
              </h2>
              <p className="text-lg font-semibold text-gray-700 mb-1">
                {selectedDhikr.transliteration}
              </p>
              <p className="text-sm text-gray-600 italic">
                {selectedDhikr.translation}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={nextDhikr}
              className="p-3 rounded-full bg-emerald-100 hover:bg-emerald-200 transition-all"
              aria-label="Next dhikr"
            >
              <BiChevronRight className="w-8 h-8 text-emerald-700" />
            </button>
          </div>

          {/* Dhikr Indicator Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {dhikrOptions.map((dhikr, index) => (
              <button
                key={dhikr.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-emerald-600' 
                    : 'w-2 bg-gray-300'
                }`}
                aria-label={`Switch to ${dhikr.transliteration}`}
              />
            ))}
          </div>

          {/* Circular Progress Ring */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                className={`${isComplete ? 'text-amber-500' : 'text-emerald-600'} transition-all duration-300`}
                strokeLinecap="round"
              />
            </svg>

            {/* Count Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl md:text-7xl font-bold gradient-text">
                {currentCount}
              </span>
              <span className="text-gray-500 text-sm mt-2">
                / {selectedDhikr.target}
              </span>
              {isComplete && (
                <div className="mt-2 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  ✓ Complete!
                </div>
              )}
            </div>
          </div>

          {/* Counter Buttons */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={decrement}
              disabled={currentCount === 0}
              className="w-16 h-16 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all hover:scale-105"
              aria-label="Decrease count"
            >
              <BiMinus className="w-8 h-8 text-gray-700" />
            </button>

            <button
              onClick={increment}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              aria-label="Increase count"
            >
              <BiPlus className="w-12 h-12" />
            </button>

            <button
              onClick={reset}
              className="w-16 h-16 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all hover:scale-105"
              aria-label="Reset current count"
            >
              <HiRefresh className="w-8 h-8 text-red-600" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-4">
            <div
              className={`h-full bg-gradient-to-r ${selectedDhikr.color} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-center text-sm text-gray-600">
            {currentCount === 0 ? (
              'Tap the center button to begin'
            ) : currentCount < selectedDhikr.target ? (
              `${selectedDhikr.target - currentCount} more to reach target`
            ) : (
              'Masha\'Allah! You reached the target 🎉'
            )}
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
              const count = counts[dhikr.id] || 0
              const percentage = Math.min((count / dhikr.target) * 100, 100)

              return (
                <button
                  key={dhikr.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    index === currentIndex
                      ? 'bg-emerald-50 border-2 border-emerald-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
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
                      <p className="text-xs text-gray-500">
                        / {dhikr.target}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${dhikr.color} transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </main>
    </section>
  )
}

export default Tasbeeh