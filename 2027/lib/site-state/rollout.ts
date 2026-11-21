// =============================================================================
// ROLLOUT STATUS — is this page ready for the public yet?
// =============================================================================
// `feature-matrix.ts` answers "does this feature belong to the active
// lifecycle state?".  This module answers a different question: "is the page
// finished?".  The two are independent, so a page can belong to the active
// state while its content is still being written.
//
//   live        → listed in the navigation and renders normally.
//   coming-soon → hidden from the navigation (still reachable), and the
//                 page renders the "under construction" overlay.
//   hidden      → unlisted everywhere and the route 404s.
//
// Flip a status here as content lands — no page code needs to change.
// =============================================================================

import { FEATURE_MATRIX } from "./feature-matrix";
import type { Feature, SiteState } from "./types";

export type RolloutStatus = "live" | "coming-soon" | "hidden";

/**
 * Current rollout status of every feature.
 *
 * The 2027 soft launch (Announcement) only exposes the pages that are
 * content-complete: the landing page, tickets, policies, event info, and
 * Travel Info.
 */
export const ROLLOUT_STATUS: Record<Feature, RolloutStatus> = {
  // ---- Live ---------------------------------------------------------------
  aboutUs: "live",
  activities: "live",
  ticketRegistration: "live",
  venue: "live",
  travelInformation: "live",
  codeOfConduct: "live",
  termsAndConditions: "live",

  // ---- Coming soon (route renders the overlay) ----------------------------
  themeLandingPage: "coming-soon",
  guestOfHonor: "coming-soon",
  foodGuide: "coming-soon",
  destinations: "coming-soon",
  eventSchedule: "coming-soon",
  boothListing: "coming-soon",
  dealerLayout: "coming-soon",
  panelSubmission: "coming-soon",
  dealerSubmission: "coming-soon",

  // ---- Hidden for the 2027 rollout ---------------------------------------
  // BAHjet and the whole Contribution section wait for a later phase.
  bahjetGuide: "hidden",
  volunteerApplication: "hidden",
  artSubmission: "hidden",

  // ---- Reserved for 2028 (never routable in 2027) -------------------------
  login: "hidden",
  accountCreation: "hidden",
  profileEditing: "hidden",
  badgePickupSelection: "hidden",
};

export function getRolloutStatus(feature: Feature): RolloutStatus {
  return ROLLOUT_STATUS[feature];
}

function lifecycleEnabled(feature: Feature, state: SiteState): boolean {
  return (FEATURE_MATRIX[feature] as readonly SiteState[]).includes(state);
}

/**
 * `true` when the page is finished *and* belongs to the active lifecycle
 * state — i.e. when it may be linked in the navigation and rendered in full.
 */
export function isRolloutLive(feature: Feature, state: SiteState): boolean {
  return (
    getRolloutStatus(feature) === "live" && lifecycleEnabled(feature, state)
  );
}

/**
 * `true` when the route resolves.  Coming-soon pages resolve so visitors get
 * the "under construction" overlay instead of a 404.
 */
export function isRolloutRoutable(feature: Feature, state: SiteState): boolean {
  const status = getRolloutStatus(feature);
  if (status === "hidden") return false;
  if (status === "coming-soon") return true;
  return lifecycleEnabled(feature, state);
}
