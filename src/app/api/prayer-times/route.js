import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let lat = searchParams.get("lat");
  let lon = searchParams.get("lon");
  const city = searchParams.get("city");
  const country = searchParams.get("country");
  const method = searchParams.get("method") || "1";
  const school = searchParams.get("school") || "1";

  // Sanitize the API key using .trim() to avoid accidental whitespace from Vercel
  const rawKey = process.env.ISLAMICAPI_API_KEY || "";
  const apiKey = rawKey.trim();

  // 1. Check for API Key
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Configuration Error: ISLAMIC_API_KEY is not defined.",
        message:
          "If you are on Vercel, please add ISLAMICAPI_API_KEY to your Project Settings > Environment Variables.",
        help: "https://vercel.com/docs/projects/environment-variables",
      },
      { status: 500 },
    );
  }

  // 2. Handle City/Country format
  if (!lat && !lon && city && country) {
    if (
      city.toLowerCase() === "krishnagiri" &&
      country.toLowerCase() === "india"
    ) {
      lat = "12.5303521";
      lon = "78.2006153";
    } else {
      return NextResponse.json(
        {
          error:
            "Unsupported city. Please use latitude and longitude parameters for this city.",
        },
        { status: 400 },
      );
    }
  }

  // 3. Validate coordinates
  if (!lat || !lon) {
    return NextResponse.json(
      {
        error:
          "Missing parameters. Please provide 'lat' and 'lon' (recommended) or 'city' and 'country' (e.g. Krishnagiri/India).",
      },
      { status: 400 },
    );
  }

  try {
    const apiUrl = `https://islamicapi.com/api/v1/prayer-time/?lat=${lat}&lon=${lon}&method=${method}&school=${school}&api_key=${apiKey}`;

    // Advanced "Stealth" headers to mimic a browser even more closely
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Referer: "https://islamicapi.com/",
        Origin: "https://islamicapi.com",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      // If blocked by Cloudflare (403), we return a specific status so the client knows to fallback
      return NextResponse.json(
        {
          error: "API Blocked",
          status: response.status,
          message:
            "Request blocked by provider. Client-side fallback should trigger.",
        },
        { status: response.status },
      );
    }

    const rawData = await response.json();

    // Normalize data for the frontend
    const times = rawData.data.times;

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

    return NextResponse.json({
      fajr: convertTo12Hour(times.Fajr),
      sunrise: convertTo12Hour(times.Sunrise),
      zohar: convertTo12Hour(times.Dhuhr),
      asr: convertTo12Hour(times.Asr),
      maghrib: convertTo12Hour(times.Maghrib),
      isha: convertTo12Hour(times.Isha),
      tahajjud: convertTo12Hour(times.Lastthird),
      imsak: convertTo12Hour(times.Imsak),
      metadata: rawData.data.date,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 },
    );
  }
}
