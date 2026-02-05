"use client";
import CommonHeader from "@/components/CommonHeader";
import { useFavorites } from "@/hooks/useFavorites";
import { PiMosqueDuotone } from "react-icons/pi";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { LuExternalLink } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import useSWR from "swr";
import axios from "axios";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { selectedMasjidName } from "@/lib/userSlice/authSlice";
import { useEffect } from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const FavouritePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { favorites, toggleFavorite, clearFavorites, isLoaded } =
    useFavorites();

  // Fetch all masjids from API
  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    refreshInterval: 1000000,
    revalidateOnFocus: true,
    dedupingInterval: 200000,
  });

  const allMasjids = data?.details || [];

  // Filter to show only favorited masjids
  const favoriteMasjids = allMasjids.filter((masjid) =>
    favorites.includes(masjid._id),
  );

  // Debug logging
  useEffect(() => {
    console.log("🏠 Favorite Page - Current Data:");
    console.log("  Favorites from hook:", favorites);
    console.log("  All masjids count:", allMasjids.length);
    console.log("  Filtered favorites:", favoriteMasjids.length);
    console.log(
      "  Favorite masjids:",
      favoriteMasjids.map((m) => ({ id: m._id, name: m.masjid })),
    );
  }, [favorites, allMasjids, favoriteMasjids]);

  if (isLoading || !isLoaded) return <Loading />;

  return (
    <div className="min-h-screen bg-white p-4 pb-24 pattern-bg">
      <div className="max-w-4xl mx-auto">
        <CommonHeader>Favorite Masjids</CommonHeader>

        {/* Debug Info (remove in production) */}
        {/* <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
          <p><strong>Debug Info:</strong></p>
          <p>Favorites IDs: {JSON.stringify(favorites)}</p>
          <p>Total Masjids: {allMasjids.length}</p>
          <p>Matched Favorites: {favoriteMasjids.length}</p>
        </div> */}

        {favoriteMasjids.length === 0 ? (
          <div className="mt-8 card-islamic p-12 text-center">
            <AiOutlineHeart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Favorites Yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start adding your favorite masjids to see them here!
            </p>
            <p className="text-sm text-gray-400 mt-2 mb-6">
              Tap the heart icon{" "}
              <BsBookmarkHeartFill className="inline w-4 h-4 text-red-500" /> on
              any masjid to add it to favorites.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Browse Masjids
            </button>
          </div>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between mb-4">
              <p className="text-gray-600">
                <span className="font-bold text-emerald-600 text-xl">
                  {favoriteMasjids.length}
                </span>{" "}
                favorite{favoriteMasjids.length !== 1 ? "s" : ""}
              </p>
              {favoriteMasjids.length > 0 && (
                <button
                  onClick={clearFavorites}
                  className="text-sm text-red-600 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-4">
              {favoriteMasjids.map((masjid) => (
                <div
                  key={masjid._id}
                  className="card-islamic p-6 flex items-center justify-between hover:shadow-lg transition-all"
                >
                  <div
                    className="flex items-center gap-4 flex-1 cursor-pointer"
                    onClick={() => {
                      dispatch(selectedMasjidName(masjid.masjid));
                      router.push(`/${masjid._id}`);
                    }}
                  >
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg p-4">
                      <PiMosqueDuotone className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-emerald-800 mb-1">
                        {masjid.masjid}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        📍 {masjid.masjidLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(selectedMasjidName(masjid.masjid));
                        router.push(`/${masjid._id}`);
                      }}
                      className="hover:bg-emerald-50 p-3 rounded-lg transition"
                      aria-label="View details"
                    >
                      <LuExternalLink className="w-5 h-5 text-emerald-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(masjid._id);
                      }}
                      className="hover:bg-red-50 p-3 rounded-lg transition group"
                      aria-label="Remove from favorites"
                    >
                      <BsBookmarkHeartFill className="w-5 h-5 text-red-500 group-hover:scale-110 transition" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 card-gold p-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                💡 Quick Access
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Your favorite masjids are saved locally on this device for quick
                access.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Saved in your browser's local storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Persists across sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>Quick access to your regular masjids</span>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavouritePage;
