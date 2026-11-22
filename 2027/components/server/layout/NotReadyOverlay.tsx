import Link from "next/link";
import { themedButtonClasses } from "@/lib/theme/themed-button";

interface NotReadyOverlayProps {
  /** Page name shown as the overlay heading, e.g. "Venue". */
  title: string;
  message: string;
}

/**
 * "Under construction" panel that replaces a page whose content is not ready
 * for the current rollout. The hazard-tape frame is the visual cue; see
 * `.not-ready-*` in `app/globals.css`.
 */
export default function NotReadyOverlay({
  title,
  message,
}: NotReadyOverlayProps) {
  return (
    <section className="not-ready-page">
      <div className="not-ready-tape">
        <div className="not-ready-card">
          <span className="not-ready-emoji" aria-hidden="true">
            🚧
          </span>
          <p className="not-ready-eyebrow">Under construction</p>
          <h1 className="not-ready-title">{title}</h1>
          <p className="not-ready-message">{message}</p>
          <div className="not-ready-actions">
            <Link
              href="/"
              className={themedButtonClasses("primary", { size: "sm" })}
            >
              Back to Home
            </Link>
            <Link
              href="/activities"
              className={themedButtonClasses("secondary", { size: "sm" })}
            >
              What&rsquo;s On
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
