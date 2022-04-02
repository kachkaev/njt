import { NextPage } from "next";
import * as React from "react";

import { PageContentsForError } from "../ui/page-contents-for-error";
import { PageMetadata } from "../ui/page-metadata";

const Page: NextPage = () => {
  const message = "page not found";

  return (
    <>
      <PageMetadata title={message} description="" />
      <PageContentsForError statusCode={404} message={message} />
    </>
  );
};

export default Page;
