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

  webpack: (
    config: Record<string, unknown> & { resolve: Record<string, unknown> }
  ) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensionAlias: {
          /* eslint-disable @typescript-eslint/naming-convention -- external API */
          ".js": [".js", ".ts"],
          ".jsx": [".jsx", ".tsx"],
          /* eslint-enable @typescript-eslint/naming-convention -- external API */
        },
      },
    };
  },
};

// eslint-disable-next-line import/no-default-export -- third-party API
export default nextConfig;
