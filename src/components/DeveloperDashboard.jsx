"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiUsers, HiSpeakerphone, HiTrash, HiRefresh } from "react-icons/hi";
import CommonHeader from "./CommonHeader"; // Assuming this is the header component for devotional style

export default function DeveloperDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [announcements, setAnnouncements] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ users: 0, announcements: 0 });
  const [loading, setLoading] = useState(true);
  const [newAnnouncement, setNewAnnouncement] = useState({
    message: "",
    type: "common",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [annRes, userRes] = await Promise.all([
        axios.get("/api/announcement"),
        axios.get("/api/user"),
      ]);

      const annData = Array.isArray(annRes.data.details)
        ? annRes.data.details
        : [];
      const userData = Array.isArray(userRes.data.details)
        ? userRes.data.details
        : [];

      setAnnouncements(annData);
      setUsers(userData);
      setStats({
        users: userData.length,
        announcements: annData.length,
      });
    } catch (error) {
      console.error("Failed to fetch developer data", error);
      alert("Error loading system data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteAnnouncement = async (id) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      await axios.delete(`/api/announcement?id=${id}`);
      fetchData();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const handleDeleteUser = async (id) => {
    if (
      !confirm(
        "Are you sure? This will delete the user and their data permanently.",
      )
    )
      return;
    try {
      await axios.delete(`/api/user?id=${id}`);
      fetchData();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/announcement", {
        ...newAnnouncement,
        type: "common", // Developer only posts "Common" announcements implies global?
        // Actually user said "common announcement need to visible in main page".
        // Dev can probably post any type, but primarily Common.
        userId: user.id, // Super Admin ID
      });
      setNewAnnouncement({ message: "", type: "common" });
      fetchData();
      alert("Announcement Posted");
    } catch (error) {
      alert("Failed to post");
    }
  };

  return (
    <div className="min-h-screen max-h-full bg-gray-50 pattern-bg text-charcoal">
      <div className="px-4 py-6 md:py-8 max-w-4xl mx-auto pb-14">
        <CommonHeader className="bg-white shadow-md">
          Developer Panel
        </CommonHeader>
        <div className="flex justify-between items-center gap-2 mt-6 md:mt-8">
          <div>
            <h2 className="text-xl font-bold text-emerald-800">
              Super Admin Control
            </h2>
            <p className="text-gray-600 text-sm my-2">
              Welcome, {user?.userName || "Developer"}
            </p>
          </div>
          <button
            onClick={fetchData}
            className="p-2 bg-white rounded-full shadow hover:bg-emerald-50 text-emerald-600 transition"
          >
            <HiRefresh className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card-islamic p-4 flex items-center shadow-md border-2 border-emerald-100">
            <div className="p-4 bg-emerald-100 rounded-full text-emerald-700 mr-4">
              <HiUsers className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Registered Users</p>
              <h3 className="text-3xl font-bold text-charcoal">
                {stats.users}
              </h3>
            </div>
          </div>
          <div className="card-islamic p-4 flex items-center shadow-md border-2 border-amber-100">
            <div className="p-4 bg-amber-100 rounded-full text-amber-600 mr-4">
              <HiSpeakerphone className="w-8 h-8" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Announcements</p>
              <h3 className="text-3xl font-bold text-charcoal">
                {stats.announcements}
              </h3>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          {["users", "announcements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab} Management
            </button>
          ))}
        </div>

        {/* Content */}
        <main>
          {loading && (
            <p className="text-center py-10 text-emerald-600 animate-pulse">
              Loading data...
            </p>
          )}

          {!loading && activeTab === "overview" && (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-400">
                Select a tab to manage resources
              </h3>
            </div>
          )}

          {!loading && activeTab === "announcements" && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Create Form */}
              <div className="card-islamic p-6 h-fit border-2 border-emerald-100">
                <h2 className="text-xl font-bold mb-4 text-emerald-800">
                  Post Global Announcement
                </h2>
                <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Message (Visible on Home Page)
                    </label>
                    <textarea
                      required
                      value={newAnnouncement.message}
                      onChange={(e) =>
                        setNewAnnouncement({
                          ...newAnnouncement,
                          message: e.target.value,
                        })
                      }
                      className="w-full border-2 border-emerald-200 rounded-lg p-3 outline-emerald-500 focus:border-emerald-500 transition-colors bg-emerald-50/30"
                      rows="3"
                      placeholder="Enter announcement text..."
                    ></textarea>
                  </div>
                  {/* Developer posts are mostly Common */}
                  <input type="hidden" value="common" />

                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 font-bold shadow-md transition-transform active:scale-95">
                    Post Announcement
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="card-islamic p-6 border-2 border-emerald-50">
                <h2 className="text-xl font-bold mb-4 text-emerald-800">
                  All System Announcements ({announcements.length})
                </h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {announcements.map((ann) => (
                    <div
                      key={ann._id}
                      className="p-4 border border-gray-100 rounded-lg flex justify-between items-start bg-white hover:bg-gray-50 group"
                    >
                      <div>
                        <span
                          className={`text-xs px-2 py-1 rounded font-bold uppercase mb-2 inline-block ${ann.type === "common" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}
                        >
                          {ann.type}
                        </span>
                        <p className="text-gray-800 font-medium">
                          {ann.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          By: {ann.userId?.masjid || "Unknown"} • Expires:{" "}
                          {new Date(ann.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann._id)}
                        className="p-2 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Announcement"
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <p className="text-gray-400 text-center py-4">
                      No active announcements
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!loading && activeTab === "users" && (
            <div className="card-islamic p-6 border-2 border-emerald-50">
              <h2 className="text-xl font-bold mb-4 text-emerald-800">
                Registered Masjids ({users.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-emerald-100 text-emerald-700 text-sm">
                      <th className="py-3 px-4">Masjid Name</th>
                      <th className="py-3 px-4">Admin Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Verification</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-b border-gray-100 hover:bg-emerald-50/50 transition-colors"
                      >
                        <td className="py-3 px-4 font-bold text-gray-800">
                          {u.masjid}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {u.userName}
                        </td>
                        <td className="py-3 px-4 text-gray-500 text-sm">
                          {u.userEmail}
                        </td>
                        <td className="py-3 px-4">
                          {u.isVerified ? (
                            <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full font-bold">
                              Verified
                            </span>
                          ) : (
                            <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full font-bold">
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                            title="Delete User"
                          >
                            <HiTrash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
