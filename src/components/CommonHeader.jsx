"use client";
import { useRouter } from "next/navigation";
import { TiArrowBackOutline } from "react-icons/ti";

const CommonHeader = ({ children }) => {
  const router = useRouter();
  return (
    <header className="flex items-center p-2 fixed top-0 left-0 right-0 z-20">
  <TiArrowBackOutline
    onClick={() => router.push("/")}
    className="w-6 h-6 cursor-pointer text-gray-700 hover:text-blue-400"
  />
  <span className="flex-1 text-center text-lg text-blue-500 font-semibold">
    {children}
  </span>
</header>

  );
};

export default CommonHeader;
