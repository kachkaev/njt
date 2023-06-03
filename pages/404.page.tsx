import type { NextPage } from "next";
import * as React from "react";

import { ErrorPageBody } from "./shared/error-page-body";
import { PageMetadata } from "./shared/page-metadata";

const Page: NextPage = () => {
  const message = "page not found";

  return (
    <>
      <PageMetadata title={message} description="" />
      <ErrorPageBody statusCode={404} message={message} />
    </>
  );
};

export default Page;
