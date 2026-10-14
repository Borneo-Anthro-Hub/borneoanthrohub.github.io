import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import { requireFeature } from "@/lib/site-state/require-feature";

export default function GuestOfHonorPage() {
  requireFeature("guestOfHonor");

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Special Guest"
        title="Guest of Honor"
        description="Meet this year's featured guest at Borneo Anthro Hub."
      />
      <ComingSoon
        emoji="🌟"
        message="Guest of Honor announcement coming soon."
      />
    </div>
  );
}
