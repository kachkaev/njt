import styled from "styled-components";
import ExternalLink from "./ExternalLink";
import React, { memo } from "react";

const Wrapper = styled.div`
  margin-top: 4em;
`;

const Signature: React.FunctionComponent<{ children?: never }> = () => {
  return (
    <Wrapper>
      Crafted by{" "}
      <ExternalLink href="https://en.kachkaev.ru">
        Alexander Kachkaev
      </ExternalLink>{" "}
      using <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>,
      hosted&nbsp;at&nbsp;
      <ExternalLink href="https://now.sh" />
      &nbsp;💚
    </Wrapper>
  );
};

export default memo(Signature);
