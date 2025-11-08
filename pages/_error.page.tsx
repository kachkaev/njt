import type { NextPage } from "next";
import * as React from "react";

import { ErrorPageBody } from "./shared/error-page-body";
import { PageMetadata } from "./shared/page-metadata";

// eslint-disable-next-line react/function-component-definition -- needed for getInitialProps
const Page: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  const message = "unknown error";

  return (
    <>
      <PageMetadata title={message} description="" />
      <ErrorPageBody statusCode={statusCode} message={message} />
    </>
  );
};

Page.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err?.statusCode || 500;

  return { statusCode };
};

export default Page;
