import * as React from "react";

import { AvailableDestinations } from "./index.page/available-destinations";
import { Example } from "./index.page/example";
import { InputForm } from "./index.page/input-form";
import { ExternalLink } from "./shared/external-link";
import { PageMetadata } from "./shared/page-metadata";

const remarkByDestination = {
  "": "no specified destination",
  h: "homepage",
  s: "source",
  r: "releases",
  x: "npmx",
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
    x: "https://npmx.dev/package/prettier",
    y: "https://yarnpkg.com/package/prettier",
  },
  react: {
    "": "https://www.npmjs.com/package/react",
    h: "https://reactjs.org",
    s: "https://github.com/facebook/react/tree/main/packages/react",
    r: "https://github.com/facebook/react/releases",
    x: "https://npmx.dev/package/react",
    y: "https://yarnpkg.com/package/react",
  },
  lodash: {
    "": "https://www.npmjs.com/package/lodash",
    h: "https://lodash.com",
    s: "https://github.com/lodash/lodash",
    r: "https://github.com/lodash/lodash/releases",
    x: "https://npmx.dev/package/lodash",
    y: "https://yarnpkg.com/package/lodash",
  },
  typescript: {
    "": "https://www.npmjs.com/package/typescript",
    h: "https://www.typescriptlang.org",
    s: "https://github.com/Microsoft/TypeScript",
    r: "https://github.com/Microsoft/TypeScript/releases",
    x: "https://npmx.dev/package/typescript",
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

      <h2 className="mt-[3em] text-[1em]">Available destinations</h2>
      <AvailableDestinations
        selectedDestination={inputText.trim().split(" ", 2)[1]}
        onSelectedDestinationChange={handleSelectedDestinationChange}
      />

      <h2 className="mt-[3em] text-[1em]">Examples</h2>
      <div>
        {Object.keys(exampleUrlByPackageAndDestination).map(
          (currentExamplePackage) => (
            <div
              key={currentExamplePackage}
              className={`example-package${
                currentExamplePackage === examplePackage
                  ? ""
                  : " example-package-clickable"
              }`}
              onClick={handleExamplePackageClick}
            >
              {currentExamplePackage}
            </div>
          ),
        )}
      </div>
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

      <h2 className="mt-[3em] text-[1em]">More!</h2>
      <p>
        <code>njt</code> gives you an even bigger productivity boost when
        integrated into browser or&nbsp;terminal. See instructions in{" "}
        <ExternalLink href="https://github.com/kachkaev/njt/blob/main/README.md#getting-njt">
          GitHub&nbsp;repo&apos;s&nbsp;README
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
