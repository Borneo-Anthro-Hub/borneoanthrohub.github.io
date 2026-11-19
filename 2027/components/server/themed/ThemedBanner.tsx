import Image from "next/image";
import { withBasePath } from "@/lib/utils";

const SPRIG_SRC =
  "/2027_images/new_themed_homepage_assets/1.5-missing-flower-divider.svg";

interface ThemedBannerProps {
  id?: string;
  title: string;
  subtitle?: string;
  /** Quiet third line, e.g. a mascot's species under its name. */
  caption?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Parchment sub-section banner reused from the themed landing page. Renders
 * an optional subtitle and trailing content (e.g. an action link) inside the
 * board artwork.
 */
export default function ThemedBanner({
  id,
  title,
  subtitle,
  caption,
  className = "",
  children,
}: ThemedBannerProps) {
  return (
    <div className={`themed-banner ${className}`.trim()}>
      {subtitle || caption ? (
        <div className="themed-banner-text">
          <h2 id={id}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
          {caption && <p className="themed-banner-caption">{caption}</p>}
        </div>
      ) : (
        <h2 id={id}>{title}</h2>
      )}
      {children}
      <Image
        src={withBasePath(SPRIG_SRC)}
        alt=""
        width={327}
        height={277}
        className="themed-sprig themed-sprig-left"
      />
      <Image
        src={withBasePath(SPRIG_SRC)}
        alt=""
        width={327}
        height={277}
        className="themed-sprig themed-sprig-right"
      />
    </div>
  );
}
