import * as React from "react";
import { styled } from "styled-components";

import { AvailableDestinations } from "./index.page/available-destinations";
import { Example } from "./index.page/example";
import { InputForm } from "./index.page/input-form";
import { ExternalLink } from "./shared/external-link";
import { PageMetadata } from "./shared/page-metadata";

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
  "": "no specified destination",
  h: "homepage",
  s: "source",
  r: "releases",
  y: "yarn",
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- keys don't get correct typings automatically
const remarkByDestinationEntries = Object.entries(remarkByDestination) as Array<
  [DestinationKey, string]
>;

type DestinationKey = keyof typeof remarkByDestination;

const exampleUrlByPackageAndDestination: Record<
  string,
  Record<DestinationKey, string>
> = {
  prettier: {
    "": "https://www.npmjs.com/package/prettier",
    h: "https://prettier.io",
    s: "https://github.com/prettier/prettier",
    r: "https://github.com/prettier/prettier/releases",
    y: "https://yarnpkg.com/package/prettier",
  },
  react: {
    "": "https://www.npmjs.com/package/react",
    h: "https://reactjs.org",
    s: "https://github.com/facebook/react/tree/main/packages/react",
    r: "https://github.com/facebook/react/releases",
    y: "https://yarnpkg.com/package/react",
  },
  lodash: {
    "": "https://www.npmjs.com/package/lodash",
    h: "https://lodash.com",
    s: "https://github.com/lodash/lodash",
    r: "https://github.com/lodash/lodash/releases",
    y: "https://yarnpkg.com/package/lodash",
  },
  typescript: {
    "": "https://www.npmjs.com/package/typescript",
    h: "https://www.typescriptlang.org",
    s: "https://github.com/Microsoft/TypeScript",
    r: "https://github.com/Microsoft/TypeScript/releases",
    y: "https://yarnpkg.com/package/typescript",
  },
};

function Page() {
  const [examplePackage, setExamplePackage] = React.useState(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- exampleUrlByPackageAndDestination is static and non-empty
    () => Object.keys(exampleUrlByPackageAndDestination)[0]!,
  );

  function handleExamplePackageClick(event: React.MouseEvent<HTMLDivElement>) {
    setExamplePackage(event.currentTarget.textContent);
  }

  const [inputText, setInputText] = React.useState("");

  function handleExampleClick(text: string): void {
    setInputText(" ");
    setTimeout(() => {
      setInputText(text);
    }, 0);
  }

  function handleSelectedDestinationChange(destination: string): void {
    setInputText((currentInputText) => {
      const currentPackage = currentInputText.trim().split(" ", 1)[0];

      return `${(currentPackage ?? "") || examplePackage} ${destination}`;
    });
  }

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
      {remarkByDestinationEntries.map(([destination, remark]) => {
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
}

export default Page;
