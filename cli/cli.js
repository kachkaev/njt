#!/usr/bin/env node

const chalk = require("chalk");
const program = require("commander");
const { getPackageVersion, generateUrl, openUrl } = require("./helpers");

const green = chalk.green;
const code = chalk.dim;

program
  .version(getPackageVersion())
  .name("njt")
  .usage("<package> [destination]")
  .description(
    // prettier-ignore
    `🐸 ✨ 🐸 ✨ 🐸
npm jump to: package navigation shortcuts you dreamed about

https://njt.now.sh

${ /* When updating, remember to reflect changes in README.md and src/components/AvailableDestinations.tsx */''}
Available destinations
----------------------
${green('c')} → changelog
${green('g')} → github (gitlab, etc.) repository root
${green('h')} → homepage (aliased as ${green('w')} for website or ${green('d')} for docs)
${green('i')} → issues (aliased as ${green('b')} for bugs)
${green('n')} → package info on https://www.npmjs.com
${green('p')} → pull requests (aliased as ${green('m')} for merge requests)
${green('r')} → list of github releases
${green('s')} → source (often same as repository root, but can be its subdirectory in case of a monorepo)
${green('t')} → list of git tags
${green('u')} → package contents preview on https://unpkg.com
${green('v')} → list of package versions with dates on https://www.npmjs.com
${green('y')} → package page on https://yarnpkg.com

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
`,
  )
  .parse(process.argv);

if (program.rawArgs.length < 3) {
  console.log(program.help());
  process.exit(1);
}

const query = program.args.join(" ");
openUrl(generateUrl(query), process.env.NJT_BROWSER || process.env.BROWSER);
