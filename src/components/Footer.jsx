"use client";

import { IoHomeOutline } from "react-icons/io5";
import { HiMiniHashtag } from "react-icons/hi2";
import { GoPerson } from "react-icons/go";
import { useRouter } from "next/navigation";
import { FaQuran } from "react-icons/fa";

const Footer = () => {
    const router = useRouter();
  return (
    <section className="bottom-0 text-black border-t">
      <div className=" flex justify-between mb-4 mx-2 p-2">
        {" "}
        <IoHomeOutline title="Home" className="w-7 h-7 font-bold md:hidden" 
        onClick={() => router.push("/")} 
        />
        <HiMiniHashtag title="Explorer" className="w-7 h-7 font-bold md:hidden" 
        onClick={()=>router.push("/explorer")}/>
        <FaQuran  title='Hadith' className="w-7 h-7 font-bold md:hidden" 
        onClick={() => router.push("/hadith")}
        />
      </div>
      <div></div>
    </section>
  );
};

export default Footer;
