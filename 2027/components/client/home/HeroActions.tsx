"use client";

import { themedButtonClasses } from "@/lib/theme/themed-button";

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
      <button
        type="button"
        onClick={() => scrollTo("about")}
        className={themedButtonClasses("outline")}
      >
        Learn More
      </button>
    </div>
  );
}
