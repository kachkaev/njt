import { chmodSync } from "node:fs";
import { builtinModules } from "node:module";

import { defineConfig } from "vite";

const nodeBuiltins = [
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
];

export default defineConfig({
  build: {
    lib: {
      entry: "src/cli.ts",
      fileName: () => "cli.js",
      formats: ["es"],
    },
    minify: false,
    outDir: "dist",
    rollupOptions: {
      // `open` resolves helper binaries relative to its own install location,
      // so it stays a runtime dependency instead of being inlined.
      external: [...nodeBuiltins, "open"],
      output: {
        banner: "#!/usr/bin/env node",
        codeSplitting: false,
      },
    },
    target: "node22",
  },
  plugins: [
    {
      closeBundle() {
        chmodSync("dist/cli.js", 0o755);
      },
      name: "chmod-cli",
    },
  ],
});
