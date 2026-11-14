"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  ChevronRight,
  CircleHelp,
  MapPin,
  Pause,
  Play,
  Ticket,
  User,
} from "lucide-react";
import Particles from "@/components/Particles";
import Section from "@/components/server/layout/Section";
import { useSiteState } from "@/components/client/SiteStateProvider";
import { withBasePath } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Brand copy — single source of truth for hero text repeated across every
// landing variant (Dormant / Teaser / Themed).
// ---------------------------------------------------------------------------

const BRAND_NAME = "Borneo Anthro Hub";
const BRAND_TAGLINE = "Where the wild meets wonderful";
const BRAND_LOCATION = "Kota Kinabalu · Sabah";
const EVENT_DAY_RANGE = "10 – 11";
const EVENT_MONTH_YEAR = "July 2027";
const ANIMATION_PREFERENCE_KEY = "bah-2027-hero-animations";
const ANIMATION_PREFERENCE_CHANGE_EVENT = "bah-animation-preference-change";
const MOBILE_HERO_QUERY = "(max-width: 767px)";

function subscribeToMobileHeroViewport(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia(MOBILE_HERO_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function isMobileHeroViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia(MOBILE_HERO_QUERY).matches
  );
}

function getAnimationPreference(): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedPreference = window.localStorage.getItem(
      ANIMATION_PREFERENCE_KEY,
    );
    return savedPreference === "true"
      ? true
      : savedPreference === "false"
        ? false
        : null;
  } catch (error) {
    console.error("Could not load the animation preference.", error);
    return null;
  }
}

function subscribeToAnimationPreference(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("storage", onChange);
  window.addEventListener(ANIMATION_PREFERENCE_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(ANIMATION_PREFERENCE_CHANGE_EVENT, onChange);
  };
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/** Minimal policy links active while the site is dormant. */
const evergreenLinks = [
  { label: "Code of Conduct", href: "/code-of-conduct" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

/** "What to do when I'm in Sabah?" — sub-question under the What column. */
const whatToDoButtons = [
  { label: "Food", href: "/food-guide" },
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/activities" },
  { label: "BAHjet Guide", href: "/bahjet-guide" },
];

/** "How to be a part of BAH!" — sub-question under the Where column. */
const contributeButtons = [
  { label: "Art Submission", href: "/art-submission", key: "art-submission" },
  { label: "Panelist", href: "/panel-submission", key: "panelist" },
  { label: "Volunteer", href: "/contribution", key: "volunteer" },
  { label: "Dealer's Den", href: "/booth-listing", key: "dealer" },
];

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

/** A pill-link button used in the question sections. */
function PillLink({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full border px-5 py-2 text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  );
}

/** "00 · Kota Kinabalu · Sabah" eyebrow shown above the hero title. */
function LocationBadge({
  showIndex = true,
  className = "mb-4",
}: {
  showIndex?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIndex && (
        <span className="border-border text-muted-foreground border px-1.5 py-0.5 font-mono text-[10px]">
          00
        </span>
      )}
      <p className="text-muted-foreground text-xs tracking-widest uppercase">
        {BRAND_LOCATION}
      </p>
    </div>
  );
}

/** Brand name + tagline, sized consistently across every hero variant. */
function BrandTitle({
  titleClassName = "mb-2",
  taglineClassName = "mb-8",
}: {
  titleClassName?: string;
  taglineClassName?: string;
}) {
  return (
    <>
      <h1
        className={`font-display text-brand-accent text-4xl md:text-5xl ${titleClassName}`}
      >
        {BRAND_NAME}
      </h1>
      <p
        className={`font-heading text-muted-foreground text-lg md:text-xl ${taglineClassName}`}
      >
        {BRAND_TAGLINE}
      </p>
    </>
  );
}

/** Event date badge ("29 – 30" + "February 2027" pill). */
function DateBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="text-center">
        <p className="font-display text-foreground text-4xl leading-none md:text-5xl">
          {EVENT_DAY_RANGE}
        </p>
      </div>
      <div className="bg-primary text-primary-foreground font-caption rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
        {EVENT_MONTH_YEAR}
      </div>
    </div>
  );
}

