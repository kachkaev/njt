import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["page.tsx", "handler.ts"],

  productionBrowserSourceMaps: true,

  reactCompiler: true,
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
