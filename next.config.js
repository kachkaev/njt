module.exports = {
  env: {
    siteUrl: process.env.SITE_URL || "https://njt.now.sh",
  },
  rewrites: () => [
    {
      source: "/jump",
      destination: "/api/jump",
    },
  ],
};
