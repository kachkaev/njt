import { NextPage } from "next";
import { resolveDestination } from "../lib/destinations";
import { redirectTo } from "../lib/routing";

const JumpPage: NextPage = () => {
  throw new Error("JumpPage has nothing to render");
};

JumpPage.getInitialProps = async ({ query, res }) => {
  let destinationUrl: string = "/";

  if (query.to) {
    const to = `${query.to}`;
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

  redirectTo(destinationUrl, { res });

  return {};
};

export default JumpPage;
