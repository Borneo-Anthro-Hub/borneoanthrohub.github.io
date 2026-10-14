// =============================================================================
// WEBSITE LIFECYCLE STATE — TYPES
// =============================================================================
// Maps to the lifecycle states defined in docs/codebase/Temporarily/
//   01-website-lifecycle.md
//   03-feature-matrix.md
//
// 2027 SCOPE: Features marked with † (2028) are reserved for the 2028
// full-stack release. They are set to [] in feature-matrix.ts.
// =============================================================================

/**
 * Website lifecycle state code.
 *
 * | Code | Name                           |
 * | ---- | ------------------------------ |
 * | D    | Dormant                        |
 * | T    | Teaser                         |
 * | A    | Announcement & Ticket Posting  |
 * | TO   | Ticket Registration Opens      |
 * | RC   | Account Creation & Registration Close |
 * | FIR  | Final Information Release      |
 */
export type SiteState = "D" | "T" | "A" | "TO" | "RC" | "FIR";

/** Human-readable label for each state. Used by dev-switcher UI. */
export const SITE_STATE_LABELS: Record<SiteState, string> = {
  D: "Dormant",
  T: "Teaser",
  A: "Announcement & Ticket Posting",
  TO: "Ticket Registration Opens",
  RC: "Account Creation & Registration Close",
  FIR: "Final Information Release",
};

/**
 * Every feature / page group that can be toggled per state.
 * One entry per row in the feature-availability matrix.
 *
 * Features marked with † are reserved for 2028 (static-only in 2027).
 */
export type Feature =
  | "aboutUs"
  | "codeOfConduct"
  | "termsAndConditions"
  | "volunteerApplication"
  | "themeLandingPage"
  | "venue"
  | "guestOfHonor"
  | "activities"
  | "travelInformation"
  | "bahjetGuide"
  | "foodGuide"
  | "destinations"
  | "artSubmission"
  | "accountCreation" // † 2028
  | "login" // † 2028
  | "ticketRegistration"
  | "profileEditing" // † 2028
  | "badgePickupSelection" // † 2028
  | "dealerSubmission"
  | "panelSubmission"
  | "dealerLayout"
  | "boothListing"
  | "eventSchedule";

/**
 * Validates that a string is a known SiteState code.
 * Returns the typed code or null.
 */
export function parseSiteState(raw: string | undefined): SiteState | null {
  if (!raw) return null;
  const upper = raw.toUpperCase().trim();
  if (["D", "T", "A", "TO", "RC", "FIR"].includes(upper)) {
    return upper as SiteState;
  }
  return null;
}
