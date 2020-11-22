import { NextPage } from "next";
import * as React from "react";

import { PageContentsForError } from "../ui/PageContentsForError";
import { PageMetadata } from "../ui/PageMetadata";

const NotFoundPage: NextPage = () => {
  const message = "page not found";

  return (
    <>
      <PageMetadata title={message} description="" />
      <PageContentsForError statusCode={404} message={message} />
    </>
  );
};

export default NotFoundPage;
