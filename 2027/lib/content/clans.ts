// =============================================================================
// BAH CLANS ENROLLMENT PAGE CONTENT
// =============================================================================
// Static copy for `/contribution` — the two clans (panelists and volunteers)
// and their FAQ. Deadlines and forms move each year, so the copy stays
// year-neutral ("opens closer to the convention") and the layout stays
// theme-driven; update this file only when the rules or perks change.
// =============================================================================

import { sharedArt } from "./shared-art";

export interface Clan {
  id: string;
  name: string;
  role: string;
  icon: string;
  intro: string;
  paragraphs: readonly string[];
  termsLabel: string;
  termsHref: string;
  status: string;
}

export interface ClanFaq {
  question: string;
  answer: string;
}

export const clansPage = {
  hero: {
    eyebrow: "Join the Team",
    title: "BAH Clans Enrollment",
    description:
      "Wanna be a part of us to make things even more BAHsome? Join a BAH clan today!",
  },

  recruit: {
    eyebrow: "Recruitment",
    title: "How enrollment works",
    paragraphs: [
      "Recruitment for the BAH team opens closer to the convention. If you would like to be part of the crew that makes the festival happen — whether behind the scenes or on the ground — keep an eye on this page or follow us on social media for announcements.",
      "When recruitment opens, applications are handled through our external forms. No prior experience is needed — just a positive attitude and a willingness to help.",
    ],
  },

  clans: [
    {
      id: "shamans",
      name: "The Shamans",
      role: "Panelists",
      icon: sharedArt.clans.shamans,
      intro:
        "The clan of the Shamans is well known for its wisdom and the unique talents of its members in various fields, and plays a key role in defining the myriad of programmes we will experience and enjoy during the festival.",
      paragraphs: [
        "If you have a passion for sharing skills or experiences — whether it is about fursuiting, art, performance, fandom culture, or other creative topics — this is your chance to connect with fellow friends and spark engaging discussions. Both experienced speakers and first-time panelists are welcome.",
        "Let's be the change we want by sharing the knowledge we need.",
      ],
      termsLabel: "Panelist Registration T&C",
      termsHref:
        "https://docs.google.com/document/d/1-i-UD9C4_nMaesIpqhu4F7saUWx-kTo6bpjSllY4Aus/",
      status: "Opens closer to the convention",
    },
    {
      id: "totem-bearers",
      name: "The Totem Bearers",
      role: "Volunteers",
      icon: sharedArt.clans.totemBearers,
      intro:
        "The Totem Bearers are the force and the beating heart of BAH, who have sworn to act as our sword and shield to ensure that the festival runs smoothly so that all BAHpals may enjoy it to the best.",
      paragraphs: [
        "The Totem Bearers play the role of volunteers who support various parts of the event, from assisting attendees and managing activity areas to helping behind the scenes with event operations.",
        "No prior experience is needed — just a positive attitude and willingness to help. Be a part of our team and help our local con grow. Your help means the world to us.",
      ],
      termsLabel: "Volunteer Registration T&C",
      termsHref:
        "https://docs.google.com/document/d/1SMAefoAYJglk8pkhnrZnNHEj55AXFt6dX_nLdM67rAI/",
      status: "Opens closer to the convention",
    },
  ] satisfies readonly Clan[],

  faq: {
    eyebrow: "Clans Enrollment FAQ",
    panelistGroupLabel: "Panelist",
    volunteerGroupLabel: "Volunteer",
    panelist: [
      {
        question: "Who can register as a Panelist?",
        answer:
          "Anyone may do so! We welcome any topics to be discussed, as long as you have a valid admission ticket for the current edition of BAH. A Panelist tag or sticker (or a similar form of identification) will also be given to you on the respective Collection Day.",
      },
      {
        question: "Does submitting a form guarantee a panel spot?",
        answer:
          "No. Panel submissions are manually reviewed and selected after discussion, and no guarantees are promised. Accepted panelists will be notified by email, subject to schedule and venue availability. Please provide sufficient or detailed information which would help us get to know more about your topic during the manual review process.",
      },
      {
        question: "Do I get to schedule or pick a venue for my panel?",
        answer:
          "Changes may be discussed, but all adjustments (time and venue) will be determined based on our availability to cater the proposed changes, if available.",
      },
      {
        question: "What are my responsibilities as a Panelist?",
        answer:
          "As a panelist, you are responsible for providing accurate and truthful information, ensuring panel content is lawful and respectful, and managing panel attendees fairly, ethically, and without discrimination.",
      },
      {
        question: "Can I collect personal data during my panel?",
        answer:
          "Yes, but not recommended. Should you choose to do so, you must ensure full compliance with the Personal Data Protection Act 2010 (PDPA 2010) and the Personal Data Protection (Amendment) Act 2024. As long as proper notice and consent are provided by attendees, you may collect data for lawful purposes — never to misuse or sell, nor to retain data longer than necessary. Borneo Anthro Hub assumes no legal liability for your data collection activities; you are solely responsible for ensuring notice and consent, and any legal consequences arising from your collection, use, or retention of data shall be borne entirely by you.",
      },
      {
        question: "Who owns the content created for a panel?",
        answer:
          "You retain FULL ownership of your content, but grant us a non-exclusive, royalty-free license to host, store, and display the content for archival or operational purposes.",
      },
      {
        question:
          "Will BAH be responsible for disputes, losses, or claims related to my panel?",
        answer:
          "No. BAH will not be responsible or liable for any disputes, misuse, indirect or consequential claims, or damages arising from panel activities or breaching of rules. In the event that your panel violates any rules, BAH reserves the right to suspend your panel or restrict panelist access without prior notice.",
      },
      {
        question:
          "Got concerns that are not covered in either the Guide or the FAQ Section?",
        answer:
          "You may write in to us at admin@borneoanthrohub.com and we will address it as soon as possible.",
      },
    ] satisfies readonly ClanFaq[],
    volunteer: [
      {
        question: "Who can apply as a Volunteer?",
        answer:
          "Any valid attendee of any tier (BAHpals A/S/SS) who wishes to lend a helping hand may register as a Volunteer for the convention. A separate instruction will be given to you to collect your identification.",
      },
      {
        question: "Does applying guarantee a selection?",
        answer:
          "No. Volunteer applications are manually reviewed and selected based on availability and suitability. Accepted volunteers will be notified by email with further details listed.",
      },
      {
        question: "Do I get a pick on my role or schedule for my duty?",
        answer:
          "BAH may assign or adjust roles, duty schedules, or work locations based on operational needs. Changes and arrangements can be discussed if needed (if available). However, in any case, volunteers are recommended to be on standby and contactable in case of any urgent needs.",
      },
      {
        question: "What are my responsibilities as a Volunteer?",
        answer:
          "As a volunteer, you are expected to perform assigned duties responsibly and professionally, treat all attendees, other volunteers, and direct or indirect staff respectfully and fairly, always uphold a safe, inclusive, and non-discriminatory environment, and be punctual, contactable, and on standby (if reasonably available) for unforeseen emergencies.",
      },
      {
        question: "Can my Volunteer role be terminated?",
        answer:
          "Yes. BAH reserves the right to reassign, suspend, or terminate roles without prior notice if rules are breached or conduct is inappropriate, and to remove volunteers who fail to follow instructions or disrupt event operations. BAH will also not be liable for personal disputes, losses, or damages arising from volunteer duties outside assigned duties or hours.",
      },
      {
        question: "Will Volunteers get anything?",
        answer:
          "Perks and incentives are not guaranteed and the items may vary year by year. However, we may offer a little gift as thanks for your helpful assistance, time, and effort during the convention operation.",
      },
    ] satisfies readonly ClanFaq[],
  },
} as const;
