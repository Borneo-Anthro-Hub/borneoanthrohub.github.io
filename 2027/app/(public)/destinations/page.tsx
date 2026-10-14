import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function DestinationsPage() {
  requireFeature("destinations");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Explore Sabah"
        title="Destinations"
        description="Things to see and do around Kota Kinabalu and beyond."
      />
      <ComingSoon emoji="🏝️" message="Destinations guide coming soon." />
    </div>
  );
}
