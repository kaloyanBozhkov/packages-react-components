# To setup
@import "@koko420/react-components/styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
...


or in JS
import "@koko420/react-components/styles.css";

# Importing

Every component is available from the package root and from its own subpath:

```ts
// subpath: only this component and what it needs
import { DotsLoader } from "@koko420/react-components/dots-loader";
import { Button } from "@koko420/react-components/button";

// root: everything, tree-shaken by the bundler ("sideEffects" is declared)
import { DotsLoader, Button } from "@koko420/react-components";
```

Both forms export the same names and share the same modules, so they can be mixed (e.g. `Form` from the root and `FormField` from `/form`).

Prefer subpaths when:
- the import sits in code shared by many pages (layouts, loaders) and must stay small no matter how the bundler tree-shakes
- you import from a React Server Component: subpath entries carry `"use client"` where the component needs it, the root entry does not

Subpaths (one per file in `src/components/atoms` and `src/components/shadcn`, kebab-case):
`accordion`, `button`, `card`, `checkbox`, `color-picker`, `data-table`, `dialog`, `dots-loader`, `drawer`, `form`, `input`, `label`, `popover`, `select`, `separator`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`

React Native: `import { DotsLoader } from "@koko420/react-components/native";`

The CSS is a separate import (see "To setup"): `import "@koko420/react-components/styles.css";`

# Adding a component

Entry points come from `scripts/entries.js`. After adding a file to `src/components/atoms` or `src/components/shadcn`, export it from `src/index.ts` and run `pnpm exports:sync` to update the `exports` map in package.json (`pnpm build` fails if the map is out of date).
