"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { FEATURE_MATRIX } from "@/lib/site-state/feature-matrix";
import { type SiteState, type Feature } from "@/lib/site-state/types";

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

interface SiteStateContextValue {
  /** The current lifecycle state (e.g. "D", "T", "A", …). */
  state: SiteState;
  /** Check whether a feature is enabled in the current state. */
  isEnabled: (feature: Feature) => boolean;
  /**
   * Dev-only escape hatch — sets a cookie override so both client UI and
   * server-side route guards see the new state immediately.  No-op in
   * production builds; gated by `process.env.NODE_ENV` at the call site.
   */
  setState: (next: SiteState) => void;
}

const SiteStateContext = createContext<SiteStateContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface SiteStateProviderProps {
  /** Resolved server-side by `getSiteState()`. */
  siteState: SiteState;
  children: ReactNode;
}

/**
 * Provides the active website lifecycle state to client components.
 *
 * Mirrors the pattern established by `ThemeProvider`:
 *   - The server resolves the state (`getSiteState()` in `app/layout.tsx`)
 *   - The resolved value is passed as a prop
 *   - Client components consume it via `useSiteState()`
 *
 * In development the provider also exposes `setState` so the
 * `DevSiteStateSwitcher` can preview other states without a restart.
 */
export function SiteStateProvider({
  siteState: initialSiteState,
  children,
}: SiteStateProviderProps) {
  const [state, setStateInternal] = useState<SiteState>(initialSiteState);

  const isEnabled = (feature: Feature): boolean => {
    return (FEATURE_MATRIX[feature] as readonly SiteState[]).includes(state);
  };

  const setState = (next: SiteState) => {
    setStateInternal(next);
  };

  return (
    <SiteStateContext.Provider value={{ state, isEnabled, setState }}>
      {children}
    </SiteStateContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current website lifecycle state from any client component.
 *
 * Must be used inside `<SiteStateProvider>` (wired in `app/layout.tsx`).
 */
export function useSiteState(): SiteStateContextValue {
  const ctx = useContext(SiteStateContext);
  if (!ctx) {
    throw new Error("useSiteState must be used within a <SiteStateProvider>.");
  }
  return ctx;
}
