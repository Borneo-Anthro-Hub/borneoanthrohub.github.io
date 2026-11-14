import Image from "next/image";
import PageHero from "@/components/server/layout/PageHero";
import ThemedCard from "@/components/server/themed/ThemedCard";
import ThemedFaq from "@/components/server/themed/ThemedFaq";
import ThemedPageSection from "@/components/server/themed/ThemedPageSection";
import { clansPage } from "@/lib/content/clans";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

/** Decorative accent strip per clan — pure colour, no text, so it only adds
 *  differentiation and always stays theme-safe. */
const CLAN_ACCENT_TONES = ["bg-brand-accent", "bg-brand-secondary"] as const;

function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="border-border grow border-t" />
      <span className="text-foreground/70 font-caption text-xs font-bold tracking-[0.4em] uppercase">
        {label}
      </span>
      <span className="border-border grow border-t" />
    </div>
  );
}

export default function VolunteerPage() {
  requireFeature("volunteerApplication");

  const { hero, recruit, clans, faq } = clansPage;

  return (
    <div className="flex flex-1 flex-col" id="volunteer">
      <PageHero {...hero} showEyebrow showDescription />

      {/* RECRUITMENT — how enrollment works */}
      <ThemedPageSection
        id="recruit"
        eyebrow={recruit.eyebrow}
        title={recruit.title}
      >
        <div className="space-y-4">
          {recruit.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-foreground/80 font-body text-sm leading-relaxed md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </ThemedPageSection>

      {/* THE CLANS — one card per clan */}
      <ThemedPageSection id="the-clans" title="The Clans">
        <div className="grid gap-5 md:grid-cols-2">
          {clans.map((clan, index) => (
            <ThemedCard key={clan.id} className="flex flex-col overflow-hidden">
              <div
                aria-hidden="true"
                className={`h-1.5 w-full ${CLAN_ACCENT_TONES[index % CLAN_ACCENT_TONES.length]}`}
              />
              <div className="bg-brand-surface text-brand-text flex items-center gap-4 px-6 py-5">
                <span className="bg-brand-subtle grid h-16 w-16 shrink-0 place-items-center rounded-full">
                  <Image
                    src={withBasePath(clan.icon)}
                    alt=""
                    width={131}
                    height={131}
                    className="h-10 w-10"
                  />
                </span>
                <div>
                  <p className="font-caption text-xs font-bold tracking-[0.3em] uppercase opacity-80">
                    {clan.role}
                  </p>
                  <h3 className="font-heading text-brand-text text-xl leading-tight">
                    {clan.name}
                  </h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-card-foreground font-body text-sm leading-relaxed font-semibold">
                  {clan.intro}
                </p>
                {clan.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-card-foreground/80 font-body text-sm leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                <p className="text-card-foreground/75 font-body mt-1 text-xs leading-relaxed italic">
                  * Upon registration, you are deemed to have read and agreed to
                  be bound to our{" "}
                  <a
                    href={clan.termsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="decoration-brand-accent hover:decoration-brand-secondary underline decoration-2 underline-offset-2"
                  >
                    {clan.termsLabel}
                  </a>
                  .
                </p>

                <div className="mt-auto pt-4">
                  <span className="border-card-foreground/20 text-card-foreground/75 font-caption inline-flex rounded-full border px-4 py-2 text-xs font-bold tracking-wide uppercase">
                    {clan.status}
                  </span>
                </div>
              </div>
            </ThemedCard>
          ))}
        </div>
      </ThemedPageSection>

      {/* FAQ — one group per clan */}
      <ThemedPageSection
        id="clans-faq"
        eyebrow={faq.eyebrow}
        title="Frequently asked questions"
        lead="Everything both clans ask us before signing up, from responsibilities to what you get out of it."
      >
        <div className="space-y-8">
          <div>
            <GroupDivider label={faq.panelistGroupLabel} />
            <ThemedFaq items={faq.panelist} />
          </div>
          <div>
            <GroupDivider label={faq.volunteerGroupLabel} />
            <ThemedFaq items={faq.volunteer} />
          </div>
        </div>
      </ThemedPageSection>
    </div>
  );
}
