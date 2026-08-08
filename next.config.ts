import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // One network request fewer, which is worth it for as little CSS as we have
    inlineCss: true,
  },

  productionBrowserSourceMaps: true,

  reactCompiler: true,
  reactStrictMode: true,

  typescript: { ignoreBuildErrors: true, useTypeScriptCli: false },
};

export default nextConfig;
