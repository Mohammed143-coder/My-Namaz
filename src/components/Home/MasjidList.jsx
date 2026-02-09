"use client";

import Loading from "@/app/loading";
import { selectedMasjidName } from "@/lib/userSlice/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { PiMosqueDuotone } from "react-icons/pi";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { useFavorites } from "@/hooks/useFavorites";

const MasjidList = ({ searchMasjid = "", favoritesOnly = false }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    refreshInterval: 1000000,
    revalidateOnFocus: true,
    dedupingInterval: 200000,
  });

  if (isLoading || !isLoaded) return <Loading />;
  if (error)
    return (
      <div className="text-center text-red-500 py-8">
        Failed to load masjids. Please try again later.
      </div>
    );

  const masjids = Array.isArray(data?.details) ? data.details : [];

  // Apply filtering based on favoritesOnly and searchMasjid
  let filteredMasjids = masjids;

  if (favoritesOnly) {
    filteredMasjids = filteredMasjids.filter((item) =>
      favorites.includes(item._id),
    );
  }

  if (searchMasjid) {
    filteredMasjids = filteredMasjids.filter(
      (item) =>
        item.masjid.toLowerCase().includes(searchMasjid.toLowerCase()) ||
        item.masjidLocation.toLowerCase().includes(searchMasjid.toLowerCase()),
    );
  }

  // Handle empty state for favorites on home page
  if (favoritesOnly && filteredMasjids.length === 0) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-500 mb-4 italic">
          No favorite masjids added yet.
        </p>
        <button
          onClick={() => router.push("/all-masjids")}
          className="text-sm bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-200 transition"
        >
          Browse All Masjids
        </button>
      </div>
    );
  }

  return (
    <div className="p-2 overflow-y-auto">
      {/* Favorites Counter Banner */}
      {favorites.length > 0 && (
        <div
          className={`mb-4 p-3 rounded-xl border-2 transition-all ${
            favorites.length >= 3
              ? "bg-red-50 border-red-300"
              : "bg-emerald-50 border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsBookmarkHeartFill
                className={`w-4 h-4 ${
                  favorites.length >= 3 ? "text-red-500" : "text-emerald-600"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  favorites.length >= 3 ? "text-red-700" : "text-emerald-700"
                }`}
              >
                {favorites.length} / 3 Favorites
              </span>
            </div>
            {favorites.length >= 3 && (
              <span className="text-xs text-red-600 font-medium">
                Limit reached
              </span>
            )}
          </div>
        </div>
      )}
      {filteredMasjids?.length > 0 ? (
        filteredMasjids.slice(0, 8).map((item) => {
          const isItemFavorite = isFavorite(item._id);

          return (
            <div
              key={item._id}
              onClick={() => dispatch(selectedMasjidName(item.masjid))}
              className="flex items-center justify-between text-charcoal gap-4 card-islamic my-2 py-3 px-3 md:px-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl shadow-md p-2">
                <PiMosqueDuotone className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-semibold text-gray-800">
                  {item.masjid}
                </span>
                <span className="text-sm text-gray-600">
                  {item.masjidLocation.substring(0, 30)}
                  {item.masjidLocation.length > 30 ? "..." : ""}
                </span>
              </div>
              <div className="flex items-center gap-3 font-bold">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/${item._id}`);
                  }}
                  className="hover:bg-emerald-50 p-2 rounded-lg transition"
                  aria-label="View details"
                >
                  <LuExternalLink className="w-5 h-5 text-emerald-600" />
                </button>
                {!favoritesOnly && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item._id);
                    }}
                    disabled={!isItemFavorite && favorites.length >= 3}
                    className={`p-2 rounded-lg transition ${
                      !isItemFavorite && favorites.length >= 3
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-red-50"
                    }`}
                    aria-label={
                      isItemFavorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    title={
                      !isItemFavorite && favorites.length >= 3
                        ? "Maximum 3 favorites allowed"
                        : isItemFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                    }
                  >
                    {isItemFavorite ? (
                      <BsBookmarkHeartFill className="w-5 h-5 text-red-500" />
                    ) : (
                      <BsBookmarkHeart
                        className={`w-5 h-5 ${
                          favorites.length >= 3
                            ? "text-gray-300"
                            : "text-gray-500 hover:text-red-500"
                        }`}
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-500 py-8">
          <PiMosqueDuotone className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p>No masjids found.</p>
        </div>
      )}
    </div>
  );
};

export default MasjidList;
