import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function BahjetGuidePage() {
  requireFeature("bahjetGuide");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="First-Time Flyer"
        title="BAHjet Guide"
        description="Tips and advice for first-time flyers heading to Borneo Anthro Hub."
      />
      <ComingSoon emoji="🛫" message="BAHjet Guide coming soon." />
    </div>
  );
}
