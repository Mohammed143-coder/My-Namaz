"use client";

import { FaMosque } from "react-icons/fa";
import CommonHeader from "./CommonHeader";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";

const HadithMain = () => {
  const [hadith, setHadith] = useState([]);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("/api/hadith", fetcher, {
    refreshInterval: 1000000,
    revalidateOnFocus: true,
    dedupingInterval: 200000,
  });

  useEffect(() => {
    if (data?.details) {
      setHadith(data.details);
    }
  }, [data]);

  return (
    <section className="text-charcoal p-4 md:text-center flex flex-col justify-center min-h-screen pattern-bg">
      <CommonHeader>Daily Hadith</CommonHeader>
      
      <main className="flex items-center justify-center p-4 max-w-3xl mx-auto">
        {isLoading ? (
          <div className="flex items-center gap-3 text-emerald-600">
            <BiLoader className="w-8 h-8 animate-spin" />
            <span>Loading hadith...</span>
          </div>
        ) : hadith?.length > 0 ? (
          hadith.map((item, idx) => (
            <div key={idx} className="mt-6 space-y-6">
              {/* English Section */}
              <div className="card-islamic p-6">
                <div className="mb-4 flex items-center gap-2 text-emerald-600">
                  <FaMosque className="w-5 h-5" />
                  <h3 className="font-semibold text-sm uppercase tracking-wide">
                    Hadith of the Day
                  </h3>
                </div>
                
                <div className="mb-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <p className="text-gray-700 leading-relaxed text-lg italic">
                    "{item.hadiths.english.quote}"
                  </p>
                </div>
                
                {item.hadiths.english.reflection && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <span className="font-semibold text-emerald-700">Reflection: </span>
                    {item.hadiths.english.reflection}
                  </p>
                )}
              </div>

              {/* Urdu Section */}
              <div className="card-islamic p-6">
                <div className="mb-4 p-5 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-gold-accent">
                  <p className="text-gray-800 text-2xl md:text-3xl leading-loose text-right arabic-text">
                    {item.hadiths.urdu.quote}
                  </p>
                </div>
                
                {item.hadiths.urdu.reflection && (
                  <p className="text-gray-600 text-lg leading-relaxed text-right">
                    {item.hadiths.urdu.reflection}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="card-islamic p-12 text-center">
            <FaMosque className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No hadiths available at the moment.</p>
          </div>
        )}
      </main>

      <div className="mt-8 text-center space-y-4">
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-3 rounded-full shadow-lg">
            <FaMosque className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          <span className="font-semibold">Note:</span> New hadith is updated every two days. 
          May these words inspire you in your daily life.
        </p>
        
        <div className="pt-4">
          <Link
            href="https://junaith-portfolio.vercel.app"
            target="_blank"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium inline-flex items-center gap-1 transition"
          >
            Crafted with ❤️ by Umath-e-Nabi
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HadithMain;
