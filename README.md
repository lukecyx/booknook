# Booknook Monorepo Overview

This document explains the structure and setup of the Booknook monorepo,
including how the **web app**, **UI library**, and **shared modules** fit together.

---

## 1. Monorepo Structure

```
booknook/
├─ apps/
│ └─ web/ # Next.js application
│ ├─ src/
│ │ ├─ app/ # Next.js App Router pages and layouts
│ │ ├─ components/ # App-specific UI components
│ │ └─ lib/ # App-specific providers/utilities
│ ├─ tsconfig.json # App-specific TypeScript config with path aliases
│ └─ next.config.mjs
├─ packages/
│ └─ ui/ # Shared UI library
│ ├─ src/
│ │ ├─ theme/ # Theme, global styles, styled components
│ │ └─ components/ # Reusable styled components
│ ├─ tsconfig.json # UI-specific TypeScript config
│ └─ package.json
├─ tsconfig.json # Root TypeScript config
└─ package.json
```

---

## 2. How the Pieces Fit Together

### `apps/web` (Next.js App)

- Main application for the project.
- Uses **React Server Components (RSC)** and **Client Components**.
- Imports reusable UI components and theme from the `ui` package.
- Can define app-specific providers and libraries under `src/lib`.

### `packages/ui` (UI Library)

- Shared design system and styled components.
- Exports:
  - `baseTheme` → theme colors and typography.
  - `GlobalStyles` → global CSS via `styled-components`.
  - `ClientThemeProvider` → wraps the app in a ThemeProvider.
  - Reusable components like `Title`.
- Can define its **own path aliases** if needed (`ui` → `src`).
- Compiled with TypeScript to produce `.d.ts` type declarations in `dist/`.

---

## 3. TypeScript & Path Aliases

- Each project (`apps/web`, `packages/ui`) has its **own `tsconfig.json`** for project-specific aliases.
- Root `tsconfig.json` provides shared settings (strict mode, lib targets, module resolution).

### `apps/web/tsconfig.json` example

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": ".next/ts",
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@lib/*": ["src/lib/*"],
      "ui": ["../../packages/ui/src"],
      "ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["next-env.d.ts", "src"]
}
```

---

## Development

Run the app from the root or inside apps/web:

```
bunx turbo run dev
```

TypeScript resolves imports via project-specific aliases.

Fast Refresh works for client components and UI library updates.

#### UI Library

Make changes inside packages/ui/src.

Build types for consumption by apps:

cd packages/ui
bunx tsc --build

apps/web automatically picks up changes when imported.
