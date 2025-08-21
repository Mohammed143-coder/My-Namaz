'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaMosque } from "react-icons/fa";
import { LuListTree } from "react-icons/lu";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openModel, setOpenModel] = useState(false);

  const tabs = [
    { label: "User", href: "/" },
    { label: "Admin Panel", href: "/admin" },
    { label: "Developer", href: "/developer" },
  ];
  return (
    <section className="text-black fixed top-0 left-0 right-0 z-20 bg-white md:shadow">
      <nav className="hidden md:block md:flex items-center justify-between gap-2 md:mx-4 p-3 ">
       <Link href='/'> <FaMosque className="text-blue-500 w-8 h-8" /></Link>
        <span>My Namaz</span>
        <div className="p-1 rounded-md flex gap-2 border-2 border-gray-400 ">
          {tabs.map((tab) => (
            <span
              key={tab.href}
              onClick={() => router.push(tab.href)}
              className={`font-medium cursor-pointer px-1 py-0.5 rounded-md transition 
            ${
              pathname === tab.href
                ? "bg-black text-white"
                : "hover:bg-gray-200 hover:text-gray-500 text-gray-500"
            }
          `}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </nav>
      <nav className="flex items-center justify-between gap-3 md:hidden p-3">
        <FaMosque className="text-blue-500 w-8 h-8" />
        <span className="font-medium">My Namaz Mobile</span>
        <LuListTree className="ml-10 font-bold text-2xl" onClick={()=>setOpenModel(!openModel)}/>
      </nav>
      {openModel && (
       
            <div className="flex items-center justify-between gap-3 p-3 md:hidden shadow-lg rounded-xl">
                {tabs.map((tab) => (
                <span
                    key={tab.href}
                    onClick={() => router.push(tab.href)}
                    className={`font-medium cursor-pointer px-1 py-0.5 rounded-md transition 
                ${
                    pathname === tab.href
                    ? "bg-black text-white"
                    : "hover:bg-gray-200 hover:text-gray-500 text-gray-500"
                }
                `}
                >
                    {tab.label}
                </span>
                ))}
            </div>
      )
       
      }
    </section>
  );
};

export default NavBar;
