import { use } from "react";
import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import NotReadyGate from "@/components/server/layout/NotReadyGate";
import { requireFeature } from "@/lib/site-state/require-feature";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default function BoothDetailPage({ params }: Props) {
  requireFeature("boothListing");
  const { slug } = use(params);

  return (
    <NotReadyGate
      feature="boothListing"
      title="Booth Details"
      message="Booth details will be published once the exhibitor line-up is confirmed."
    >
      <div className="flex flex-1 flex-col">
        <PageHero
          eyebrow="Booth Detail"
          title={slug}
          description="Full booth details coming soon."
        />
        <ComingSoon emoji="🎨" message="Booth detail page coming soon." />
      </div>
    </NotReadyGate>
  );
}
