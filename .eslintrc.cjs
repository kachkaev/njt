require("@rushstack/eslint-patch/modern-module-resolution.js");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
    "plugin:@next/next/recommended",
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  settings: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: `${__dirname}/tsconfig.json`,
      },
    },
  },
};
