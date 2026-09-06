import { resolveDestination } from "../shared/destinations";

export async function GET(request: Request): Promise<Response> {
  let destinationUrl = "/";

  const to = new URL(request.url).searchParams.get("to") ?? "";

  const [rawPackageName, rawDestination] = to
    .split(" ")
    .filter((chunk) => chunk.length);

  if (rawPackageName) {
    const resolvedDestination = await resolveDestination(
      rawPackageName,
      rawDestination,
    );

    if (resolvedDestination.outcome === "success") {
      destinationUrl = resolvedDestination.url;
    }
  }

  // `NextResponse.redirect()` is avoided because it only accepts absolute URLs,
  // whereas the fallback destination is the relative `/`
  return new Response(undefined, {
    status: 302,
    headers: { location: destinationUrl },
  });
}
