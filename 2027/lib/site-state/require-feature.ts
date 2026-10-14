// =============================================================================
// ROUTE GUARD — requireFeature
// =============================================================================
// Drop this at the top of a page.tsx to 404 the route when the feature is
// not enabled for the current website lifecycle state.
//
// Usage:
//   import { requireFeature } from "@/lib/site-state/require-feature";
//   requireFeature("eventSchedule");  // calls notFound() if disabled
//   export default function SchedulePage() { … }
// =============================================================================

import { notFound } from "next/navigation";
import { isFeatureEnabled } from "./get-site-state";
import type { Feature } from "./types";

/**
 * Guards a route: calls `notFound()` (HTTP 404) if `feature` is not enabled
 * in the current website lifecycle state.
 */
export function requireFeature(feature: Feature): void {
  if (!isFeatureEnabled(feature)) {
    notFound();
  }
}
