import { readFileSync } from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Data, Effect, Option, Runtime } from "effect";
import { Argument, Command } from "effect/unstable/cli";
import open from "open";

import packageJson from "../package.json" with { type: "json" };

function green(text: string): string {
  return styleText("green", text);
}
function code(text: string): string {
  return styleText("dim", text);
}

// When updating, remember to reflect changes in README.md and app/page/available-destinations.tsx
const description = `🐸 ✨ 🐸 ✨ 🐸
npm jump to: a quick navigation tool for npm packages

https://njt.vercel.app

Available destinations
----------------------
${green("b")} → package cost estimation on https://bundlephobia.com
${green("c")} → changelog
${green("g")} → github (gitlab, etc.) repository root
${green("h")} → homepage (aliased as ${green("w")} for website or ${green("d")} for docs)
${green("i")} → issues
${green("n")} → package info on https://www.npmjs.com
${green("p")} → pull requests (aliased as ${green("m")} for merge requests)
${green("r")} → list of github releases
${green("s")} → source (often same as repository root, but can be its subdirectory in case of a monorepo)
${green("t")} → list of git tags
${green("u")} → package contents preview on https://unpkg.com
${green("v")} → list of package versions with dates on https://www.npmjs.com
${green("x")} → package page on https://npmx.dev
${green("y")} → package page on https://yarnpkg.com
${green(".")} → browse GitHub / GitLab code

Omitting the destination or entering an non-existing one takes you to the package page on https://www.npmjs.com as if you used ${green("n")}.


Examples
--------
${code("njt prettier")} (no specified destination)
🐸  → https://www.npmjs.com/package/prettier

${code("njt prettier h")} (homepage)
🐸  → https://prettier.io

${code("njt prettier s")} (source)
🐸  → https://github.com/prettier/prettier

${code("njt prettier r")} (releases)
🐸  → https://github.com/prettier/prettier/releases

${code("njt prettier y")} (yarn)
🐸  → https://yarnpkg.com/package/prettier


Pro tip
-------
When you specify . instead of a package name, njt takes the name from the nearest package.json file.`;

class PackageNameResolutionError extends Data.TaggedError(
  "PackageNameResolutionError",
)<{
  readonly reason: string;
}> {
  // Printed as a friendly message via `tapErrorTag` below, so `runMain` must
  // not log it again. The process still exits non-zero.
  override readonly [Runtime.errorReported] = false;

  override get message(): string {
    return `
${styleText("red", this.reason)}
Change directory or replace . with a package name.

🐸 https://njt.vercel.app
    `;
  }
}

function findNearestPackageJson(
  startDir: string,
): { filename: string; name: string | undefined } | undefined {
  let dir = startDir;
  for (;;) {
    const filename = path.join(dir, "package.json");
    // A missing, unreadable or malformed package.json must not abort the walk —
    // the pre-Effect CLI (via find-package-json) skipped such files too
    let parsed: unknown;
    try {
      parsed = JSON.parse(
        readFileSync(filename, "utf8").replace(/^\u{FEFF}/u, ""),
      );
    } catch {
      parsed = undefined;
    }
    if (typeof parsed === "object" && parsed !== null) {
      return {
        filename,
        name:
          "name" in parsed && typeof parsed.name === "string"
            ? parsed.name
            : undefined,
      };
    }
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      return undefined;
    }
    dir = parentDir;
  }
}

const resolveDotAsPackageName = Effect.gen(function* () {
  const nearestPackageJson = findNearestPackageJson(process.cwd());
  if (!nearestPackageJson) {
    return yield* new PackageNameResolutionError({
      reason:
        "You specified package name as . but package.json was not found in the current folder or in parent folders.",
    });
  }
  yield* Console.log(`
Resolved . as ${nearestPackageJson.filename}`);
  if (!nearestPackageJson.name) {
    return yield* new PackageNameResolutionError({
      reason:
        'You specified package name as . but "name" field was not found in the resolved package.json file.',
    });
  }
  return nearestPackageJson.name;
});

function generateUrl(query: string): string {
  return `https://njt.vercel.app/jump?from=cli%40${packageJson.version}&to=${encodeURIComponent(
    query,
  )}`;
}

function openUrl(url: string, browser: string | undefined) {
  return Effect.promise(() =>
    open(url, browser ? { app: { name: browser } } : undefined),
  );
}

const cli = Command.make("njt", {
  packageName: Argument.string("package").pipe(
    Argument.withDescription("Package name, or . for the nearest package.json"),
  ),
  destination: Argument.string("destination").pipe(
    Argument.optional,
    Argument.withDescription("One of the letters listed above"),
  ),
}).pipe(
  Command.withDescription(description),
  Command.withHandler(({ packageName, destination }) =>
    Effect.gen(function* () {
      const resolvedPackageName =
        packageName === "." ? yield* resolveDotAsPackageName : packageName;
      yield* openUrl(
        generateUrl(
          [resolvedPackageName, ...Option.toArray(destination)].join(" "),
        ),
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- an empty NJT_BROWSER must fall back to BROWSER
        process.env["NJT_BROWSER"] || process.env["BROWSER"],
      );
    }),
  ),
);

Command.run(cli, { version: packageJson.version }).pipe(
  Effect.tapErrorTag("PackageNameResolutionError", (error) =>
    Console.error(error.message),
  ),
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
