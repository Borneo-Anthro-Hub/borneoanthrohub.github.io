import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function PanelSubmissionPage() {
  requireFeature("panelSubmission");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Share Your Knowledge"
        title="Panel Submission"
        description="Propose a panel or workshop for the convention."
      />

      <Section index="01" eyebrow="The Shamans">
        <p className="text-muted-foreground text-sm leading-relaxed">
          The clan of the Shamans is well known for its wisdom and the unique
          talents of its members in various fields, and plays a key role in
          defining the myriad of programmes we will experience and enjoy during
          the festival.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          If you have the passion in sharing, skills, or experiences &mdash;
          whether it&rsquo;s about fursuiting, art, performance, fandom culture,
          or other creative topics &mdash; this is your chance to connect with
          fellow friends and spark engaging discussions. Both experienced
          speakers and first-time panelists are welcome. Let&rsquo;s be the
          change we want by sharing the knowledge we need.
        </p>
        <div className="mt-6">
          <a
            href="https://forms.gle/panel-submission"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors"
          >
            Open Panel Submission Form
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </Section>
    </div>
  );
}
