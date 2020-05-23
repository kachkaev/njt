module.exports = {
  env: {
    siteUrl: process.env.SITE_URL || "https://njt.now.sh",
  },
  experimental: {
    rewrites: () => [
      {
        source: "/jump",
        destination: "/api/jump",
      },
    ],
  },
};
