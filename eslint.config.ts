import { generateNextConfigs } from "@kachkaev/eslint-config-next";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["cli/dist"] },

  ...generateNextConfigs({
    tailwindcssEntryPoint: "app/layout/global.css",
  }),

  {
    // Next’s metadata route conventions call for a default export. The upstream
    // override covers the `.tsx` route files, but not these two.
    files: ["app/{robots,sitemap}.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },

  {
    // Vite requires a default export from its config file
    files: ["cli/vite.config.ts"],
    rules: {
      "import/no-default-export": "off",
    },
  },
]);
