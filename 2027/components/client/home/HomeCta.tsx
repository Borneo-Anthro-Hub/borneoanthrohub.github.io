"use client";

import Link from "next/link";
import { useSiteState } from "@/components/client/SiteStateProvider";
import { themedButtonClasses } from "@/lib/theme/themed-button";

/**
 * Homepage call-to-action link ("Venue" + gated "Register").
 * Split out from `app/page.tsx` so the rest of the page can stay a
 * server component. Uses a plain `<Link>` element styled as a button
 * (avoids Base UI Button's nativeButton restrictions with Next.js Link).
 */
export default function HomeCta() {
  const { isLive } = useSiteState();
  // /tickets 404s outside the ticketing states — only offer Register when it resolves.
  const canRegister = isLive("ticketRegistration");

  return (
    <div className="flex flex-wrap gap-3">
      {canRegister && (
        <Link href="/tickets" className={themedButtonClasses("primary")}>
          Register
        </Link>
      )}
      <Link href="/venue" className={themedButtonClasses("secondary")}>
        Venue
      </Link>
    </div>
  );
}
