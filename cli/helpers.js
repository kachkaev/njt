const open = require("open");

const generateUrl = (query) => {
  return `https://njt.now.sh/jump?q=${encodeURIComponent(query)}`;
};

const openUrl = async (url, browser) => {
  await open(url, { app: browser });
};

module.exports = { generateUrl, openUrl };
