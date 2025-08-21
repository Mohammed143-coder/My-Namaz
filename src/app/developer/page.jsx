"use client";
import { useRouter } from 'next/navigation';
import { TiArrowBackOutline } from 'react-icons/ti';

const Developer = () => {
    const router = useRouter();

  return (
    <div className='bg-white p-2 h-screen text-black'> <header className="flex">
               <TiArrowBackOutline
                 onClick={() => router.push("/")}
                 className="w-7 h-7"
               />
               <span className="w-full text-center text-lg text-blue font-semibold">
                Developer Page
               </span>
               </header>
               </div>
  )
}

export default Developer