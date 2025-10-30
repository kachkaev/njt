require("@rushstack/eslint-patch/modern-module-resolution.js");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
    "plugin:@next/next/recommended-legacy",
  ],
  parserOptions: { tsconfigRootDir: __dirname },

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: `${__dirname}/tsconfig.json`,
      },
    },
  },

  overrides: [
    {
      files: ["next-env.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
  ],
};
