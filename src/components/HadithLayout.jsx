"use client";
import { useRouter } from "next/navigation";
import { TiArrowBackOutline } from "react-icons/ti";

const Hadith = () => {
    const router =useRouter()
    return (
         <main className="flex text-black p-3 ">
              <TiArrowBackOutline onClick={() => router.push("/")} className="w-5 h-5"/>
                <div className="w-full text-center">Hadith</div>
            </main>
    );
}

export default Hadith;