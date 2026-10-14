"use client";

import { useState, useRef, useEffect } from "react";
import { useSiteState } from "@/components/client/SiteStateProvider";
import { SITE_STATE_LABELS, type SiteState } from "@/lib/site-state/types";

/**
 * Compact inline state switcher for the navbar.  Renders a small badge
 * showing the current lifecycle state code; clicking opens a dropdown to
 * pick another state.  Development only — stripped from production builds.
 */
const STATE_COLORS: Record<SiteState, string> = {
  D: "#6b7280", // gray
  T: "#f59e0b", // amber
  A: "#10b981", // emerald
  TO: "#3b82f6", // blue
  RC: "#f97316", // orange
  FIR: "#ef4444", // red
};

const STATE_KEYS = Object.keys(SITE_STATE_LABELS) as SiteState[];

export default function DevSiteStateSwitcher() {
  const { state, setState } = useSiteState();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border-border hover:bg-brand-subtle/20 flex h-7 items-center gap-1.5 rounded border px-2 text-xs transition-colors"
        aria-label="Switch site state"
        title={`Site state: ${SITE_STATE_LABELS[state]}`}
      >
        <span
          className="block size-2 rounded-full"
          style={{ backgroundColor: STATE_COLORS[state] }}
        />
        <span className="text-brand-text/60 font-mono text-[10px]">
          {state}
        </span>
      </button>

      {open && (
        <div
          data-testid="site-state-switcher-menu"
          className="border-border bg-brand-surface absolute top-full right-0 z-50 mt-2 rounded border p-1.5 shadow-lg"
        >
          {STATE_KEYS.map((key) => {
            const active = key === state;
            return (
              <button
                key={key}
                onClick={() => {
                  setState(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-left text-xs whitespace-nowrap transition-colors ${
                  active
                    ? "bg-brand-accent/15 text-brand-accent"
                    : "text-brand-text/70 hover:bg-brand-subtle/10 hover:text-brand-text"
                }`}
              >
                <span
                  className="block size-2.5 shrink-0 rounded-full ring-1 ring-white/20 ring-inset"
                  style={{ backgroundColor: STATE_COLORS[key] }}
                />
                <span className="font-mono text-[10px]">{key}</span>
                <span>{SITE_STATE_LABELS[key]}</span>
                {active && (
                  <span className="ml-auto text-[10px] opacity-60">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
