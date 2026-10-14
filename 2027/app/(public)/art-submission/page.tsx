import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function ArtSubmissionPage() {
  requireFeature("artSubmission");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Show Your Work"
        title="Art Submission"
        description="Submit your artwork for display at Borneo Anthro Hub."
      />

      <Section index="01" eyebrow="How to Submit">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Art submissions for BAH are handled through our external form. Please
          click the button below to access the submission form on Google Forms.
        </p>
        <div className="mt-6">
          <a
            href="https://forms.gle/art-submission"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          >
            Open Art Submission Form
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Section>
    </div>
  );
}
