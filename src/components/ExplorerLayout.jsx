"use client";
import { useRouter } from "next/navigation";
import { TiArrowBackOutline } from "react-icons/ti";
import CommonHeader from "./CommonHeader";

const ExplorerLayout = () => {
  const router = useRouter();
  return (
    <main className=" text-black p-3 ">
     <CommonHeader>Explorer</CommonHeader>
    </main>
  );
};

export default ExplorerLayout;
