# Architecture — Frontend (2027)

## Core Sections (Required)

### 1) Architectural Style

- **Primary style:** File-system routed SPA (Next.js App Router) with server-side rendering — content is primarily static/marketing pages with embedded interactive islands (client components).
- **Why this classification:** All routes are defined by directories under `app/`; the root layout is a server component that injects CSS custom properties at render time; interactive elements (accordion, form, mobile nav) are isolated in `"use client"` components.
- **Primary constraints:**
  1. Theme is resolved at request time via `getActiveThemeKey()` in `active-theme.ts` — in production it reads `ACTIVE_THEME` from `site-config.ts`; in development a `dev-theme` cookie (set via `DevThemeSwitcher` → `POST /api/dev/theme`) can override it per-request. There is no user-facing theme switcher in production; `DevThemeSwitcher` only renders in development.
  2. The Next.js standalone output mode requires all dependencies to be bundled — no runtime `node_modules` in the production Docker image.
  3. Docker networking isolates the frontend (`b_nextjs`) behind nginx (port 82 → `b_nextjs:3000`), with no direct external exposure.

### 2) System Flow

```text
Browser → nginx:82 → b_nextjs:3000 → Next.js App Router → layout.tsx → page.tsx
                                                              │
                                                              ├─ ThemeProvider (client context)
                                                              ├─ SiteStateProvider (client context)
                                                              ├─ Header (client component, nav filtered by site state)
                                                              ├─ children (page content, gated by requireFeature)
                                                              └─ Footer (server component)
```

1. **Request arrives** at nginx (port 82), which reverse-proxies to `b_nextjs:3000`.
2. **Next.js App Router** resolves the route segment (`/`, `/about`, `/schedule`, `/venue`, etc.) and matches it to the corresponding file under `app/` (across route groups `(public)`, `(auth)`, `(attendee)`). Note: `(auth)` and `(attendee)` route groups are empty shells in 2027 — their features are reserved for 2028.
3. **Root layout** (`app/layout.tsx`) renders the `<html>` shell with CSS custom properties from the active theme (resolved via `getActiveThemeKey()` + `getActiveTheme()` — async, cookie-aware in dev), injects font stylesheet if needed, wraps content in `ThemeProvider` (client context), `Header` (client nav), `<main>`, and `Footer`.
4. **Page component** renders — for the homepage this includes a hero section, highlights cards, FAQ accordion (`@base-ui/react/accordion`), and an email sign-up form.
5. **Client-side hydration** activates interactive islands: mobile nav toggle, accordion open/close, toast notifications, and form submission. In development, `ThemeProvider.setThemeKey` calls `POST /api/dev/theme` to persist the selected theme in a cookie so it survives hard navigation / refresh.

### 3) Layer/Module Responsibilities

