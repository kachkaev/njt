module.exports = {
  productionBrowserSourceMaps: true,
  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};
