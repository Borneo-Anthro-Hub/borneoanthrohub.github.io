// =============================================================================
// SITE NAVIGATION — single source of truth
// =============================================================================
// Shared by Header (desktop dropdowns / mobile drawer) and Footer (sitemap
// columns) so nav structure only lives in one place.
// =============================================================================

import type { Feature } from "@/lib/site-state/types";

export type NavChild = { label: string; href: string; feature?: Feature };
export type NavItem = NavChild & { feature?: Feature; children?: NavChild[] };

export const navItems: ReadonlyArray<NavItem> = [
  {
    label: "About Us",
    href: "/about",
    feature: "aboutUs",
    children: [
      {
        label: "Organization",
        href: "/about#organization",
        feature: "aboutUs",
      },
      { label: "Contact", href: "/about#contact", feature: "aboutUs" },
      { label: "Mascots", href: "/about#mascots", feature: "aboutUs" },
    ],
  },
  {
    label: "Event Info",
    href: "/activities",
    feature: "activities",
    children: [
      { label: "Schedule", href: "/schedule", feature: "eventSchedule" },
      {
        label: "Dealer's Den",
        href: "/booth-listing",
        feature: "boothListing",
      },
      { label: "GOH", href: "/guest-of-honor", feature: "guestOfHonor" },
      { label: "Venue", href: "/venue", feature: "venue" },
    ],
  },
  {
    label: "Travel Guide",
    href: "/travel",
    feature: "travelInformation",
    children: [
      { label: "BAHjet", href: "/bahjet-guide", feature: "bahjetGuide" },
      { label: "Travel Info", href: "/travel", feature: "travelInformation" },
    ],
  },
  {
    label: "Contribution",
    href: "/contribution",
    feature: "volunteerApplication",
    children: [
      {
        label: "Conbook Art",
        href: "/art-submission",
        feature: "artSubmission",
      },
      {
        label: "Volunteer",
        href: "/contribution#volunteer",
        feature: "volunteerApplication",
      },
      {
        label: "Panelist",
        href: "/panel-submission",
        feature: "panelSubmission",
      },
      { label: "Dealer", href: "/dealer-layout", feature: "dealerLayout" },
      {
        label: "Recruit",
        href: "/contribution#recruit",
        feature: "volunteerApplication",
      },
    ],
  },
  {
    label: "Policies",
    href: "/code-of-conduct",
    feature: "codeOfConduct",
    children: [
      {
        label: "Code of Conduct",
        href: "/code-of-conduct",
        feature: "codeOfConduct",
      },
      {
        label: "Terms and Conditions",
        href: "/terms-and-conditions",
        feature: "termsAndConditions",
      },
    ],
  },
];
