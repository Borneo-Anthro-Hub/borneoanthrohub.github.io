# Codebase Structure — Frontend (2027)

## Core Sections (Required)

### 1) Top-Level Map

| Path          | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                      | Evidence                                                                                                                                                                                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/`        | Next.js App Router pages + root layout + API routes — routes are organised into three route groups: `(public)` (marketing/info), `(auth)` (login/register), `(attendee)` (authenticated pages). Each group has its own `layout.tsx` and `error.tsx`. Root-level `error.tsx`, `global-error.tsx`, and `not-found.tsx` provide fallback error handling. `api/dev/site-state` serves a dev-only state-override cookie endpoint. | `web_client/2027/app/layout.tsx`, `web_client/2027/app/page.tsx` (root `/`), `web_client/2027/app/(public)/about/page.tsx`, `web_client/2027/app/api/dev/site-state/route.ts`                                                                                                                   |
| `components/` | Reusable React components — split into `client/layout/` (structural), `server/layout/` (static), and root-level (cross-cutting: `ThemeProvider`, `SiteStateProvider`, `DevThemeSwitcher`, `DevSiteStateSwitcher`)                                                                                                                                                                                                            | `web_client/2027/components/client/layout/Header.tsx`, `web_client/2027/components/client/ThemeProvider.tsx`, `web_client/2027/components/client/SiteStateProvider.tsx`, `web_client/2027/components/client/DevThemeSwitcher.tsx`, `web_client/2027/components/client/DevSiteStateSwitcher.tsx` |
| `lib/`        | Non-UI domain logic — `lib/theme/` (theme config, token definitions, CSS-variable helpers, request-time theme resolution), `lib/site-state/` (lifecycle state types, feature matrix, server-side resolver, route guard)                                                                                                                                                                                                      | `web_client/2027/lib/theme/site-config.ts`, `web_client/2027/lib/theme/active-theme.ts`, `web_client/2027/lib/site-state/site-config.ts`                                                                                                                                                        |
| `public/`     | Static assets served at `/` by Next.js (currently empty)                                                                                                                                                                                                                                                                                                                                                                     | `web_client/2027/public/`                                                                                                                                                                                                                                                                       |
| `.husky/`     | Git hooks managed by Husky — contains `pre-commit` hook                                                                                                                                                                                                                                                                                                                                                                      | `web_client/2027/.husky/pre-commit` (via `package.json` `prepare` script)                                                                                                                                                                                                                       |

### 2) Entry Points

- **Main runtime entry:** `app/layout.tsx` — Root layout wraps every page; resolves theme via `getActiveThemeKey()` + `getActiveTheme()` (async, dev-cookie-aware) and `getSiteState()`, sets `<html>` CSS custom properties + `<head>` font link, and the `ThemeProvider` + `SiteStateProvider` + `Header`/`Footer` shell.
- **Page entry:** `app/page.tsx` — Homepage (/) — currently the only fully-implemented page with hero, highlights, FAQ accordion, and email sign-up form.
- **Secondary pages:** 22 placeholder pages across three route groups (`(public)`, `(auth)`, `(attendee)`), each gated with `await requireFeature("…")` per the feature matrix. All follow the same `PageHero` + `ComingSoon` placeholder pattern. Four `[slug]`/`[id]` dynamic detail pages (`activities/[slug]`, `schedule/[slug]`, `booth-listing/[slug]`, `tickets/[id]`) are also scaffolded. See `lib/site-state/feature-matrix.ts` for the full mapping.
- **API routes:**
  - `app/api/dev/site-state/route.ts` — `POST` endpoint for the dev-only state override cookie; rejects with 404 in production.
  - `app/api/dev/theme/route.ts` — `POST` endpoint for the dev-only theme override cookie; rejects with 404 in production.
- **Docker entry:** `Dockerfile` multi-stage — `dev` stage runs `pnpm dev`; `runner` stage runs `node server.js` from standalone output.

### 3) Module Boundaries

| Boundary             | What belongs here                                                                                       | What must not be here                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `app/`               | Page components, route layouts, metadata exports — only orchestrates layout composition                 | No business logic, no direct API calls, no complex state management |
| `components/layout/` | Structural shell components (`Header`, `Footer`, `Section`, `PageHero`, `ComingSoon`, `WireframeFrame`) | No page-specific logic, no data fetching                            |
| `components/` (root) | Cross-cutting UI providers (`ThemeProvider`, `DevThemeSwitcher`)                                        | No page-specific content                                            |
| `lib/`               | Pure functions, type definitions, config constants, future API client wrappers                          | No React components, no JSX                                         |
| `public/`            | Static files served verbatim                                                                            | Must not contain source code                                        |

### 4) Naming and Organization Rules

- **File naming pattern:** PascalCase for React components (`ThemeProvider.tsx`, `PageHero.tsx`); kebab-case for config files (`site-config.ts`, `postcss.config.mjs`); TypeScript `.ts` for lib, `.tsx` for JSX-containing files.
- **Directory organization pattern:** Layer-based — `app/` (routes/pages), `components/` (UI), `lib/` (logic/config), `public/` (static).
- **Import aliasing:** `@/*` maps to project root (`./*` per `tsconfig.json` `paths`). All internal imports use the `@/` prefix — e.g. `import Header from "@/components/layout/Header"`. No relative imports (`../../`) found.

### 5) Evidence

- `web_client/2027/app/layout.tsx` (root layout)
- `web_client/2027/app/page.tsx` (homepage)
- `web_client/2027/components/layout/Header.tsx`
- `web_client/2027/components/ThemeProvider.tsx`
- `web_client/2027/lib/theme/themes.ts`
- `web_client/2027/tsconfig.json` (path aliases)
- `web_client/2027/Dockerfile`
