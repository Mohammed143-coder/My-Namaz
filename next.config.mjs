import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js"; // built-in cache strategies

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Content Security Policy
         {
  key: "Content-Security-Policy",
  value:
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "connect-src 'self' https://api.aladhan.com https://islamicapi.com;",
},

        ],
      },
    ];
  },
};

export default withPWA({
  dest: "public", // Usually "public" for next-pwa
  register: true,
  skipWaiting: true,
  runtimeCaching,
})(nextConfig);
