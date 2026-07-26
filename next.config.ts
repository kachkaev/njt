import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * The whole site is a single ~11 kB stylesheet, so putting it into the
   * document removes the only render-blocking request on the critical path.
   */
  experimental: { inlineCss: true },

  productionBrowserSourceMaps: true,

  reactCompiler: true,
  reactStrictMode: true,

  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
