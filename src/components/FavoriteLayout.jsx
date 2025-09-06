"use client";
import { useRouter } from "next/navigation";

import CommonHeader from "./CommonHeader";

const FavoriteLayout = () => {
  const router = useRouter();
  return (
    <main className=" text-black p-3 ">
     <CommonHeader>Favorite</CommonHeader>
    </main>
  );
};

export default FavoriteLayout;
