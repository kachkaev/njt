#!/usr/bin/env node

import chalk from "chalk";
import { program } from "commander";

import { generateUrl, getPackageVersion, openUrl } from "./main.js";

const green = chalk.green;
const code = chalk.dim;

// eslint-disable-next-line no-console -- Allowed in CLI
const log = console.log;

program
  .version(getPackageVersion())
  .name("njt")
  .usage("<package> [destination]")
  .description(
    // prettier-ignore
    `🐸 ✨ 🐸 ✨ 🐸
npm jump to: a quick navigation tool for npm packages

https://njt.vercel.app

${ /* When updating, remember to reflect changes in README.md and src/ui/PageContentsForIndex/AvailableDestinations.tsx */''}
Available destinations
----------------------
${green('b')} → package cost estimation on https://bundlephobia.com
${green('c')} → changelog
${green('g')} → github (gitlab, etc.) repository root
${green('h')} → homepage (aliased as ${green('w')} for website or ${green('d')} for docs)
${green('i')} → issues
${green('n')} → package info on https://www.npmjs.com
${green('p')} → pull requests (aliased as ${green('m')} for merge requests)
${green('r')} → list of github releases
${green('s')} → source (often same as repository root, but can be its subdirectory in case of a monorepo)
${green('t')} → list of git tags
${green('u')} → package contents preview on https://unpkg.com
${green('v')} → list of package versions with dates on https://www.npmjs.com
${green('x')} → package page on https://npmx.dev
${green('y')} → package page on https://yarnpkg.com (mirror registry for https://www.npmjs.com)
${green('.')} → browse GitHub / GitLab code

Omitting the destination or entering an non-existing one takes you to the package page on https://www.npmjs.com as if you used ${green('n')}.


Examples
--------
${code('njt prettier')} (no specified destination)
🐸  → https://www.npmjs.com/package/prettier

${code('njt prettier h')} (homepage)
🐸  → https://prettier.io

${code('njt prettier s')} (source)
🐸  → https://github.com/prettier/prettier

${code('njt prettier r')} (releases)
🐸  → https://github.com/prettier/prettier/releases

${code('njt prettier y')} (yarn)
🐸  → https://yarnpkg.com/package/prettier

${code('njt prettier x')} (npmx)
🐸  → https://npmx.dev/package/prettier


Pro tip
-------
When you specify . instead of a package name, njt takes the name from the nearest package.json file.
`,
  )
  .parse(process.argv);

if (program.rawArgs.length < 3) {
  log(program.help());
  process.exit(1);
}

const args = [...program.args];
if (args[0] === ".") {
  const { default: finder } = await import("find-package-json");
  const finderInstance = finder();
  const packageJsonSearchResult = finderInstance.next();
  if (!packageJsonSearchResult.value) {
    log(`
${chalk.red(
  "You specified package name as . but package.json was not found in the current folder or in parent folders.",
)}
Change directly or replace . with a package name.

🐸 https://njt.vercel.app
    `);
    process.exit(1);
  }
  log(`
Resolved . as ${packageJsonSearchResult.filename}`);
  const packageName = packageJsonSearchResult.value.name;
  if (!packageName) {
    log(`
${chalk.red(
  'You specified package name as . but "name" field was not found in the resolved package.json file.',
)}
Change directly or replace . with a package name.

🐸 https://njt.vercel.app
    `);
    process.exit(1);
  }
  args[0] = packageName;
}

openUrl(
  generateUrl(args.join(" ")),
  process.env.NJT_BROWSER || process.env.BROWSER,
);
