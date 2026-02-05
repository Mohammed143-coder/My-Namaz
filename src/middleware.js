import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export function middleware(req) {
  console.log("Middleware for:", req.nextUrl.pathname);
  
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    console.log("No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_KEY);
    console.log("Token verified for user:", verify.userEmail);
    
    const currentPath = req.nextUrl.pathname;
    
    // Developer Whitelist Check
    const developerEmails = (process.env.DEVELOPER_EMAILS || "").split(",").map(e => e.trim());
    const isDeveloper = developerEmails.includes(verify.userEmail);
    
    // Logic:
    // 1. If accessing /developer, MUST be in whitelist.
    if (currentPath.startsWith("/developer")) {
        if (isDeveloper) {
             return NextResponse.next();
        } else {
             console.log(`Unauthorized access to /developer by ${verify.userEmail}. Redirecting to /admin`);
             return NextResponse.redirect(new URL("/admin", req.url));
        }
    }

    // 2. If accessing /admin, anyone authenticated can enter (including devs)
    if (currentPath.startsWith("/admin")) {
        return NextResponse.next();
    }
    
    return NextResponse.next();
    
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}


export const config = {
  matcher: [
    "/admin/:path*",    // Matches /admin and all subpaths
    "/developer/:path*" // Matches /developer and all subpaths
  ],
};