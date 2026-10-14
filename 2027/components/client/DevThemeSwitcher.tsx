"use client";

import { themes, type ThemeKey } from "@/lib/theme/themes";
import { useTheme } from "@/components/client/ThemeProvider";
import { useState, useRef, useEffect } from "react";

/**
 * Compact inline theme switcher for the navbar. Renders a small button
 * showing the current theme's accent colour; clicking it opens a dropdown
 * to pick another theme. Development only — stripped from production builds.
 */
const themeSwatches: Record<ThemeKey, string> = {
  "2026": themes["2026"].brand.accent,
  "2027": themes["2027"].brand.accent,
  greyscale: themes.greyscale.brand.accent,
};

export default function DevThemeSwitcher() {
  const { themeKey, setThemeKey } = useTheme();
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

  const keys = Object.keys(themes) as ThemeKey[];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="border-border hover:bg-brand-subtle/20 flex size-7 items-center justify-center rounded border transition-colors"
        aria-label="Switch theme"
        title={`Theme: ${themes[themeKey].label}`}
      >
        <span
          className="block h-3.5 w-3.5 rounded-full"
          style={{ backgroundColor: themeSwatches[themeKey] }}
        />
      </button>

      {open && (
        <div
          data-testid="theme-switcher-menu"
          className="border-border bg-brand-surface absolute top-full right-0 z-50 mt-2 rounded border p-1.5 shadow-lg"
        >
          {keys.map((key) => {
            const active = key === themeKey;
            return (
              <button
                key={key}
                onClick={() => {
                  setThemeKey(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-left text-xs transition-colors ${
                  active
                    ? "bg-brand-accent/15 text-brand-accent"
                    : "text-brand-text/70 hover:bg-brand-subtle/10 hover:text-brand-text"
                }`}
              >
                <span
                  className="block h-3.5 w-3.5 shrink-0 rounded-full ring-1 ring-white/20 ring-inset"
                  style={{ backgroundColor: themeSwatches[key] }}
                />
                <span className="font-medium">{themes[key].label}</span>
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
