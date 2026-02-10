/**
 * Prayer Time Service
 *
 * This service fetches prayer times from an internal API route
 * with an automatic fallback to direct client-side fetching if blocked.
 */

// Default location for metadata if not provided
const latitude = "12.5303521";
const longitude = "78.2006153";
const Islamicmethod = "1";
const IslamicSchool = "1";

// Cache for storing prayer times (reduces API calls)
let cachedData = null;
let cacheTimestamp = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Normalizes IslamicAPI raw data format to the frontend's expected format
 */
const normalizeData = (data) => {
  if (!data || !data.data || !data.data.times) return null;

  const times = data.data.times;
  const convertTo12Hour = (time24) => {
    if (!time24) return null;
    let [hours, minutes] = time24.split(":");
    hours = parseInt(hours);
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return {
      time: `${String(hours).padStart(2, "0")}:${minutes}`,
      period: period,
    };
  };

  return {
    fajr: convertTo12Hour(times.Fajr),
    sunrise: convertTo12Hour(times.Sunrise),
    zohar: convertTo12Hour(times.Dhuhr),
    asr: convertTo12Hour(times.Asr),
    maghrib: convertTo12Hour(times.Maghrib),
    isha: convertTo12Hour(times.Isha),
    tahajjud: convertTo12Hour(times.Lastthird),
    imsak: convertTo12Hour(times.Imsak),
    metadata: data.data.date,
  };
};

/**
 * Fetch prayer times from internal API route
 * @returns {Promise<object>} - Prayer times object
 */
export const fetchPrayerTimes = async (
  lat = latitude,
  lon = longitude,
  method = Islamicmethod,
  school = IslamicSchool,
) => {
  try {
    // Check cache first
    const now = Date.now();
    if (cachedData && cacheTimestamp && now - cacheTimestamp < CACHE_DURATION) {
      return cachedData;
    }

    let prayerTimes;

    // STEP 1: Try internal API proxy (Server-side)
    try {
      const response = await fetch(
        `/api/prayer-times?lat=${lat}&lon=${lon}&method=${method}&school=${school}`,
      );

      if (response.ok) {
        prayerTimes = await response.json();
      } else if (response.status === 403 || response.status === 500) {
        // STEP 2 Fallback: Fetch directly from client if proxy is blocked
        console.warn(
          "Proxy blocked or misconfigured, attempting direct client fetch...",
        );

        const apiKey = process.env.NEXT_PUBLIC_ISLAMICAPI_API_KEY;
        if (!apiKey) throw new Error("Missing NEXT_PUBLIC_ISLAMICAPI_API_KEY");

        const directUrl = `https://islamicapi.com/api/v1/prayer-time/?lat=${lat}&lon=${lon}&method=${method}&school=${school}&api_key=${apiKey}`;
        const directResponse = await fetch(directUrl);

        if (!directResponse.ok) {
          throw new Error(
            `Direct API call failed with status ${directResponse.status}`,
          );
        }

        const rawData = await directResponse.json();
        prayerTimes = normalizeData(rawData);
      } else {
        throw new Error(`Proxy failed with status ${response.status}`);
      }
    } catch (proxyError) {
      console.error("Proxy error:", proxyError);
      throw proxyError;
    }

    if (!prayerTimes) throw new Error("Failed to load prayer times");

    // Cache the result
    cachedData = prayerTimes;
    cacheTimestamp = now;

    return prayerTimes;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    if (cachedData) return cachedData;
    throw error;
  }
};

/**
 * Clear the prayer times cache
 */
export const clearCache = () => {
  cachedData = null;
  cacheTimestamp = null;
};

/**
 * Get fasting times (Sehri and Iftar)
 */
export const getFastingTimes = (prayerTimes) => {
  if (!prayerTimes) return null;
  return {
    sehri: prayerTimes.imsak,
    iftar: prayerTimes.maghrib,
  };
};
