"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaMosque } from "react-icons/fa";
import { LuListTree } from "react-icons/lu";
import { BiMenu, BiX } from "react-icons/bi";
import { BsCalendar2Week } from "react-icons/bs";
import { useSelector } from "react-redux";
import HijriCalendar from "./HijriCalendar";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openModel, setOpenModel] = useState(false);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const tabs = [
    // { label: "Home", href: "/" },
    { label: "Azkar", href: "/azkar" },
    // { label: "Tasbeeh", href: "/tasbeeh" },
    // { label: "Hadith", href: "/hadith" },
    { label: "Calendar", href: "/calendar" },
  ];

  const adminTabs = [
    { label: "Admin", href: "/admin" },
    { label: "Developer", href: "/developer" },
  ];

  const handleNavClick = (href) => {
    if (!loggedIn && (href === "/admin" || href === "/developer")) {
      router.push("/login");
    } else {
      router.push(href);
    }
    setOpenModel(false);
  };

  return (
    <section className="text-charcoal fixed top-0 left-0 right-0 z-20 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-lg border-b-2 border-emerald-200">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between gap-4 mx-4 p-3">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl shadow-md">
            <FaMosque className="text-white w-7 h-7" />
          </div>
          {/* <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
            My Namaz
          </span> */}
        </Link>

        {/* Hijri Date Display */}
        <div className="flex-shrink-0">
          <HijriCalendar compact />
        </div>

        {/* Main Navigation Tabs */}
        <div className="p-1 rounded-xl flex gap-2 bg-white shadow-inner border border-emerald-100">
          {tabs.map((tab) => (
            <span
              key={tab.label}
              onClick={() => handleNavClick(tab.href)}
              className={`font-medium cursor-pointer px-4 py-2 rounded-lg transition-all text-sm ${
                pathname === tab.href
                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
                  : "hover:bg-emerald-50 text-gray-700"
              }`}
            >
              {tab.label}
            </span>
          ))}
        </div>

        {/* Admin Tabs */}
        <div className="p-1 rounded-xl flex gap-2 bg-amber-50 shadow-inner border border-amber-200">
          {adminTabs.map((tab) => (
            <span
              key={tab.label}
              onClick={() => handleNavClick(tab.href)}
              className={`font-medium cursor-pointer px-3 py-2 rounded-lg transition-all text-sm ${
                pathname === tab.href
                  ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md"
                  : "hover:bg-amber-100 text-gray-700"
              }`}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="flex items-center justify-between gap-3 md:hidden p-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-lg shadow-md">
            <FaMosque className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
            My Namaz
          </span>
        </Link>

        <button
          onClick={() => setOpenModel(!openModel)}
          className="p-2 hover:bg-emerald-100 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {openModel ? (
            <BiX className="w-7 h-7 text-emerald-600" />
          ) : (
            <BiMenu className="w-7 h-7 text-emerald-600" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {openModel && (
        <div className="md:hidden bg-white shadow-2xl rounded-b-2xl border-t border-emerald-200 animate-in slide-in-from-top">
          <div className="p-4">
            {/* Hijri Date in Mobile */}
            <div className="mb-4 pb-4 border-b border-emerald-100">
              <HijriCalendar compact />
            </div>

            {/* Main Tabs */}
            <div className="space-y-2 mb-4 pb-4 border-b border-emerald-100">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Navigation</p>
              {tabs.map((tab) => (
                <div
                  key={tab.href}
                  onClick={() => handleNavClick(tab.href)}
                  className={`font-medium cursor-pointer px-4 py-3 rounded-lg transition-all ${
                    pathname === tab.href
                      ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
                      : "hover:bg-emerald-50 text-gray-700 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>

            {/* Admin Tabs */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Admin</p>
              {adminTabs.map((tab) => (
                <div
                  key={tab.href}
                  onClick={() => handleNavClick(tab.href)}
                  className={`font-medium cursor-pointer px-4 py-3 rounded-lg transition-all ${
                    pathname === tab.href
                      ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md"
                      : "hover:bg-amber-50 text-gray-700 border border-amber-200"
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NavBar;
