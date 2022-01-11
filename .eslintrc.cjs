require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
    "plugin:@next/next/recommended",
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ["src/{shared,ui}/**"],
      rules: {
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              camelCase: true,
              pascalCase: true,
            },
          },
        ],
      },
    },
  ],
};
