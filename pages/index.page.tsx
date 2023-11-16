import * as React from "react";
import _styled from "styled-components";

import { AvailableDestinations } from "./index.page/available-destinations.jsx";
import { Example } from "./index.page/example.jsx";
import { InputForm } from "./index.page/input-form.jsx";
import { ExternalLink } from "./shared/external-link.jsx";
import { PageMetadata } from "./shared/page-metadata.jsx";

const styled = _styled as unknown as typeof _styled.default;

const H2 = styled.h2`
  margin-top: 3em;
  font-size: 1em;
`;

const ExamplePackages = styled.div``;

const ExamplePackage = styled.div<{ clickable: boolean }>`
  display: inline-block;
  margin-right: 0.5em;
  cursor: default;
  ${(props) =>
    props.clickable
      ? `
    border-bottom: 1px dotted #24292e66;
    cursor: pointer;
  `
      : ""};
`;

const remarkByDestination = {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- consider supporting "" in upstream rules
  "": "no specified destination",
  h: "homepage",
  s: "source",
  r: "releases",
  y: "yarn",
};

type DestinationKey = keyof typeof remarkByDestination;

const exampleUrlByPackageAndDestination: Record<
  string,
  Record<DestinationKey, string>
> = {
  prettier: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- consider supporting "" in upstream rules
    "": "https://www.npmjs.com/package/prettier",
    h: "https://prettier.io",
    s: "https://github.com/prettier/prettier",
    r: "https://github.com/prettier/prettier/releases",
    y: "https://yarnpkg.com/package/prettier",
  },
  react: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- consider supporting "" in upstream rules
    "": "https://www.npmjs.com/package/react",
    h: "https://reactjs.org",
    s: "https://github.com/facebook/react/tree/main/packages/react",
    r: "https://github.com/facebook/react/releases",
    y: "https://yarnpkg.com/package/react",
  },
  lodash: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- consider supporting "" in upstream rules
    "": "https://www.npmjs.com/package/lodash",
    h: "https://lodash.com",
    s: "https://github.com/lodash/lodash",
    r: "https://github.com/lodash/lodash/releases",
    y: "https://yarnpkg.com/package/lodash",
  },
  typescript: {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- consider supporting "" in upstream rules
    "": "https://www.npmjs.com/package/typescript",
    h: "https://www.typescriptlang.org",
    s: "https://github.com/Microsoft/TypeScript",
    r: "https://github.com/Microsoft/TypeScript/releases",
    y: "https://yarnpkg.com/package/typescript",
  },
};

const Page = () => {
  const [examplePackage, setExamplePackage] = React.useState(
    () => Object.keys(exampleUrlByPackageAndDestination)[0]!,
  );
  const handleExamplePackageClick = React.useCallback<React.MouseEventHandler>(
    (event) => {
      setExamplePackage(event.currentTarget.textContent!);
    },
    [setExamplePackage],
  );

  const [inputText, setInputText] = React.useState("");

  const handleExampleClick = React.useCallback(
    (text: string): void => {
      setInputText(" ");
      setTimeout(() => {
        setInputText(text);
      }, 0);
    },
    [setInputText],
  );

  const handleSelectedDestinationChange = React.useCallback(
    (destination: string): void => {
      setInputText((currentInputText) => {
        const currentPackage = currentInputText.trim().split(" ", 1)[0];

        return `${currentPackage || examplePackage} ${destination}`;
      });
    },
    [setInputText, examplePackage],
  );

  return (
    <>
      <PageMetadata />
      <InputForm text={inputText} onTextChange={setInputText} />

      <H2>Available destinations</H2>
      <AvailableDestinations
        selectedDestination={inputText.trim().split(" ", 2)[1]}
        onSelectedDestinationChange={handleSelectedDestinationChange}
      />

      <H2>Examples</H2>
      <ExamplePackages>
        {Object.keys(exampleUrlByPackageAndDestination).map(
          (currentExamplePackage) => (
            <ExamplePackage
              key={currentExamplePackage}
              clickable={currentExamplePackage !== examplePackage}
              onClick={handleExamplePackageClick}
            >
              {currentExamplePackage}
            </ExamplePackage>
          ),
        )}
      </ExamplePackages>
      {(
        Object.entries(remarkByDestination) as Array<[DestinationKey, string]>
      ).map(([destination, remark]) => {
        const destinationLookup =
          exampleUrlByPackageAndDestination[examplePackage];

        if (!destinationLookup) {
          return;
        }

        return (
          <Example
            key={destination}
            to={`${examplePackage} ${destination}`.trim()}
            remark={remark}
            url={destinationLookup[destination]}
            onToClick={handleExampleClick}
          />
        );
      })}

      <H2>More!</H2>
      <p>
        <code>njt</code> gives you an even bigger productivity boost when
        integrated into browser or&nbsp;terminal. See instructions in{" "}
        <ExternalLink href="https://github.com/kachkaev/njt/blob/main/README.md#getting-njt">
          GitHub&nbsp;repo’s&nbsp;README
        </ExternalLink>
        .
      </p>
      <p>
        Crafted by{" "}
        <ExternalLink href="https://en.kachkaev.ru">
          Alexander Kachkaev
        </ExternalLink>{" "}
        using <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>,
        hosted&nbsp;by&nbsp;
        <ExternalLink href="https://vercel.com">Vercel</ExternalLink>
        &nbsp;💚
      </p>
    </>
  );
};

export default Page;
