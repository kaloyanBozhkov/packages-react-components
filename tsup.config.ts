import { defineConfig } from "tsup";
import { entries } from "./scripts/entries.js";

export default defineConfig({
  entry: entries,
  format: ["esm", "cjs"],
  dts: true,
  // Shared code lives in dist/chunks so every entry (root and subpaths) uses one module instance.
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react-native", "tailwindcss"],
  esbuildOptions(options) {
    options.chunkNames = "chunks/[name]-[hash]";
  },
});
