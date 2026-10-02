import { getBaseUrl } from "../shared/base-url";
import { listDestinations } from "../shared/destinations";

/**
 * Search suggestions in the OpenSearch format, advertised by public/opensearch.xml:
 * https://github.com/dewitt/opensearch/blob/master/mozilla/Search%20Suggestions%20Specification.md
 *
 * `prettier` or `prettier ` lists all destinations; `prettier r` narrows them
 * down to the destinations with a matching keyword.
 */
export function GET(request: Request): Response {
  const query = new URL(request.url).searchParams.get("q") ?? "";

  const [packageName, rawDestination = ""] = query
    .split(" ")
    .filter((chunk) => chunk.length);

  const completions: string[] = [];
  const descriptions: string[] = [];
  const urls: string[] = [];

  if (packageName) {
    const destinationPrefix = rawDestination.toLowerCase();

    for (const { keywords, description } of listDestinations()) {
      const keyword = keywords.find(
        (candidate) =>
          candidate.length > 0 && candidate.startsWith(destinationPrefix),
      );
      if (keyword === undefined) {
        continue;
      }

      const completion = `${packageName} ${keyword}`;
      completions.push(completion);
      descriptions.push(description);
      urls.push(`${getBaseUrl()}/jump?to=${encodeURIComponent(completion)}`);
    }
  }

  return Response.json([query, completions, descriptions, urls], {
    headers: {
      "content-type": "application/x-suggestions+json; charset=utf-8",
      // The response only depends on the query and the deployed destination list
      "cache-control": "public, max-age=3600",
      // Lets the browser extension (and other clients) fetch suggestions
      // without host permissions; the data is public anyway
      "access-control-allow-origin": "*",
    },
  });
}
