import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function DealerLayoutPage() {
  requireFeature("dealerLayout");

  return (
    <NotReadyGate
      feature="dealerLayout"
      title="Dealer&rsquo;s Den Layout"
      message="The floor plan will be published together with the final information release."
    >
      <div className="flex flex-1 flex-col">
        <PageHero
          eyebrow="Floor Plan"
          title="Dealer&rsquo;s Den Layout"
          description="Browse the Dealer&rsquo;s Den floor plan and find your favourite artists."
        />
        <ComingSoon emoji="🗺️" message="Dealer layout coming soon." />
      </div>
    </NotReadyGate>
  );
}
