import { readFileSync, writeFileSync } from "node:fs";
import { exportsMap } from "./entries.js";

// Writes package.json "exports" from scripts/entries.js.
// With --check it only verifies the committed map, so a build can never ship a stale one.

const PACKAGE_JSON = "package.json";
const pkg = JSON.parse(readFileSync(PACKAGE_JSON, "utf8"));
const isInSync = JSON.stringify(pkg.exports) === JSON.stringify(exportsMap);

if (process.argv.includes("--check")) {
  if (!isInSync) {
    console.error('package.json "exports" is out of date. Run `pnpm exports:sync` and commit the result.');
    process.exit(1);
  }
} else if (!isInSync) {
  writeFileSync(PACKAGE_JSON, `${JSON.stringify({ ...pkg, exports: exportsMap }, null, 2)}\n`);
  console.log('package.json "exports" updated.');
}
