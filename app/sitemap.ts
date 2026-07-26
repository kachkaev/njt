import type { MetadataRoute } from "next";

import { getBaseUrl } from "./shared/base-url";

/**
 * The home page is the only thing worth indexing, so this exists mostly to give
 * robots.txt something to point at. `lastModified` is left out on purpose: a
 * build-time date would change on every deploy without the page having changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${getBaseUrl()}/` }];
}
