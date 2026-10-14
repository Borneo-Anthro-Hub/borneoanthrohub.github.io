import { use } from "react";
import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
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
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Booth Detail"
        title={slug}
        description="Full booth details coming soon."
      />
      <ComingSoon emoji="🎨" message="Booth detail page coming soon." />
    </div>
  );
}
