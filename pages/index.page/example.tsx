import * as React from "react";
import _styled from "styled-components";

import { ExternalLink } from "../shared/external-link.jsx";
import { ClickableCode } from "./clickable-code.jsx";

const styled = _styled as unknown as typeof _styled.default;

const Remark = styled.span`
  white-space: nowrap;
`;

const LinkRow = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Example: React.FunctionComponent<{
  children?: never;
  onToClick?: (text: string) => void;
  remark: string;
  to: string;
  url: string;
}> = ({ onToClick, remark, to, url }) => {
  const handleCodeClick = () => {
    onToClick?.(to);
  };

  return (
    <p>
      <span>
        <ClickableCode onClick={handleCodeClick}>njt {to}</ClickableCode>{" "}
        <Remark>({remark})</Remark>
      </span>
      <LinkRow>
        🐸 → <ExternalLink href={url} />
      </LinkRow>
    </p>
  );
};

const WrappedExample = React.memo(Example);
export { WrappedExample as Example };
