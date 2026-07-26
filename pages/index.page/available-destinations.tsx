import type * as React from "react";

import { cn } from "../shared/cn";
import { ExternalLink } from "../shared/external-link";
import { ClickableCode } from "./clickable-code";

function Keyword({
  children,
  onClick,
}: {
  children: string;
  onClick: React.MouseEventHandler;
}) {
  return (
    <ClickableCode className="inline-block" onClick={onClick}>
      {children}
    </ClickableCode>
  );
}

type KeywordInfo = {
  keywords: string[];
  info: React.ReactNode;
};

export function AvailableDestinations({
  selectedDestination,
  onSelectedDestinationChange,
}: {
  selectedDestination: string | undefined;
  onSelectedDestinationChange: (selectedDestination: string) => void;
}) {
  function handleKeywordClick({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>): void {
    onSelectedDestinationChange(currentTarget.textContent);
  }

  // When updating, remember to reflect changes in README.md and cli/cli.js
  const keywordInfos: KeywordInfo[] = [
    {
      keywords: ["b"],
      info: (
        <>
          package cost estimation on{" "}
          <ExternalLink href="https://bundlephobia.com" />
        </>
      ),
    },
    {
      keywords: ["c"],
      info: "changelog",
    },
    {
      keywords: ["g"],
      info: <>github (gitlab, etc.) repository root</>,
    },
    {
      keywords: ["h", "w", "d"],
      info: (
        <>
          homepage (aliased as <Keyword onClick={handleKeywordClick}>w</Keyword>{" "}
          for&nbsp;website or <Keyword onClick={handleKeywordClick}>d</Keyword>{" "}
          for&nbsp;docs)
        </>
      ),
    },
    {
      keywords: ["i"],
      info: <>issues</>,
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
          <Keyword onClick={handleKeywordClick}>m</Keyword> for&nbsp;merge
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
      info: (
        <>
          source (often same as repository root, but can be
          its&nbsp;subdirectory in&nbsp;case of a&nbsp;monorepo)
        </>
      ),
    },
    {
      keywords: ["t"],
      info: "list of git tags",
    },
    {
      keywords: ["u"],
      info: (
        <>
          package contents preview on <ExternalLink href="https://unpkg.com" />
        </>
      ),
    },
    {
      keywords: ["v"],
      info: (
        <>
          list of package versions with dates on{" "}
          <ExternalLink href="https://www.npmjs.com" />
        </>
      ),
    },
    {
      keywords: ["x"],
      info: (
        <>
          package page on <ExternalLink href="https://npmx.dev" />
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
      keywords: ["."],
      info: <>browse GitHub / GitLab code</>,
    },
  ];

  return (
    <>
      <ul className="overflow-hidden">
        {keywordInfos.map(({ keywords, info }) => (
          <li
            key={keywords.join(",")}
            className={cn(
              "whitespace-nowrap",
              selectedDestination &&
                keywords.includes(selectedDestination) &&
                "text-primary",
            )}
          >
            <Keyword onClick={handleKeywordClick}>{keywords[0] ?? ""}</Keyword>{" "}
            <span className="mx-1">→</span>
            <span className="mr-10 inline-block align-top whitespace-normal">
              {info}
            </span>
          </li>
        ))}
      </ul>
      <p>
        Omitting the destination or entering an non-existing one takes you to
        the package page on <ExternalLink href="https://www.npmjs.com" /> as if
        you used&nbsp;<Keyword onClick={handleKeywordClick}>n</Keyword>.
      </p>
    </>
  );
}