/** Bordered status/teaser card shared by the Dormant and Teaser heroes. */
function MessageCard({
  className = "max-w-md p-5",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border-border bg-card w-full rounded-lg border text-center ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dormant landing (no theme — evergreen only)
// ---------------------------------------------------------------------------

function DormantHome() {
  const prefersReducedMotion = useReducedMotion();
  const [animationOverride, setAnimationOverride] = useState<boolean | null>(
    null,
  );
  const savedAnimationPreference = useSyncExternalStore(
    subscribeToAnimationPreference,
    getAnimationPreference,
    () => null,
  );
  const animationsEnabled =
    animationOverride ?? savedAnimationPreference ?? !prefersReducedMotion;
  const isMobileViewport = useSyncExternalStore(
    subscribeToMobileHeroViewport,
    isMobileHeroViewport,
    () => false,
  );
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-1 flex-col">
      <button
        type="button"
        aria-label="Toggle animations"
        aria-pressed={animationsEnabled}
        onClick={() => {
          const nextPreference = !animationsEnabled;
          try {
            window.localStorage.setItem(
              ANIMATION_PREFERENCE_KEY,
              String(nextPreference),
            );
            setAnimationOverride(null);
            window.dispatchEvent(new Event(ANIMATION_PREFERENCE_CHANGE_EVENT));
          } catch (error) {
            console.error("Could not save the animation preference.", error);
            setAnimationOverride(nextPreference);
          }
        }}
        className="bg-background/55 text-foreground hover:bg-background/75 fixed right-4 bottom-4 z-[60] inline-flex items-center gap-2 rounded-full border border-white/35 px-3 py-2 text-sm font-medium shadow-lg shadow-black/10 backdrop-blur-md transition-colors"
      >
        {animationsEnabled ? (
          <Pause aria-hidden="true" className="size-4" />
        ) : (
          <Play aria-hidden="true" className="size-4" />
        )}
        Animations: {animationsEnabled ? "ON" : "OFF"}
      </button>
      <section
        ref={heroRef}
        className={`dormant-hero-parallax border-brand-surface/20 relative isolate min-h-[max(85svh,40rem)] overflow-hidden border-b md:min-h-[calc(90svh-4.25rem)] lg:min-h-[calc(100svh-4.25rem)] ${animationsEnabled ? "" : "animations-paused"}`}
      >
        <h1 className="sr-only">Tinyverse Garden</h1>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-[#78a7e8] via-[#a8e1f5] to-[#a7d98f]"
        />
        <div
          aria-hidden="true"
          className="dormant-hero-parallax-sky dormant-sky-layer absolute bottom-0 left-1/2 aspect-3960/2160 w-[140vw] max-w-none -translate-x-1/2 max-md:top-0 max-md:right-0 max-md:bottom-0 max-md:left-0 max-md:aspect-auto max-md:w-full max-md:translate-x-0 md:w-[120vw] lg:left-0 lg:w-full lg:translate-x-0"
        >
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/background_sky.webp",
            )}
            alt=""
            fill
            sizes="140vw"
            className="object-contain object-bottom max-md:object-cover max-md:object-[center_40%]"
          />
        </div>
        <div
          aria-hidden="true"
          className="dormant-hero-parallax-house absolute bottom-0 left-1/2 z-10 mx-auto aspect-3960/2160 w-[140vw] max-w-none -translate-x-1/2 md:w-[120vw] lg:left-0 lg:w-full lg:translate-x-0"
        >
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/background_house.webp",
            )}
            alt=""
            fill
            sizes="140vw"
            className="object-contain object-bottom"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 18%)",
            }}
          />
        </div>
        <div
          aria-hidden="true"
          className="dormant-hero-parallax-plants absolute bottom-0 left-1/2 z-20 mx-auto aspect-3960/2160 w-[140vw] max-w-none -translate-x-1/2 md:w-[120vw] lg:left-0 lg:w-full lg:translate-x-0"
        >
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/background_plants.webp",
            )}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="140vw"
            className="object-contain object-bottom"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black 18%)",
            }}
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[55]"
        >
          <Particles
            particleCount={96}
            particleSpread={10}
            speed={0.15}
            particleColors={["#164e63", "#0f766e", "#fff0a6"]}
            particleBaseSize={112}
            sizeRandomness={0.15}
            shape="sparkle"
            glow={0.6}
            twinkle={0.35}
            moveParticlesOnHover={false}
            clickBurst={false}
            drift="up"
            driftSpeed={0.55}
            disableRotation
            intro={false}
            opacity={0.95}
            paused={!animationsEnabled}
          />
        </div>
        <motion.div
          className="pointer-events-none absolute right-0 bottom-[-4px] z-50 aspect-[1.43] w-[92%] md:aspect-3960/2160"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            animate={animationsEnabled ? { y: [0, -8, 0] } : { y: 0 }}
            transition={
              animationsEnabled
                ? { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <picture className="absolute inset-0">
              <source
                media="(max-width: 767px)"
                srcSet={withBasePath(
                  "/2027_images/landscape_main_art_airashi/character_sean_and_aminah_mobile.webp",
                )}
              />
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/character_sean_and_aminah.webp",
                )}
                alt=""
                fill
                loading="eager"
                sizes="100vw"
                className="object-contain object-bottom"
              />
            </picture>
            <picture className="absolute bottom-0 left-[4%] aspect-[1.19] w-[26%] md:inset-0 md:aspect-auto md:w-full">
              <source
                media="(max-width: 767px)"
                srcSet={withBasePath(
                  "/2027_images/landscape_main_art_airashi/character_the_rat_mobile.webp",
                )}
              />
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/character_the_rat.webp",
                )}
                alt=""
                fill
                sizes="100vw"
                className="object-contain object-bottom"
              />
            </picture>
          </motion.div>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 z-40 bg-linear-to-b from-[#dff5ff]/15 via-[#7ccfe9]/5 to-[#0b261d]/30"
        />
        <div
          aria-hidden="true"
          className="animate-glow-pulse absolute top-8 left-1/2 z-40 h-48 w-48 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,244,199,0.3),transparent_70%)] md:h-72 md:w-72"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[30%] left-[12%] z-[45] text-2xl text-yellow-100/80 drop-shadow-[0_0_10px_rgb(255_244_199_/_70%)] md:top-[24%] md:left-[18%] md:text-3xl"
        ></div>

        <motion.div
          className="absolute top-[6%] left-[4%] z-[45] hidden w-[min(60vw,920px)] md:block"
          initial={false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex w-full flex-col items-center gap-2 md:items-start md:gap-3"
            animate={
              animationsEnabled && !isMobileViewport
                ? { y: [0, -5, 0] }
                : { y: 0 }
            }
            transition={
              animationsEnabled && !isMobileViewport
                ? { duration: 8, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <div className="flex w-full items-center justify-center gap-[3%] md:justify-start">
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/tinyverse.webp",
                )}
                draggable={false}
                alt=""
                width={1000}
                height={323}
                sizes="(max-width: 767px) 45vw, 29vw"
                className="h-auto w-[48%] select-none"
              />
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/garden.webp",
                )}
                draggable={false}
                alt=""
                width={850}
                height={275}
                sizes="(max-width: 767px) 39vw, 25vw"
                className="h-auto w-[42%]"
              />
            </div>
            <Image
              src={withBasePath(
                "/2027_images/landscape_main_art_airashi/date.webp",
              )}
              draggable={false}
              alt="10th–11th July 2027"
              width={1000}
              height={441}
              sizes="(max-width: 767px) 48vw, 26vw"
              className="h-auto w-[52%] max-w-[28rem] select-none md:ml-[18%]"
            />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute top-[-13%] left-1/2 z-[45] w-[min(84vw,340px)] -translate-x-1/2 md:hidden"
          animate={
            animationsEnabled && isMobileViewport
              ? { rotate: [0, -1, 1, 0] }
              : { rotate: 0 }
          }
          transition={
            animationsEnabled && isMobileViewport
              ? { duration: 9, repeat: Infinity, ease: "easeInOut" }
              : undefined
          }
        >
          <div className="relative aspect-[1707/2011] w-full">
            <Image
              src={withBasePath(
                "/2027_images/landscape_main_art_airashi/background_board.webp",
              )}
              alt=""
              fill
              sizes="(max-width: 767px) min(84vw, 340px)"
              className="object-contain"
            />
            <div className="absolute top-[55%] left-[-8%] flex h-[45%] w-[116%] flex-col items-center justify-center gap-[3%]">
              <motion.div
                className="flex w-full flex-1 items-center justify-center gap-[3%]"
                animate={
                  animationsEnabled && isMobileViewport
                    ? { y: [0, -4, 0] }
                    : { y: 0 }
                }
                transition={
                  animationsEnabled && isMobileViewport
                    ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
              >
                <Image
                  src={withBasePath(
                    "/2027_images/landscape_main_art_airashi/tinyverse.webp",
                  )}
                  draggable={false}
                  alt=""
                  width={1000}
                  height={323}
                  className="h-auto w-[52%] drop-shadow-[0_2px_5px_rgb(30_53_25_/_25%)] select-none"
                />
                <Image
                  src={withBasePath(
                    "/2027_images/landscape_main_art_airashi/garden.webp",
                  )}
                  alt=""
                  width={850}
                  height={275}
                  className="h-auto w-[44%] drop-shadow-[0_2px_5px_rgb(30_53_25_/_25%)]"
                />
              </motion.div>
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/date.webp",
                )}
                draggable={false}
                alt="10th–11th July 2027"
                width={1000}
                height={441}
                className="h-auto w-[58%] drop-shadow-[0_2px_5px_rgb(30_53_25_/_25%)] select-none"
              />
            </div>
          </div>
        </motion.div>
        <div
          aria-hidden="true"
          className="dormant-hero-glow pointer-events-none absolute inset-x-0 bottom-0 z-[60] h-16"
        />
      </section>

      {/* About Test*/}
      {/* <Section id="about" index="01" eyebrow="About">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            Borneo Anthro Hub (BAH) is a home-grown celebration of the anthro
            and furry community in Southeast Asia &mdash; a welcoming hub built
            for connection, joy, and Bornean warmth, right here in Kota
            Kinabalu, Sabah.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <FactChip>Kota Kinabalu · Sabah</FactChip>
            <FactChip>Anthro &amp; furry</FactChip>
            <FactChip>Community-driven</FactChip>
          </div>
          <div className="mt-7 flex justify-center gap-3">
            <PillLink label="About Us" href="/about" />
          </div>
        </div>
      </Section> */}

      {/* Get involved */}
      {/* <Section id="get-involved" index="02" eyebrow="Get Involved">
        <div className="border-brand-accent/30 from-brand-subtle relative mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-linear-to-br via-white to-white p-6 text-center md:p-8">
          <div
            aria-hidden="true"
            className="bg-brand-accent/10 absolute -top-16 -right-16 h-40 w-40 rounded-full blur-2xl"
          />
          <div className="relative">
            <span className="bg-brand-accent/15 text-brand-surface mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <Users className="h-6 w-6" />
            </span>
            <h3 className="font-heading text-xl md:text-2xl">
              A place for you when we wake up
            </h3>
            <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-relaxed">
              BAH is built by the community, for the community. When the next
              crew recruitment opens, there&rsquo;s a place for you &mdash; no
              prior experience needed, just a willingness to help.
            </p>
          </div>
        </div>
      </Section> */}

      {/* Policies */}
      {/* <Section id="policies" index="03" eyebrow="Policies">
        <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed">
          A safe, inclusive, and welcoming experience is at the heart of BAH.
          Please take a moment to read our community guidelines.
        </p>
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <PolicyCard
            icon={Shield}
            title="Code of Conduct"
            description="Our shared promise for a safe, inclusive, and harassment-free space — for attendees, artists, and fursuiters alike."
            href="/code-of-conduct"
          />
          <PolicyCard
            icon={FileText}
            title="Terms & Conditions"
            description="The fine print that keeps every visit smooth — registration, ticketing, venue rules, and more."
            href="/terms-and-conditions"
          />
        </div>
      </Section> */}

      {/* Stay connected */}
      {/* <Section id="connect" index="04" eyebrow="Stay Connected" noBorder>
        <div className="border-border bg-card mx-auto max-w-lg rounded-2xl border p-6 text-center md:p-8">
          <span className="bg-brand-subtle text-brand-surface mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <Send className="h-5 w-5" />
          </span>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Follow along for announcements, art, and community updates &mdash;
            and drop us a line anytime.
          </p>
          <div className="border-border bg-brand-subtle mt-6 inline-flex items-center justify-center gap-4 rounded-full border px-6 py-3">
            <SocialLinks linkClassName="text-brand-surface/70 transition-colors hover:text-brand-accent" />
          </div>
          <div className="mt-5">
            <a
              href="mailto:admin@borneoanthrohub.com"
              className="text-brand-accent inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:underline"
            >
              admin@borneoanthrohub.com
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Section> */}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Teaser landing (coming soon — theme announced, no convention details yet)
// ---------------------------------------------------------------------------

