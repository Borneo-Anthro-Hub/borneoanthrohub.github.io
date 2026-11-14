import Image from "next/image";
import PageHero from "@/components/server/layout/PageHero";
import ThemedActionLink from "@/components/server/themed/ThemedActionLink";
import ThemedCard from "@/components/server/themed/ThemedCard";
import ThemedIconCard from "@/components/server/themed/ThemedIconCard";
import ThemedPageSection from "@/components/server/themed/ThemedPageSection";
import ThemedStepList from "@/components/server/themed/ThemedStepList";
import { venuePage } from "@/lib/content/venue";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

export default function VenuePage() {
  requireFeature("venue");

  const { hero, venue, gettingThere, arrivalWalkthrough, parking } = venuePage;

  return (
    <div className="flex flex-1 flex-col">
      <PageHero {...hero} showEyebrow showDescription />

      {/* THE VENUE â€” story + hotel artwork */}
      <ThemedPageSection
        id="the-venue"
        eyebrow={venue.eyebrow}
        title={venue.title}
      >
        <div className="grid gap-8 md:grid-cols-5 md:items-start">
          <figure className="md:col-span-2">
            <div className="bg-card border-card-foreground/15 rounded-2xl border p-3 shadow-sm">
              <Image
                src={withBasePath(venue.image.src)}
                alt={venue.image.alt}
                width={venue.image.width}
                height={venue.image.height}
                sizes="(max-width: 768px) 100vw, 40vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
            <figcaption className="text-foreground/70 font-body mt-3 text-[11px] leading-relaxed">
              {venue.imageCaption}
            </figcaption>
          </figure>

          <div className="space-y-4 md:col-span-3">
            {venue.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-foreground/80 font-body text-sm leading-relaxed md:text-base"
              >
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              {venue.links.map((link) => (
                <ThemedActionLink key={link.href} href={link.href}>
                  {link.label}
                </ThemedActionLink>
              ))}
            </div>
          </div>
        </div>
      </ThemedPageSection>

      {/* GETTING THERE â€” one card per transport option */}
      <ThemedPageSection
        id="getting-there"
        eyebrow={gettingThere.eyebrow}
        title={gettingThere.title}
        lead={gettingThere.lead}
      >
        <div className="grid gap-5 md:grid-cols-3">
          {gettingThere.options.map((option) => (
            <ThemedIconCard
              key={option.id}
              icon={option.icon}
              title={option.title}
            >
              <p>{option.intro}</p>
              <ul className="list-disc space-y-2 pl-4">
                {option.facts.map((fact) => (
                  <li key={fact.slice(0, 24)}>{fact}</li>
                ))}
              </ul>
            </ThemedIconCard>
          ))}
        </div>
      </ThemedPageSection>

      {/* ARRIVAL HALL 3 â€” photo walkthrough */}
      <ThemedPageSection
        id="arrival-hall-3"
        eyebrow={arrivalWalkthrough.eyebrow}
        title={arrivalWalkthrough.title}
        lead={arrivalWalkthrough.lead}
      >
        <ThemedStepList steps={arrivalWalkthrough.steps} />
      </ThemedPageSection>

      {/* PARKING â€” Sean's guide */}
      <ThemedPageSection
        id="parking"
        eyebrow={parking.eyebrow}
        title={parking.title}
      >
        <ThemedCard className="p-6 md:p-8">
          <ThemedStepList steps={parking.steps} variant="list" />
        </ThemedCard>
      </ThemedPageSection>

      {/* WHERE TO NEXT â€” link into the BAHjet + travel guides */}
      <div className="bg-background px-4 pb-14 md:px-8 md:pb-20">
        <div className="bg-brand-surface text-brand-text mx-auto w-full max-w-6xl rounded-3xl px-6 py-8 md:px-10 md:py-10">
          <h2 className="font-heading text-brand-text text-xl leading-tight md:text-2xl">
            {venuePage.nearbyGuidePrompt.title}
          </h2>
          <p className="font-body mt-3 max-w-3xl text-sm leading-relaxed opacity-90 md:text-base">
            {venuePage.nearbyGuidePrompt.lead}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {venuePage.nearbyGuidePrompt.links.map((link) => (
              <ThemedActionLink key={link.href} href={link.href} tone="inverse">
                {link.label}
              </ThemedActionLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
