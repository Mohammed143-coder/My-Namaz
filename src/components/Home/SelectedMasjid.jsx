"use client";

import { useEffect, useState } from "react";
import CommonHeader from "../CommonHeader";
import axios from "axios";
import { BsSun } from "react-icons/bs";
import { RiMoonCloudyLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import useSWR from "swr";
import Loading from "@/app/loading";

const ICON = (prayer) =>
  prayer === "maghrib" || prayer === "isha" ? (
    <RiMoonCloudyLine className="w-6 h-6 p-1" />
  ) : (
    <BsSun className="w-6 h-6 p-1" />
  );

const PRAYER_ORDER = ["fajr", "sunrise", "zohar", "asr", "maghrib", "isha"];

export default function SelectedMasjid({ userId }) {
  const [selectedMasjid, setSelectedMasjid] = useState([]);
  const [announcement, setAnnouncement] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  useEffect(() => {
    if (userId && isValidObjectId(userId)) {
      setSelectedUser(userId);
    } else {
      setSelectedUser(sessionStorage.getItem("selectedMasjidId"));
    }
  }, [userId]);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: namazData, isLoading } = useSWR(
    `/api/namaz?userId=${selectedUser}`,
    fetcher
  );

  const { data: announcementData, isLoading: announcementLoading } = useSWR(
    `/api/announcement?userId=${selectedUser}`,
    fetcher
  );

  useEffect(() => {
    if (namazData?.details) setSelectedMasjid(namazData.details);
    if (announcementData?.details) setAnnouncement(announcementData.details);
  }, [namazData, announcementData]);

  const selectedMasjidName = useSelector((state) => state.auth.masjid);

  if (isLoading || announcementLoading) return <Loading />;

  return (
    <div className="bg-white min-h-screen text-gray-500 p-1 pb-10">
      {/* <CommonHeader>{selectedMasjidName || "Selected Masjid"}</CommonHeader> */}

      <div className="md:flex gap-4 mt-6">

        {/* LEFT — PRAYER TIMES */}
        <div className="mt-2 p-2 md:w-[50%] overflow-y-auto">
          <p className="font-semibold text-gray-600 text-xl mb-4">Today's Prayer Times</p>

          {selectedMasjid?.length > 0 ? (
            PRAYER_ORDER.map((prayerKey) => {
              let details = selectedMasjid[0]?.namazTiming?.[prayerKey];
              if (!details) return null;

              const isDouble = details?.azanTime && details?.namazTime;

              return (
                <div
                  key={prayerKey}
                  className="mb-4 border border-gray-300 rounded-2xl bg-[#F0FDF8] shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  {/* Header with icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white border border-gray-300 rounded-lg p-1">
                      {ICON(prayerKey)}
                    </div>
                    <span className="font-bold text-lg capitalize">
                      {prayerKey}
                    </span>
                  </div>

                  {/* Sunrise Single Row */}
                  {!isDouble ? (
                    <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-3">
                      <span className="font-semibold">
                        {details?.time} {details?.period}
                      </span>
                      <span className="text-lg">ᨒ ོ </span>
                    </div>
                  ) : (
                    <>
                      {/* AZAN */}
                      <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-3 mb-3">
                        <span className="font-semibold">
                          Azan — {details.azanTime.time}{" "}
                          {details.azanTime.period}
                        </span>
                        <span className="text-xl">🤲</span>
                      </div>

                      {/* NAMAZ */}
                      <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-3">
                        <span className="font-semibold">
                          Namaz — {details.namazTime.time}{" "}
                          {details.namazTime.period}
                        </span>
                        <span className="text-2xl">🧎</span>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-400">No timings found</div>
          )}
        </div>

        {/* RIGHT — ANNOUNCEMENTS */}
        <div className="mt-2 p-2 md:w-[50%] h-[75vh] overflow-y-auto">
  <p className="font-semibold text-base mb-3">Masjid's Announcements</p>

  {announcement?.length > 0 ? (
    <div className="space-y-4 pb-20">
      {announcement.map((item, index) => {
        const isImportant = item.type === "important";

        return (
          <div
            key={index}
            className={`border-2 p-4 shadow rounded-xl text-center transition-all hover:shadow-lg ${
              isImportant
                ? "border-orange-400 bg-orange-50 hover:shadow-orange-200"
                : "border-emerald-300 bg-emerald-50 hover:shadow-emerald-200"
            }`}
          >
            {/* Important Badge */}
            {isImportant && (
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider px-2 py-1 bg-orange-100 rounded-full">
                  Important
                </span>
              </div>
            )}

            {/* Masjid Name */}
            <h5
              className={`text-lg font-semibold mb-1 ${
                isImportant ? "text-orange-500" : "text-gray-700"
              }`}
            >
              {item?.userId?.masjid}
            </h5>

            {/* Announcement Message */}
            <p
              className={`text-sm leading-relaxed ${
                isImportant
                  ? "text-gray-800 font-medium"
                  : "text-gray-600"
              }`}
            >
              {item.message}
            </p>

            {/* Timestamp */}
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
      })}
    </div>
  ) : (
    <div className="text-center text-gray-400">No announcements found.</div>
  )}
</div>

      </div>
    </div>
  );
}
