import type { MetadataRoute } from "next";

import { getBaseUrl } from "./shared/base-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // A redirect endpoint rather than a page: following it just bounces the
      // crawler off-site, and every `to` spells a separate URL to crawl.
      // `/suggest` is a machine-readable API with the same unbounded query space
      disallow: ["/jump", "/suggest"],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
