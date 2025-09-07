"use client";

import { FaMosque } from "react-icons/fa";

import CommonHeader from "./CommonHeader";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

const HadithMain = () => {
  const [hadith, setHadith] = useState([]);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("/api/hadith", fetcher, {
    refreshInterval: 1000000, // re-fetch
    revalidateOnFocus: true, // re-fetch when window refocus
    dedupingInterval: 200000,
  });
  useEffect(() => {
    if (data?.details) {
      setHadith(data.details);
      console.log("H", data.details);
    }
  }, [data]);
  return (
    <section className=" text-black p-3 md:text-center">
      <CommonHeader>Daily Hadith</CommonHeader>
      <main className="p-4">
        {hadith?.length > 0 ? (
          hadith.map((item, idx) => (
            <div key={idx} className="mt-6 pb-4">
              {/* English Section */}
             
              <p className="mt-2 text-gray-500  font-medium">
                {item.hadiths.english.quote}
              </p>
              <p className="mt-1 text-gray-400 text-sm">
                {item.hadiths.english.reflection}
              </p>

              {/* Urdu Section */}
            
              <p className="mt-2 text-gray-500 text-xl font-medium">
                {item.hadiths.urdu.quote}
              </p>
              <p className="mt-1 text-gray-400 text-lg">
                {item.hadiths.urdu.reflection}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No hadiths found.</div>
        )}
      </main>

      <div
        className="flex items-center justify-center rounded-full mt-4 border-2 p-1 md:mt-20"
        title="@junaithdedeveloper"
      >
        <FaMosque className="w-10 h-10 text-gray-500" />
      </div>
      <p className="mt-3 text-gray-400 text-xs font-medium">Note : Tq for checking the hadith. Two days once a new hadith will be update.</p>
      <div className="mt-10 text-center">
        <Link
          href="https://junaith-portfolio.vercel.app"
          target="_blank"
          className="w-full text-gray-400 text-sm font-medium"
        >
          Crafted ❤️ By Umath-e-Nabi
        </Link>
      </div>
    </section>
  );
};

export default HadithMain;
