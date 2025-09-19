import withPWA from 'next-pwa';
import runtimeCaching from 'next-pwa/cache.js'; // built-in cache strategies

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "static",
  register: true,
  skipWaiting: true,
  runtimeCaching, // ✅ enables smart caching
})(nextConfig);
