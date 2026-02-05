'use client'
import { useHijriDate } from '@/hooks/useHijriDate'
import { FaCalendarAlt } from 'react-icons/fa'

const HijriCalendar = ({ compact = false }) => {
  const hijriDate = useHijriDate()

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
        <FaCalendarAlt className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-sm font-medium text-emerald-800">
          {hijriDate.formatted || 'Loading...'}
        </span>
      </div>
    )
  }

  return (
    <div className="card-islamic p-6 min-h-screen overflow-y-auto">
      <div className="text-center">
        {/* <div className="flex items-center justify-center gap-3 mb-4">
          <FaCalendarAlt className="w-8 h-8 text-emerald-600" />
          <h3 className="text-2xl font-bold text-gray-800">Islamic Calendar</h3>
        </div> */}
        
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-4xl font-bold mb-2">
            {hijriDate.day}
          </div>
          <div className="text-2xl font-semibold mb-1">
            {hijriDate.month}
          </div>
          <div className="text-xl opacity-90">
            {hijriDate.year} AH
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-lg border-l-4 border-gold-accent">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">Current Hijri Date: </span>
            {hijriDate.formatted}
          </p>
        </div>

        {/* Important Islamic Dates Info */}
        <div className="mt-6 text-left space-y-2">
          <h4 className="font-semibold text-gray-800 mb-3">Important Islamic Dates</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span><strong>1 Muharram:</strong> Islamic New Year</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span><strong>10 Muharram:</strong> Day of Ashura</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span><strong>12 Rabi al-Awwal:</strong> Prophet's Birthday (Mawlid)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span><strong>27 Rajab:</strong> Isra and Mi'raj</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span><strong>15 Sha'ban:</strong> Laylat al-Bara'ah</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-accent">•</span>
              <span><strong>1-30 Ramadan:</strong> Holy Month of Fasting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-accent">•</span>
              <span><strong>27 Ramadan:</strong> Laylat al-Qadr (Night of Power)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-accent">•</span>
              <span><strong>1 Shawwal:</strong> Eid al-Fitr</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">•</span>
              <span><strong>8-10 Dhul-Hijjah:</strong> Days of Hajj</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-accent">•</span>
              <span><strong>9 Dhul-Hijjah:</strong> Day of Arafah</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-accent">•</span>
              <span><strong>10 Dhul-Hijjah:</strong> Eid al-Adha</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HijriCalendar
