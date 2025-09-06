"use client";

import { IoHomeOutline } from "react-icons/io5";


import { useRouter } from "next/navigation";
import { FaQuran } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";

const Footer = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-white fixed bottom-0 text-black border-t shadow-lg rounded-xl ">
      <div className=" flex justify-between mb-3 mx-2 p-2 md:mx-8 ">
       
        <IoHomeOutline
          title="Home"
          className="w-7 h-7 font-bold  "
          onClick={() => router.push("/")}
        />
        <GrFavorite 
          title="Favorite"
          className="w-7 h-7 font-bold  "
          onClick={() => router.push("/favorite")}
        />
        <FaQuran
          title="Hadith"
          className="w-7 h-7 font-bold  "
          onClick={() => router.push("/hadith")}
        />
      </div>
    </section>
  );
};

export default Footer;
