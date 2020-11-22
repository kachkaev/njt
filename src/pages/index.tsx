import * as React from "react";

import { PageContentsForIndex } from "../ui/PageContentsForIndex";
import { PageMetadata } from "../ui/PageMetadata";

const IndexPage = () => {
  return (
    <>
      <PageMetadata />
      <PageContentsForIndex />
    </>
  );
};

export default IndexPage;
