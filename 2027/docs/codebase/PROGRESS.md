# Progress Log — Frontend Scaffolding & Content Fill (July 2026)

> **What was accomplished:** Replaced 4 stale static stubs with 22 feature-gated placeholder pages organised into Next.js route groups, added full error-handling hierarchy, and back-filled 11 pages with adapted content from the BAH 2026 static site.

---

## Phase 5 — 2027 Static Scope Refinement (July 2026)

### What changed

Per the 2027 static-website scope change, auth/account/ticket features were disabled and all documentation was updated:

| Area                       | Change                                                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Feature Matrix**         | `login`, `accountCreation`, `ticketRegistration`, `profileEditing`, `badgePickupSelection` set to `[]` (never available) — reserved for 2028 |
| **Submission Pages**       | Art, Dealer, and Panel submission pages now display Google Form links instead of ComingSoon placeholders                                     |
| **(auth) Route Group**     | `login/page.tsx` and `register/page.tsx` remain as shells — they 404 in all states since features are `[]`                                   |
| **(attendee) Route Group** | `profile`, `tickets`, `badge-pickup` pages 404 in all states. `dealer-submission` and `panel-submission` now show Google Form links          |
| **Documentation**          | All 5 Temporarily docs + 3 codebase docs updated to reflect static-only 2027 scope                                                           |

---

## Phase 1 — Route Restructuring

### Problem

The app had 4 hand-written `.html`-style stubs (`/contact`, `/gallery`, `/schedule`, `/team`) with no feature gating. These didn't align with the feature-availability matrix in `lib/site-state/feature-matrix.ts`.

### What changed

| Before                                                       | After                                                             |
| ------------------------------------------------------------ | ----------------------------------------------------------------- |
| Flat `app/` directory with un-gated pages                    | Three route groups: `(public)`, `(auth)`, `(attendee)`            |
| 4 stale stubs (`/contact`, `/gallery`, `/schedule`, `/team`) | 22 feature-gated pages + 4 `[slug]`/`[id]` detail pages           |
| No `requireFeature()` guards                                 | Every page calls `await requireFeature("…")` — 404s when disabled |
| No route group layouts                                       | Each group has its own `layout.tsx`                               |

### Route group layouts

| Group                   | Layout Role                                            |
| ----------------------- | ------------------------------------------------------ |
| `(public)/layout.tsx`   | Pass-through — inherits root Header/Footer             |
| `(auth)/layout.tsx`     | Centered card, no chrome — clean UX for login/register |
| `(attendee)/layout.tsx` | Pass-through — placeholders for future `requireAuth`   |

### Full route map

```
app/
├── page.tsx                          ← / (home)
├── layout.tsx                        ← root layout
├── global-error.tsx                  ← catches root layout crashes
├── error.tsx                         ← segment-level error boundary
├── not-found.tsx                      ← custom 404
│
├── (public)/
│   ├── layout.tsx
│   ├── error.tsx
│   ├── about/page.tsx                ← aboutUs (all states)
│   ├── code-of-conduct/page.tsx      ← codeOfConduct (all states)
│   ├── terms-and-conditions/page.tsx ← termsAndConditions (all states)
│   ├── contribution/page.tsx         ← volunteerApplication (all states)
│   ├── theme/page.tsx                ← themeLandingPage (T+)
│   ├── venue/page.tsx                ← venue (T+)
│   ├── guest-of-honor/page.tsx       ← guestOfHonor (T+)
│   ├── travel/page.tsx               ← travelInformation (T+)
│   ├── bahjet-guide/page.tsx         ← bahjetGuide (T+)
│   ├── food-guide/page.tsx           ← foodGuide (T+)
│   ├── destinations/page.tsx         ← destinations (T+)
│   ├── activities/
│   │   ├── page.tsx                  ← activities (A+)
│   │   └── [slug]/page.tsx           ← activities (A+) — detail
│   ├── art-submission/page.tsx       ← artSubmission (T, A)
│   ├── schedule/
│   │   ├── page.tsx                  ← eventSchedule (FIR)
│   │   └── [slug]/page.tsx           ← eventSchedule (FIR) — detail
│   ├── dealer-layout/page.tsx        ← dealerLayout (FIR)
│   └── booth-listing/
│       ├── page.tsx                  ← boothListing (FIR)
│       └── [slug]/page.tsx           ← boothListing (FIR) — detail
│
├── (auth)/
│   ├── layout.tsx
│   ├── error.tsx
│   ├── login/page.tsx                ← login (all states)
│   └── register/page.tsx             ← accountCreation (A only)
│
└── (attendee)/
    ├── layout.tsx
    ├── error.tsx
    ├── profile/page.tsx              ← profileEditing (A, TR)
    ├── tickets/
    │   ├── page.tsx                  ← ticketRegistration (TR)
    │   └── [id]/page.tsx             ← ticketRegistration (TR) — detail
    ├── badge-pickup/page.tsx         ← badgePickupSelection (FIR)
    ├── dealer-submission/page.tsx    ← dealerSubmission (RC)
    └── panel-submission/page.tsx     ← panelSubmission (RC)
```

