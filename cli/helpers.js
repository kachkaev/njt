const open = require("open");
const path = require("path");

const getPackageVersion = () =>
  require(path.resolve(__dirname, "./package.json")).version;

const generateUrl = (query) => {
  return `https://njt.now.sh/jump?from=cli%40${getPackageVersion()}&to=${encodeURIComponent(
    query,
  )}`;
};

const openUrl = async (url, browser) => {
  await open(url, { app: browser });
};

module.exports = { getPackageVersion, generateUrl, openUrl };
