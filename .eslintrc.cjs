module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
    "plugin:@next/next/recommended-legacy",
  ],
  parserOptions: { tsconfigRootDir: __dirname },
  overrides: [
    {
      files: ["next-env.d.ts"],
      rules: {
        "@typescript-eslint/triple-slash-reference": "off",
      },
    },
  ],
};
