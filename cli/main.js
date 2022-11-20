import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import open from "open";

export const getPackageVersion = () => {
  const filePath = new URL(import.meta.url).pathname;
  const packageJsonPath = resolve(dirname(filePath), "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  return packageJson.version;
};

export const generateUrl = (query) => {
  return `https://njt.vercel.app/jump?from=cli%40${getPackageVersion()}&to=${encodeURIComponent(
    query,
  )}`;
};

export const openUrl = async (url, browser) => {
  await open(url, { app: browser });
};
