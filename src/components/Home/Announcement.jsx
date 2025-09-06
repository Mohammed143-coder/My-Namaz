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
  const [isloading, setIsLoading] = useState(false);
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data:overallAnnouncement, error, isLoading } = useSWR("/api/announcement", fetcher, {
    refreshInterval: 1000000, // re-fetch
    revalidateOnFocus: true, // re-fetch when window refocus
    dedupingInterval: 200000,
  });
  useEffect(()=>{
if(overallAnnouncement?.details){
     setAnnouncement(overallAnnouncement.details);
  }
  },[overallAnnouncement])
  

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
  if (isloading) return <Loading />;
  return (
    <div className="py-1 px-2 my-0.5 border-gray-400 rounded-xl mb-2">
      {announcement?.map((item, index) => (
        <div
          className="border border-gray-400 p-1 shadow my-1 mx-0.5 rounded-lg text-center mb-2 hover:shadow-md hover:shadow-blue-300"
          key={index}
        >
          <h5 className="text-lg font-medium">{item?.userId.masjid}</h5>
          <p>{item.message}</p>
          <small className="my-0.5">
            {new Date(item.createdAt).toLocaleString("en-US", {
              hour12: true,
            })}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
