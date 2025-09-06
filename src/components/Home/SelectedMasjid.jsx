"use client";

import { useEffect, useState } from "react";
import CommonHeader from "../CommonHeader";
import axios from "axios";
import { BsSun } from "react-icons/bs";
import { RiMoonCloudyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import useSWR from "swr";

const SelectedMasjid = ({ userId }) => {
  const [selectedMasjid, setSelectedMasjid] = useState("");
  const [announcement, setAnnouncement] = useState([]);
  const [masjidName, setMasjidName] = useState("");
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data: namazData,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/namaz?userId=${userId}`, fetcher, {
    refreshInterval: 1000000, // re-fetch
    revalidateOnFocus: true, // re-fetch when window refocus
    dedupingInterval: 200000,
  });

  const {
    data: announcementData,
    error: announcementError,
    isLoading: announcementLoading,
  } = useSWR(`/api/announcement?userId=${userId}`, fetcher, {
    refreshInterval: 1000000, // re-fetch
    revalidateOnFocus: true, // re-fetch when window refocus
    dedupingInterval: 200000,
  });
  useEffect(() => {
    if (namazData?.details) {
      setSelectedMasjid(namazData.details);
    }
    if (announcementData?.details) {
      setAnnouncement(announcementData.details);
      // setMasjidName(announcementData.details?.[0]?.userId?.masjid || "");
    }
  }, [announcementData, namazData]);
  const selectedMasjidName = useSelector((state) => state.auth.masjid);

  return (
    <div className="bg-white min-h-screen text-black p-1 mb-4">
      <CommonHeader>{selectedMasjidName || "My Masjid"}</CommonHeader>

      <div className="md:flex mb-2 overflow-y-auto mt-8">
        <div className="mt-2 p-2 md:w-[50%]">
          <p className="font-semibold text-base mb-4">Today's Prayer Times</p>

          {selectedMasjid?.length > 0 ? (
            selectedMasjid.map((item, index) => (
              <div key={index} className="space-y-2  ">
                {Object.entries(item.namazTiming || {}).map(
                  ([prayer, details]) => (
                    <div
                      key={prayer}
                      className="flex items-center justify-between border border-gray-400 rounded-lg p-2 shadow-sm hover:shadow-md hover:shadow-blue-300"
                    >
                      {/* Left side: prayer icon + name + time */}
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 rounded-lg p-1 ">
                          {/* You can swap icons based on prayer */}
                          {prayer === "isha" || prayer === "maghrib" ? (
                            <RiMoonCloudyLine className="w-6 h-6 p-1 " />
                          ) : (
                            <BsSun className="w-6 h-6 p-1" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium capitalize">
                            {prayer}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {details?.time} {details?.period}
                          </span>
                        </div>
                      </div>

                      {/* Right side: bell icon */}
                      <div className="text-gray-500 hover:rotate-45">
                        <span className="text-xl">🔔</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No Timings found.</div>
          )}
        </div>
        <div className="mt-2 p-2 mb-8 md:w-[50%] ">
          <p className="font-semibold text-base mb-3">Masjid's Announcements</p>
          {announcement?.length > 0 ? (
            announcement?.map((item, index) => (
              <div
                className="border border-gray-400 rounded-lg shadow-sm hover:shadow-md hover:shadow-blue-300 text-center mt-2 p-1"
                key={index}
              >
                <p>{item.message}</p>
                <small>
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    hour12: true,
                  })}
                </small>
              </div>
            ))
          ) : (
            <div className="text-center">No Announcement found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectedMasjid;
