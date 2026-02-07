"use client";
import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("favorite-masjids");
    // console.log("📚 Loading favorites from localStorage:", saved);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        setFavorites(parsed);
      } catch (error) {
        console.error("❌ Error loading favorites:", error);
        setFavorites([]);
      }
    } else {
      console.info("ℹ️ No saved favorites found");
    }
    setIsLoaded(true);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      // console.log("💾 Saving favorites to localStorage:", favorites);
      localStorage.setItem("favorite-masjids", JSON.stringify(favorites));
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (masjidId) => {
    // console.log("🔄 Toggling favorite for masjid:", masjidId);
    setFavorites((prev) => {
      const isCurrentlyFavorite = prev.includes(masjidId);

      // If trying to add a new favorite
      if (!isCurrentlyFavorite) {
        // Check if limit is reached
        if (prev.length >= 3) {
          alert(
            "⚠️ Maximum Limit Reached!\n\nYou can only add up to 3 favorite masjids.\nPlease remove one favorite before adding a new one."
          );
          return prev; // Don't add, return current favorites
        }
      }

      const newFavorites = isCurrentlyFavorite
        ? prev.filter((id) => id !== masjidId)
        : [...prev, masjidId];

      // console.log("📋 New favorites list:", newFavorites);
      return newFavorites;
    });
  };

  const isFavorite = (masjidId) => {
    const result = favorites.includes(masjidId);
    return result;
  };

  const clearFavorites = () => {
    // console.info("🗑️ Clearing all favorites");
    setFavorites([]);
    localStorage.removeItem("favorite-masjids");
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  };
};

export default useFavorites;
