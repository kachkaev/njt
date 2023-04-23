/** @type {import('prettier').Options} */
module.exports = {
  plugins: [
    require("prettier-plugin-packagejson"),
    require("prettier-plugin-sh"),
  ],
};
