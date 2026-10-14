# Website Lifecycle State — Frontend (2027)

## Core Sections (Required)

### 1) Overview

The website operates under a single **lifecycle state** that controls which pages, features, and navigation entries are available. The state changes ~6 times per year according to the convention timeline:

```text
Dormant (D) → Teaser (T) → Announcement (A) → Ticket Registration Opens (TO) → Account Creation & Registration Close (RC) → Final Information Release (FIR)
```

Rather than deploying different versions of the site, the application reads the state at request time and gates behaviour accordingly — both in the UI (nav visibility) and at the route level (404s for disabled pages).

### 2) Architecture

```
docker-compose.yml                app/layout.tsx (async Server Component)
  WEBSITE_STATE=D          ──►      await getSiteState()
  (env var, container                  │
   restart to change)                  ├─ dev cookie override? (dev only)
                                       │    └─ DevSiteStateSwitcher → POST /api/dev/site-state → Set-Cookie
                                       │
                                       ├─ SiteStateProvider (client context)
                                       │    ├─ Header.tsx → nav filtering via useSiteState().isEnabled()
                                       │    └─ DevSiteStateSwitcher → useSiteState().setState()
                                       │
                                       └─ page.tsx (Server Components)
                                            └─ await requireFeature("…") → notFound() if disabled
```

**Two-tier resolution:**

1. **Production** — `WEBSITE_STATE` env var is the sole source of truth. Set in `docker-compose.yml`, restart the `b_nextjs` container. No rebuild.
2. **Development** — a `dev-site-state` cookie can override the env var per-browser-session. Set via the `DevSiteStateSwitcher` dropdown in the navbar (colour-coded badge next to the theme switcher). The cookie is read server-side by `getSiteState()`, so route guards (`requireFeature`) also respond.

### 3) Module Map

| Module                     | Location                                     | Role                                                                                                                                                                                                 |
| -------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types.ts`                 | `lib/site-state/types.ts`                    | `SiteState` / `Feature` type unions, `SITE_STATE_LABELS` map, `parseSiteState()` validator                                                                                                           |
| `feature-matrix.ts`        | `lib/site-state/feature-matrix.ts`           | `FEATURE_MATRIX: Record<Feature, SiteState[]>` — which states enable each feature (transcribed from `docs/codebase/Temporarily/03-feature-matrix.md`)                                                |
| `site-config.ts`           | `lib/site-state/site-config.ts`              | Resolves `ACTIVE_SITE_STATE` from `process.env.WEBSITE_STATE`; falls back to `"D"` (Dormant) with a console warning if unset/invalid. `server-only`.                                                 |
| `get-site-state.ts`        | `lib/site-state/get-site-state.ts`           | `getSiteState()` (dev-cookie aware), `isFeatureEnabled(feature, state?)`. `server-only`.                                                                                                             |
| `require-feature.ts`       | `lib/site-state/require-feature.ts`          | `requireFeature(feature)` — calls Next.js `notFound()` if the feature is disabled. Drop at the top of gated `page.tsx`. `server-only`.                                                               |
| `SiteStateProvider.tsx`    | `components/client/SiteStateProvider.tsx`    | React context + `useSiteState()` hook. Seeded from `getSiteState()` in `app/layout.tsx`; exposes `state`, `isEnabled()`, and a dev-only `setState()`.                                                |
| `DevSiteStateSwitcher.tsx` | `components/client/DevSiteStateSwitcher.tsx` | Dev-only dropdown (6 states with colour dots). Posts to `/api/dev/site-state` to persist the cookie, then updates client state for instant preview. Rendered only when `NODE_ENV === "development"`. |
| `route.ts`                 | `app/api/dev/site-state/route.ts`            | `POST /api/dev/site-state` — sets `dev-site-state` cookie. Returns 404 in production (server-side guard, not just client-side).                                                                      |

### 4) Feature Matrix

The complete availability table is in `lib/site-state/feature-matrix.ts`. Each feature maps to the set of states in which it is enabled:

> **2027 Note:** Features marked with `† (2028)` are reserved for the 2028 full-stack release and are never available in 2027 (set to `[]` in the matrix).

| Feature                                                                                                      | States                            |
| ------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| `aboutUs`, `codeOfConduct`, `termsAndConditions`, `volunteerApplication`                                     | D T A TO RC FIR (evergreen)       |
| `themeLandingPage`, `venue`, `guestOfHonor`, `travelInformation`, `bahjetGuide`, `foodGuide`, `destinations` | A TO RC FIR (announcement onward) |
| `activities`                                                                                                 | A TO RC FIR (announcement onward) |
| `artSubmission`                                                                                              | T A                               |
| `dealerSubmission`, `panelSubmission`                                                                        | RC only                           |
| `dealerLayout`, `boothListing`, `eventSchedule`                                                              | FIR only                          |
| `ticketRegistration`                                                                                         | TO only                           |
| `login`, `accountCreation`, `profileEditing`, `badgePickupSelection` † (2028)                                | [] (never)                        |

### 5) Usage Patterns

#### Gating a new route page

```ts
// app/(public)/schedule/page.tsx
import { requireFeature } from "@/lib/site-state/require-feature";

