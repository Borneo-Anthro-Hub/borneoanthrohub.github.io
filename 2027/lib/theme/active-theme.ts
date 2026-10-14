// =============================================================================
// ACTIVE THEME RESOLVER
// =============================================================================
// Returns the active theme key and theme object. The single source of truth
// is `ACTIVE_THEME` in `./site-config.ts`.
//
// Client Components receive the resolved theme via props/context instead —
// see `components/client/ThemeProvider.tsx`.
// =============================================================================

import { ACTIVE_THEME } from "@/lib/site-config";
import { themes, type Theme, type ThemeKey } from "./themes";

/**
 * Returns the active `ThemeKey`. In production `ACTIVE_THEME` in
 * `site-config.ts` is the sole source of truth.
 */
export function getActiveThemeKey(): ThemeKey {
  return ACTIVE_THEME;
}

/**
 * Returns the full theme object for the currently active theme.
 *
 * Client Components should not import this — they receive the resolved
 * theme via props/context instead (see `ThemeProvider`).
 */
export function getActiveTheme(): Theme {
  return themes[ACTIVE_THEME];
}
