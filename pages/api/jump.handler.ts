import { NextApiHandler } from "next";

import { resolveDestination } from "../shared/destinations";

const handler: NextApiHandler = async (req, res) => {
  let destinationUrl = "/";

  const to = typeof req.query.to === "string" ? req.query.to : "";

  if (to) {
    const [rawPackageName, destination] = to
      .split(" ")
      .filter((chunk) => chunk.length);

    const resolvedDestination = await resolveDestination(
      rawPackageName ?? "",
      destination,
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
