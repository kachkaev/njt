/**
 * @type import("next").NextConfig
 */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },

  pageExtensions: ["page.tsx", "handler.ts"],
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,

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

  webpack: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensionAlias: {
          /* eslint-disable @typescript-eslint/naming-convention */
          ".js": [".js", ".ts"],
          ".jsx": [".jsx", ".tsx"],
          /* eslint-enable @typescript-eslint/naming-convention */
        },
      },
    };
  },
};

export default nextConfig;
