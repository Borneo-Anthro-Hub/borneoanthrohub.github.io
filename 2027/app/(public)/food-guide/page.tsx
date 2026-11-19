import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function FoodGuidePage() {
  requireFeature("foodGuide");

  return (
    <NotReadyGate
      feature="foodGuide"
      title="Food Guide"
      message="We're still eating our way around Kota Kinabalu. The food guide will be served soon."
    >
      <div className="flex flex-1 flex-col">
        <PageHero
          eyebrow="Eat Like a Local"
          title="Food Guide"
          description="Where to eat and drink during the convention weekend."
        />
        <ComingSoon emoji="🍜" message="Food guide coming soon." />
      </div>
    </NotReadyGate>
  );
}
