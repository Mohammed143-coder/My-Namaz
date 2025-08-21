"use client";
import { useRouter } from "next/navigation";
import { FaMosque } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";

const Hadith = () => {
  const router = useRouter();
  const englishQuotes = [
  {
    language: "English",
    quote: "The best among you are those who have the best manners and character. - Prophet Muhammad (peace be upon him)",
    reflection: "Reflect on this Hadith and strive to embody good character in your daily life."
  },
  
];
const urduQuotes = [
    {
    language: "Urdu",
    quote: "تم میں سے بہترین وہ ہیں جن کے اخلاق اور کردار سب سے بہتر ہیں۔ - حضرت محمد ﷺ",
    reflection: "اس حدیث پر غور کریں اور اپنی روزمرہ زندگی میں اچھے کردار کو اپنانے کی کوشش کریں۔"
  }
]

  return (
    <section className=" text-black p-3 ">
      <header className="flex">
        <TiArrowBackOutline
          onClick={() => router.push("/")}
          className="w-7 h-7"
        />
        <span className="w-full text-center text-lg text-blue-400 font-semibold">
          Daily Hadith
        </span>
      </header>
      <main className="p-2">
        {englishQuotes?.map((item, idx) => (
          <div key={idx} className="mt-8 ">
            <p className="mt-4 text-gray-700 text-base font-semibold md:font-medium">{item.quote}</p>
            <p className="mt-2 text-gray-600 text-sm">{item.reflection}</p>
          </div>
        ))}
         {urduQuotes?.map((item, idx) => (
          <div key={idx} className="mt-8 ">
            <p className="mt-4 text-gray-700 text-2xl font-semibold md:font-medium">{item.quote}</p>
            <p className="mt-2 text-gray-600 text-lg font-medium">{item.reflection}</p>
          </div>
        ))}
      </main>
      <div className="flex items-center justify-center rounded-full mt-4 border-2 p-1">
        <FaMosque className="w-10 h-10 " />
      </div>
    </section>
  );
};

export default Hadith;
