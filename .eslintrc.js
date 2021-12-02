require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["@kachkaev/eslint-config-react", "plugin:@next/next/recommended"],
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    "import/no-default-export": "error",
  },
  overrides: [
    {
      files: ["src/pages/**"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["cli/**"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
