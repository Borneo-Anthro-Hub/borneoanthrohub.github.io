// =============================================================================
// VENUE PAGE CONTENT
// =============================================================================
// Static copy for `/venue`. The convention has been held at Horizon Hotel
// Kota Kinabalu since its first edition, so this page is content-complete
// and is reused every year — only the theme in `lib/theme/themes.ts` decides
// how it looks. Edit this file only when the venue or travel details change.
// =============================================================================

import { sharedArt } from "./shared-art";

const HOTEL_WEBSITE = "https://horizonhotelsabah.com/";
const GOOGLE_MAPS = "https://maps.app.goo.gl/YD1BeyjAbpKy7z498";

export const venuePage = {
  hero: {
    eyebrow: "Location",
    title: "Venue",
    description:
      "Horizon Hotel, Kota Kinabalu — where all BAHpals share the joy under the same horizon.",
  },

  venue: {
    eyebrow: "The Venue",
    title: "Where all BAHpals share the joy under the same horizon",
    image: {
      src: sharedArt.venue.horizonHotel,
      alt: "Horizon Hotel Kota Kinabalu welcome card, room, hotel exterior, and its swimming pool, gym, and dining floors",
      width: 604,
      height: 690,
    },
    imageCaption:
      "* Image is for creative visualisation purposes only, and does not represent any items or objects that will be seen within the premises or offered to guests by the hotel during their stay. The “Horizon Hotel” logo and photographs belong to Horizon Hotel Kota Kinabalu.",
    paragraphs: [
      "In the heart of Kota Kinabalu's commercial and cultural district lies the very place where all BAHpals fill the air with their merriment and zest during the grand festival — Horizon Hotel. As a premier 4-star destination equipped with a state-of-the-art gymnasium, a terrace pool, and a fine selection of restaurants, Horizon Hotel offers an ideal blend of urban convenience and scenic tranquillity.",
      "BAHpals will surely find it a pleasant and ideal experience to be in a furcon that has access to major shopping malls like Suria Sabah. Adventurous BAHpals looking for more than just a conventional furcon experience would also certainly be rewarded with a bountiful journey during their stay in Sabah, with even more additional possibilities to explore at nearby popular destinations outside of BAH such as Gaya Street. The best part? All that, within walking distance!",
    ],
    links: [
      { label: "Hotel Website", href: HOTEL_WEBSITE },
      { label: "View on Google Maps", href: GOOGLE_MAPS },
    ],
  },

  gettingThere: {
    eyebrow: "Getting There",
    title: "How do I get there?",
    lead: "If you are a BAHpal flying into Sabah from somewhere else, you will land at Terminal 1 of KKIA (Kota Kinabalu International Airport). From there, these are the ways to reach Horizon Hotel.",
    options: [
      {
        id: "e-hailing",
        title: "E-hailing",
        icon: sharedArt.venue.iconEHailing,
        intro:
          "Using e-hailing services is one of the main ways to get around here. The Grab or AirAsia MOVE apps are among the more popular services used within Kota Kinabalu.",
        facts: [
          "Pick-up point: you may use KFC KKIA (T1) or the Airport Cafe KKIA, as there are no enforced designated waiting stations in KKIA.",
          "For Grab: walk to Arrival Hall 3 and pick Pillar No. 5, then follow the instructions in the app.",
        ],
      },
      {
        id: "airport-taxi",
        title: "Airport Taxis",
        icon: sharedArt.venue.iconAirportTaxi,
        intro:
          "Another option is to book a taxi at the airport. These taxis are operated officially by the airport, so look for the designated counter, pay upfront (fixed price), and receive one based on their available schedule.",
        facts: [
          "Fares are fixed and guaranteed, but subject to traffic conditions and availability.",
          "If you are approached by individuals offering taxi or private car services, do not engage with them — they may be unlicensed or scam operators.",
        ],
      },
      {
        id: "driving",
        title: "Driving",
        icon: sharedArt.venue.iconDriving,
        intro:
          "Someone enjoys a relaxing road trip! Driving is a good option if you have access to a car, live nearby, or plan to rent one to explore Kota Kinabalu at your own pace.",
        facts: [
          "Use a trustworthy navigation app — the drive is straightforward, but a first visit can be confusing.",
          "Parking at the hotel accepts cashless payments only (credit or debit card).",
          "Be sure you have enough fuel before setting off!",
        ],
      },
    ],
  },

  arrivalWalkthrough: {
    eyebrow: "Step by Step",
    title: "Aminah's guide to finding Arrival Hall 3",
    lead: "Landing at KKIA Terminal 1 and calling a ride? Here is the walk from the arrival gates to the Grab pick-up point.",
    steps: [
      {
        title: "Exit through the side door by KFC",
        body: "Once you clear security in Arrival Hall 1 or 2, turn left and head towards the KFC. Exit through the side door in front, towards the outer section of the airport.",
        image: {
          src: sharedArt.venue.arrivalStepKfc,
          alt: "Airport arrivals area with KFC and the side door highlighted",
          width: 1281,
          height: 961,
        },
      },
      {
        title: "Walk past the eateries",
        body: "Keep walking past the food outlets and head all the way down towards Arrival Hall 3.",
        image: {
          src: sharedArt.venue.arrivalStepWalk,
          alt: "Walkway past the airport eateries with a direction arrow",
          width: 1281,
          height: 961,
        },
      },
      {
        title: "Find Pillar 5",
        body: "You will see Pillar 5 — Within Sabah Arrivals — on your right. Select that as your pick-up spot in the app.",
        image: {
          src: sharedArt.venue.arrivalStepPillar,
          alt: "Pillar 5 sign for Within Sabah Arrivals at the airport pick-up area",
          width: 1281,
          height: 961,
        },
      },
      {
        title: "Confirm the route with your driver",
        body: "Your driver should arrive along the route shown. Keep an eye on the app for the exact pick-up point and vehicle details.",
        image: {
          src: sharedArt.venue.pickupRoute,
          alt: "Map showing the route from Kota Kinabalu International Airport to Horizon Hotel",
          width: 591,
          height: 387,
        },
      },
    ],
  },

  parking: {
    eyebrow: "By Car",
    title: "Sean's guide to parking at Horizon Hotel",
    steps: [
      {
        title: "Search the right destination",
        body: "Search “Horizon Hotel Kota Kinabalu” on Google Maps or your preferred navigation app and make sure it is the correct location. If you are using Google Maps, we recommend “Malaysia Monument” in front of the hotel as the destination so the car park is easier to find.",
      },
      {
        title: "Locate the car park entrance",
        body: "The car park entrance is adjacent to Deco Café & Grill, indicated by the “Car Park” signs.",
      },
      {
        title: "Pay cashless and validate your card",
        body: "Rate: RM5.00 per entry. Only cashless payments (credit or debit card) are accepted. Validate your entry card at Reception before leaving to secure the flat rate.",
      },
    ],
  },

  nearbyGuidePrompt: {
    title: "Wondering what else to do nearby?",
    lead: "Don't want to face the million-dollar question of “where to eat today ah?” from your friend, or wondering what else you can do besides staying in your hotel room? Our BAHjet Guide has you covered.",
    links: [
      { label: "Open the BAHjet Guide", href: "/bahjet-guide" },
      { label: "Travel Information", href: "/travel" },
    ],
  },
} as const;
