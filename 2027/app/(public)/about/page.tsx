import { requireFeature } from "@/lib/site-state/require-feature";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import PageHero from "@/components/server/layout/PageHero";
import SocialLinks from "@/components/server/layout/SocialLinks";
import { withBasePath } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Yellow pill badge — "Our Community" / "Our Mascots"                */
/* ------------------------------------------------------------------ */
function PillBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-brand-accent text-primary-foreground font-caption inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Placeholder image – replace src with real assets when available   */
/* ------------------------------------------------------------------ */
function PlaceholderImg({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-foreground/25 font-caption px-2 text-center text-xs">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Overlapping circular "photo" used in the community collage.        */
/*  Mirrors the reference design's teal-ringed circular snapshots.    */
/* ------------------------------------------------------------------ */
function CirclePhoto({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-card border-brand-bg relative shrink-0 overflow-hidden rounded-full border-4 shadow-md ${className}`}
    >
      <div className="flex aspect-square items-center justify-center">
        <PlaceholderImg label={label} />
      </div>
    </div>
  );
}

type Mascot = {
  name: string;
  species: string;
  description: string;
  /* Temporary placeholder – replace with real assets when available */
  image: string;
  actionLabel?: string;
};

const mascots: Mascot[] = [
  {
    name: "Sean",
    species: "Bornean Ferret Badger",
    image: "/2027_images/Sean.png",
    description:
      "Meet Sean, the adventurous Bornean Ferret Badger! Curious, cheerful, and always ready to explore, Sean embodies the spirit of discovery that makes Borneo Anthro Hub so special. With his boundless energy and warm smile, he welcomes everyone to join the fun.",
  },
  {
    name: "Aminah",
    species: "Rhinoceros Hornbill",
    image: "/2027_images/Aminah.png",
    description:
      "Graceful and wise, Aminah the Rhinoceros Hornbill represents the beauty of Borneo's wildlife. As Sarawak's state bird, she carries the pride of the region. With her warm heart and nurturing nature, Aminah ensures every guest feels at home.",
  },
];

/* ------------------------------------------------------------------ */
/*  Mascot card — framed artwork + species / name / description.       */
/*  Side-by-side white cards like the reference layout.                */
/* ------------------------------------------------------------------ */
function MascotCard({ mascot }: { mascot: Mascot }) {
  return (
    <article className="bg-card border-border overflow-hidden rounded-2xl border shadow-sm">
      {/* Artwork — tinted backdrop with soft decorative discs */}
      <div className="bg-brand-bg/10 relative aspect-square overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-brand-accent/25 absolute -top-12 -right-12 h-36 w-36 rounded-full"
        />
        <div
          aria-hidden="true"
          className="bg-brand-secondary/20 absolute -bottom-12 -left-12 h-36 w-36 rounded-full"
        />
        <Image
          src={withBasePath(mascot.image)}
          alt={`${mascot.name}, the ${mascot.species} mascot`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {/* Copy */}
      <div className="p-5 md:p-6">
        <span className="text-brand-secondary font-caption text-xs font-bold tracking-wide uppercase">
          {mascot.species}
        </span>
        <h3 className="font-heading text-foreground mt-1 text-2xl">
          {mascot.name}
        </h3>
        <p className="text-foreground/70 font-body mt-2 text-sm leading-relaxed md:text-base">
          {mascot.description}
        </p>
        {mascot.actionLabel && (
          <button
            type="button"
            className="bg-brand-secondary text-secondary-foreground font-caption mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-full px-5 py-2 text-sm font-bold transition-opacity hover:opacity-90"
          >
            {mascot.actionLabel}
            <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  requireFeature("aboutUs");

  return (
    <div className="flex flex-1 flex-col" id="organization">
      {/* ============================================================ */}
      {/*  HERO — matches the shared PageHero used across the site     */}
      {/* ============================================================ */}
      <PageHero
        eyebrow="About"
        title="About Us"
        description="Get to know us more!"
      />

      {/* ============================================================ */}
      {/*  OUR COMMUNITY — pale panel, story left + photo collage right */}
      {/* ============================================================ */}
      <section className="bg-background scroll-mt-16 px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-brand-subtle rounded-3xl p-6 sm:p-8 md:p-12">
            {/* Section heading */}
            <div className="mb-6 flex flex-col items-start gap-3">
              <PillBadge>Our Community</PillBadge>
              <h2 className="font-heading text-foreground text-2xl md:text-3xl">
                Our Story
              </h2>
            </div>

            {/* Quote */}
            <blockquote className="text-foreground/80 font-body border-brand-accent mb-8 border-l-4 py-2 pl-4 text-lg leading-relaxed italic md:text-xl">
              &ldquo;A welcoming local hub built for connection, joy, and
              Bornean warmth.&rdquo;
            </blockquote>

            {/* Body + overlapping photo circles */}
            <div className="grid gap-10 md:grid-cols-5 md:items-center">
              {/* Text column */}
              <div className="space-y-4 md:col-span-3">
                <p className="text-foreground/80 font-body text-sm leading-relaxed md:text-base">
                  As a furry convention established in Sabah, the name{" "}
                  &lsquo;BAH&rsquo; carries our promise to our furry friends
                  across Borneo &mdash; a welcoming and inclusive
                  &lsquo;hub&rsquo; for all to gather and have a meaningful and
                  enjoyable experience, serving as a bridge to connect with what
                  and who matters the most to us. While upholding the concept of
                  building a convention made by locals, for locals, we also
                  welcome the rest of the world with open arms and a unique
                  Bornean charm to experience a one-of-a-kind furry convention
                  with a local twist like never before.
                </p>
                <p className="text-foreground/80 font-body text-sm leading-relaxed md:text-base">
                  It began with the idea of bringing the fun and joy of a furry
                  convention to celebrate with local furs who are unable to
                  travel abroad to attend one. With that in mind, Borneo Anthro
                  Hub provides a safe place for local furs to expand their
                  horizons to connect with more furs around the world! We hope
                  that when you hear our local friends utter the phrase
                  &ldquo;jom BAH!&rdquo;, you&rsquo;ll not only be reminded of
                  the meaningful and nostalgic memories made, but also the
                  moments when you&rsquo;re greeted with the warm hospitality in
                  the Land Below the Wind.
                </p>
              </div>

              {/* Photo column — overlapping circles (reference layout) */}
              <div className="flex items-center justify-center md:col-span-2 md:justify-end">
                <CirclePhoto
                  label="Community"
                  className="h-28 w-28 -rotate-6 md:h-32 md:w-32"
                />
                <CirclePhoto
                  label="Meetups"
                  className="z-10 -ml-8 h-36 w-36 md:-ml-10 md:h-44 md:w-44"
                />
                <CirclePhoto
                  label="Celebration"
                  className="-ml-8 h-24 w-24 rotate-6 md:-ml-10 md:h-28 md:w-28"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CONTACT US — yellow card below the story                     */}
      {/* ============================================================ */}
      <section
        id="contact"
        className="bg-background scroll-mt-16 px-4 pb-12 md:px-8 md:pb-20"
      >
        <div className="mx-auto w-full max-w-5xl">
          <div className="bg-brand-accent text-primary-foreground max-w-md rounded-2xl p-6 shadow-md md:p-8">
            <span className="font-caption text-primary-foreground/70 text-xs font-bold tracking-wide uppercase">
              Contact Us
            </span>
            <h2 className="font-heading text-primary-foreground mt-1 mb-4 text-xl md:text-2xl">
              Let&rsquo;s Get in Touch
            </h2>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href="mailto:admin@borneoanthrohub.com"
                className="text-primary-foreground/90 font-body hover:text-primary-foreground inline-flex items-center gap-2 text-sm transition-colors md:text-base"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>admin@borneoanthrohub.com</span>
              </a>

              {/* Location */}
              <div className="text-primary-foreground/90 font-body inline-flex items-center gap-2 text-sm md:text-base">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Kota Kinabalu, Sabah, Malaysia</span>
              </div>

              {/* Social */}
              <div className="text-primary-foreground/90 font-body inline-flex items-center gap-2 text-sm">
                <span className="font-caption shrink-0 font-bold">
                  @BorneoAnthroHub
                </span>
                <SocialLinks linkClassName="text-primary-foreground/80 hover:text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MEET OUR MASCOTS — wide gold pill + side-by-side cards       */}
      {/* ============================================================ */}
      <section
        id="mascots"
        className="bg-background scroll-mt-16 px-4 pb-14 md:px-8 md:pb-24"
      >
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10 flex justify-center">
            <PillBadge className="px-7 py-2 text-sm">Our Mascots</PillBadge>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {mascots.map((mascot) => (
              <MascotCard key={mascot.name} mascot={mascot} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
