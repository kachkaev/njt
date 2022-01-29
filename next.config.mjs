/**
 * @type import("next").NextConfig
 */
const nextConfig = {
  experimental: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,

  // We call linters in GitHub Actions for all pull requests. By not linting
  // again during `next build`, we save CI minutes and unlock more feedback.
  // For local checks, run `yarn lint`.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};

export default nextConfig;
