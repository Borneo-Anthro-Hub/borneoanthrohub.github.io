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

export default function SessionDetailPage({ params }: Props) {
  requireFeature("eventSchedule");
  const { slug } = use(params);

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Session Detail"
        title={slug}
        description="Full session details coming soon."
      />
      <ComingSoon emoji="🎤" message="Session detail page coming soon." />
    </div>
  );
}
