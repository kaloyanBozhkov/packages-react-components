import { readdirSync } from "node:fs";
import { basename, extname } from "node:path";

// Single source of truth for the package entry points.
// Used by tsup.config.ts (build entries) and scripts/sync-exports.js (package.json "exports").

const COMPONENT_DIRS = ["src/components/atoms", "src/components/shadcn"];

const FIXED_ENTRIES = {
  index: "src/index.ts",
  native: "src/native.ts",
};

// DotsLoader.tsx -> dots-loader, DataTable.shadcn.tsx -> data-table, ColorPicker.molecule.tsx -> color-picker
const toSubpath = (file) =>
  basename(file, extname(file))
    .split(".")[0]
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();

const componentFiles = COMPONENT_DIRS.flatMap((dir) =>
  readdirSync(dir)
    .filter((file) => /\.tsx?$/.test(file))
    .sort()
    .map((file) => `${dir}/${file}`),
);

export const entries = componentFiles.reduce((acc, file) => {
  const name = toSubpath(file);
  if (acc[name]) {
    throw new Error(`Entry name "${name}" is used by both ${acc[name]} and ${file}`);
  }
  return { ...acc, [name]: file };
}, FIXED_ENTRIES);

const toExport = (name) => ({
  types: `./dist/${name}.d.ts`,
  import: `./dist/${name}.js`,
  require: `./dist/${name}.cjs`,
});

export const exportsMap = {
  ...Object.fromEntries(
    Object.keys(entries).map((name) => [name === "index" ? "." : `./${name}`, toExport(name)]),
  ),
  "./styles.css": "./dist/styles.css",
};
