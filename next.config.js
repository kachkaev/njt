module.exports = {
  productionBrowserSourceMaps: true,
  future: {
    webpack5: true,
  },
  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};
