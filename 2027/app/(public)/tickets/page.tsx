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
import { TicketStatusProvider } from "@/components/client/registration/TicketStatus";
import PageHero from "@/components/server/layout/PageHero";
import ThemedBanner from "@/components/server/themed/ThemedBanner";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

const tiers: RegistrationTier[] = [
  {
    id: "wanderer",
    name: "Wanderer",
    price: "RM 80.00",
    description:
      "Every great adventure begins with a single step. Wander into the Tinyverse and discover the wonders hidden among the leaves.",
    card: "/2027_images/registration_page/tiers/1_wanderer/card.svg",
    icon: "/2027_images/registration_page/tiers/1_wanderer/icon.svg",
    sections: [
      {
        title: "Obtainable Boons",
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
      "Get your hands dirty and help the little wonders of the garden flourish. There’s always something new to discover when you venture a little deeper.",
    card: "/2027_images/registration_page/tiers/2_gardener/card.svg",
    icon: "/2027_images/registration_page/tiers/2_gardener/icon.svg",
    sections: [
      {
        title: "Obtainable Boons",
        items: [
          { label: "Poster & Conbook", level: 1 },
          { label: "Button Badge", level: 1 },
        ],
      },
      {
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
      "Every little wonder needs someone to look after it. Embark on a deeper adventure and help keep the magic of Tinyverse Garden alive.",
    card: "/2027_images/registration_page/tiers/3_caretaker/card.svg",
    icon: "/2027_images/registration_page/tiers/3_caretaker/icon.svg",
    sections: [
      {
        title: "Obtainable Boons",
        items: [
          { label: "Poster & Conbook", level: 1 },
          { label: "Button Badge", level: 1 },
          { label: "Lanyard (BAHpals SS)", level: 2 },
          { label: "BAH 2027 T-shirt", level: 2 },
          { label: "BAH 2027 Sticker Pack", level: 2 },
        ],
      },
      {
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
          <h3 className="registration-board-invited">You have been invited!</h3>
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
          <TicketStatusProvider>
            <RegistrationTierCarousel
              items={tiers.map((tier) => (
                <RegistrationTierCard key={tier.id} tier={tier} />
              ))}
            />
          </TicketStatusProvider>
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
