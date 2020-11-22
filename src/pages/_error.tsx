import { NextPage } from "next";
import * as React from "react";

import { PageContentsForError } from "../ui/PageContentsForError";
import { PageMetadata } from "../ui/PageMetadata";

const ErrorPage: NextPage<{ statusCode: number }> = ({ statusCode }) => {
  const message = "unknown error";

  return (
    <>
      <PageMetadata title={message} description="" />
      <PageContentsForError statusCode={statusCode} message={message} />
    </>
  );
};

ErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err?.statusCode || 500;

  return { statusCode };
};

export default ErrorPage;
