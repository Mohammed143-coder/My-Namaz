"use client";
import { useRouter } from "next/navigation";
import { FaMosque } from "react-icons/fa";

import CommonHeader from "./CommonHeader";
import Link from "next/link";

const Hadith = () => {
  const router = useRouter();
const englishQuotes = [
  {
    language: "English",
    quote:
      "The strongest among you is the one who controls his anger. - Prophet Muhammad (peace be upon him)",
    reflection:
      "True strength is not physical, but the ability to remain calm and patient when angry.",
  },
];

const urduQuotes = [
  {
    language: "Urdu",
    quote:
      "تم میں سب سے زیادہ طاقتور وہ ہے جو غصے کے وقت اپنے آپ پر قابو رکھے۔ - حضرت محمد ﷺ",
    reflection:
      "اصل طاقت جسمانی نہیں بلکہ غصے کے وقت صبر اور سکون اختیار کرنا ہے۔",
  },
];


  return (
    <section className=" text-black p-3 md:text-center">
      <CommonHeader>Daily Hadith</CommonHeader>
      <main className="p-2">
        {englishQuotes?.map((item, idx) => (
          <div key={idx} className="mt-8 ">
            <p className="mt-4 text-gray-700 text-base font-semibold md:font-medium">
              {item.quote}
            </p>
            <p className="mt-2 text-gray-600 text-sm">{item.reflection}</p>
          </div>
        ))}
        {urduQuotes?.map((item, idx) => (
          <div key={idx} className="mt-8 ">
            <p className="mt-4 text-gray-700 text-2xl font-semibold md:font-medium">
              {item.quote}
            </p>
            <p className="mt-2 text-gray-600 text-lg font-medium">
              {item.reflection}
            </p>
          </div>
        ))}
      </main>
      <div
        className="flex items-center justify-center rounded-full mt-4 border-2 p-1 md:mt-20"
        title="@junaithdedeveloper"
      >
        <FaMosque className="w-10 h-10 " />
      </div>
      <div className="mt-16 text-center">
          <Link href='https://junaith-portfolio.vercel.app' target='_blank' className="w-full text-gray-400 text-sm font-medium">
        Crafted ❤️ By Umath-e-Nabi
      </Link>
      </div>
    
    </section>
  );
};

export default Hadith;
