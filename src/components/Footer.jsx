"use client";

import { IoHomeOutline } from "react-icons/io5";
import { GiPrayerBeads } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { FaQuran } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { BsCalendar2Week } from "react-icons/bs";
import { MdOutlineArticle } from "react-icons/md";

const Footer = () => {
  const router = useRouter();
  
  const navItems = [
    { icon: IoHomeOutline, label: "Home", route: "/" },
    { icon: GrFavorite, label: "Favorites", route: "/favourite" },
    { icon: MdOutlineArticle, label: "Azkar", route: "/azkar" },
    { icon: GiPrayerBeads, label: "Tasbeeh", route: "/tasbeeh" },
    { icon: FaQuran, label: "Hadith", route: "/hadith" },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-emerald-50 via-white to-emerald-50 fixed bottom-0 text-charcoal border-t-2 border-emerald-200 shadow-2xl z-10">
      <div className="flex justify-between items-center mb-2 mx-2 p-2 md:max-w-4xl md:mx-auto">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.route)}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-emerald-100 transition-all group"
            aria-label={item.label}
          >
            <item.icon className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 group-hover:scale-110 transition-all" />
            <span className="text-xs font-medium text-gray-600 group-hover:text-emerald-700">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Footer;
