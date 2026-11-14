import Link from "next/link";
import { cn } from "@/lib/utils";

interface ThemedActionLinkProps {
  href: string;
  /**
   * `primary` for links on the page background, `inverse` for links sitting
   * on a `brand-surface` panel.
   */
  tone?: "primary" | "inverse";
  className?: string;
  children: React.ReactNode;
}

/**
 * Pill call-to-action used by the reusable content pages. Both tones pair a
 * branded surface with the foreground token designed for it, so contrast
 * holds for every yearly theme.
 */
export default function ThemedActionLink({
  href,
  tone = "primary",
  className,
  children,
}: ThemedActionLinkProps) {
  const classes = cn(
    "font-caption inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold tracking-wide uppercase transition-[opacity,transform] hover:-translate-y-px hover:opacity-90",
    tone === "inverse"
      ? "bg-brand-text text-brand-surface"
      : "bg-primary text-primary-foreground",
    className,
  );

  const label = (
    <>
      {children}
      <span aria-hidden="true">&rarr;</span>
    </>
  );

  if (/^https?:\/\//.test(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
