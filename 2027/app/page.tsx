"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import Particles from "@/components/Particles";
import SplitText from "@/components/SplitText";
import Section from "@/components/server/layout/Section";
import PlaceholderImage from "@/components/server/home/PlaceholderImage";
import HomeCta from "@/components/client/home/HomeCta";
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

/** "Where is BAH held at?" — top question in the Where column. */
const whereButtons = [
  { label: "Activities", href: "/activities" },
  { label: "How to get there?", href: "/travel" },
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

/** Full-bleed placeholder banner (art asset drop-in later), optionally with overlaid text. */
function FullBleedBanner({
  aspectRatio,
  label,
  children,
}: {
  aspectRatio: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-full">
      <PlaceholderImage
        className="w-full"
        aspectRatio={aspectRatio}
        label={label}
      />
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {children}
        </div>
      )}
    </div>
  );
}

/** Hanging "signpost" pair (heading plank + pill plank) used in the Explore grid. */
function SignpostGroup({
  icon,
  title,
  subtitle,
  links,
}: {
  icon: string;
  title: string;
  subtitle: string;
  links: { label: string; href: string; key?: string }[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col items-center">
      <div className="bg-brand-surface text-brand-text w-full rounded-xl px-4 py-3 text-center shadow-md">
        <span className="bg-brand-accent text-brand-surface mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full text-sm">
          {icon}
        </span>
        <p className="font-heading text-base leading-tight">{title}</p>
        <p className="text-brand-text/70 text-[11px]">{subtitle}</p>
      </div>
      <div className="bg-brand-surface/40 h-4 w-px" aria-hidden="true" />
      <div className="bg-brand-surface/90 flex w-full flex-wrap justify-center gap-2 rounded-xl px-3 py-3 shadow-md">
        {links.map((l) => (
          <Link
            key={l.key ?? l.href}
            href={l.href}
            className="bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-90"
          >
            {l.label}
          </Link>
        ))}
      </div>
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
            priority
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
            priority
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
            priority
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
          className="pointer-events-none absolute bottom-[-4px] left-1/2 z-50 aspect-[1.43] w-[94%] -translate-x-1/2 md:aspect-3960/2160 md:w-[96%]"
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
                priority
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
                priority
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
                  "/2027_images/landscape_main_art_airashi/tinyverse.png",
                )}
                draggable={false}
                alt=""
                width={2026}
                height={654}
                priority
                sizes="(max-width: 767px) 45vw, 29vw"
                className="h-auto w-[48%] select-none"
              />
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/garden.png",
                )}
                draggable={false}
                alt=""
                width={1658}
                height={536}
                priority
                sizes="(max-width: 767px) 39vw, 25vw"
                className="h-auto w-[42%]"
              />
            </div>
            <Image
              src={withBasePath(
                "/2027_images/landscape_main_art_airashi/date.png",
              )}
              draggable={false}
              alt="10th–11th July 2027"
              width={2200}
              height={970}
              priority
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
                "/2027_images/landscape_main_art_airashi/background_board.png",
              )}
              alt=""
              fill
              priority
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
                    "/2027_images/landscape_main_art_airashi/tinyverse.png",
                  )}
                  draggable={false}
                  alt=""
                  width={2026}
                  height={654}
                  priority
                  className="h-auto w-[52%] drop-shadow-[0_2px_5px_rgb(30_53_25_/_25%)] select-none"
                />
                <Image
                  src={withBasePath(
                    "/2027_images/landscape_main_art_airashi/garden.png",
                  )}
                  alt=""
                  width={1658}
                  height={536}
                  priority
                  className="h-auto w-[44%] drop-shadow-[0_2px_5px_rgb(30_53_25_/_25%)]"
                />
              </motion.div>
              <Image
                src={withBasePath(
                  "/2027_images/landscape_main_art_airashi/date.png",
                )}
                draggable={false}
                alt="10th–11th July 2027"
                width={2200}
                height={970}
                priority
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
  return (
    <div className="flex flex-1 flex-col">
      {/* ================================================================ */}
      {/* THEME BANNERS — year theme art, replace placeholders with real  */}
      {/* illustrations when ready.                                        */}
      {/* ================================================================ */}
      <FullBleedBanner aspectRatio="9/2" label="Tinyverse Garden Banner">
        <p className="font-display text-brand-surface text-4xl drop-shadow-sm md:text-5xl">
          Tinyverse Garden
        </p>
        <p className="font-heading text-brand-surface/80 mt-1 text-sm md:text-base">
          to be lost in the big, big garden&hellip;
        </p>
      </FullBleedBanner>
      <FullBleedBanner aspectRatio="16/5" label="Theme Illustration" />

      {/* ================================================================ */}
      {/* HERO — name, date, tagline                                       */}
      {/* ================================================================ */}
      <section className="border-border relative border-b px-4 py-8 md:px-8 md:py-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <LocationBadge />
          <BrandTitle titleClassName="mb-2" taglineClassName="mb-8" />
          <DateBadge />
        </div>
      </section>

      {/* ================================================================ */}
      {/* FESTIVAL TEASER — venue photo + compass badge / ticket card      */}
      {/* ================================================================ */}
      <Section id="festival" index="01" eyebrow="Borneo&rsquo;s Next Festival">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Venue photo + compass badge */}
          <div className="relative mx-auto w-full max-w-sm">
            <PlaceholderImage
              className="border-card absolute -top-6 -left-4 z-10 h-20 w-20 rounded-full border-4 shadow-md"
              aspectRatio="1/1"
              label="Compass"
            />
            <PlaceholderImage
              className="border-border rounded-lg border"
              aspectRatio="4/3"
              label="Mount Kinabalu"
            />
            <div className="bg-primary text-primary-foreground absolute bottom-3 left-3 rounded-md px-3 py-1.5 shadow">
              <p className="text-xs font-bold">Mount Kinabalu</p>
              <p className="text-[10px] font-normal opacity-90">Event Venue</p>
            </div>
          </div>

          {/* Ticket card */}
          <div className="border-brand-accent bg-card mx-auto w-full max-w-sm rounded-2xl border-2 border-dashed p-6">
            <p className="text-brand-accent mb-2 text-sm font-bold tracking-wide uppercase">
              Borneo&rsquo;s Next Festival
            </p>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              The next chapter for East Malaysia unfolds. Borneo Anthro Hub
              brings together fans, artists, and fursuiters for a weekend of
              creativity and connection, set against the natural beauty of
              Sabah.
            </p>
            <HomeCta />
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* EXPLORE BAH — What? (left) / Where? (right), each paired with a */}
      {/* sub-question sign, mirroring the hanging signpost layout mockup. */}
      {/* ================================================================ */}
      <Section
        id="explore"
        index="02"
        eyebrow="Explore BAH"
        className="bg-brand-subtle"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* What column */}
          <div className="flex flex-col items-center gap-6">
            <SignpostGroup
              icon="?"
              title="What?"
              subtitle="is BAH?"
              links={[{ label: "About Us", href: "/about" }]}
            />
            <SignpostGroup
              icon="🍴"
              title="What to do"
              subtitle="when I&rsquo;m in Sabah?"
              links={whatToDoButtons}
            />
          </div>

          {/* Where column */}
          <div className="flex flex-col items-center gap-6">
            <SignpostGroup
              icon="📍"
              title="Where?"
              subtitle="is BAH held at?"
              links={whereButtons}
            />
            <SignpostGroup
              icon="🎫"
              title="How to be"
              subtitle="a part of BAH!"
              links={contributeButtons}
            />
          </div>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* GUEST(S) OF HONOUR                                               */}
      {/* ================================================================ */}
      <Section id="goh" index="03" eyebrow="Guest(s) of Honour" noBorder>
        <div className="mx-auto max-w-lg">
          <PlaceholderImage
            className="border-border mb-4 rounded-lg border"
            aspectRatio="16/9"
            label="Guests of Honour"
          />
          <div className="text-center">
            <PillLink label="Guests of Honour" href="/guest-of-honor" />
          </div>
        </div>
      </Section>
    </div>
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
