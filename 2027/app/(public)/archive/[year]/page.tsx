import { use } from "react";
import PageHero from "@/components/server/layout/PageHero";
import ComingSoon from "@/components/server/layout/ComingSoon";
import { notFound } from "next/navigation";

interface ArchivePageProps {
  params: Promise<{ year: string }>;
}

const SUPPORTED_YEARS = ["2025", "2026"];

export function generateStaticParams() {
  return SUPPORTED_YEARS.map((year) => ({ year }));
}

export default function ArchivePage({ params }: ArchivePageProps) {
  const { year } = use(params);

  // Only allow years we actually have archives for; anything else 404s.
  if (!SUPPORTED_YEARS.includes(year)) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Archive"
        title={`Borneo Anthro Hub ${year}`}
        description={`Recap and highlights from the ${year} edition of Borneo Anthro Hub.`}
      />
      <ComingSoon
        emoji="📸"
        message={`The ${year} archive is coming soon — check back for photos and highlights.`}
      />
    </div>
  );
}
