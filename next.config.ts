import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  pageExtensions: ["page.tsx", "handler.ts"],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,

  // We call linters in GitHub Actions for all pull requests. By not linting
  // again during `next build`, we save CI minutes and unlock more feedback.
  // For local checks, run `pnpm lint`.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // eslint-disable-next-line @typescript-eslint/require-await -- third-party API
  rewrites: async () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};

// eslint-disable-next-line import/no-default-export -- third-party API
export default nextConfig;
