import * as React from "react";

import { PageContentsForIndex } from "../ui/page-contents-for-index";
import { PageMetadata } from "../ui/page-metadata";

const Page = () => {
  return (
    <>
      <PageMetadata />
      <PageContentsForIndex />
    </>
  );
};

export default Page;
