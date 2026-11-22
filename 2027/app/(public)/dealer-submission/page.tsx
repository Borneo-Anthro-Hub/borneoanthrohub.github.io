import PageHero from "@/components/server/layout/PageHero";
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function DealerSubmissionPage() {
  requireFeature("dealerSubmission");

  return (
    <NotReadyGate
      feature="dealerSubmission"
      title="Dealer Submission"
      message="Dealer applications aren't open yet. Watch our socials for the announcement."
    >
      <div className="flex flex-1 flex-col">
        <PageHero
          eyebrow="Exhibit With Us"
          title="Dealer Submission"
          description="Apply for a booth in the Dealer&rsquo;s Den."
        />

        <Section index="01" eyebrow="How to Apply">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Dealer&rsquo;s Den applications for BAH are handled through our
            external form. Please click the button below to access the
            application form on Google Forms.
          </p>
          <div className="mt-6">
            <a
              href="https://forms.gle/dealer-submission"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
            >
              Open Dealer Application Form
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Section>
      </div>
    </NotReadyGate>
  );
}
