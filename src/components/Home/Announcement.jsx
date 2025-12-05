"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import useSWR from "swr";

const Announcement = () => {
  //   const announcementsList = [
  //     {
  //       type: "Important",
  //       desc: "Jummah Salah will start at 1:30 PM sharp.",
  //       masjid: "Masjid-e-Noor, Krishnagiri",
  //       createdAt: "2025-08-21T09:15:00.000Z",
  //     },
  //     {
  //       type: "Not Important",
  //       desc: "Daily Isha time remains at 8:15 PM.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, iure totam? Dolorem, iure? Nam quae ex voluptates sunt culpa dolor?",
  //       masjid: "Masjid-e-Quba, Krishnagiri",
  //       createdAt: "2025-08-20T18:45:00.000Z",
  //     },
  //     {
  //       type: "Important",
  //       desc: "Special lecture on Seerah after Maghrib on Friday.",
  //       masjid: "Masjid-e-Bilal, Krishnagiri",
  //       createdAt: "2025-08-19T14:30:00.000Z",
  //     },
  //     {
  //       type: "Not Important",
  //       desc: "Community cleaning drive scheduled for Sunday morning.",
  //       masjid: "Masjid-e-Salam, Krishnagiri",
  //       createdAt: "2025-08-18T07:00:00.000Z",
  //     },
  //     {
  //       type: "Important",
  //       desc: "Special lecture on Seerah after Maghrib on Friday.",
  //       masjid: "Masjid-e-Bilal, Krishnagiri",
  //       createdAt: "2025-08-19T14:30:00.000Z",
  //     },
  //
  //   ];
  const [announcement, setAnnouncement] = useState([]);

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const {
    data: overallAnnouncement,
    error,
    isLoading,
  } = useSWR("/api/announcement", fetcher, {
    refreshInterval: 1000000, // re-fetch
    revalidateOnFocus: true, // re-fetch when window refocus
    dedupingInterval: 200000,
  });
  useEffect(() => {
    if (overallAnnouncement?.details) {
      // Sort announcements: important first, then by date (newest first)
      const sorted = [...overallAnnouncement.details].sort((a, b) => {
        // First, sort by type (important first)
        if (a.type === "important" && b.type !== "important") return -1;
        if (a.type !== "important" && b.type === "important") return 1;
        // Then sort by date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setAnnouncement(sorted);
    }
  }, [overallAnnouncement]);

  // const allAnnouncement = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.get("/api/announcement");
  //     console.log("announJ: ", res);
  //     setAnnouncement(res.data.details);
  //   } catch (error) {
  //     console.error(error.message);
  //     alert(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   allAnnouncement();
  // }, []);
  if (isLoading) return <Loading />;

  return (
    <div className="py-1 px-2 my-0.5 rounded-xl mb-2">
      {announcement.length > 0 ? (
        announcement?.map((item, index) => {
          const isImportant = item.type === "important";
          return (
            <div
              className={`border-2 p-3 shadow my-2 mx-0.5 rounded-lg text-center transition-all hover:shadow-lg ${
                isImportant
                  ? "border-orange-400 bg-orange-50 hover:shadow-orange-200"
                  : "border-emerald-300 bg-emerald-50 hover:shadow-blue-200"
              }`}
              key={index}
            >
              {isImportant && (
                <div className="flex items-center justify-center gap-1 mb-2">
                  {/* <span className="text-xl">❗</span> */}
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider px-2 py-1 bg-orange-100 rounded-full">
                    Important
                  </span>
                </div>
              )}
              <h5
                className={`text-lg font-semibold mb-2 ${
                  isImportant ? "text-orange-500" : "text-gray-700"
                }`}
              >
                {item?.userId.masjid}
              </h5>
              <p
                className={`text-sm leading-relaxed ${
                  isImportant ? "text-gray-800 font-medium" : "text-gray-600"
                }`}
              >
                {item.message}
              </p>
              <small className="block mt-2 text-gray-500">
                {new Date(item.createdAt).toLocaleString("en-US", {
                  hour12: true,
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-4">
          No Announcement found.
        </div>
      )}
    </div>
  );
};

export default Announcement;
