# Coding Conventions — Frontend (2027)

## Core Sections (Required)

### 1) Naming Rules

| Item                     | Rule                                                                                                       | Example                                                                                                              | Evidence                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Files (React components) | PascalCase — each component gets its own file                                                              | `ThemeProvider.tsx`, `PageHero.tsx`, `WireframeFrame.tsx`, `DevThemeSwitcher.tsx`                                    | `web_client/2027/components/`                                                                   |
| Files (pages)            | `page.tsx` — Next.js App Router convention; organised into route groups `(public)`, `(auth)`, `(attendee)` | `app/page.tsx`, `app/(public)/about/page.tsx`, `app/(auth)/login/page.tsx`                                           | `web_client/2027/app/`                                                                          |
| Files (config/lib)       | kebab-case for config files, camelCase for lib files                                                       | `site-config.ts`, `postcss.config.mjs` (config); `themes.ts` (lib)                                                   | `web_client/2027/lib/`, `web_client/2027/`                                                      |
| Functions/methods        | camelCase — React components are PascalCase (component functions)                                          | `getActiveTheme()`, `themeToCssVars()`, `scrollTo()`, `handleLogoClick()`, `closeMobile()`                           | `web_client/2027/lib/theme/themes.ts`, `web_client/2027/components/layout/Header.tsx`           |
| Types/interfaces         | PascalCase — prefixed consistently (`Theme`, `BrandTokens`, `SemanticTokens`, `ThemeKey`)                  | `interface Theme`, `interface BrandTokens`, `export type ThemeKey`                                                   | `web_client/2027/lib/theme/themes.ts`                                                           |
| Props interfaces         | PascalCase — component name + `Props` suffix                                                               | `SectionProps`, `PageHeroProps`, `WireframeFrameProps`, `ComingSoonProps`, `ThemeContextValue`, `ThemeProviderProps` | `web_client/2027/components/layout/Section.tsx`, `web_client/2027/components/ThemeProvider.tsx` |
| Constants/env vars       | UPPER_SNAKE_CASE for exported constants                                                                    | `ACTIVE_THEME`, `FONT_LINK_ID`                                                                                       | `web_client/2027/lib/theme/site-config.ts`, `web_client/2027/components/ThemeProvider.tsx`      |
| CSS custom properties    | `--kebab-case` — brand-prefixed (`--brand-*`) and semantic (`--background`, `--primary`, etc.)             | `--brand-bg`, `--brand-accent`, `--font-theme`                                                                       | `web_client/2027/app/globals.css`, `web_client/2027/lib/theme/themes.ts`                        |

### 2) Formatting and Linting

- **Formatter:** Prettier 3.x — config at `web_client/2027/.prettierrc.json`. Settings: `semi: true`, `singleQuote: false`, `trailingComma: "all"`, `printWidth: 80`, `tabWidth: 2`. Uses `prettier-plugin-tailwindcss` for automatic Tailwind class sorting.
- **Linter:** ESLint 9.x (flat config) — config at `web_client/2027/eslint.config.mjs`. Extends `eslint-config-next` core-web-vitals + TypeScript rules, `eslint-plugin-react-hooks` v7 recommended preset (compiler-powered Rules of React diagnostics), plus `eslint-config-prettier` to disable formatting rules that conflict with Prettier.
- **Most relevant enforced rules:** Next.js core-web-vitals rules, TypeScript strict checks, compiler-powered React hooks rules (`set-state-in-render`, `set-state-in-effect`, `refs`, etc.), Prettier formatting compatibility.
- **Run commands:**
  ```bash
  pnpm lint              # ESLint check
  pnpm format            # Prettier write
  pnpm format:check      # Prettier check-only
  ```

### 3) Import and Module Conventions

- **Import grouping/order:** No explicit grouping rules configured (ESLint import plugin is not installed). Imports in practice follow: external deps → internal `@/` aliases → CSS.
- **Alias vs relative import policy:** All internal imports use the `@/*` path alias (maps to project root per `tsconfig.json` `paths`). No relative imports (`../../`) are used. Examples: `import Header from "@/components/layout/Header"`, `import { getActiveTheme } from "@/lib/theme/themes"`.
- **Public exports/barrel policy:** No barrel (`index.ts`) files found. Components and lib modules are imported directly from their defining files.

### 4) Error and Logging Conventions

- **Error strategy by layer:** Client components use `throw new Error("message")` for invariant violations (e.g., `useTheme` throws if used outside `ThemeProvider`). Form validation is delegated to `react-hook-form` + `zod` (schema declared but not yet wired). Error boundaries are in place: `app/error.tsx` (segment-level), `app/global-error.tsx` (root layout), `app/not-found.tsx` (custom 404), plus route-group-level `error.tsx` files in `(public)/`, `(auth)/`, and `(attendee)/`.
- **Logging style and required context fields:** No logging library is configured. `console` is not used in production code. Dev-only component (`DevThemeSwitcher`) is gated by `process.env.NODE_ENV === "development"`.
- **Sensitive-data redaction rules:** No sensitive data handling exists yet — no API calls, no auth tokens, no forms submitting to a backend.

### 5) Testing Conventions

- **Test file naming/location rule:** E2E tests in `e2e/*.spec.ts` (Playwright), Storybook stories in `components/**/*.stories.tsx`, Storybook interaction tests via Vitest (`pnpm test:storybook`).
- **Mocking strategy norm:** E2E tests run against the real dev server with no mocking. Unit/integration coverage for utilities and hooks is provided via Storybook + Vitest.
- **Coverage expectation:** No coverage threshold configured yet — Vitest coverage is available via `@vitest/coverage-v8`.

### 6) Memoization and Performance

- **Policy:** Do **not** use `useCallback`, `useMemo`, or `React.memo`. The React Compiler (`babel-plugin-react-compiler` 1.0.0, enabled via `next.config.ts` `reactCompiler: true`) automatically memoizes components and hooks at build time with greater precision than manual memoization.
- **Escape hatch:** If you genuinely need precise control over memoization (e.g., stabilizing a dependency for `useEffect`), `useMemo`/`useCallback` may still be used — but this should be the exception, not the rule.
- **Existing code:** Manual memoization was removed from `RegisterForm.tsx`, `Header.tsx`, and `SiteStateProvider.tsx`. If you encounter pre-compiler code in other files, remove it.

### 7) Evidence

- `web_client/2027/.prettierrc.json`
- `web_client/2027/eslint.config.mjs`
- `web_client/2027/tsconfig.json` (strict mode, path aliases)
- `web_client/2027/components/ThemeProvider.tsx` (error pattern)
- `web_client/2027/components/layout/Header.tsx` (naming conventions)
- `web_client/2027/lib/theme/themes.ts` (type/function naming)
- `web_client/2027/app/globals.css` (CSS custom property naming)
