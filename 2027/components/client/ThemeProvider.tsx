"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  themes,
  themeToCssVars,
  type Theme,
  type ThemeKey,
} from "@/lib/theme/themes";

interface ThemeContextValue {
  theme: Theme;
  themeKey: ThemeKey;
  /** Dev-only escape hatch - see components/DevThemeSwitcher.tsx. */
  setThemeKey: (key: ThemeKey) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  themeKey: ThemeKey;
  children: React.ReactNode;
}

const FONT_LINK_ID = "theme-font-link";

/**
 * Provides the active `Theme` (resolved server-side from `ACTIVE_THEME`) to
 * client components via context. In production the theme never changes -
 * `ACTIVE_THEME` in `lib/site-config.ts` is the single source of
 * truth. `setThemeKey` exists only so `DevThemeSwitcher` (rendered in
 * development only) can preview other themes at runtime without a rebuild;
 * there is no visitor-facing UI wired to it in production. Components that
 * only need CSS colors/fonts don't need this provider at all - they just use
 * `brand-*` / semantic Tailwind classes. Use `useTheme()` only when a
 * component needs the theme's JS-level data (e.g. `label`).
 */
export function ThemeProvider({
  themeKey: initialThemeKey,
  children,
}: ThemeProviderProps) {
  const [themeKey, setThemeKeyInternal] = useState<ThemeKey>(initialThemeKey);
  const theme: Theme = themes[themeKey];

  /**
   * Persist the dev theme override via cookie so it survives hard
   * navigation / refresh.  Mirrors the `dev-site-state` pattern in
   * `SiteStateProvider`.  The API route (`app/api/dev/theme/route.ts`)
   * validates `NODE_ENV === "development"` and rejects otherwise.
   */
  const setThemeKey = (key: ThemeKey) => {
    setThemeKeyInternal(key);
  };

  useEffect(() => {
    const root = document.documentElement;
    const cssVars = themeToCssVars(theme);
    for (const [name, value] of Object.entries(cssVars)) {
      root.style.setProperty(name, value);
    }
    root.dataset.theme = String(themeKey);

    let fontLink = document.getElementById(
      FONT_LINK_ID,
    ) as HTMLLinkElement | null;
    if (theme.fontUrl) {
      if (!fontLink) {
        fontLink = document.createElement("link");
        fontLink.id = FONT_LINK_ID;
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);
      }
      fontLink.href = theme.fontUrl;
    } else {
      fontLink?.remove();
    }
  }, [theme, themeKey]);

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setThemeKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
