import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function FoodGuidePage() {
  requireFeature("foodGuide");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Eat Like a Local"
        title="Food Guide"
        description="Where to eat and drink during the convention weekend."
      />
      <ComingSoon emoji="🍜" message="Food guide coming soon." />
    </div>
  );
}
