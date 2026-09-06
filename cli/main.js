import { readFileSync } from "node:fs";
import path from "node:path";

import open from "open";

export function getPackageVersion() {
  const filePath = new URL(import.meta.url).pathname;
  const packageJsonPath = path.resolve(path.dirname(filePath), "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  return packageJson.version;
}

export function generateUrl(query) {
  return `https://njt.vercel.app/jump?from=cli%40${getPackageVersion()}&to=${encodeURIComponent(
    query,
  )}`;
}

export async function openUrl(url, browser) {
  await open(url, { app: browser });
}
