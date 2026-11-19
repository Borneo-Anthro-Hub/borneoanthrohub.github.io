/**
 * Copy + artwork for the About page (`/about`).
 *
 * The page is laid out as a scrapbook: a parchment "community" board with the
 * story and contact details, then a mascot showcase whose gallery and plaque
 * swap between Sean and Aminah.
 */

export interface AboutArtwork {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const aboutStory = {
  banner: { title: "Our Community", subtitle: "Our Story" },
  quote: "A welcoming local hub built for connection, joy, and Bornean warmth.",
  paragraphs: [
    "As a furry convention established in Sabah, the name ‘BAH’ carries our promise to our furry friends across Borneo — a welcoming and inclusive ‘hub’ for all to gather and have a meaningful and enjoyable experience, serving as a bridge to connect with what and who matters the most to us. While upholding the concept of building a convention made by locals, for locals, we also welcome the rest of the world with open arms and a unique Bornean charm to experience a one-of-a-kind furry convention with a local twist like never before.",
    "It began with the idea of bringing the fun and joy of a furry convention to celebrate with local furs who are unable to travel abroad to attend one. With that in mind, Borneo Anthro Hub provides a safe place for local furs to expand their horizons to connect with more furs around the world! We hope that when you hear our local friends utter the phrase “jom BAH!”, you’ll not only be reminded of the meaningful and nostalgic memories made, but also the moments when you’re greeted with the warm hospitality in the Land Below the Wind.",
  ],
};

export const aboutContact = {
  heading: "Contact Us",
  subheading: "Let’s Get in Touch!",
  email: "admin@borneoanthrohub.com",
  location: "Kota Kinabalu, Sabah, Malaysia",
  handle: "@BorneoAnthroHub",
};

export interface AboutMascot {
  id: string;
  name: string;
  species: string;
  description: string;
  art: AboutArtwork;
}

export const aboutMascots: AboutMascot[] = [
  {
    id: "sean",
    name: "Sean",
    species: "Bornean Ferret Badger",
    description:
      "Meet Sean, the spirited mascot of BAH’s furry convention — a lively Bornean Ferret Badger who embodies the warmth and charm of Borneo. Sean welcomes all furs with open paws, inviting everyone to join the fun, friendship, and unique local flair that make our convention truly special.",
    art: {
      src: "/2027_images/about/sean_ref.webp",
      alt: "Sean the Bornean Ferret Badger, front and back reference artwork",
      width: 1600,
      height: 1014,
    },
  },
  {
    id: "aminah",
    name: "Aminah",
    species: "Rhinoceros Hornbill",
    description:
      "Say hello to Aminah, the graceful Rhinoceros Hornbill whose feathers carry the colours of Sarawak. Perched proudly as BAH’s second mascot, Aminah brings wisdom, elegance, and a nurturing spirit — always ready to welcome every guest to the Land Below the Wind.",
    art: {
      src: "/2027_images/about/aminah_ref.webp",
      alt: "Aminah the Rhinoceros Hornbill, front and back reference artwork",
      width: 1600,
      height: 1014,
    },
  },
];

/** Community-member photo reused across the scrapbook snapshots. */
export const aboutCommunityPhoto: AboutArtwork = {
  src: "/2027_images/about/furwalk_photo.webp",
  alt: "BAHpals gathered for a group photo at the furwalk",
  width: 1600,
  height: 900,
};
