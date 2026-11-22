import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";
import { GuidelinesSection } from "./guidelines-section";

export default function CodeOfConductPage() {
  requireFeature("codeOfConduct");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Community Guidelines"
        title="Code of Conduct"
        description="Our commitment to a safe and inclusive environment for everyone."
      />

      <Section index="01" eyebrow="Guidelines">
        <GuidelinesSection />
      </Section>
    </div>
  );
}
