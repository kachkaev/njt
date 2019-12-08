module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "styled-components",
      {
        displayName: process.env.NODE_ENV !== "production",
        pure: true,
      },
    ],
  ],
};
