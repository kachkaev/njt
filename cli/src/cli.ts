import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { styleText } from "node:util";

import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Console, Data, Effect, Runtime } from "effect";
import { Argument, CliError, Command } from "effect/unstable/cli";
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
): { filename: string; name: unknown } | undefined {
  let dir = startDir;
  for (;;) {
    const filename = path.join(dir, "package.json");
    if (existsSync(filename)) {
      // An unreadable or malformed package.json must not abort the walk —
      // the pre-Effect CLI (via find-package-json) skipped such files too
      let parsed: unknown;
      try {
        parsed = JSON.parse(
          readFileSync(filename, "utf8").replace(/^\uFEFF/, ""),
        );
      } catch {
        parsed = undefined;
      }
      if (typeof parsed === "object" && parsed !== null) {
        return {
          filename,
          name: "name" in parsed ? parsed.name : undefined,
        };
      }
    }
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
      return undefined;
    }
    dir = parentDir;
  }
}

const resolveDotAsPackageName = Effect.gen(function* () {
  const packageJsonSearchResult = findNearestPackageJson(process.cwd());
  if (!packageJsonSearchResult) {
    return yield* new PackageNameResolutionError({
      reason:
        "You specified package name as . but package.json was not found in the current folder or in parent folders.",
    });
  }
  yield* Console.log(`
Resolved . as ${packageJsonSearchResult.filename}`);
  const packageName = packageJsonSearchResult.name;
  if (typeof packageName !== "string" || !packageName) {
    return yield* new PackageNameResolutionError({
      reason:
        'You specified package name as . but "name" field was not found in the resolved package.json file.',
    });
  }
  return packageName;
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
  query: Argument.string("package [destination]").pipe(
    Argument.variadic({ min: 0 }),
    Argument.withDescription(
      "Package name (or . for the nearest package.json) followed by an optional destination",
    ),
  ),
}).pipe(
  Command.withDescription(description),
  Command.withHandler(({ query }) =>
    Effect.gen(function* () {
      if (query.length === 0) {
        return yield* new CliError.ShowHelp({
          commandPath: ["njt"],
          errors: [],
        });
      }
      const [packageName = "", ...rest] = query;
      const resolvedPackageName =
        packageName === "." ? yield* resolveDotAsPackageName : packageName;
      yield* openUrl(
        generateUrl([resolvedPackageName, ...rest].join(" ")),
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- an empty NJT_BROWSER must fall back to BROWSER
        process.env["NJT_BROWSER"] || process.env["BROWSER"],
      );
    }),
  ),
);

/**
 * Failure that {@link NodeRuntime.runMain} must not log again: the message has
 * already been printed to stderr (see `Runtime.errorReported`). The process
 * still exits non-zero.
 */
class ReportedCliFailure extends Data.TaggedError("ReportedCliFailure") {
  override readonly [Runtime.errorReported] = false;
}

Command.run(cli, { version: packageJson.version }).pipe(
  // Domain failures print as one friendly message on stderr. CLI-internal
  // errors (--help rendering, Ctrl-C quits) keep the framework's own handling
  // and exit codes.
  Effect.catchIf(
    (error) => !CliError.isCliError(error),
    (error) =>
      Console.error(
        error instanceof Error ? error.message : String(error),
      ).pipe(Effect.andThen(Effect.fail(new ReportedCliFailure()))),
  ),
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain,
);
