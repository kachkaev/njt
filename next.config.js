module.exports = {
  experimental: {
    styledComponents: true,
  },
  productionBrowserSourceMaps: true,
  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};
