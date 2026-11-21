import Image from "next/image";
import PageHero from "@/components/server/layout/PageHero";
import ThemedActionLink from "@/components/server/themed/ThemedActionLink";
import ThemedCallout from "@/components/server/themed/ThemedCallout";
import ThemedCard from "@/components/server/themed/ThemedCard";
import ThemedIconCard from "@/components/server/themed/ThemedIconCard";
import ThemedPageSection from "@/components/server/themed/ThemedPageSection";
import { bahjetGuidePage } from "@/lib/content/bahjet-guide";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

export default function BahjetGuidePage() {
  requireFeature("bahjetGuide");

  const { hero, intro, guides, goodToKnow, relatedGuides } = bahjetGuidePage;

  return (
    <div className="flex flex-1 flex-col">
      <PageHero {...hero} showEyebrow showDescription />

      {/* INTRO â€” cover art + the story behind the guide */}
      <ThemedPageSection id="introduction" title={intro.title}>
        <div className="grid gap-8 md:grid-cols-5 md:items-center">
          <div className="md:col-span-2">
            <Image
              src={withBasePath(intro.coverArt.src)}
              alt={intro.coverArt.alt}
              width={intro.coverArt.width}
              height={intro.coverArt.height}
              sizes="(max-width: 768px) 80vw, 40vw"
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="space-y-4 md:col-span-3">
            {intro.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-foreground/80 font-body text-sm leading-relaxed md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </ThemedPageSection>

      {/* THE GUIDES â€” one card per guide category */}
      <ThemedPageSection
        id="guides"
        eyebrow={guides.eyebrow}
        title={guides.title}
        lead={guides.lead}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {guides.items.map((guide) => (
            <ThemedIconCard
              key={guide.id}
              icon={guide.icon}
              title={guide.title}
              footer={
                "href" in guide ? (
                  <ThemedActionLink href={guide.href}>
                    {guide.cta}
                  </ThemedActionLink>
                ) : (
                  <span className="border-card-foreground/20 text-card-foreground/75 font-caption inline-flex rounded-full border px-4 py-2 text-xs font-bold tracking-wide uppercase">
                    {guide.status}
                  </span>
                )
              }
            >
              <p>{guide.description}</p>
            </ThemedIconCard>
          ))}
        </div>
      </ThemedPageSection>

      {/* GOOD TO KNOW â€” practical notes and the reference disclaimer */}
      <ThemedPageSection
        id="good-to-know"
        eyebrow={goodToKnow.eyebrow}
        title={goodToKnow.title}
      >
        <div className="space-y-4">
          {goodToKnow.items.map((item) => (
            <ThemedCallout key={item.title} title={item.title} tone="accent">
              {item.body}
            </ThemedCallout>
          ))}
        </div>
      </ThemedPageSection>

      {/* STILL PLANNING â€” link into the venue + travel guides */}
      <div className="px-4 pb-14 md:px-8 md:pb-20">
        <ThemedCard className="bg-brand-surface text-brand-text mx-auto w-full max-w-6xl rounded-3xl border-none px-6 py-8 shadow-none md:px-10 md:py-10">
          <h2 className="font-heading text-brand-text text-xl leading-tight md:text-2xl">
            {relatedGuides.title}
          </h2>
          <p className="font-body mt-3 max-w-3xl text-sm leading-relaxed opacity-90 md:text-base">
            {relatedGuides.lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {relatedGuides.links.map((link) => (
              <ThemedActionLink key={link.href} href={link.href} tone="inverse">
                {link.label}
              </ThemedActionLink>
            ))}
          </div>
        </ThemedCard>
      </div>
    </div>
  );
}