export default async function SchedulePage() {
  await requireFeature("eventSchedule"); // 404s outside FIR
  // …page content…
}
```

#### Gating a navigation link

```ts
// components/client/layout/Header.tsx
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", feature: "aboutUs" as const },
  { label: "Venue", href: "/venue", feature: "venue" as const },
  { label: "Schedule", href: "/schedule", feature: "eventSchedule" as const },
];
```

> **2027 Note:** `login`, `register`, `profile`, `tickets`, and `badge-pickup` nav items are omitted for 2027 (features reserved for 2028).

Items without a `feature` (like `Home`) are always visible.
Items with a `feature` field are filtered out by `useSiteState().isEnabled()` before rendering (both desktop `NavigationMenu` and mobile drawer).

#### Checking a feature in a client component

```tsx
import { useSiteState } from "@/components/client/SiteStateProvider";

export function SomeWidget() {
  const { isEnabled } = useSiteState();
  if (!isEnabled("ticketRegistration")) return null;
  // …render ticket UI…
}
```

### 6) Adding a New Feature

1. Add the feature name to the `Feature` union in `lib/site-state/types.ts`.
2. Add a row to `FEATURE_MATRIX` in `lib/site-state/feature-matrix.ts` with the states that enable it.
3. Use `requireFeature("…")` in any gated `page.tsx`, or `isEnabled("…")` in client components.

### 7) Changing State

| Environment     | How                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Production**  | Set `WEBSITE_STATE=<code>` in `docker-compose.yml` (or `docker-compose.prod.yml` override), restart the `b_nextjs` container. No rebuild.                                                                                 |
| **Development** | Use the `DevSiteStateSwitcher` dropdown in the navbar (rendered next to the theme colour dot). Sets a cookie so `getSiteState()` reads the override server-side. Falls back to env var on cookie expiry (1 day) or clear. |
| **CI / build**  | `WEBSITE_STATE` is not set, so `ACTIVE_SITE_STATE` defaults to `"D"` (Dormant). All evergreen features are enabled; everything else 404s.                                                                                 |

### 8) Design Decisions

| Decision                                                   | Rationale                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server-side config, not `web_staff` backend**            | `web_staff` (PHP) and `web_client` (Next.js) run on isolated Docker networks with no API bridge. An env var + container restart achieves the same with zero new infrastructure.                                                                                                  |
| **Env var over hardcoded constant**                        | `output: "standalone"` means `process.env` is read fresh per request — changing state requires a restart, not a full rebuild. `ACTIVE_THEME` follows the same pattern: resolved at request time via `getActiveThemeKey()` (with dev-cookie override), not a build-time constant. |
| **Route-level blocking (`notFound`), not just hidden nav** | Direct URL access to disabled pages returns 404 — users cannot bookmark and revisit a gated route after the state changes.                                                                                                                                                       |
| **Dev override via cookie, not React state alone**         | The dev override must be readable by Server Components (`requireFeature`), which can only read cookies (`next/headers`), not React context.                                                                                                                                      |
| **Context over zustand for client state**                  | The state is effectively a constant within a running instance (changes ~6×/year). Zustand adds boilerplate for no benefit here; Context mirrors the existing `ThemeProvider` pattern.                                                                                            |

### 9) Evidence

- `web_client/2027/lib/site-state/types.ts`
- `web_client/2027/lib/site-state/feature-matrix.ts`
- `web_client/2027/lib/site-state/site-config.ts`
- `web_client/2027/lib/site-state/get-site-state.ts`
- `web_client/2027/lib/site-state/require-feature.ts`
- `web_client/2027/components/client/SiteStateProvider.tsx`
- `web_client/2027/components/client/DevSiteStateSwitcher.tsx`
- `web_client/2027/app/api/dev/site-state/route.ts`
- `web_client/2027/app/layout.tsx` (provider wiring)
- `web_client/2027/components/client/layout/Header.tsx` (nav filtering)
- `web_client/2027/app/(public)/schedule/page.tsx` (route guard example)
- `docker-compose.yml` (`WEBSITE_STATE` env var)
- `docker-compose.dev.yml` (`WEBSITE_STATE` env var)
