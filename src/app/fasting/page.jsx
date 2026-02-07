"use client";

import { useState, useEffect } from "react";
import { fetchPrayerTimes, getFastingTimes } from "@/lib/prayerTimeService";
import { FaMoon, FaSun, FaHeart, FaBook, FaMosque } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import CommonHeader from "@/components/CommonHeader";

export default function FastingPage() {
  const [fastingTimes, setFastingTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFastingTimes = async () => {
      try {
        const prayerTimes = await fetchPrayerTimes();
        const times = getFastingTimes(prayerTimes);
        setFastingTimes(times);
      } catch (error) {
        console.error("Error loading fasting times:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFastingTimes();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pattern-bg">
        <div className="flex items-center gap-3 text-emerald-600">
          <BiLoader className="w-8 h-8 animate-spin" />
          <span>Loading fasting times...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="text-charcoal min-h-screen bg-white pattern-bg">
      <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto pb-24">
        <CommonHeader>Fasting Guide</CommonHeader>

        <main className="mt-6 md:mt-8 space-y-4 md:space-y-6">
          {/* Fasting Times Card */}
          <div className="card-islamic p-4 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <FaMosque className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <h3 className="font-semibold text-xs md:text-sm uppercase tracking-wide">
                Today's Fasting Times
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Sehri Time */}
              <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
                <div className="flex items-center gap-2 mb-2 text-indigo-600">
                  <FaMoon className="w-5 h-5" />
                  <h4 className="font-bold text-sm md:text-base">Sehri Time</h4>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800">
                  {fastingTimes?.sehri?.time || "00:00"}
                  <span className="text-lg md:text-xl ml-2 text-gray-600">
                    {fastingTimes?.sehri?.period || "AM"}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Stop eating before Fajr
                </p>
              </div>

              {/* Iftar Time */}
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-500">
                <div className="flex items-center gap-2 mb-2 text-orange-600">
                  <FaSun className="w-5 h-5" />
                  <h4 className="font-bold text-sm md:text-base">Iftar Time</h4>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800">
                  {fastingTimes?.iftar?.time || "00:00"}
                  <span className="text-lg md:text-xl ml-2 text-gray-600">
                    {fastingTimes?.iftar?.period || "PM"}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  Break your fast at Maghrib
                </p>
              </div>
            </div>
          </div>

          {/* Duas Section */}
          <div className="card-islamic p-4 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <FaBook className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <h3 className="font-semibold text-xs md:text-sm uppercase tracking-wide">
                Fasting Duas
              </h3>
            </div>

            <div className="space-y-4">
              {/* Sehri Dua */}
              <div>
                <h4 className="font-bold text-sm md:text-base text-gray-800 mb-2">
                  Sehri Dua (Intention for Fasting)
                </h4>
                <div className="p-3 md:p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-right text-2xl lg:text-3xl text-gray-800 leading-loose font-arabic mb-3">
اللَّهُمَّ أَصُومُ غَدًا لَكَ فَاغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ</p>
                  <p className="text-xs md:text-sm text-gray-700 italic mb-2">
                    <strong>Transliteration:</strong> Allahumma aṣūmu ghadan laka fa-ghfir lī mā qaddamtu wa mā akhkhartu
                  </p>
                  {/* <p className="text-xs md:text-sm text-gray-700">
                    <strong>Translation:</strong> O Allah! I fasted for You, and I believe in You, and I place my trust in You, and with Your provision I break my fast.
                  </p> */}
                </div>
              </div>

              {/* Iftar Dua */}
              <div>
                <h4 className="font-bold text-sm md:text-base text-gray-800 mb-2">
                  Iftar Dua (Breaking the Fast)
                </h4>
                <div className="p-3 md:p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-l-4 border-amber-500">
                  <p className="text-right text-2xl lg:text-3xl text-gray-800 leading-loose font-arabic mb-3">
                   اللَّهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَ كَّلْتُ وَعَلَىٰ رِزْقِكَ أَفْطَرْتُ فَتَقَبَّلْ مِنِّي
                  </p>
                  <p className="text-xs md:text-sm text-gray-700 italic mb-2">
                    <strong>Transliteration:</strong> Allahumma laka sumtu wa bika āmantu wa ‘alayka tawakkaltu wa ‘alā rizqika aftartu fa-taqabbal minni.
                  </p>
                  {/* <p className="text-xs md:text-sm text-gray-700">
                    <strong>Translation:</strong> O Allah, I fasted for You, I believe in You, I put my trust in You, and with Your provision I break my fast—so accept it from me.
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits of Fasting */}
          <div className="card-islamic p-4 md:p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-600">
              <FaHeart className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <h3 className="font-semibold text-xs md:text-sm uppercase tracking-wide">
                Benefits of Fasting
              </h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Spiritual Benefits */}
              <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border-l-4 border-emerald-500">
                <h4 className="font-bold text-sm md:text-base text-emerald-700 mb-2">
                  🕌 Spiritual Benefits
                </h4>
                <ul className="space-y-1 text-xs md:text-sm text-gray-700 leading-relaxed">
                  <li>• Increases Taqwa (God-consciousness)</li>
                  <li>• Develops self-discipline and willpower</li>
                  <li>• Purifies the soul and cleanses sins</li>
                  <li>• Enhances gratitude and mindfulness</li>
                </ul>
              </div>

              {/* Health Benefits */}
              <div className="p-3 md:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-sm md:text-base text-blue-700 mb-2">
                  💪 Health Benefits
                </h4>
                <ul className="space-y-1 text-xs md:text-sm text-gray-700 leading-relaxed">
                  <li>• Detoxifies the body and promotes repair</li>
                  <li>• Improves metabolism and weight management</li>
                  <li>• Reduces inflammation and boosts immunity</li>
                  <li>• Enhances mental clarity and focus</li>
                </ul>
              </div>

              {/* Social Benefits */}
              <div className="p-3 md:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-bold text-sm md:text-base text-purple-700 mb-2">
                  🤝 Social Benefits
                </h4>
                <ul className="space-y-1 text-xs md:text-sm text-gray-700 leading-relaxed">
                  <li>• Develops empathy for the less fortunate</li>
                  <li>• Encourages charity and generosity</li>
                  <li>• Strengthens family and community bonds</li>
                  <li>• Promotes equality and unity</li>
                </ul>
              </div>

              {/* Quranic Reference */}
              <div className="p-3 md:p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border-2 border-gold-accent">
                <h4 className="font-bold text-sm md:text-base text-amber-700 mb-2">
                  📖 Quranic Reference
                </h4>
                <p className="text-xs md:text-sm text-gray-700 italic leading-relaxed">
                  "O you who believe! Fasting is prescribed for you as it was
                  prescribed for those before you, that you may become
                  righteous."
                  <span className="block mt-1 font-semibold text-amber-800">
                    — Quran 2:183
                  </span>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
