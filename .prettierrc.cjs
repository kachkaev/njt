/** @type {import('prettier').Options} */
module.exports = {
  trailingComma: "all",

  plugins: [
    require("prettier-plugin-packagejson"),
    require("prettier-plugin-sh"),
  ],
};
