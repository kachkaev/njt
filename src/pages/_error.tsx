import React from "react";
import { NextPage } from "next";

import PageMetadata from "../components/PageMetadata";
import PageContentsForError from "../components/PageContentsForError";

const ErrorPage: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  const message = "unknown error";

  return (
    <>
      <PageMetadata title={message} description="" />
      <PageContentsForError statusCode={statusCode || 500} message={message} />
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : undefined;
  return { statusCode };
};

export default ErrorPage;
