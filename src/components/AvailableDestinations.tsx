import React, { memo, useMemo, useCallback } from "react";
import styled from "styled-components";
import ExternalLink from "./ExternalLink";
import ClickableCode from "./ClickableCode";

const Ul = styled.ul`
  padding-left: 0;
`;
const Item = styled.li<{ highlighted?: boolean }>`
  list-style: none;
  white-space: nowrap;
  ${(p) => (p.highlighted ? "color: #42a73f" : "")};
`;
const Keyword = styled(ClickableCode)<{ onClick: Function; children: string }>`
  color: #24292e;
`;
const Arrow = styled.span`
  :after {
    content: "→";
  }
`;
const Info = styled.span`
  display: inline-block;
  white-space: normal;
  vertical-align: top;
`;

interface KeywordInfo {
  keywords: string[];
  info: React.ReactNode;
}

const AvailableDestinations: React.FunctionComponent<{
  selectedDestination?: string;
  onSelectedDestinationChange: (selectedDestination: string) => void;
}> = ({ selectedDestination, onSelectedDestinationChange }) => {
  const handleKeywordClick = useCallback(
    ({ currentTarget }) => {
      onSelectedDestinationChange?.(currentTarget.innerText);
    },
    [onSelectedDestinationChange],
  );

  // When updating, remember to reflect changes in README.md and cli/cli.js
  const keywordInfos: KeywordInfo[] = useMemo(
    () => [
      {
        keywords: ["c"],
        info: "changelog",
      },
      {
        keywords: ["h", "w", "d"],
        info: (
          <>
            homepage (aliased as{" "}
            <Keyword onClick={handleKeywordClick}>w</Keyword> for website or{" "}
            <Keyword onClick={handleKeywordClick}>d</Keyword> for docs)
          </>
        ),
      },
      {
        keywords: ["i", "b"],
        info: (
          <>
            issues (aliased as <Keyword onClick={handleKeywordClick}>b</Keyword>{" "}
            bugs)
          </>
        ),
      },
      {
        keywords: ["n"],
        info: (
          <>
            package info on <ExternalLink href="https://www.npmjs.com" />
          </>
        ),
      },
      {
        keywords: ["p", "m"],
        info: (
          <>
            pull requests (aliased as{" "}
            <Keyword onClick={handleKeywordClick}>m</Keyword> for merge
            requests)
          </>
        ),
      },
      {
        keywords: ["r"],
        info: "list of github releases",
      },
      {
        keywords: ["s"],
        info:
          "source (most commonly repository root, but can take you to a subdirectory in case of a monorepo)",
      },
      {
        keywords: ["t"],
        info: "list of git tags",
      },
      {
        keywords: ["v"],
        info: (
          <>
            list of package versions with their publish dates on{" "}
            <ExternalLink href="https://www.npmjs.com" />
          </>
        ),
      },
      {
        keywords: ["y"],
        info: (
          <>
            package page on <ExternalLink href="https://yarnpkg.com" />
          </>
        ),
      },
    ],
    [handleKeywordClick],
  );

  return (
    <>
      <Ul>
        {keywordInfos.map(({ keywords, info }, index) => (
          <Item
            key={index}
            highlighted={
              selectedDestination && keywords.includes(selectedDestination)
            }
          >
            <Keyword onClick={handleKeywordClick}>{keywords[0]}</Keyword>{" "}
            <Arrow /> <Info>{info}</Info>
          </Item>
        ))}
      </Ul>
      <p>
        Omitting the destination or entering an non-existing one takes you to
        the package page on <ExternalLink href="https://www.npmjs.com" /> as if
        you used <Keyword onClick={handleKeywordClick}>n</Keyword>.
      </p>
    </>
  );
};

export default memo(AvailableDestinations);
