#!/usr/bin/env node

const chalk = require("chalk");
const path = require("path");
const program = require("commander");
const { generateUrl, openUrl } = require("./helpers");

const green = chalk.green;
const code = chalk.dim;

program
  .version(require(path.resolve(__dirname, "./package.json")).version)
  .name("njt")
  .usage("<package> [destination]")
  .description(
    // prettier-ignore
    `🐸 ✨ 🐸 ✨ 🐸
npm jump to: package navigation shortcuts you dreamt of

https://njt.now.sh


Destinations
------------
${green('c')} → changelog
${green('h')} → homepage (aliased as ${green('w')} for website or ${green('d')} for docs)
${green('i')} → repository issues (aliased as ${green('b')} for bugs)
${green('n')} → package page on https://www.npmjs.com
${green('p')} → repository pull requests
${green('r')} → repository root (list of files and readme)
${green('s')} → source (most commonly the same repository root, but can take you to a subdirectory in case of a monorepo)
${green('t')} → repository tags (also called releases)
${green('v')} → list of all package versions with their publish dates on https://www.npmjs.com
${green('y')} → package page on https://yarnpkg.com (mirror registry for https://www.npmjs.com)
${/* When updating, remember to reflect changes in README.md */''}


Examples
--------
${code('njt prettier')} (no specified destination)
🐸  → https://www.npmjs.com/package/prettier

${code('njt prettier h')} (homepage)
🐸  → https://prettier.io

${code('njt prettier r')} (repository)
🐸  → https://github.com/prettier/prettier

${code('njt prettier c')} (changelog)
🐸  → https://github.com/prettier/prettier/blob/master/CHANGELOG.md

${code('njt prettier y')} (yarn)
🐸  → https://yarn.pm/prettier
`,
  )
  .parse(process.argv);

if (program.rawArgs.length < 3) {
  console.log(program.help());
  process.exit(1);
}

const query = program.args.join(" ");
openUrl(generateUrl(query), process.env.NJT_BROWSER || process.env.BROWSER);
