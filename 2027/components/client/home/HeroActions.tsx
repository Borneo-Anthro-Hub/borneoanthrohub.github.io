"use client";

import { Button } from "@base-ui/react/button";

function scrollTo(id: string) {
  if (typeof window !== "undefined") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Hero call-to-action button for the home page. Split out from `app/page.tsx`
 * so the rest of the page can render as a Server Component - it needs
 * an `onClick` handler, which only Client Components can define.
 */
export default function HeroActions() {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => scrollTo("about")}
        className="border-border hover:bg-brand-subtle hover:text-brand-surface focus-visible:ring-ring rounded border px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        Learn More
      </Button>
    </div>
  );
}
