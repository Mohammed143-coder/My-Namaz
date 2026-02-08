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
    if (Array.isArray(data?.details)) {
      setHadith(data.details);
    } else {
      setHadith([]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <section className="text-charcoal min-h-screen max-h-full pattern-bg">
        <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto text-center">
          <CommonHeader>Daily Hadith</CommonHeader>
          <div className="flex items-center justify-center gap-3 text-emerald-600 py-12 mt-6 md:mt-8">
            <BiLoader className="w-8 h-8 animate-spin" />
            <span>Loading hadith...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-charcoal min-h-screen max-h-full pattern-bg">
        <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto text-center">
          <CommonHeader>Daily Hadith</CommonHeader>
          <div className="text-red-500 py-12 mt-6 md:mt-8">
            Failed to load daily hadith. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="text-charcoal min-h-screen max-h-full pattern-bg">
      <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto">
        <CommonHeader>Daily Hadith</CommonHeader>

        <main className="mt-6 md:mt-8">
          {hadith.length > 0 ? (
            hadith.map((item, idx) => (
              <div key={idx} className="space-y-4 md:space-y-6">
                {/* English Section */}
                <div className="card-islamic p-4 md:p-6">
                  <div className="mb-3 md:mb-4 flex items-center gap-2 text-emerald-600">
                    <FaMosque className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <h3 className="font-semibold text-xs md:text-sm uppercase tracking-wide">
                      Hadith of the Day
                    </h3>
                  </div>

                  <div className="mb-3 md:mb-4 p-3 md:p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                    <p className="text-gray-700 leading-relaxed text-sm md:text-lg break-words">
                      "{item.hadiths.english.quote}"
                    </p>
                  </div>

                  {item.hadiths.english.reflection && (
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed break-words">
                      <span className="font-semibold text-emerald-700">
                        Reflection:{" "}
                      </span>
                      {item.hadiths.english.reflection}
                    </p>
                  )}
                </div>

                {/* Urdu Section */}
                <div className="card-islamic p-4 md:p-6">
                  <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border-2 border-gold-accent">
                    <p className="text-gray-600 text-xl lg:text-2xl leading-loose text-right arabic-text break-words">
                      "{item.hadiths.urdu.quote}"
                    </p>
                  </div>

                  {item.hadiths.urdu.reflection && (
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed text-right break-words">
                      {item.hadiths.urdu.reflection}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="card-islamic p-8 md:p-12 text-center">
              <FaMosque className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm md:text-base">
                No hadiths available at the moment.
              </p>
            </div>
          )}
        </main>

        <div className="mt-4 md:mt-8 text-center space-y-3 md:space-y-4 pb-10 lg:pb-6 ">
          <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto px-2">
            <span className="font-semibold">Note:</span> New hadith is updated
            every two days. May these words inspire you in your daily life.
          </p>

          <div className="md:pt-3">
            <Link
              href="https://coderzweb.in"
              target="_blank"
              className="text-emerald-600 hover:text-emerald-700 text-xs md:text-sm font-medium inline-flex items-center gap-1 transition"
            >
              Crafted with ❤️ by CoderzWeb
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HadithMain;
