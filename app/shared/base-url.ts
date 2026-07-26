/**
 * The origin the site is served from, used to make `og:image` and friends
 * absolute, and to spell out the URLs in robots.txt and sitemap.xml.
 *
 * On preview deployments this resolves to the deployment’s own hostname, which
 * is what we want: Vercel serves previews with `x-robots-tag: noindex`, so the
 * URLs they advertise never reach an index.
 */
export function getBaseUrl(): string {
  const hostname = process.env["NEXT_PUBLIC_VERCEL_URL"] ?? "njt.vercel.app";
  const protocol = hostname.split(":")[0] === "localhost" ? "http" : "https";

  return `${protocol}://${hostname}`;
}
