// =============================================================================
// SITE STATE RESOLVER
// =============================================================================
// `getSiteState()` returns the lifecycle state from `ACTIVE_SITE_STATE` in
// `./site-config.ts`.  `isFeatureEnabled(feature, state?)` checks the
// feature matrix — call it in Server Components and route guards without
// importing client code.
// =============================================================================

import { ACTIVE_SITE_STATE } from "@/lib/site-config";
import { FEATURE_MATRIX } from "./feature-matrix";
import { isRolloutLive, isRolloutRoutable } from "./rollout";
import type { Feature, SiteState } from "./types";

/**
 * Returns the active website lifecycle state.
 *
 * In production the env var / `ACTIVE_SITE_STATE` constant is the sole
 * source of truth.
 */
export function getSiteState(): SiteState {
  return ACTIVE_SITE_STATE;
}

/**
 * Returns `true` when `feature` is enabled in the given `state`.
 *
 * @param feature  The feature to check.
 * @param state    The state to check against (defaults to `getSiteState()`).
 */
export function isFeatureEnabled(feature: Feature, state?: SiteState): boolean {
  const s = state ?? getSiteState();
  return (FEATURE_MATRIX[feature] as readonly SiteState[]).includes(s);
}

/**
 * Returns `true` when the page is finished and enabled for the given state.
 * Only live features are linked in the navigation and rendered in full.
 */
export function isFeatureLive(feature: Feature, state?: SiteState): boolean {
  return isRolloutLive(feature, state ?? getSiteState());
}

/**
 * Returns `true` when the route resolves. Coming-soon pages still resolve so
 * they can render the "under construction" overlay instead of a 404.
 */
export function isFeatureRoutable(
  feature: Feature,
  state?: SiteState,
): boolean {
  return isRolloutRoutable(feature, state ?? getSiteState());
}
