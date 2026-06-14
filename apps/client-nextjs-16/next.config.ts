import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@jsp/shared"],
  // productionBrowserSourceMaps: true, // useful even in prod debugging
};

export default nextConfig;
