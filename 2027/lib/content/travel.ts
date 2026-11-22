// =============================================================================
// TRAVEL INFORMATION PAGE CONTENT
// =============================================================================
// Static copy for `/travel`, transcribed from the 2026 International
// Travellers Guide. Immigration rules and payment options change far less
// often than the convention theme, so this page is reused every year — only
// `lib/theme/themes.ts` decides how it looks.
// =============================================================================

import { sharedArt } from "./shared-art";

export interface InfoGroup {
  title: string;
  points: readonly string[];
  links?: readonly { label: string; href: string }[];
}

export interface InfoCard {
  title: string;
  points: readonly string[];
}

export const travelPage = {
  hero: {
    eyebrow: "Getting Here",
    title: "Travel Information",
    description:
      "Everything an international BAHpal needs to know before flying into Kota Kinabalu.",
  },

  intro: {
    title: "The Land Below the Wind",
    paragraphs: [
      "Welcome to Sabah, one of the states of East Malaysia — known as The Land Below the Wind thanks to its relatively calm tropical climate, rainforests, diverse wildlife, mountain landscapes, and remote islands.",
      "This guide mixes official tourism resources, travel guides, and mostly experiences from locals and international visitors who have explored Sabah. Unlike major urban areas, getting around here generally involves longer journeys.",
      "While we aim to keep things accurate and practical, travel conditions, transportation options, and accessibility may vary depending on the season — so treat this as a starting point and take extra care with the rest of your planning.",
    ],
    art: {
      src: sharedArt.travel.flightPath,
      alt: "Illustrated flight path with a bird flying towards the right",
      width: 1711,
      height: 255,
    },
  },

  entry: {
    eyebrow: "Entry & Visa",
    title: "Entry and visa requirements",
    groups: [
      {
        title: "West Malaysians & locals",
        points: [
          "Local Malaysians departing from West Malaysia do not need a visa to enter Sabah or Sarawak, but must pass through immigration checks on arrival and departure.",
          "This applies to all statewide airports in Sabah and Sarawak — Kota Kinabalu (BKI), Sandakan (SDK), Kuching (KCH), Sibu (SBW), and others.",
          "MyKad or MyKid (NRIC) is required for the check; a passport is optional but also accepted.",
          "The Immigration Officer will issue a Journey / Visit Pass Slip granting up to 90 days of stay. Keep the slip — it is required when exiting the state.",
        ],
      },
      {
        title: "Foreign nationals",
        points: [
          "Check whether your country falls under visa-exempt or visa-required before booking your flights.",
          "Most foreign nationals can visit Malaysia for short-term tourism purposes, and many visa-exempt passports allow up to 90 days.",
          "ASEAN member states are generally allowed visa-free entry for 30 days (Myanmar: 14 days). Stays beyond one month require a visa, except for Brunei and Singapore nationals.",
          "EU member states typically receive up to 90 days under standard visa-exemption policy.",
          "Travellers from visa-required countries can apply through the online eVISA / MyVISA portal, or at a Malaysian embassy or consulate abroad.",
          "Some countries only allow visas if you enter by air, and travellers arriving from countries with health risks may need a valid Yellow Fever Vaccination Certificate.",
        ],
        links: [
          {
            label: "Check eligible countries",
            href: "https://embassymalaysia.nl/list-of-countries-that-need-a-visa-to-enter-malaysia/",
          },
        ],
      },
      {
        title: "Passport validity & MDAC",
        points: [
          "Passports must be valid for at least six months on arrival.",
          "All travellers — except Singapore citizens — must complete the Malaysia Digital Arrival Card (MDAC), which can be submitted online up to three days before arrival.",
        ],
        links: [
          {
            label: "Complete the MDAC",
            href: "https://imigresen-online.imi.gov.my/mdac/main",
          },
        ],
      },
    ] satisfies readonly InfoGroup[],
  },

  customs: {
    eyebrow: "Customs",
    title: "Customs declarations",
    points: [
      "All dutiable or prohibited goods arriving in or leaving Malaysia must be declared at every entry and exit point.",
      "Pork products may not be brought in or out of the state, due to disease control.",
      "Under environmental protection laws, fresh produce may not be brought into the state.",
      "You may not carry more than USD 10,000 (or its equivalent in cash or bearer negotiable instruments) in or out of Malaysia without written approval from Bank Negara Malaysia.",
      "Failing to declare is an offence: penalties run up to RM3 million, up to five years' imprisonment, or both.",
    ] satisfies readonly string[],
  },

  logistics: {
    eyebrow: "Logistics",
    title: "Logistics and travel information",
    cards: [
      {
        title: "Transit via KLIA",
        points: [
          "KLIA Terminal 1 serves Malaysia Airlines (MH) and Firefly (FY); KLIA Terminal 2 serves AirAsia (AK) and other low-cost carriers.",
          "Transiting on the same airline usually means luggage is checked through — head straight to the transit or domestic transfer area.",
          "You may still be asked to re-clear immigration or security depending on current local procedures.",
          "On different airlines, you will usually need to collect your baggage, change terminals, and check in again.",
          "Always allow enough transit time in case of a rescheduled or delayed flight.",
        ],
      },
      {
        title: "Travel reminders",
        points: [
          "Your destination airport is Kota Kinabalu International Airport (KKIA) — IATA: BKI, ICAO: WBKK.",
          "Sabah runs on GMT+8, so set your clocks accordingly; all flight times are quoted in this timezone.",
          "For return local flights, arrive 2 to 3 hours in advance; for international flights, 3 to 4 hours.",
          "Power sockets are Type-G, running at 240V / 50Hz.",
        ],
      },
    ] satisfies readonly InfoCard[],
    warning:
      "Please refrain from bringing in any form of fresh produce (vegetables and fruit) or animal products and food waste (frozen delicacies, canned animal products). You will be asked to declare them or bin them.",
  },

  payments: {
    eyebrow: "Money",
    title: "Payments and cash",
    cards: [
      {
        title: "Cash & ATMs",
        points: [
          "Cash remains widely accepted, especially at smaller shops, hawker stalls, and night markets.",
          "ATMs are available in malls, petrol stations, and banks. Most accept Visa, MasterCard, or UnionPay, and some support AMEX and JCB.",
          "Watch out for withdrawal fees or card-network switching fees when using foreign cards.",
          "ATMs generally dispense RM50 or RM100 notes, with withdrawal limits varying between banks.",
        ],
      },
      {
        title: "E-wallets & cashless",
        points: [
          "Touch 'n Go eWallet and Boost are the most common local e-wallets, widely accepted at retail stores, parking lots, and food stalls.",
          "GrabPay and ShopeePay are commonly used at restaurants, cafes, and supermarkets.",
          "Some e-wallets require a Malaysian bank account for credit top-ups.",
          "Most major shops and supermarkets accept debit or credit cards and support DuitNow QR, Malaysia's unified QR payment system.",
        ],
      },
    ] satisfies readonly InfoCard[],
  },

  relatedGuides: {
    title: "Ready for the city itself?",
    lead: "Once you have landed, the venue guide covers transfers from KKIA and where to park.",
    links: [
      { label: "Venue Guide", href: "/venue", feature: "venue" },
      { label: "BAHjet Guide", href: "/bahjet-guide", feature: "bahjetGuide" },
    ],
  },
} as const;
