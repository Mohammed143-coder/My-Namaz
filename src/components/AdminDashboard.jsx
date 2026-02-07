"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  HiSpeakerphone,
  HiTrash,
  HiRefresh,
  HiClock,
  HiLogout,
} from "react-icons/hi";
import NamazTimingsForm from "./NamazTimingsForm";
import CommonHeader from "./CommonHeader";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/userSlice/authSlice";

export default function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAnnouncement, setNewAnnouncement] = useState({
    message: "",
    type: "important",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;
    try {
      await axios.post("/api/logout");
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  // Fetch only announcements for THIS user/masjid
  // Currently api/announcement fetches ALL if no userId provided?
  // We need to fetch specific ones. backend GET supports `?userId=...`
  const fetchData = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      // Fetch announcements for THIS user
      const annRes = await axios.get(`/api/announcement?userId=${user.id}`);

      const annData = Array.isArray(annRes.data.details)
        ? annRes.data.details
        : [];
      setAnnouncements(annData);
    } catch (error) {
      console.error("Failed to fetch admin data", error);
      alert("Error loading announcements: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleDeleteAnnouncement = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`/api/announcement?id=${id}`);
      fetchData();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/announcement", {
        ...newAnnouncement,
        // Admin posts specific types "Important", "Jummah", "Urgent"
        userId: user.id,
      });
      setNewAnnouncement({ message: "", type: "important" });
      fetchData();
      alert("Announcement Posted");
    } catch (error) {
      alert("Failed to post");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pattern-bg text-charcoal pb-16">
      <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto">
        <CommonHeader className="bg-white shadow-md">Masjid Admin</CommonHeader>
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 border-l-4 border-emerald-500 mb-8 flex items-center justify-between mt-6 ">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {user?.masjid || "Your Masjid"}
            </h2>
            <p className="text-gray-500">
              Admin:{" "}
              <span className="font-medium text-gray-700">
                {user?.userName}
              </span>
            </p>
          </div>
          <div className="flex items-end-safe gap-6">
            
            <div className="bg-emerald-50 p-3 rounded-full text-emerald-600">
              <HiClock className="w-8 h-8" />
            </div>
            <button
              onClick={handleLogout}
              className="p-3 rounded-full text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center border border-red-100 shadow-sm"
              title="Logout"
            >
              <HiLogout className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-3 flex gap-2 mb-8 border border-gray-100">
          {["timings", "announcements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-lg font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-emerald-600 text-white shadow-md transform scale-105"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {tab} Management
            </button>
          ))}
        </div>

        {/* Content */}
        <main>
          {loading && (
            <p className="text-center py-10 text-emerald-600">Loading...</p>
          )}

          {!loading && activeTab === "timings" && (
            <div className="bg-white p-3 rounded-2xl shadow-md border-2 border-emerald-50">
              <h2 className="text-xl font-bold mb-6 text-center text-emerald-700 border-b pb-4">
                Update Prayer Timings
              </h2>
              <div className="max-w-lg mx-auto">
                <NamazTimingsForm User={user} />
              </div>
            </div>
          )}

          {!loading && activeTab === "announcements" && (
            <div className="space-y-8">
              {/* Create */}
              <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-amber-50">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-700">
                  <HiSpeakerphone /> Post New Announcement
                </h2>
                <form
                  onSubmit={handleCreateAnnouncement}
                  className="flex flex-col gap-4"
                >
                  <textarea
                    required
                    value={newAnnouncement?.message}
                    onChange={(e) =>
                      setNewAnnouncement({
                        ...newAnnouncement,
                        message: e.target.value,
                      })
                    }
                    className="w-full border-2 border-amber-100 rounded-xl p-3 outline-amber-500 focus:bg-amber-50/10 transition-colors"
                    rows="2"
                    placeholder="E.g. Jummah prayer will be at 1:30 PM..."
                  ></textarea>

                  <div className="flex gap-4">
                    <select
                      value={newAnnouncement?.type}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          type: e.target.value,
                        })
                      }
                      className="flex-1 border-2 border-gray-200 rounded-xl p-3 outline-emerald-500"
                    >
                      <option value="common">Common</option>
                      <option value="important">Important</option>
                      <option value="jummah">Jummah</option>
                    </select>

                    <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-md transition-transform active:scale-95">
                      Post
                    </button>
                  </div>
                </form>
              </div>

              {/* List */}
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-lg font-bold mb-4 text-gray-700">
                  Active Announcements
                </h2>
                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann._id}
                      className="p-4 border border-gray-100 rounded-xl flex justify-between items-center bg-gray-50 hover:bg-white transition-colors"
                    >
                      <div className="flex-1">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase mb-1 inline-block border ${
                            ann.type === "urgent"
                              ? "bg-red-50 text-red-600 border-red-100"
                              : ann.type === "jummah"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {ann.type}
                        </span>
                        <p className="text-gray-800 font-medium">
                          {ann.message}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann._id)}
                        className="p-2 text-red-400 hover:text-red-600 bg-white shadow rounded-lg hover:shadow-md ml-4"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <p className="text-gray-400 text-center text-sm py-4">
                      No announcements posted.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
