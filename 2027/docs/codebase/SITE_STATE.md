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

| Module                     | Location                                       | Role                                                                                                                                                                                                 |
| -------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `types.ts`                 | `lib/site-state/types.ts`                      | `SiteState` / `Feature` type unions, `SITE_STATE_LABELS` map, `parseSiteState()` validator                                                                                                           |
| `feature-matrix.ts`        | `lib/site-state/feature-matrix.ts`             | `FEATURE_MATRIX: Record<Feature, SiteState[]>` — which states enable each feature (transcribed from `docs/codebase/Temporarily/03-feature-matrix.md`)                                                |
| `rollout.ts`               | `lib/site-state/rollout.ts`                    | `ROLLOUT_STATUS: Record<Feature, "live" \| "coming-soon" \| "hidden">` — whether each page is finished (see §4.1)                                                                                    |
| `NotReadyGate.tsx`         | `components/server/layout/NotReadyGate.tsx`    | Server component: renders the page when the feature is live, otherwise the "under construction" overlay                                                                                              |
| `NotReadyOverlay.tsx`      | `components/server/layout/NotReadyOverlay.tsx` | The hazard-tape "under construction" panel used for coming-soon pages                                                                                                                                |
| `site-config.ts`           | `lib/site-state/site-config.ts`                | Resolves `ACTIVE_SITE_STATE` from `process.env.WEBSITE_STATE`; falls back to `"D"` (Dormant) with a console warning if unset/invalid. `server-only`.                                                 |
| `get-site-state.ts`        | `lib/site-state/get-site-state.ts`             | `getSiteState()` (dev-cookie aware), `isFeatureEnabled(feature, state?)`. `server-only`.                                                                                                             |
| `require-feature.ts`       | `lib/site-state/require-feature.ts`            | `requireFeature(feature)` — calls Next.js `notFound()` if the feature is disabled. Drop at the top of gated `page.tsx`. `server-only`.                                                               |
| `SiteStateProvider.tsx`    | `components/client/SiteStateProvider.tsx`      | React context + `useSiteState()` hook. Seeded from `getSiteState()` in `app/layout.tsx`; exposes `state`, `isEnabled()`, and a dev-only `setState()`.                                                |
| `DevSiteStateSwitcher.tsx` | `components/client/DevSiteStateSwitcher.tsx`   | Dev-only dropdown (6 states with colour dots). Posts to `/api/dev/site-state` to persist the cookie, then updates client state for instant preview. Rendered only when `NODE_ENV === "development"`. |
| `route.ts`                 | `app/api/dev/site-state/route.ts`              | `POST /api/dev/site-state` — sets `dev-site-state` cookie. Returns 404 in production (server-side guard, not just client-side).                                                                      |

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
| `ticketRegistration`                                                                                         | A TO                              |
| `login`, `accountCreation`, `profileEditing`, `badgePickupSelection` † (2028)                                | [] (never)                        |

### 4.1 Rollout gate

The matrix above answers _"does this page belong to the active lifecycle state?"_. The rollout gate answers _"is the page finished?"_ — the two are independent, so a page can belong to the active state while its content is still being written. It lives in `lib/site-state/rollout.ts`:

| Status        | In navigation | Route    | Behaviour                                      |
| ------------- | ------------- | -------- | ---------------------------------------------- |
| `live`        | ✅            | renders  | Full page                                      |
| `coming-soon` | ❌            | resolves | Renders `<NotReadyOverlay>` instead of content |
| `hidden`      | ❌            | 404      | `requireFeature()` calls `notFound()`          |

Current 2027 rollout (`WEBSITE_STATE=A`): landing, tickets, policies, event info, Venue and Travel Info are `live`; theme, GOH, food guide, destinations, schedule and the Dealer's Den pages are `coming-soon`; BAHjet and the whole Contribution section are `hidden`. Flip a status in `rollout.ts` as content lands — no page code changes.

Coming-soon pages stay reachable on purpose: homepage quick links point at them, and visitors get the overlay instead of a 404. The Home page links every feature through `isRoutable()`, so hidden pages never appear.

### 5) Usage Patterns

#### Gating a new route page

