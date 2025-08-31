"use client";

import selectedMasjid from "@/app/[id]/page";
import { selectedMasjidName } from "@/lib/userSlice/authSlice";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiMosqueDuotone } from "react-icons/pi";
import { useDispatch } from "react-redux";

const MasjidList = ({searchMasjid}) => {
  const dispatch =useDispatch();
  const [masjids, setMasjids] = useState([]);

  const fetchMasjids = async () => {
    try {
      const res = await axios.get("/api/signUp");
      if (!res.data.success) {
        alert(res.data.message);
      }
      setMasjids(res.data.details);
      console.log(res.data.details)
      
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };
  useEffect(() => {
    fetchMasjids();
  }, []);
const filteredMasjids = masjids.filter(
    (item) =>
      item.masjid.toLowerCase().includes(searchMasjid.toLowerCase()) ||
      item.masjidLocation.toLowerCase().includes(searchMasjid.toLowerCase())
  );

  return (
    <div className="p-1 ">
      {filteredMasjids?.length > 0 ? (
        filteredMasjids?.slice(0, 8)?.map((item) => (
          <Link
            href={`/${item._id}`}
            key={item._id}
            onClick={()=>dispatch(selectedMasjidName(item.masjid))}
            className="flex items-center text-black gap-4 border border-gray-400 my-1 rounded-lg p-1"
          >
            <div className="bg-gray-300 rounded-lg shadow-xl p-1">
              <PiMosqueDuotone className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <span>{item.masjid}</span>
              <span>{item.masjidLocation.substring(0, 20)}</span>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-500">No masjids found.</div>
      )}
    </div>
  );
};

export default MasjidList;
