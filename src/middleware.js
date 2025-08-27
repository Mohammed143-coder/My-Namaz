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
    const isDeveloper = verify.userEmail.endsWith("dev@gmail.com");
    const isAdmin = verify.userEmail.endsWith("@gmail.com") && !isDeveloper;
    
    console.log("Is Developer:", isDeveloper);
    console.log("Is Admin:", isAdmin);
    console.log("Current Path:", currentPath);
    
    // Developer users: Can access both /admin and /developer
    if (isDeveloper) {
      console.log("Developer access granted");
      return NextResponse.next();
    }
    
    // Admin users: Can only access /admin, redirect from /developer to /admin
    if (isAdmin) {
      if (currentPath.startsWith("/developer")) {
        console.log("Admin trying to access developer page, redirecting to admin");
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      
      if (currentPath.startsWith("/admin")) {
        console.log("Admin access to admin page granted");
        return NextResponse.next();
      }
    }
    
    // If user doesn't match any role, redirect to login
    console.log("No valid role found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
    
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