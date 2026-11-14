import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/utils";

interface ThemedPillLinkProps {
  href: string;
  label: string;
  tail?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

/**
 * Green paw-print pill used across the themed pages. The tail icon is
 * optional so the same component works for both navigation links and
 * registration calls to action.
 */
export default function ThemedPillLink({
  href,
  label,
  tail,
  className = "",
  ariaLabel,
}: ThemedPillLinkProps) {
  const classes = `themed-pill-action ${className}`.trim();
  const isExternal = /^https?:\/\//.test(href);

  const contents = (
    <>
      <span className="themed-pill-paw" aria-hidden="true">
        <Image
          src={withBasePath(
            "/2027_images/new_themed_homepage_assets/styled-button-image.svg",
          )}
          alt=""
          width={44}
          height={49}
        />
      </span>
      <span className="themed-pill-label">{label}</span>
      {tail}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={classes}
      >
        {contents}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={classes}>
      {contents}
    </Link>
  );
}
