require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["@kachkaev/eslint-config-react"],
  rules: {
    "import/no-default-export": "error",
  },
  parserOptions: { tsconfigRootDir: __dirname },
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
