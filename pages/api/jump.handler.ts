import { NextApiHandler } from "next";

import { resolveDestination } from "../shared/destinations";

const handler: NextApiHandler = async (req, res) => {
  let destinationUrl = "/";
  let maxAge = 0;

  const to = typeof req.query.to === "string" ? req.query.to : "";

  if (to) {
    const [packageName, destination] = to
      .split(" ")
      .filter((chunk) => chunk.length);
    const resolvedDestination = await resolveDestination(
      packageName ?? "",
      destination,
    );

    if (resolvedDestination.outcome === "success") {
      destinationUrl = resolvedDestination.url;
      const queryMaxAge = Number(req.query["max-age"]);
      maxAge = Number.isNaN(queryMaxAge) ? maxAge : queryMaxAge;
    }
  }

  res.writeHead(301, {
    Location: destinationUrl,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "Cache-Control": `public, max-age=${maxAge}, must-revalidate`,
  });

  res.end();
};

export default handler;