function ComingSoonHome() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero — name + date + teaser message, no venue image / full CTA */}
      <section className="border-border relative border-b px-4 pt-10 pb-8 md:px-8 md:pt-14 md:pb-12">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <LocationBadge showIndex={false} className="mb-1" />
          <BrandTitle titleClassName="mb-2" taglineClassName="mb-6" />

          {/* Date badge */}
          <DateBadge className="mb-8" />

          {/* Teaser message */}
          <MessageCard className="max-w-lg p-6">
            <p className="font-heading text-foreground mb-2 text-lg">
              Something&rsquo;s Coming
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The theme has been chosen and the team is hard at work. Full
              convention details — venue, guests, activities, and travel guides
              — will be revealed soon. Stay tuned!
            </p>
          </MessageCard>
        </div>
      </section>

      {/* Evergreen links */}
      <Section id="evergreen" index="01" eyebrow="Information">
        <p className="text-muted-foreground mx-auto mb-6 max-w-lg text-center text-sm leading-relaxed">
          Borneo Anthro Hub (BAH) is a home-grown celebration of the anthro and
          furry community in Southeast Asia — a weekend packed with panels, art,
          fursuiting, dances, and good vibes, right here in Kota Kinabalu,
          Sabah.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {evergreenLinks.map((link) => (
            <PillLink key={link.href} {...link} />
          ))}
        </div>
      </Section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Themed landing (Announcement onward)
