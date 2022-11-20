import { NextApiHandler } from "next";

import { resolveDestination } from "../shared/destinations";

const handler: NextApiHandler = async (req, res) => {
  let destinationUrl = "/";

  const to = typeof req.query.to === "string" ? req.query.to : "";

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

  res.writeHead(302, {
    Location: destinationUrl,
  });

  res.end();
};

export default handler;
