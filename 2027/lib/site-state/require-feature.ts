// =============================================================================
// ROUTE GUARD — requireFeature
// =============================================================================
// Drop this at the top of a page.tsx to 404 the route when the feature is
// not routable — either disabled for the current website lifecycle state or
// marked `hidden` in the rollout status (`lib/site-state/rollout.ts`).
//
// Usage:
//   import { requireFeature } from "@/lib/site-state/require-feature";
//   requireFeature("eventSchedule");  // calls notFound() if unroutable
//   export default function SchedulePage() { … }
// =============================================================================

import { notFound } from "next/navigation";
import { isFeatureRoutable } from "./get-site-state";
import type { Feature } from "./types";

/**
 * Guards a route: calls `notFound()` (HTTP 404) unless `feature` is routable
 * in the current website lifecycle state and rollout.
 *
 * Coming-soon features stay routable — pair the guard with
 * `<NotReadyGate>` so the page renders its overlay instead of real content.
 */
export function requireFeature(feature: Feature): void {
  if (!isFeatureRoutable(feature)) {
    notFound();
  }
}