// ---------------------------------------------------------------------------

function ThemedHome() {
  const quickCards = [
    {
      title: "What",
      subtitle: "is BAH?",
      icon: CircleHelp,
      links: [{ label: "About Us", href: "/about" }],
    },
    {
      title: "Where",
      subtitle: "is BAH held at?",
      icon: User,
      links: [
        { label: "Activities", href: "/activities" },
        { label: "How to Get There?", href: "/travel" },
      ],
    },
    {
      title: "What",
      subtitle: "to do in Sabah?",
      icon: CircleHelp,
      links: whatToDoButtons,
    },
    {
      title: "How",
      subtitle: "to be part of BAH!",
      icon: CircleHelp,
      links: contributeButtons,
    },
  ];

  return (
    <div className="themed-home flex flex-1 flex-col">
      <section className="themed-hero" aria-labelledby="themed-hero-title">
        <h1 id="themed-hero-title" className="sr-only">
          Tinyverse Garden
        </h1>
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/mobile-hero-art.svg",
          )}
          alt=""
          width={360}
          height={368}
          priority
          className="themed-hero-mobile"
        />
        <div className="themed-hero-art">
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/background_sky.webp",
            )}
            alt=""
            fill
            priority
            sizes="100vw"
            className="themed-hero-layer"
          />
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/background_house.webp",
            )}
            alt=""
            fill
            priority
            sizes="100vw"
            className="themed-hero-layer"
          />
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/background_plants.webp",
            )}
            alt=""
            fill
            priority
            sizes="100vw"
            className="themed-hero-layer"
          />
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/character_sean_and_aminah.webp",
            )}
            alt=""
            fill
            priority
            sizes="100vw"
            className="themed-hero-layer"
          />
          <Image
            src={withBasePath(
              "/2027_images/landscape_main_art_airashi/character_the_rat.webp",
            )}
            alt=""
            fill
            priority
            sizes="100vw"
            className="themed-hero-layer"
          />
        </div>
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/0-hero-title.svg",
          )}
          alt=""
          width={1320}
          height={595}
          priority
          className="themed-hero-title"
        />
      </section>

      <div className="themed-landscape">
        <section id="festival" className="themed-festival">
          <Image
            src={withBasePath(
              "/2027_images/new_themed_homepage_assets/2.5-flower-1.svg",
            )}
            alt=""
            width={368}
            height={349}
            className="themed-flower themed-flower-left"
          />
          <Image
            src={withBasePath(
              "/2027_images/new_themed_homepage_assets/2.5-flower-2.svg",
            )}
            alt=""
            width={309}
            height={272}
            className="themed-flower themed-flower-right"
          />
          <div className="themed-festival-inner">
            <div className="themed-venue">
              <Link href="/venue" className="themed-venue-photo">
                <Image
                  src={withBasePath(
                    "/2027_images/new_themed_homepage_assets/4-horizon-hotel-iage.png",
                  )}
                  alt="Horizon Hotel in Kota Kinabalu"
                  width={1022}
                  height={766}
                  className="themed-venue-image"
                />
                <span className="themed-venue-label">
                  <strong>Horizon Hotel</strong>
                  <small>Event Venue</small>
                </span>
              </Link>
            </div>

            <div className="themed-festival-copy">
              <Image
                src={withBasePath(
                  "/2027_images/new_themed_homepage_assets/4-borneo-next-festival-banner.svg",
                )}
                alt="Borneo's next Festival"
                width={509}
                height={213}
                className="themed-festival-banner"
              />
              <div className="themed-paper-card">
                <p>
                  The next chapter for Borneo unfolds. Once again, in the heart
                  of Kota Kinabalu, the community gathers once more; continuing
                  with an enriched vigor filled with hope, excitement, and joy.
                  Here, the next chapter for East Malaysia quietly unfolds...
                </p>
                <div className="themed-action-row">
                  <Link href="/tickets" className="themed-pill-action">
                    <PillContents
                      label="Register"
                      tail={<Ticket aria-hidden="true" />}
                    />
                  </Link>
                  <Link href="/venue" className="themed-pill-action">
                    <PillContents
                      label="Venue"
                      tail={<MapPin aria-hidden="true" />}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="explore"
          className="themed-quick-links"
          aria-labelledby="quick-links-title"
        >
          <div className="themed-banner">
            <h2 id="quick-links-title">Quick Links</h2>
            <Image
              src={withBasePath(
                "/2027_images/new_themed_homepage_assets/1.5-missing-flower-divider.svg",
              )}
              alt=""
              width={327}
              height={277}
              className="themed-sprig themed-sprig-left"
            />
            <Image
              src={withBasePath(
                "/2027_images/new_themed_homepage_assets/1.5-missing-flower-divider.svg",
              )}
              alt=""
              width={327}
              height={277}
              className="themed-sprig themed-sprig-right"
            />
          </div>

          <div className="themed-quick-panel">
            <div className="themed-quick-column">
              <QuickLinkCard card={quickCards[0]} />
              <QuickLinkCard card={quickCards[1]} />
            </div>
            <QuickLinkCard card={quickCards[2]} />
            <QuickLinkCard card={quickCards[3]} />
          </div>
        </section>
      </div>

      <section
        id="goh"
        className="themed-guests"
        aria-labelledby="guests-title"
      >
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/5-guest-of-honor-image.png",
          )}
          alt="Guests of honour silhouettes in a forest clearing"
          width={1520}
          height={856}
          className="themed-guests-image"
        />
        <div className="themed-banner themed-banner-guests">
          <h2 id="guests-title">Guests of Honor</h2>
          <Link href="/guest-of-honor" className="themed-pill-action">
            <PillContents
              label="Guests of Honour"
              tail={<ChevronRight aria-hidden="true" />}
            />
          </Link>
          <Image
            src={withBasePath(
              "/2027_images/new_themed_homepage_assets/1.5-missing-flower-divider.svg",
            )}
            alt=""
            width={327}
            height={277}
            className="themed-sprig themed-sprig-left"
          />
          <Image
            src={withBasePath(
              "/2027_images/new_themed_homepage_assets/1.5-missing-flower-divider.svg",
            )}
            alt=""
            width={327}
            height={277}
            className="themed-sprig themed-sprig-right"
          />
        </div>
      </section>
    </div>
  );
}

