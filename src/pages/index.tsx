import * as React from "react";

import { PageContentsForIndex } from "../ui/page-contents-for-index";
import { PageMetadata } from "../ui/page-metadata";

const IndexPage = () => {
  return (
    <>
      <PageMetadata />
      <PageContentsForIndex />
    </>
  );
};

export default IndexPage;
