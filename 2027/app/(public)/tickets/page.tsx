import Image from "next/image";
import Link from "next/link";
import RegistrationBoard from "@/components/server/registration/RegistrationBoard";
import RegistrationFaq from "@/components/server/registration/RegistrationFaq";
import RegistrationUnderline from "@/components/server/registration/RegistrationUnderline";
import RegistrationTierCard, {
  type RegistrationTier,
} from "@/components/server/registration/RegistrationTierCard";
import ScrollToTopButton from "@/components/client/layout/ScrollToTopButton";
import RegistrationTierCarousel from "@/components/client/registration/RegistrationTierCarousel";
import PageHero from "@/components/server/layout/PageHero";
import ThemedBanner from "@/components/server/themed/ThemedBanner";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

// Placeholder shared by every tier until the live per-tier forms are ready.
const REGISTRATION_FORM_URL = "https://forms.gle/ticket-registration";

const tiers: RegistrationTier[] = [
  {
    id: "wanderer",
    name: "Wanderer",
    price: "RM 80.00",
    description:
      "For those who want to experience the magic of the garden without the extra frills. Comes with all the essentials to make your visit memorable.",
    card: "/2027_images/registration_page/tiers/1_wanderer/card.svg",
    icon: "/2027_images/registration_page/tiers/1_wanderer/icon.svg",
    formUrl: REGISTRATION_FORM_URL,
    sections: [
      {
        title: "What's included",
        items: [
          { label: "Poster & Conbook", level: 1 },
          { label: "Button Badge", level: 1 },
          { label: "Lanyard (BAHpals A)", level: 1 },
        ],
      },
    ],
  },
  {
    id: "gardener",
    name: "Gardener",
    price: "RM 220.00",
    description:
      "For those who wish to help the garden flourish. Filled with extras to make your experience even more magical.",
    card: "/2027_images/registration_page/tiers/2_garderner/card.svg",
    icon: "/2027_images/registration_page/tiers/2_garderner/icon.svg",
    formUrl: REGISTRATION_FORM_URL,
    sections: [
      {
        title: "Goodies for Supporters",
        items: [
          { label: "Poster & Conbook", level: 1 },
          { label: "Button Badge", level: 1 },
        ],
      },
      {
        title: "What's more?",
        items: [
          { label: "Lanyard (BAHpals S)", level: 2 },
          { label: "BAH 2027 T-shirt", level: 2 },
          { label: "BAH 2027 Sticker Pack", level: 2 },
        ],
      },
    ],
  },
  {
    id: "caretaker",
    name: "Caretaker",
    price: "RM 350.00",
    description:
      "Everything a wanderer needs, plus access to all the hidden wonders of the garden. Our most magical tier for the ultimate fans.",
    card: "/2027_images/registration_page/tiers/3_caretaker/card.svg",
    icon: "/2027_images/registration_page/tiers/3_caretaker/icon.svg",
    formUrl: REGISTRATION_FORM_URL,
    sections: [
      {
        title: "Goodies for Supporters",
        items: [
          { label: "Poster & Conbook", level: 1 },
          { label: "Button Badge", level: 1 },
          { label: "Lanyard (BAHpals SS)", level: 2 },
          { label: "BAH 2027 T-shirt", level: 2 },
          { label: "BAH 2027 Sticker Pack", level: 2 },
        ],
      },
      {
        title: "What's more?",
        items: [
          { label: "BAH 2027 Exclusive Apron", level: 3 },
          { label: "BAH 2027 Limited Edition Acrylic Standee Box", level: 3 },
        ],
      },
    ],
  },
];

export default function TicketsPage() {
  requireFeature("ticketRegistration");

  return (
    <div className="themed-home registration-page flex flex-1 flex-col">
      <PageHero
        eyebrow="Registration"
        title="Registration"
        description="Choose your role in the Tinyverse Garden."
        showDescription
        titleClassName="text-4xl font-bold md:text-5xl"
      />

      <section
        className="registration-invitation"
        aria-labelledby="invitation-title"
      >
        <ThemedBanner
          id="invitation-title"
          title="Join the Tea Party!"
          subtitle="Our Story"
          className="registration-banner"
        />

        <RegistrationBoard>
          <p className="registration-board-invited">You have been invited!</p>
          <RegistrationUnderline />
          <p>
            Join Sean &amp; Aminah in their Tinyverse Garden Adventure! Whether
            you are a wanderer, a gardener, or a garden caretaker &mdash; your
            story starts here.
          </p>
          <p className="registration-board-entry">
            All passes grant a 2-day entry (10&ndash;11 July 2027) to the event.
          </p>
          <p className="registration-board-note">
            Note: Upon clicking the buttons of any tier, you will be redirected
            to a dedicated Google Forms page to complete the registration &amp;
            payment. Upon registration, you are deemed to have read and agreed
            to be bound to our{" "}
            <Link href="/terms-and-conditions">Event Rules and T&amp;C</Link>.
          </p>

          <h2 className="registration-tiers-title">Hops to see you there!</h2>
          <RegistrationTierCarousel
            items={tiers.map((tier) => (
              <RegistrationTierCard key={tier.id} tier={tier} />
            ))}
          />
        </RegistrationBoard>

        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/2.5-flower-1.svg",
          )}
          alt=""
          width={368}
          height={349}
          className="registration-flower registration-flower-1"
        />
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/2.5-flower-2.svg",
          )}
          alt=""
          width={309}
          height={272}
          className="registration-flower registration-flower-2"
        />
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/2.5-flower-2.svg",
          )}
          alt=""
          width={309}
          height={272}
          className="registration-flower registration-flower-3"
        />
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/2.5-flower-1.svg",
          )}
          alt=""
          width={368}
          height={349}
          className="registration-flower registration-flower-4"
        />
      </section>

      <section
        className="registration-faq-section"
        aria-labelledby="registration-faq-title"
      >
        <ThemedBanner
          id="registration-faq-title"
          title="Registration FAQ"
          className="registration-banner"
        />
        <RegistrationFaq />
        <p className="registration-faq-note">
          *For more information, please{" "}
          <Link href="/about#contact">contact us here</Link>.
        </p>
      </section>

      <ScrollToTopButton />
    </div>
  );
}
