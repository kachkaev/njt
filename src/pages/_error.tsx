import { NextPage } from "next";
import * as React from "react";

import { PageContentsForError } from "../ui/page-contents-for-error";
import { PageMetadata } from "../ui/page-metadata";

const ErrorPage: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  const message = "unknown error";

  return (
    <>
      <PageMetadata title={message} description="" />
      <PageContentsForError statusCode={statusCode} message={message} />
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err?.statusCode || 500;

  return { statusCode };
};

export default ErrorPage;
