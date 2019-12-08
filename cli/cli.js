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


Destinations
------------

${green('c')} → changelog
${green('h')} → homepage (aliased as ${green('w')} for website or ${green('d')} for docs)
${green('i')} → issues (aliased as ${green('b')} for bugs)
${green('n')} → package info on [npmjs.com](https://www.npmjs.com/)
${green('p')} → pull requests (aliased as ${green('m')} for merge requests)
${green('r')} → list of github releases
${green('s')} → source (most commonly repository root, but can take you to a subdirectory in case of a monorepo)
${green('t')} → list of git tags
${green('v')} → list of package versions with their publish dates on [npmjs.com](https://www.npmjs.com/)
${green('y')} → package page on [yarnpkg.com](https://yarnpkg.com/) (mirror registry for [npmjs.com](https://www.npmjs.com/))
${/* When updating, remember to reflect changes in README.md */''}


Examples
--------
${code('njt prettier')} (no specified destination)
🐸  → https://www.npmjs.com/package/prettier

${code('njt prettier h')} (homepage)
🐸  → https://prettier.io

${code('njt prettier s')} (source)
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
