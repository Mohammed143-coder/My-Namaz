/**
 * Prayer Time Service using Aladhan API
 *
 * Aladhan API is a free, trusted, and secure Islamic prayer times service
 * that supports global locations including India.
 *
 * API Documentation: https://aladhan.com/prayer-times-api
 */

const ALADHAN_API_BASE = "https://api.aladhan.com/v1";
const DEFAULT_CITY = "Krishnagiri";
const DEFAULT_COUNTRY = "India";
const DEFAULT_METHOD = 2; // ISNA - Islamic Society of North America
const DEFAULT_SCHOOL = 1; // Hanafi

// Cache for storing prayer times (reduces API calls)
let cachedData = null;
let cacheTimestamp = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Convert 24-hour time format (HH:MM) to 12-hour format with period
 * @param {string} time24 - Time in 24-hour format (e.g., "13:45")
 * @returns {object} - { time: "01:45", period: "PM" }
 */
const convertTo12Hour = (time24) => {
  if (!time24) return { time: "00:00", period: "AM" };

  const [hours24, minutes] = time24.split(":");
  let hours = parseInt(hours24, 10);
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;

  return {
    time: `${String(hours).padStart(2, "0")}:${minutes}`,
    period,
  };
};

/**
 * Fetch prayer times from Aladhan API
 * @param {string} city - City name (default: Krishnagiri)
 * @param {string} country - Country name (default: India)
 * @param {number} method - Calculation method (default: 2 - ISNA)
 * @returns {Promise<object>} - Prayer times object
 */
export const fetchPrayerTimes = async (
  city = DEFAULT_CITY,
  country = DEFAULT_COUNTRY,
  method = DEFAULT_METHOD,
  school= DEFAULT_SCHOOL
) => {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
      console.log("Using cached prayer times");
      return cachedData;
    }

    // Fetch from API
    const url = `${ALADHAN_API_BASE}/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&school=${school}`;
    console.log("Fetching prayer times from Aladhan API...");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== 200 || !data.data || !data.data.timings) {
      throw new Error("Invalid API response format");
    }

    const timings = data.data.timings;

    // Transform API response to match component format
    const prayerTimes = {
      fajr: convertTo12Hour(timings.Fajr),
      sunrise: convertTo12Hour(timings.Sunrise),
      zohar: convertTo12Hour(timings.Dhuhr), // Dhuhr is Zohar
      asr: convertTo12Hour(timings.Asr),
      maghrib: convertTo12Hour(timings.Maghrib),
      isha: convertTo12Hour(timings.Isha),
      tahajjud: convertTo12Hour(timings.Lastthird), // Last third of night for Tahajjud

      // Additional times for fasting
      imsak: convertTo12Hour(timings.Imsak), // Sehri time (stop eating before Fajr)

      // Metadata
      date: data.data.date,
      meta: {
        city,
        country,
        timezone: data.data.meta.timezone,
        method: data.data.meta.method.name,
        lastUpdated: new Date().toISOString(),
      },
    };

    // Cache the result
    cachedData = prayerTimes;
    cacheTimestamp = now;

    console.log("Prayer times fetched successfully:", prayerTimes);
    return prayerTimes;
  } catch (error) {
    console.error("Error fetching prayer times:", error);

    // Return cached data if available, even if expired
    if (cachedData) {
      console.log("Returning expired cached data due to error");
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
