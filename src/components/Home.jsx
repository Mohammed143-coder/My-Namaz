import React from 'react'
import { AiOutlineFileSearch } from "react-icons/ai";

const Home = () => {
  return (
    <main className='text-black my-2'>
        <div className='mx-2'>
            <input type="text" className='w-full p-1 border-2 border-gray-400 text-black rounded outline-none' placeholder='Search the "masjid"'/>
            <AiOutlineFileSearch  className='absolute w-5 h-5 top-18 md:top-18 right-5 text-gray-500'/>
        </div>
        <div></div>
        <div></div>
    </main>
  )
}

export default Home