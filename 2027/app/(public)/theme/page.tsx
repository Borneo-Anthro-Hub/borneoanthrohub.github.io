import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function ThemePage() {
  requireFeature("themeLandingPage");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="This Year"
        title="Theme"
        description="Discover the theme for this year's Borneo Anthro Hub."
      />

      <Section index="01" eyebrow="The Journey" noBorder>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Each year, Borneo Anthro Hub adopts a unique theme that celebrates the
          culture, stories, and spirit of Sabah and its people. From the harvest
          festivals of the past to new adventures on the horizon, every theme
          invites you to experience something special.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed italic">
          This year&rsquo;s theme will be revealed soon. Stay tuned!
        </p>
      </Section>
    </div>
  );
}
