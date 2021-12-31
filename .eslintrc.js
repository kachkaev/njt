module.exports = {
  extends: ["@kachkaev/eslint-config-react", "plugin:@next/next/recommended"],
  overrides: [
    {
      files: ["cli/**"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
