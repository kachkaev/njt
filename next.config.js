module.exports = {
  experimental: {
    styledComponents: true,
    esmExternals: false, // https://github.com/vercel/next.js/issues/30873
  },
  productionBrowserSourceMaps: true,
  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};
