"use client";

import Loading from "@/app/loading";
import { selectedMasjidName } from "@/lib/userSlice/authSlice";
import axios from "axios";
import Link from "next/link";
import { PiMosqueDuotone } from "react-icons/pi";
import { useDispatch } from "react-redux";
import useSWR from "swr";

const MasjidList = ({ searchMasjid }) => {
  const dispatch = useDispatch();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher, {
    refreshInterval: 1000000, // re-fetch 
    revalidateOnFocus: true, // re-fetch when window refocus
    dedupingInterval: 200000,
  });
  // ✅ Ensure it's an array
  const masjids = data?.details || [];
  const filteredMasjids = masjids?.filter(
    (item) =>
      item.masjid.toLowerCase().includes(searchMasjid.toLowerCase()) ||
      item.masjidLocation.toLowerCase().includes(searchMasjid.toLowerCase())
  );
if(isLoading) return <Loading/>
  return (
    <div className="p-2 overflow-y-auto">
      {filteredMasjids?.length > 0 ? (
        filteredMasjids.slice(0, 8).map((item) => (
          <Link
            href={`/${item._id}`}
            key={item._id}
            onClick={() => dispatch(selectedMasjidName(item.masjid))}
            className="flex items-center text-black gap-4 border border-gray-400 my-1 rounded-lg p-1 hover:shadow-md hover:shadow-blue-300"
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
