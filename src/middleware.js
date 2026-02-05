import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // Max 100 requests per minute

export const runtime = "nodejs";

export function middleware(req) {
  const currentPath = req.nextUrl.pathname;

  // Rate Limiting for API routes
  if (currentPath.startsWith("/api")) {
    const ip = req.headers.get("x-forwarded-for") || req.ip || "anonymous";
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - rateData.startTime > RATE_LIMIT_WINDOW) {
      rateData.count = 1;
      rateData.startTime = now;
    } else {
      rateData.count++;
    }

    rateLimitMap.set(ip, rateData);

    if (rateData.count > MAX_REQUESTS) {
      return NextResponse.json(
        {
          message: "Too many requests. Please try again later.",
          success: false,
        },
        { status: 429 },
      );
    }
  }

  // Auth for Admin and Developer routes
  if (
    currentPath.startsWith("/admin") ||
    currentPath.startsWith("/developer")
  ) {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const verify = jwt.verify(token, process.env.JWT_KEY);
      const developerEmails = (process.env.DEVELOPER_EMAILS || "")
        .split(",")
        .map((e) => e.trim());
      const isDeveloper = developerEmails.includes(verify.userEmail);

      if (currentPath.startsWith("/developer") && !isDeveloper) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/developer/:path*", "/api/:path*"],
};
