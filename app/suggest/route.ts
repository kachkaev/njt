import { getBaseUrl } from "../shared/base-url";
import { describeDestination, listDestinations } from "../shared/destinations";

/**
 * Search suggestions in the OpenSearch format, advertised by public/opensearch.xml:
 * https://github.com/dewitt/opensearch/blob/master/mozilla/Search%20Suggestions%20Specification.md
 *
 * The first suggestion is always what entering the query does (e.g. `prettier`
 * goes to npmjs.com). Then, `prettier` or `prettier ` lists all destinations,
 * and `prettier r` narrows them down to the ones with a matching keyword.
 *
 * A fifth element carries short labels for each completion, which browsers
 * ignore and the extension uses where full descriptions do not fit.
 */
export function GET(request: Request): Response {
  const query = new URL(request.url).searchParams.get("q") ?? "";

  const [packageName, rawDestination = ""] = query
    .split(" ")
    .filter((chunk) => chunk.length);

  const completions: string[] = [];
  const descriptions: string[] = [];
  const urls: string[] = [];
  const labels: string[] = [];

  function addSuggestion(
    completion: string,
    { description, label }: { description: string; label: string },
  ): void {
    completions.push(completion);
    descriptions.push(description);
    labels.push(label);
    urls.push(`${getBaseUrl()}/jump?to=${encodeURIComponent(completion)}`);
  }

  if (packageName) {
    const destinationPrefix = rawDestination.toLowerCase();
    const enteredCompletion = [packageName, rawDestination]
      .filter(Boolean)
      .join(" ");
    addSuggestion(enteredCompletion, describeDestination(rawDestination));

    for (const destination of listDestinations()) {
      const { keywords } = destination;

      // Without a destination, the first suggestion already is the default one
      if (!destinationPrefix && keywords.includes("")) {
        continue;
      }

      const keyword = keywords.find(
        (candidate) =>
          candidate.length > 0 && candidate.startsWith(destinationPrefix),
      );
      if (keyword === undefined) {
        continue;
      }

      // Already covered by the first suggestion
      if (keyword !== destinationPrefix) {
        addSuggestion(`${packageName} ${keyword}`, destination);
      }
    }
  }

  return Response.json(
    [query, completions, descriptions, urls, { "njt:labels": labels }],
    {
      headers: {
        "content-type": "application/x-suggestions+json; charset=utf-8",
        // The response only depends on the query and the deployed destination
        // list, so the CDN can cache it until the next deploy. Browsers should
        // not, otherwise they keep showing outdated destinations
        "cache-control": "public, max-age=0, s-maxage=3600",
        // Lets the browser extension (and other clients) fetch suggestions
        // without host permissions; the data is public anyway
        "access-control-allow-origin": "*",
      },
    },
  );
}
