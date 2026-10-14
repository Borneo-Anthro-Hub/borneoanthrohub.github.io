"use client";

import Link from "next/link";
import { useSiteState } from "@/components/client/SiteStateProvider";

const ctaBase =
  "font-caption inline-block rounded-full px-6 py-2.5 text-sm font-bold tracking-wide uppercase transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";

/**
 * Homepage call-to-action link ("Venue" + gated "Register").
 * Split out from `app/page.tsx` so the rest of the page can stay a
 * server component. Uses a plain `<Link>` element styled as a button
 * (avoids Base UI Button's nativeButton restrictions with Next.js Link).
 */
export default function HomeCta() {
  const { isEnabled } = useSiteState();
  // /tickets 404s outside the "TO" state — only offer Register when it resolves.
  const canRegister = isEnabled("ticketRegistration");

  return (
    <div className="flex flex-wrap gap-3">
      {canRegister && (
        <Link
          href="/tickets"
          className={`${ctaBase} bg-primary text-primary-foreground hover:bg-primary/90`}
        >
          Register
        </Link>
      )}
      <Link
        href="/venue"
        className={`${ctaBase} border-primary text-primary hover:bg-primary hover:text-primary-foreground border`}
      >
        Venue
      </Link>
    </div>
  );
}
