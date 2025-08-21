"use client";
import { useRouter } from "next/navigation";
import { TiArrowBackOutline } from "react-icons/ti";

const ExplorerLayout = () => {
  const router = useRouter();
  return (
    <main className=" text-black p-3 ">
      <header className="flex">
        <TiArrowBackOutline onClick={() => router.push("/")} className="w-7 h-7"/>
        <div className="w-full text-center">exploring</div>
      </header>
    </main>
  );
};

export default ExplorerLayout;
