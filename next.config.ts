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

// eslint-disable-next-line import/no-default-export -- third-party API
export default nextConfig;
