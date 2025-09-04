"use client";
import { useRouter } from "next/navigation";
import { TiArrowBackOutline } from "react-icons/ti";

const CommonHeader = ({ children }) => {
  const router = useRouter();
  return (
    <header className="flex ">
      <TiArrowBackOutline
        onClick={() => router.push("/")}
        className="w-7 h-7"
      />
      <span className="w-full text-center text-lg text-blue-400 font-semibold">
        {children}
      </span>
    </header>
  );
};

export default CommonHeader;
