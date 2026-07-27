"use client";

import * as React from "react";

import { AvailableDestinations } from "./page/available-destinations";
import { Example } from "./page/example";
import { InputForm } from "./page/input-form";
import { cn } from "./shared/cn";
import { ExternalLink } from "./shared/external-link";
import { nbsp } from "./shared/nbsp";

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-12 text-[1em] font-bold">{children}</h2>;
}

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
  typescript: {
    "": "https://www.npmjs.com/package/typescript",
    h: "https://www.typescriptlang.org",
    s: "https://github.com/microsoft/TypeScript",
    r: "https://github.com/microsoft/TypeScript/releases",
    x: "https://npmx.dev/package/typescript",
    y: "https://yarnpkg.com/package/typescript",
  },
  react: {
    "": "https://www.npmjs.com/package/react",
    h: "https://react.dev",
    s: "https://github.com/react/react/tree/main/packages/react",
    r: "https://github.com/react/react/releases",
    x: "https://npmx.dev/package/react",
    y: "https://yarnpkg.com/package/react",
  },
  tailwindcss: {
    "": "https://www.npmjs.com/package/tailwindcss",
    h: "https://tailwindcss.com",
    s: "https://github.com/tailwindlabs/tailwindcss/tree/main/packages/tailwindcss",
    r: "https://github.com/tailwindlabs/tailwindcss/releases",
    x: "https://npmx.dev/package/tailwindcss",
    y: "https://yarnpkg.com/package/tailwindcss",
  },
};

export default function Page() {
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
      <InputForm text={inputText} onTextChange={setInputText} />

      <H2>Available destinations</H2>
      <AvailableDestinations
        selectedDestination={inputText.trim().split(" ", 2)[1]}
        onSelectedDestinationChange={handleSelectedDestinationChange}
      />

      <H2>Examples</H2>
      <div>
        {Object.keys(exampleUrlByPackageAndDestination).map(
          (currentExamplePackage) => (
            <div
              key={currentExamplePackage}
              className={cn(
                "mr-2 inline-block cursor-default",
                currentExamplePackage !== examplePackage &&
                  "cursor-pointer border-b border-dotted border-foreground/40",
              )}
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

      <H2>More!</H2>
      <p>
        <code>njt</code> gives you an even bigger productivity boost when
        integrated into browser or{nbsp}terminal. See instructions in{" "}
        <ExternalLink href="https://github.com/kachkaev/njt/blob/main/README.md#getting-njt">
          GitHub{nbsp}repo’s{nbsp}README
        </ExternalLink>
        .
      </p>
      <p>
        Crafted by{" "}
        <ExternalLink href="https://en.kachkaev.ru">
          Alexander Kachkaev
        </ExternalLink>{" "}
        using <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>,
        hosted{nbsp}by{nbsp}
        <ExternalLink href="https://vercel.com">Vercel</ExternalLink>
        {nbsp}💚
      </p>
    </>
  );
}
