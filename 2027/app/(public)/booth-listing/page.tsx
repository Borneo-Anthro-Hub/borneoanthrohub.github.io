import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function BoothListingPage() {
  requireFeature("boothListing");

  return (
    <NotReadyGate
      feature="boothListing"
      title="Dealer&rsquo;s Den"
      message="The exhibitor line-up will be published once dealer applications close."
    >
      <div className="flex flex-1 flex-col">
        <PageHero
          eyebrow="Exhibitors"
          title="Booth Listing"
          description="See who&rsquo;s exhibiting at this year&rsquo;s Dealer&rsquo;s Den."
        />
        <ComingSoon emoji="🏪" message="Booth listing coming soon." />
      </div>
    </NotReadyGate>
  );
}
