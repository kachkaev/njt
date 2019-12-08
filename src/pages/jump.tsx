import React from "react";
import Router from "next/router";
import { NextPage } from "next";
import { resolveDestination } from "../helpers";
import { UnresolvedDestination } from "../types";

const JumpPage: NextPage<{ unresolvedDestination?: UnresolvedDestination }> = ({
  unresolvedDestination,
}) => {
  if (!unresolvedDestination) {
    return <div>jumping... 🐸🐸🐸</div>;
  }
  return (
    <>
      <h1>Unresolved destination</h1>
      <code>{JSON.stringify(unresolvedDestination, null, 2)}</code>
    </>
  );
};

JumpPage.getInitialProps = async ({ query, res }) => {
  let destinationUrl: string;
  if (!query.q) {
    destinationUrl = "/";
  } else {
    const q = `${query.q}`;
    const [packageName, destination] = q
      .split(" ")
      .filter((chunk) => chunk.length);
    const resolvedDestination = await resolveDestination(
      packageName,
      destination,
    );
    if (resolvedDestination.outcome === "success") {
      destinationUrl = resolvedDestination.url;
    } else {
      return { unresolvedDestination: resolvedDestination };
    }
  }

  if (res) {
    res.writeHead(302, {
      Location: destinationUrl,
    });
    res.end();
  } else {
    Router.push(destinationUrl);
  }
  return {};
};

export default JumpPage;
