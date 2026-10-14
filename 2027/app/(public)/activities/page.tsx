import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function ActivitiesPage() {
  requireFeature("activities");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="What&#x27;s On"
        title="Activities"
        description="Panels, workshops, games, and events throughout the weekend."
      />

      <Section index="01" eyebrow="Event Schedule" noBorder>
        <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
          Swipe or scroll through the day&rsquo;s activities. Tap any event to
          reveal the exact time and details.
        </p>
        <p className="text-muted-foreground text-xs italic">
          The full event timetable will be published closer to the convention.
          Check back soon!
        </p>
      </Section>
    </div>
  );
}