| Layer or module                     | Owns                                                                                                                                                             | Must not own                                               | Evidence                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `app/layout.tsx`                    | Root `<html>` shell, metadata, theme CSS vars injection, skip-to-content a11y, Header/Footer composition                                                         | Page-specific content, data fetching, complex state        | `web_client/2027/app/layout.tsx`                                              |
| `app/*/page.tsx`                    | Page-level composition — assembles sections (PageHero, Section, ComingSoon)                                                                                      | Layout chrome, cross-cutting state                         | `web_client/2027/app/page.tsx`, `web_client/2027/app/(public)/about/page.tsx` |
| `components/ThemeProvider`          | React context for theme object + `setThemeKey` dev escape hatch (persists to `dev-theme` cookie via `POST /api/dev/theme`); syncs CSS vars to `<html>` on change | Color values (delegated to `themes.ts`), page layout       | `web_client/2027/components/client/ThemeProvider.tsx`                         |
| `components/DevThemeSwitcher`       | Dev-only dropdown to preview themes at runtime; calls `ThemeProvider.setThemeKey` which writes `dev-theme` cookie for SSR persistence                            | Production bundle inclusion (gated by `NODE_ENV`)          | `web_client/2027/components/client/DevThemeSwitcher.tsx`                      |
| `components/layout/Header`          | Primary navigation (desktop `NavigationMenu`, mobile drawer with hamburger toggle), scroll-to-top logo click                                                     | Page content, business logic                               | `web_client/2027/components/layout/Header.tsx`                                |
| `components/layout/Footer`          | Copyright notice, location text                                                                                                                                  | Dynamic content                                            | `web_client/2027/components/layout/Footer.tsx`                                |
| `components/layout/Section`         | Reusable section wrapper with numbered badge + eyebrow header                                                                                                    | Page-specific content                                      | `web_client/2027/components/layout/Section.tsx`                               |
| `components/layout/PageHero`        | Hero banner for interior pages (numbered badge, eyebrow, title, description)                                                                                     | Theme choice, layout chrome                                | `web_client/2027/components/layout/PageHero.tsx`                              |
| `components/layout/WireframeFrame`  | Decorative corner-bracket box around content                                                                                                                     | Any business logic                                         | `web_client/2027/components/layout/WireframeFrame.tsx`                        |
| `components/layout/ComingSoon`      | Placeholder section for unfinished pages                                                                                                                         | Production-ready content                                   | `web_client/2027/components/layout/ComingSoon.tsx`                            |
| `lib/theme/themes.ts`               | Theme type definitions, color token data, `themeToCssVars()`                                                                                                     | UI rendering, hardcoded colors outside theme tokens        | `web_client/2027/lib/theme/themes.ts`                                         |
| `lib/theme/site-config.ts`          | Single `ACTIVE_THEME` constant — the production theme (also the dev fallback when no cookie override)                                                            | Multiple theme sources, runtime switching                  | `web_client/2027/lib/theme/site-config.ts`                                    |
| `lib/theme/active-theme.ts`         | `getActiveThemeKey()` (dev-cookie aware) + `getActiveTheme()` — server-only request-time theme resolution                                                        | Client-side imports (marked `server-only`)                 | `web_client/2027/lib/theme/active-theme.ts`                                   |
| `app/api/dev/theme/route.ts`        | `POST /api/dev/theme` — sets `dev-theme` cookie for SSR persistence of dev theme override                                                                        | Production (rejects 404 when `NODE_ENV !== "development"`) | `web_client/2027/app/api/dev/theme/route.ts`                                  |
| `lib/site-state/types.ts`           | `SiteState` / `Feature` type unions, `SITE_STATE_LABELS`, `parseSiteState()` validator. 5 features reserved for 2028 (see `feature-matrix.ts`).                  | Feature matrix data, UI rendering                          | `web_client/2027/lib/site-state/types.ts`                                     |
| `lib/site-state/feature-matrix.ts`  | `FEATURE_MATRIX` — which states enable each feature (transcribed from `03-feature-matrix.md`). 2027 static-only: auth/account/ticket features set to `[]`.       | Hardcoded logic outside the matrix                         | `web_client/2027/lib/site-state/feature-matrix.ts`                            |
| `lib/site-state/site-config.ts`     | Resolves `ACTIVE_SITE_STATE` from `WEBSITE_STATE` env var; falls back to `"D"` (Dormant)                                                                         | Client-side imports (marked `server-only`)                 | `web_client/2027/lib/site-state/site-config.ts`                               |
| `lib/site-state/get-site-state.ts`  | `getSiteState()` (dev-cookie aware), `isFeatureEnabled(feature, state?)`                                                                                         | Client-side imports (marked `server-only`)                 | `web_client/2027/lib/site-state/get-site-state.ts`                            |
| `lib/site-state/require-feature.ts` | `requireFeature(feature)` — route guard calling `notFound()` if disabled. 2027: auth pages always 404 since features are `[]`.                                   | Client-side imports (marked `server-only`)                 | `web_client/2027/lib/site-state/require-feature.ts`                           |

### 4) Reused Patterns

