import Link from "next/link";
import {
  themedButtonClasses,
  type BahButtonSize,
  type BahButtonVariant,
} from "@/lib/theme/themed-button";

interface ThemedActionLinkProps {
  href: string;
  /**
   * `primary` for links on the page background, `inverse` for links sitting
   * on a `brand-surface` panel.
   */
  tone?: "primary" | "inverse";
  size?: BahButtonSize;
  className?: string;
  children: React.ReactNode;
}

const toneVariants = {
  primary: "bahPrimary",
  inverse: "bahSecondary",
} as const satisfies Record<
  NonNullable<ThemedActionLinkProps["tone"]>,
  BahButtonVariant
>;

/**
 * Pill call-to-action used by the reusable content pages (travel, venue,
 * BAHjet guide, …). It delegates to the shared BAH 2027 button token map, so
 * every subpage uses the same geometry, states, and palette.
 */
export default function ThemedActionLink({
  href,
  tone = "primary",
  size = "sm",
  className,
  children,
}: ThemedActionLinkProps) {
  const classes = themedButtonClasses(toneVariants[tone], { size, className });

  const label = (
    <>
      {children}
      <span aria-hidden="true" className="text-[0.9em] leading-none">
        ▸
      </span>
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
