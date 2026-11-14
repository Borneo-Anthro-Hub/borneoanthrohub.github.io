// =============================================================================
// SHARED (YEAR-NEUTRAL) ARTWORK
// =============================================================================
// Everything under `public/shared_images/` is reused by every year's build.
// The content that makes up the venue, BAHjet Guide and clans pages is
// static — it does not change between conventions — so only the theme
// (colors + fonts, see `lib/theme/themes.ts`) changes from year to year.
//
// When adding art here:
//   * pick illustrations that are not tied to a single year's key visual,
//   * keep them legible on any theme's card surface (the shared surfaces are
//     light in every current theme),
//   * name the file after what it shows, never after the year it was drawn.
//
// Year-specific artwork stays in `public/<year>_images/` and is referenced
// from the theme config instead.
// =============================================================================

export const sharedArt = {
  venue: {
    horizonHotel: "/shared_images/venue/horizon-hotel.webp",
    iconEHailing: "/shared_images/venue/icon-e-hailing.svg",
    iconAirportTaxi: "/shared_images/venue/icon-airport-taxi.svg",
    iconDriving: "/shared_images/venue/icon-driving.svg",
    arrivalStepKfc: "/shared_images/venue/arrival-hall-3-step-1.webp",
    arrivalStepWalk: "/shared_images/venue/arrival-hall-3-step-2.webp",
    arrivalStepPillar: "/shared_images/venue/arrival-hall-3-step-3.webp",
    pickupRoute: "/shared_images/venue/pickup-route-map.webp",
  },
  bahjet: {
    coverArt: "/shared_images/bahjet/bahjet-guide-art.webp",
    iconRestaurants: "/shared_images/bahjet/icon-restaurants.svg",
    iconHotel: "/shared_images/bahjet/icon-hotel.svg",
    iconMalls: "/shared_images/bahjet/icon-malls.svg",
    iconDestinations: "/shared_images/bahjet/icon-destinations.svg",
  },
  clans: {
    shamans: "/shared_images/clans/clan-shamans.svg",
    totemBearers: "/shared_images/clans/clan-totem-bearers.svg",
  },
  travel: {
    flightPath: "/shared_images/travel/flight-path.webp",
  },
} as const;
