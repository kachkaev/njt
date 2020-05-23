import { NextApiRequest, NextApiResponse } from "next";
import { resolveDestination } from "../../lib/destinations";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let destinationUrl: string = "/";

  const to = `${req.query.to}`;
  if (to) {
    const [packageName, destination] = to
      .split(" ")
      .filter((chunk) => chunk.length);
    const resolvedDestination = await resolveDestination(
      packageName,
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