| Pattern                            | Where found                                                                                                                                                                    | Why it exists                                                                                                                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CSS custom property theming**    | `globals.css` (`@theme inline`), `themes.ts` (`themeToCssVars`), `layout.tsx` (`<html style={...}>`)                                                                           | Enables switching the entire site's appearance by changing one constant (`ACTIVE_THEME`) — Tailwind utility classes resolve to CSS vars that are injected at render time                                                                                                |
| **Wireframe annotation**           | `WireframeFrame` (corner brackets), `Section` (numbered badge + eyebrow), `PageHero`                                                                                           | Gives every content section a consistent "blueprint/wireframe" aesthetic across the site                                                                                                                                                                                |
| **Client component isolation**     | `"use client"` boundary at each interactive component (Header, DevThemeSwitcher, ThemeProvider, HomePage)                                                                      | Minimizes client JS bundle — server components render static content, only interactive islands are hydrated                                                                                                                                                             |
| **Headless UI primitives**         | `@base-ui/react` (Accordion, NavigationMenu, Button, Toast, Field, Input)                                                                                                      | Provides accessible, unstyled components that are themed entirely via Tailwind/CSS vars — no library-specific styling to fight                                                                                                                                          |
| **Server-config + client context** | `site-config.ts` (server-only constant) → Context provider (seeded from prop) → `useX()` hook — used by both `ThemeProvider`/`useTheme` and `SiteStateProvider`/`useSiteState` | Single source of truth resolved on the server; client components consume via context without importing server-only modules. Dev-only escape hatches (switchers) persist overrides to cookies (`dev-theme`, `dev-site-state`) so they survive hard navigation / refresh. |

### 5) Known Architectural Risks

| Risk                                                                                                                                                                                                                                                                                                                                            | Impact                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **No real backend integration yet** — `@tanstack/react-query`, `zustand`, `react-hook-form`, and `zod` are all declared in `package.json` but no API client, store, or form wiring exists. The email sign-up form on the homepage uses a local toast instead of calling an API. `motion` is installed for planned animations but not yet wired. | When backend APIs are introduced, significant integration work will be needed. The current setup does not validate whether these libraries compose correctly. |
| **CSS var fallback drift** — `globals.css` hardcodes `"bah"` theme fallback values, but `ACTIVE_THEME` is `"greyscale"`. Fallbacks may silently diverge.                                                                                                                                                                                        | If the inline `<html style>` fails to apply, the page renders in wrong colours. Fallbacks should be regenerated from `getActiveTheme()`.                      |

### 6) Build-Time Optimizations

- **React Compiler** (`babel-plugin-react-compiler` 1.0.0): Enabled via `next.config.ts` (`reactCompiler: true`). Automatically memoizes components and hooks at build time — no manual `useCallback`, `useMemo`, or `React.memo` needed. Also powers compiler-aware lint rules through `eslint-plugin-react-hooks` v7.
- **Standalone output** (`output: "standalone"`): Emits a minimal `.next/standalone` directory for Docker, eliminating the need for `node_modules` in the runtime image.

### 7) Evidence

- `web_client/2027/app/layout.tsx` (root layout composition)
- `web_client/2027/app/page.tsx` (homepage flow)
- `web_client/2027/components/client/ThemeProvider.tsx` (theme context / CSS var sync / dev cookie persistence)
- `web_client/2027/lib/theme/themes.ts` (theme definitions + `themeToCssVars`)
- `web_client/2027/lib/theme/site-config.ts` (`ACTIVE_THEME`)
- `web_client/2027/lib/theme/active-theme.ts` (`getActiveThemeKey`, `getActiveTheme` — dev-cookie aware)
- `web_client/2027/app/api/dev/theme/route.ts` (dev-only theme cookie setter)
- `web_client/2027/app/globals.css` (Tailwind theme tokens → CSS vars)
- `web_client/2027/lib/site-state/` (lifecycle state: types, matrix, resolver, route guard)
- `web_client/2027/components/client/SiteStateProvider.tsx` (site state context)
- `web_client/2027/app/api/dev/site-state/route.ts` (dev-only state override cookie)
- `config/nginx/default.conf` (reverse-proxy to b_nextjs)
- `docker-compose.yml` (service `b_nextjs` definition, `WEBSITE_STATE` env var)
