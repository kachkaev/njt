import React, { memo } from "react";
import styled from "styled-components";

const ClickableCode = styled.code`
  .js & {
    cursor: pointer;
    border-bottom: 1px dotted #24292e66;
    :active {
      background: #e3e3e3;
    }
  }
`;

const Row = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Example: React.FunctionComponent<{
  to: string;
  onToClick?: (text: string) => void;
  remark: string;
  url: string;
}> = ({ to, onToClick, remark, url }) => {
  const handleCodeClick = () => {
    onToClick?.(to);
  };

  return (
    <p>
      <Row>
        <ClickableCode onClick={handleCodeClick}>{to}</ClickableCode> ({remark})
      </Row>
      <Row>
        🐸 → <a href={url}>{url.replace(/^https?:\/\//, "")}</a>
      </Row>
    </p>
  );
};

export default memo(Example);
