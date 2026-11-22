import NotReadyOverlay from "@/components/server/layout/NotReadyOverlay";
import { isFeatureLive } from "@/lib/site-state/get-site-state";
import type { Feature } from "@/lib/site-state/types";

interface NotReadyGateProps {
  feature: Feature;
  /** Page name shown on the overlay while the page is not live. */
  title: string;
  message: string;
  children: React.ReactNode;
}

/**
 * Renders the page only once `feature` is live for the active lifecycle
 * state. Until then the page is replaced by the "under construction" overlay,
 * so unfinished content never reaches visitors.
 *
 * Usage (inside a `page.tsx`, after `requireFeature`):
 *
 *   <NotReadyGate feature="venue" title="Venue" message="…">
 *     …page content…
 *   </NotReadyGate>
 */
export default function NotReadyGate({
  feature,
  title,
  message,
  children,
}: NotReadyGateProps) {
  if (!isFeatureLive(feature)) {
    return <NotReadyOverlay title={title} message={message} />;
  }

  return <>{children}</>;
}
