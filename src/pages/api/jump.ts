import { NextApiRequest, NextApiResponse } from "next";

import { resolveDestination } from "../../shared/destinations";
import { parseQuery } from "../../shared/parse-query";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let destinationUrl = "/";

  const to = `${req.query.to}`;
  if (to) {
    const [packageOrSearch, destination] = parseQuery(to);
    const resolvedDestination = await resolveDestination(
      packageOrSearch,
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
