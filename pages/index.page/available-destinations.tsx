import type * as React from "react";

import { ExternalLink } from "../shared/external-link";
import { ClickableCode } from "./clickable-code";

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
  }: React.MouseEvent<HTMLElement>): void {
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
          homepage (aliased as{" "}
          <ClickableCode className="inline-block" onClick={handleKeywordClick}>
            w
          </ClickableCode>{" "}
          for&nbsp;website or{" "}
          <ClickableCode className="inline-block" onClick={handleKeywordClick}>
            d
          </ClickableCode>{" "}
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
          <ClickableCode className="inline-block" onClick={handleKeywordClick}>
            m
          </ClickableCode>{" "}
          for&nbsp;merge requests)
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
      <ul className="destinations-list">
        {keywordInfos.map(({ keywords, info }) => (
          <li
            key={keywords.join(",")}
            className={`destination-item${
              selectedDestination && keywords.includes(selectedDestination)
                ? " destination-item-highlighted"
                : ""
            }`}
          >
            <ClickableCode
              className="inline-block"
              onClick={handleKeywordClick}
            >
              {keywords[0] ?? ""}
            </ClickableCode>{" "}
            <span className="destination-arrow" />{" "}
            <span className="destination-info">{info}</span>
          </li>
        ))}
      </ul>
      <p>
        Omitting the destination or entering an non-existing one takes you to
        the package page on <ExternalLink href="https://www.npmjs.com" /> as if
        you used&nbsp;
        <ClickableCode className="inline-block" onClick={handleKeywordClick}>
          n
        </ClickableCode>
        .
      </p>
    </>
  );
}
