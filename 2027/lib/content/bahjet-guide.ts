// =============================================================================
// BAHJET GUIDE PAGE CONTENT
// =============================================================================
// Static scaffolding for `/bahjet-guide`: the introduction, the four guide
// categories, and the disclaimers. The guides themselves (restaurants,
// hotels, malls, destinations) are dynamic and live on their own routes.
//
// Reused every year — theme colors and fonts come from `lib/theme/themes.ts`.
// =============================================================================

import { sharedArt } from "./shared-art";

export const bahjetGuidePage = {
  hero: {
    eyebrow: "First-Time Flyer",
    title: "BAHjet Guide",
    description:
      "Where to eat, sleep, shop, and explore during your BAHjet holiday in Kota Kinabalu.",
  },

  intro: {
    title: "All of our recommendations, in one place",
    coverArt: {
      src: sharedArt.bahjet.coverArt,
      alt: "BAHjet Guide cover art with the BAH mascots on a tiny tropical island",
      width: 751,
      height: 650,
    },
    paragraphs: [
      "Don't know where to grab a quick bite before you miss your idol's performance at the dance panel? What is plan B if Horizon Hotel is fully booked and you don't want to burn a hole in your wallet?",
      "Want to make the most out of your trip to Kota Kinabalu rather than just loitering around at the festival? We understand your frustrations having to handle these issues during your furcon trip, and so we have got you covered — all of our recommendations, in one place, for your best BAHjet holiday ever!",
    ],
  },

  guides: {
    eyebrow: "The Guides",
    title: "Pick where to start",
    lead: "Four guides cover the practical half of your trip. They are updated as the festival approaches, so check back before you travel.",
    items: [
      {
        id: "restaurants",
        title: "Restaurants",
        icon: sharedArt.bahjet.iconRestaurants,
        description:
          "Quick bites near the venue, budget-friendly meals, and local Sabahan food worth planning your day around.",
        href: "/food-guide",
        cta: "Open the food guide",
      },
      {
        id: "hotels",
        title: "Hotels",
        icon: sharedArt.bahjet.iconHotel,
        description:
          "Staying beyond the convention hotel? There are many more options for accommodation, and most can be found easily on booking sites such as Booking.com, Agoda, and OYO.",
        status: "Hotel guide coming soon",
      },
      {
        id: "malls",
        title: "Malls",
        icon: sharedArt.bahjet.iconMalls,
        description:
          "Shopping, air-conditioning, and food courts — the malls around the venue are within walking distance of Horizon Hotel.",
        status: "Mall guide coming soon",
      },
      {
        id: "destinations",
        title: "Destinations",
        icon: sharedArt.bahjet.iconDestinations,
        description:
          "Make the most of Sabah — islands, markets, and day trips around Kota Kinabalu for the days before or after BAH.",
        href: "/destinations",
        cta: "Explore destinations",
      },
    ],
  },

  goodToKnow: {
    eyebrow: "Good to Know",
    title: "Before you head out",
    items: [
      {
        title: "Information may change",
        body: "All information displayed is for reference only and is not a guarantee of an establishment's status (vegetarian, pork-free, and so on). Establishments may change or update their information over time, and what is shown here may be outdated by the time you browse. Please verify via the establishment's official channels or contact the place directly.",
      },
      {
        title: "Getting around",
        body: "Grab and AirAsia MOVE are the most widely used e-hailing apps in Kota Kinabalu. During peak hours, allow extra time to reach the venue.",
      },
    ],
  },

  relatedGuides: {
    title: "Still planning the basics?",
    lead: "The venue and travel guides cover how to reach Horizon Hotel and what to prepare before flying in.",
    links: [
      { label: "Venue Guide", href: "/venue" },
      { label: "Travel Information", href: "/travel" },
    ],
  },
} as const;
