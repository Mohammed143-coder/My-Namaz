import { NextResponse } from "next/server";


const DEFAULT_METHOD = 1;
const DEFAULT_SCHOOL = 2; // Hanafi

// Default location for Krishnagiri, India
const DEFAULT_LAT = 12.5303521;
const DEFAULT_LON = 78.2006153;
const DEFAULT_CITY = "Krishnagiri";
const DEFAULT_COUNTRY = "India";

/**
 * Convert 24-hour time format (HH:MM) to 12-hour format with period
 */
const convertTo12Hour = (time24) => {
  if (!time24) return { time: "00:00", period: "AM" };

  const [hours24, minutes] = time24.split(":");
  let hours = parseInt(hours24, 10);
  const period = hours >= 12 ? "PM" : "AM";

  if (hours === 0) hours = 12;
  else if (hours > 12) hours -= 12;

  return {
    time: `${String(hours).padStart(2, "0")}:${minutes}`,
    period,
  };
};

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat") || DEFAULT_LAT;
    const lon = searchParams.get("lon") || DEFAULT_LON;
    const method = searchParams.get("method") || DEFAULT_METHOD;
    const school = searchParams.get("school") || DEFAULT_SCHOOL;
    const city = searchParams.get("city") || DEFAULT_CITY;
    const country = searchParams.get("country") || DEFAULT_COUNTRY;

    // Get API key from server-side environment variable (not exposed to client)
    const apiKey = process.env.ISLAMICAPI_API_KEY;

    if (!apiKey) {
      console.error("ISLAMICAPI_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }
    

    const url = `https://islamicapi.com/api/v1/prayer-time/?lat=${lat}&lon=${lon}&method=${method}&school=${school}&api_key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 1800 }, // Cache for 1/2 hour
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.code !== 200 || !data.data || !data.data.times) {
      throw new Error("Invalid API response format");
    }

    const timings = data.data.times;

    // Transform API response to match component format
    const prayerTimes = {
      fajr: convertTo12Hour(timings.Fajr),
      sunrise: convertTo12Hour(timings.Sunrise),
      zohar: convertTo12Hour(timings.Dhuhr),
      asr: convertTo12Hour(timings.Asr),
      maghrib: convertTo12Hour(timings.Maghrib),
      isha: convertTo12Hour(timings.Isha),
      tahajjud: convertTo12Hour(timings.Lastthird),
      imsak: convertTo12Hour(timings.Imsak),
      date: data.data.date,
      meta: {
        city,
        country,
        timezone: data.data.timezone.name,
        method: method,
        lastUpdated: new Date().toISOString(),
      },
    };

    return NextResponse.json(prayerTimes);
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return NextResponse.json(
      { error: "Failed to fetch prayer times" },
      { status: 500 },
    );
  }
}
