import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function VenuePage() {
  requireFeature("venue");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Location"
        title="Venue"
        description="Where Borneo Anthro Hub takes place — directions, facilities, and more."
      />

      <Section index="01" eyebrow="The Venue">
        <p className="mb-3 text-sm font-semibold">
          Where All BAHpals Share The Joy Under The Same Horizon
        </p>
        <p className="text-muted-foreground text-sm leading-relaxed">
          In the heart of Kota Kinabalu&rsquo;s commercial and cultural district
          lies the very place where all BAHpals fill the air with their
          merriment and zest during the grand festival &mdash; Horizon Hotel. As
          a premier 4-star destination equipped with a state-of-the-art
          gymnasium, a terrace pool, and a fine selection of restaurants,
          Horizon Hotel offers an ideal blend of urban convenience and scenic
          tranquillity.
        </p>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          BAHpals will surely find it a pleasant and ideal experience to be in a
          furcon that has access to major shopping malls like Suria Sabah.
          Adventurous BAHpals looking for more than just a conventional furcon
          experience would also certainly be rewarded with a bountiful journey
          during their stay in Sabah, with even more additional possibilities to
          explore at nearby popular destinations outside of BAH such as Gaya
          Street. The best part? &mdash; All that, within walking distance!
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://horizonhotelsabah.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent text-sm font-medium hover:underline"
          >
            Hotel Website &rarr;
          </a>
          <a
            href="https://maps.app.goo.gl/YD1BeyjAbpKy7z498"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent text-sm font-medium hover:underline"
          >
            View on Google Maps &rarr;
          </a>
        </div>
      </Section>
    </div>
  );
}