```ts
// app/(public)/schedule/page.tsx
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import { requireFeature } from "@/lib/site-state/require-feature";

export default async function SchedulePage() {
  requireFeature("eventSchedule"); // 404s when hidden / outside its states

  return (
    <NotReadyGate
      feature="eventSchedule"
      title="Schedule"
      message="The weekend timetable is still being finalised."
    >
      {/* …page content… */}
    </NotReadyGate>
  );
}
```

`requireFeature()` is the routability guard; `<NotReadyGate>` is the rollout gate. A `coming-soon` page resolves but shows the overlay instead of its content.

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
Items with a `feature` field are filtered out by `useSiteState().isLive()` before rendering (both desktop `NavigationMenu`, mobile drawer and footer sitemap), so `coming-soon` pages never appear in the navigation.

Homepage quick links list every feature but only `live` ones navigate: coming-soon and hidden pages render as disabled "Soon" pills, so visitors never land on a 404 or a half-built page. `useSiteState().isRoutable()` is available when a link should stay clickable through to the overlay instead.

#### Checking a feature in a client component

```tsx
import { useSiteState } from "@/components/client/SiteStateProvider";

export function SomeWidget() {
  const { isLive } = useSiteState();
  if (!isLive("ticketRegistration")) return null;
  // …render ticket UI…
}
```

### 6) Adding a New Feature

1. Add the feature name to the `Feature` union in `lib/site-state/types.ts`.
2. Add a row to `FEATURE_MATRIX` in `lib/site-state/feature-matrix.ts` with the states that enable it.
3. Add its rollout status to `ROLLOUT_STATUS` in `lib/site-state/rollout.ts` (`coming-soon` until the content ships).
4. Use `requireFeature("…")` in any gated `page.tsx`, wrap the content in `<NotReadyGate feature="…">`, and use `isLive("…")` / `isRoutable("…")` in client components.
5. When the content is ready, flip the rollout status to `live`.

### 7) Changing State

| Environment                   | How                                                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GitHub Pages (deployment)** | Set the `WEBSITE_STATE` GitHub Actions repository variable. The static export bakes the state in, so changing it requires a new deployment (no runtime override).         |
| **Local development**         | Set `WEBSITE_STATE` in `2027/.env.local`, then restart `pnpm dev`. The `DevSiteStateSwitcher` dropdown in the navbar previews other states client-side without a restart. |
| **Unset**                     | `WEBSITE_STATE` falls back to `"D"` (Dormant) with a console warning: evergreen features stay enabled and everything else 404s.                                           |

### 8) Design Decisions

| Decision                                                   | Rationale                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server-side config, not `web_staff` backend**            | `web_staff` (PHP) and `web_client` (Next.js) run on isolated Docker networks with no API bridge. An env var + container restart achieves the same with zero new infrastructure.                                                                                                  |
| **Env var over hardcoded constant**                        | `output: "standalone"` means `process.env` is read fresh per request — changing state requires a restart, not a full rebuild. `ACTIVE_THEME` follows the same pattern: resolved at request time via `getActiveThemeKey()` (with dev-cookie override), not a build-time constant. |
| **Route-level blocking (`notFound`), not just hidden nav** | Direct URL access to disabled pages returns 404 — users cannot bookmark and revisit a gated route after the state changes.                                                                                                                                                       |
| **Dev override via cookie, not React state alone**         | The dev override must be readable by Server Components (`requireFeature`), which can only read cookies (`next/headers`), not React context.                                                                                                                                      |
| **Context over zustand for client state**                  | The state is effectively a constant within a running instance (changes ~6×/year). Zustand adds boilerplate for no benefit here; Context mirrors the existing `ThemeProvider` pattern.                                                                                            |
| **Rollout status separate from the lifecycle matrix**      | The lifecycle decides _which phase_ exposes a page; the rollout decides _whether the page is finished_. Keeping them apart means content work never edits the matrix, and a phase change never accidentally publishes an unfinished page.                                        |
| **Coming-soon pages resolve instead of 404**               | Homepage quick links point at pages that are still being built. Resolving them keeps the marketing structure intact and shows the "under construction" overlay instead of a dead end.                                                                                            |

### 9) Evidence

- `web_client/2027/lib/site-state/types.ts`
- `web_client/2027/lib/site-state/feature-matrix.ts`
- `web_client/2027/lib/site-state/rollout.ts`
- `web_client/2027/components/server/layout/NotReadyGate.tsx`
- `web_client/2027/components/server/layout/NotReadyOverlay.tsx`
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