---

## Phase 2 — Error Handling

### Files created (6)

| File                       | Scope               | Behaviour                                            |
| -------------------------- | ------------------- | ---------------------------------------------------- |
| `app/global-error.tsx`     | Root layout crash   | Standalone `<html>`/`<body>` with retry button       |
| `app/not-found.tsx`        | 404 pages           | Links back to home, explains feature may be disabled |
| `app/error.tsx`            | Root segment errors | Preserves Header/Footer chrome                       |
| `app/(public)/error.tsx`   | Public pages        | Same chrome-preserving pattern                       |
| `app/(auth)/error.tsx`     | Auth pages          | Renders inside centered-card layout                  |
| `app/(attendee)/error.tsx` | Attendee pages      | Same chrome-preserving pattern                       |

### Error bubbling hierarchy

```
global-error.tsx          ← catches root layout itself
└── error.tsx             ← catches any route below root
    ├── (public)/error.tsx
    ├── (auth)/error.tsx
    └── (attendee)/error.tsx
```

---

## Phase 3 — Content Fill from BAH 2026

### Source

`docs/codebase/Temporarily/BAH_2026.md` — the previous year's static HTML site (`2026/` directory) transcribed into a reusable text reference document.

### Mapping

| Route                   | 2026 Source                     | Content adapted                                                           |
| ----------------------- | ------------------------------- | ------------------------------------------------------------------------- |
| `/about`                | `8_AboutUs.html`                | Tagline + full mission statement about the "hub for connection"           |
| `/venue`                | `3_Venue.html`                  | Horizon Hotel description, hotel website link, Google Maps link           |
| `/code-of-conduct`      | `9_guidelines.html`             | 10 guideline cards in a 2-column grid with numbered badges                |
| `/terms-and-conditions` | `11_Terms_Condition.html`       | Embedded Google Doc iframe                                                |
| `/contribution`         | `6_JoinUs.html` — Totem Bearers | Volunteer role description                                                |
| `/panel-submission`     | `6_JoinUs.html` — Shamans       | Panelist role description                                                 |
| `/travel`               | `32_TravelInfo.html`            | 4 sections: intro, visa requirements, customs, logistics                  |
| `/badge-pickup`         | `1_Ticket.html` FAQ Q4, Q8      | Badge customization + proxy collection info                               |
| `/tickets`              | `1_Ticket.html`                 | 3 tier cards (Attendee/Sponsor/SuperSponsor) + 5 FAQ items with Accordion |
| `/activities`           | `5_Activities.html`             | Event schedule description                                                |
| `/theme`                | Theme concept                   | Yearly theme explanation                                                  |

### Still placeholder (no 2026 source)

`/art-submission`, `/guest-of-honor`, `/bahjet-guide`, `/food-guide`, `/destinations`, `/dealer-submission`, `/dealer-layout`, `/booth-listing`, `/schedule`, `/login`, `/register`, `/profile`, all `[slug]`/`[id]` detail pages.

### Footer update

Added social links from BAH 2026 footer: **Facebook**, **X (Twitter)**, **Telegram** — opening in new tabs with `rel="noopener noreferrer"`.

---

## Phase 4 — Documentation Sync

Updated 6 documentation files to reflect the new route structure and conventions:

| File              | Key changes                                    |
| ----------------- | ---------------------------------------------- |
| `ARCHITECTURE.md` | Route examples, evidence paths                 |
| `STRUCTURE.md`    | Route groups, secondary pages description      |
| `CONCERNS.md`     | Stale "4 stubs" row → "22 feature-gated pages" |
| `SITE_STATE.md`   | Route paths, nav items example                 |
| `CONVENTIONS.md`  | Page file examples, error boundaries section   |
| `INTEGRATIONS.md` | Removed old route references                   |

---

## Build Verification

```
✓ Compiled successfully
✓ TypeScript: 0 errors
✓ Lint: 0 errors
✓ Routes: 28 (24 static + 4 dynamic)
```

---

## How to Test

```bash
cd web_client/2027
pnpm dev
```

Then use the **dev site-state switcher** (coloured dot dropdown in the header — only visible in dev mode) to toggle between:

| State                        | Nav items visible                               | Key testable pages                                  |
| ---------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| **D** (Dormant)              | Home, About, Login                              | `/about`, `/login` work; `/venue`, `/schedule` 404  |
| **T** (Teaser)               | Home, About, Venue, Login                       | `/venue`, `/theme`, `/art-submission` work          |
| **A** (Announcement)         | Activities, About, Venue, Login                 | `/register`, `/profile`, `/activities` work         |
| **TR** (Ticket Registration) | Home, About, Venue, Activities, Tickets, Login  | `/tickets`, `/profile` work; `/register` 404        |
| **RC** (Registration Closed) | Home, About, Venue, Activities, Login           | `/dealer-submission`, `/panel-submission` work      |
| **FIR** (Final Info Release) | Home, About, Venue, Activities, Schedule, Login | `/schedule`, `/badge-pickup`, `/dealer-layout` work |
