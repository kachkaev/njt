module.exports = {
  extends: ["@kachkaev/eslint-config-react"],
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
