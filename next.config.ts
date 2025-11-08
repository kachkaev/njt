import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: { styledComponents: true },

  pageExtensions: ["page.tsx", "handler.ts"],

  productionBrowserSourceMaps: true,

  reactStrictMode: true,

  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],

  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
