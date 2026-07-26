import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,

  reactCompiler: true,
  reactStrictMode: true,

  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