/**
 * Pill button contents: the supplied paw artwork, the stitched separator and
 * the label, matching the reference button design.
 */
function PillContents({
  label,
  tail,
}: {
  label: string;
  tail: React.ReactNode;
}) {
  return (
    <>
      <span className="themed-pill-paw" aria-hidden="true">
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/styled-button-image.svg",
          )}
          alt=""
          width={44}
          height={49}
        />
      </span>
      <span className="themed-pill-label">{label}</span>
      {tail}
    </>
  );
}

function QuickLinkCard({
  card,
}: {
  card: {
    title: string;
    subtitle: string;
    icon: typeof CircleHelp;
    links: { label: string; href: string }[];
  };
}) {
  const Icon = card.icon;
  return (
    <article className="themed-quick-card">
      <div className="themed-quick-card-title">
        <span className="themed-quick-icon">
          <Icon aria-hidden="true" />
        </span>
        <div>
          <h3>{card.title}</h3>
          <p>{card.subtitle}</p>
        </div>
      </div>
      <div className="themed-quick-card-links">
        {card.links.map((link) => (
          <Link href={link.href} key={link.href} className="themed-mini-link">
            {link.label}
            <span className="themed-mini-arrow">
              <ChevronRight aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Page (branches on site state)
// ---------------------------------------------------------------------------

export default function Home() {
  // Reads the shared client context (seeded from getSiteState() in
  // layout.tsx) so the DevSiteStateSwitcher can preview instantly.
  const { state } = useSiteState();

  if (state === "D") {
    return <DormantHome />;
  }

  if (state === "T") {
    return <ComingSoonHome />;
  }

  return <ThemedHome />;
}
