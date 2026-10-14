import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function TermsPage() {
  requireFeature("termsAndConditions");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Policies"
        title="Terms & Conditions"
        description="Rules, policies, and terms for attending Borneo Anthro Hub."
        titleClassName="type-hero-h1"
      />

      <Section index="01" eyebrow="Terms &amp; Conditions">
        <div className="mx-auto max-w-3xl">
          <iframe
            src="https://docs.google.com/document/d/e/2PACX-1vT7hRxbs1ZGeMqcKcfcMeHhcTRTXScU60KvV0NrnoE-8J3gSPxiVrBiY4FP2HJDzA/pub?embedded=true"
            className="border-border h-150 w-full border bg-white"
            title="Terms &amp; Conditions"
          />
        </div>
      </Section>
    </div>
  );
}
