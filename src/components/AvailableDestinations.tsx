import React, { memo } from "react";
import styled from "styled-components";
import ExternalLink from "./ExternalLink";

const Ul = styled.ul`
  padding-left: 0;
`;
const Item = styled.li<{ noMainKeyword?: boolean }>`
  list-style: none;
  white-space: nowrap;
  ${(p) => (p.noMainKeyword ? "margin-top: 1em" : "")};
`;
const Keyword = styled.code``;
const Info = styled.span`
  display: inline-block;
  white-space: normal;
  vertical-align: top;
`;

interface KeywordInfo {
  keywords?: string[];
  info: React.ReactNode;
}

// When updating, remember to reflect changes in README.md and cli/cli.js
const keywordInfos: KeywordInfo[] = [
  {
    keywords: ["c"],
    info: "changelog",
  },
  {
    keywords: ["h", "w", "d"],
    info: (
      <>
        homepage (aliased as <Keyword>w</Keyword> for website or{" "}
        <Keyword>d</Keyword> for docs)
      </>
    ),
  },
  {
    keywords: ["i", "b"],
    info: (
      <>
        issues (aliased as <Keyword>b</Keyword> bugs)
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
        pull requests (aliased as <Keyword>m</Keyword> for merge requests)
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
  {
    info: (
      <>
        Omitting the destination or entering an non-existing one takes you to
        the package page on <ExternalLink href="https://www.npmjs.com" /> as if
        you used <Keyword>n</Keyword>.
      </>
    ),
  },
];

const AvailableDestinations: React.FunctionComponent<{
  selectedDestination?: string;
  onSelectedDestinationChange: (selectedDestination: string) => void;
}> = () => {
  return (
    <Ul>
      {keywordInfos.map(({ keywords, info }, index) => {
        const mainKeyword = keywords?.[0];
        return mainKeyword ? (
          <Item key={index}>
            <Keyword>{mainKeyword}</Keyword> → <Info>{info}</Info>
          </Item>
        ) : (
          <Item key={index} noMainKeyword={true}>
            <Info>{info}</Info>
          </Item>
        );
      })}
    </Ul>
  );
};

export default memo(AvailableDestinations);
