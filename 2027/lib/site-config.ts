// =============================================================================
// SITE CONFIGURATION — active theme + lifecycle state
// =============================================================================
// Single top-level place to configure this deployment's theme and website
// lifecycle state. Both are read from environment variables so shipping a
// new year's build (or previewing a different lifecycle stage) only
// requires editing `.env.local`, never source code.
//
//   SITE_THEME     — theme key from `lib/theme/themes.ts` (e.g. "2027")
//   WEBSITE_STATE  — lifecycle state code:
//                       D   | Dormant
//                       T   | Teaser
//                       A   | Announcement & Ticket Posting
//                       TO  | Ticket Registration Opens
//                       RC  | Account Creation & Registration Close
//                       FIR | Final Information Release
//
// See `.env.example` for a template. Each falls back to a safe default (with
// a console warning) if its env var is unset or invalid.
//
// This module is `server-only` — resolved once at module init on the
// server. Client Components never import it directly; they receive the
// resolved values via props/context instead (see `ThemeProvider` and
// `SiteStateProvider` in `app/layout.tsx`).
// =============================================================================

import "server-only";
import { parseThemeKey, type ThemeKey } from "./theme/themes";
import { parseSiteState, type SiteState } from "./site-state/types";

const DEFAULT_THEME: ThemeKey = "2027";
const DEFAULT_SITE_STATE: SiteState = "D";

function resolveActiveTheme(): ThemeKey {
  const raw = process.env.SITE_THEME;
  const parsed = parseThemeKey(raw);

  if (parsed) {
    return parsed;
  }

  if (raw) {
    console.warn(
      `[site-config] Unknown SITE_THEME "${raw}" — falling back to "${DEFAULT_THEME}".`,
    );
  }

  return DEFAULT_THEME;
}

function resolveSiteState(): SiteState {
  const raw = process.env.WEBSITE_STATE;
  const parsed = parseSiteState(raw);

  if (parsed) {
    return parsed;
  }

  if (raw) {
    console.warn(
      `[site-config] Unknown WEBSITE_STATE "${raw}" — falling back to "${DEFAULT_SITE_STATE}" (Dormant). ` +
        `Valid values: D, T, A, TO, RC, FIR.`,
    );
  } else {
    console.warn(
      `[site-config] WEBSITE_STATE is not set — defaulting to "${DEFAULT_SITE_STATE}" (Dormant).`,
    );
  }

  return DEFAULT_SITE_STATE;
}

/** Change the `SITE_THEME` env var to switch the site's colors + font. */
export const ACTIVE_THEME: ThemeKey = resolveActiveTheme();

/** Change the `WEBSITE_STATE` env var to switch the site's lifecycle stage. */
export const ACTIVE_SITE_STATE: SiteState = resolveSiteState();
