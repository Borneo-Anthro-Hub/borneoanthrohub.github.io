"use client";

import { usePathname } from "next/navigation";
import PageSubheader from "@/components/server/layout/PageSubheader";

/* ------------------------------------------------------------------ */
/*  Route → subheader data mapping. Add entries as pages are created. */
/* ------------------------------------------------------------------ */
const subheaderMap: Record<
  string,
  { eyebrow: string; title: string; description?: string }
> = {
  "/about": {
    eyebrow: "Our Story",
    title: "About Us",
    description: "Learn about Borneo Anthro Hub and the community behind it.",
  },
};

export default function PublicSubheader() {
  const pathname = usePathname();

  // Match exact path first, then fall back to prefix match
  const data =
    subheaderMap[pathname] ??
    Object.entries(subheaderMap).find(([key]) =>
      pathname.startsWith(`${key}/`),
    )?.[1];

  if (!data) return null;

  return <PageSubheader {...data} />;
}
