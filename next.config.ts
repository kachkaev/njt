import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // One network request fewer, which is worth it for as little CSS as we have
    inlineCss: true,
    useTypeScriptCli: false,
  },

  productionBrowserSourceMaps: true,

  reactCompiler: true,
  reactStrictMode: true,

  typescript: { ignoreBuildErrors: true },

  webpack: (
    config: Record<string, unknown> & { resolve: Record<string, unknown> },
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

export default nextConfig;
