"use client";

import { useEffect, useState } from "react";
import CommonHeader from "../CommonHeader";
import axios from "axios";
import { BsSun } from "react-icons/bs";
import { RiMoonCloudyLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const SelectedMasjid = ({ userId }) => {
  const [selectedMasjid, setSelectedMasjid] = useState("");
  const [announcement, setAnnouncement] = useState([]);
  const fetchSelectMasjid = async () => {
    const fetchMasjid = await axios.get(`/api/namaz?userId=${userId}`);

    setSelectedMasjid(fetchMasjid.data.details);
  };
  const fetchSelectedMasjidAnnouncement = async () => {
    const res = await axios.get(`/api/announcement?userId=${userId}`);
    setAnnouncement(res.data.details);
    console.log(res)
  };
  useEffect(() => {
    fetchSelectMasjid();
    fetchSelectedMasjidAnnouncement();
  }, [userId]);
  const selectedMasjidName = useSelector((state) => state.auth.masjid);
  console.log("selectedmasjidName: ", selectedMasjidName);
  return (
    <div className="bg-white min-h-screen text-black p-1 overflow-y-auto mb-4">
      <CommonHeader>{selectedMasjidName}</CommonHeader>

      <div className="mt-4 p-2">
        <p className="font-semibold text-base mb-4">Today's Prayer Times</p>

        {selectedMasjid?.length > 0 ? (
          selectedMasjid.map((item, index) => (
            <div key={index} className="space-y-2">
              {Object.entries(item.namazTiming || {}).map(
                ([prayer, details]) => (
                  <div
                    key={prayer}
                    className="flex items-center justify-between border border-gray-300 rounded-lg p-2 shadow-sm"
                  >
                    {/* Left side: prayer icon + name + time */}
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 rounded-lg p-1">
                        {/* You can swap icons based on prayer */}
                        {prayer === "isha" || prayer === "maghrib" ? (
                          <RiMoonCloudyLine className="w-6 h-6 p-1" />
                        ) : (
                          <BsSun className="w-6 h-6 p-1" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold capitalize">
                          {prayer}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {details?.time} {details?.period}
                        </span>
                      </div>
                    </div>

                    {/* Right side: bell icon */}
                    <div className="text-gray-500">
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
      <div className="my-2 p-2 mb-6">
        <p className="font-semibold text-base mb-3">Masjid's Announcements</p>
        {announcement?.length > 0 ? (
          announcement?.map((item, index) => (
            <div
              className="border border-gray-400 rounded-lg shadow-sm text-center my-1 p-1"
              key={index}
            >
              <p>{item.message}</p>
              <small>{new Date( item.createdAt).toLocaleString('en-US',{
                hour12:true
              })}</small>
            </div>
          ))
        ) : (
          <div className="text-center">No Announcement found</div>
        )}
      </div>
    </div>
  );
};

export default SelectedMasjid;
