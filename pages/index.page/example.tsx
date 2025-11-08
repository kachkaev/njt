import * as React from "react";
import { styled } from "styled-components";

import { ExternalLink } from "../shared/external-link";
import { ClickableCode } from "./clickable-code";

const Remark = styled.span`
  white-space: nowrap;
`;

const LinkRow = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function Example({
  onToClick,
  remark,
  to,
  url,
}: {
  onToClick?: (text: string) => void;
  remark: string;
  to: string;
  url: string;
}) {
  function handleCodeClick() {
    onToClick?.(to);
  }

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
}
