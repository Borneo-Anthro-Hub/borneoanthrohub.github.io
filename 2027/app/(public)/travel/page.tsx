import Image from "next/image";
import PageHero from "@/components/server/layout/PageHero";
import ThemedActionLink from "@/components/server/themed/ThemedActionLink";
import ThemedCallout from "@/components/server/themed/ThemedCallout";
import ThemedCard from "@/components/server/themed/ThemedCard";
import ThemedIconCard from "@/components/server/themed/ThemedIconCard";
import ThemedPageSection from "@/components/server/themed/ThemedPageSection";
import { travelPage } from "@/lib/content/travel";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

export default function TravelPage() {
  requireFeature("travelInformation");

  const { hero, intro, entry, customs, logistics, payments, relatedGuides } =
    travelPage;

  return (
    <div className="flex flex-1 flex-col">
      <PageHero {...hero} showEyebrow showDescription />

      {/* INTRODUCTION â€” why Sabah is worth the trip */}
      <ThemedPageSection id="introduction" title={intro.title}>
        <div className="space-y-4">
          {intro.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-foreground/80 font-body max-w-4xl text-sm leading-relaxed md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <Image
          src={withBasePath(intro.art.src)}
          alt={intro.art.alt}
          width={intro.art.width}
          height={intro.art.height}
          sizes="(max-width: 1024px) 90vw, 60vw"
          className="mx-auto mt-8 h-auto w-full max-w-2xl opacity-90"
        />
      </ThemedPageSection>

      {/* ENTRY & VISA */}
      <ThemedPageSection id="entry" eyebrow={entry.eyebrow} title={entry.title}>
        <div className="grid gap-5 lg:grid-cols-3">
          {entry.groups.map((group) => (
            <ThemedIconCard
              key={group.title}
              title={group.title}
              footer={
                group.links && group.links.length > 0 ? (
                  <div className="flex flex-col items-start gap-2">
                    {group.links.map((link) => (
                      <ThemedActionLink key={link.href} href={link.href}>
                        {link.label}
                      </ThemedActionLink>
                    ))}
                  </div>
                ) : undefined
              }
            >
              <ul className="list-disc space-y-2 pl-4">
                {group.points.map((point) => (
                  <li key={point.slice(0, 24)}>{point}</li>
                ))}
              </ul>
            </ThemedIconCard>
          ))}
        </div>
      </ThemedPageSection>

      {/* CUSTOMS */}
      <ThemedPageSection
        id="customs"
        eyebrow={customs.eyebrow}
        title={customs.title}
      >
        <ThemedCard className="p-6 md:p-8">
          <ol className="text-card-foreground/80 font-body list-decimal space-y-3 pl-5 text-sm leading-relaxed">
            {customs.points.map((point) => (
              <li key={point.slice(0, 24)}>{point}</li>
            ))}
          </ol>
        </ThemedCard>
      </ThemedPageSection>

      {/* LOGISTICS */}
      <ThemedPageSection
        id="logistics"
        eyebrow={logistics.eyebrow}
        title={logistics.title}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {logistics.cards.map((card) => (
            <ThemedIconCard key={card.title} title={card.title}>
              <ul className="list-disc space-y-2 pl-4">
                {card.points.map((point) => (
                  <li key={point.slice(0, 24)}>{point}</li>
                ))}
              </ul>
            </ThemedIconCard>
          ))}
        </div>
        <ThemedCallout title="Important" tone="accent" className="mt-5">
          {logistics.warning}
        </ThemedCallout>
      </ThemedPageSection>

      {/* PAYMENTS */}
      <ThemedPageSection
        id="payments"
        eyebrow={payments.eyebrow}
        title={payments.title}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {payments.cards.map((card) => (
            <ThemedIconCard key={card.title} title={card.title}>
              <ul className="list-disc space-y-2 pl-4">
                {card.points.map((point) => (
                  <li key={point.slice(0, 24)}>{point}</li>
                ))}
              </ul>
            </ThemedIconCard>
          ))}
        </div>
      </ThemedPageSection>

      {/* WHERE TO NEXT */}
      <div className="bg-background px-4 pb-14 md:px-8 md:pb-20">
        <div className="bg-brand-surface text-brand-text mx-auto w-full max-w-6xl rounded-3xl px-6 py-8 md:px-10 md:py-10">
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
        </div>
      </div>
    </div>
  );
}
