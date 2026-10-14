import { use } from "react";
import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import { requireFeature } from "@/lib/site-state/require-feature";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function TicketDetailPage({ params }: Props) {
  requireFeature("ticketRegistration");
  const { id } = use(params);

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Ticket Detail"
        title={id}
        description="Full ticket details coming soon."
      />
      <ComingSoon emoji="🎟️" message="Ticket detail page coming soon." />
    </div>
  );
}
