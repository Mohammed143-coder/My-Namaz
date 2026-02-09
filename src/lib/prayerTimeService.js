/**
 * Prayer Time Service
 *
 * This service fetches prayer times from an internal API route
 * which securely accesses the IslamicAPI on the server-side.
 */

// Default location for metadata if not provided
const DEFAULT_CITY = "Krishnagiri";
const DEFAULT_COUNTRY = "India";

// Cache for storing prayer times (reduces API calls)
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetch prayer times from internal API route
 * @param {string} city - City name (default: Krishnagiri)
 * @param {string} country - Country name (default: India)
 * @returns {Promise<object>} - Prayer times object
 */
export const fetchPrayerTimes = async (
  city = DEFAULT_CITY,
  country = DEFAULT_COUNTRY,
) => {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
      return cachedData;
    }

    // Fetch from internal API route (keeps API key secure on server)
    const response = await fetch(
      `/api/prayer-times?city=${city}&country=${country}`,
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const prayerTimes = await response.json();

    if (prayerTimes.error) {
      throw new Error(prayerTimes.error);
    }

    // Cache the result
    cachedData = prayerTimes;
    cacheTimestamp = now;

    return prayerTimes;
  } catch (error) {
    console.error("Error fetching prayer times:", error);

    // Return cached data if available, even if expired
    if (cachedData) {
      return cachedData;
    }

    // If no cache, throw error to be handled by component
    throw error;
  }
};

/**
 * Clear the prayer times cache
 * Useful for forcing a refresh
 */
export const clearCache = () => {
  cachedData = null;
  cacheTimestamp = null;
};

/**
 * Get fasting times (Sehri and Iftar)
 * @param {object} prayerTimes - Prayer times object from fetchPrayerTimes
 * @returns {object} - { sehri: {...}, iftar: {...} }
 */
export const getFastingTimes = (prayerTimes) => {
  if (!prayerTimes) return null;

  return {
    sehri: prayerTimes.imsak, // Time to stop eating (Imsak)
    iftar: prayerTimes.maghrib, // Time to break fast (Maghrib)
  };
};
