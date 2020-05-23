import React from "react";
import { NextPage } from "next";

import PageMetadata from "../ui/PageMetadata";
import PageContentsForError from "../ui/PageContentsForError";

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
