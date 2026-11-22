// =============================================================================
// THEME DEFINITIONS
// =============================================================================
// Single source of truth for every color/font token the site uses. Components
// never hardcode colors - they use `brand-*` / semantic Tailwind token classes
// (e.g. `bg-brand-accent`, `bg-primary`) whose values are resolved at render
// time from the theme selected in `site-config.ts` (`ACTIVE_THEME`).
//
// To add a new yearly theme (e.g. "winter2027"), add an entry to `themes`
// below and point `ACTIVE_THEME` in `site-config.ts` at it. Nothing else
// needs to change.
//
// This module is imported by both Server Components (app/layout.tsx) and
// Client Components (ThemeProvider, DevThemeSwitcher), so it must stay free
// of the `server-only` guard - see `./active-theme.ts` for the server-only
// `getActiveTheme()` helper that resolves `ACTIVE_THEME` from `site-config.ts`.
// =============================================================================

import { withBasePath } from "@/lib/utils";
import { palettes } from "./palettes";
import typographyConfig from "./typography.json";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface BrandTokens {
  bg: string; // page background
  accent: string; // primary action / CTA
  text: string; // primary text / light surface
  hover: string; // hover state
  surface: string; // dark surface (footer, overlays)
  subtle: string; // dropdown / soft surface
  secondary: string; // secondary accent
}

export interface SemanticTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export type TypographyFontRole = "display" | "heading" | "body" | "caption";

export interface TypographyStyle {
  font: TypographyFontRole;
  size: number;
  weight: 400 | 500 | 600 | 700;
  lineHeight: number;
}

export type TypographyTokenName =
  | "heroH1"
  | "heroH3"
  | "heroH4"
  | "headingH3"
  | "headingH4"
  | "bodyLSemibold"
  | "bodyL"
  | "bodySSemibold"
  | "bodyS"
  | "captionSMedium"
  | "captionSBold";

export type TypographyTokens = Record<TypographyTokenName, TypographyStyle>;

/**
 * Builds the type scale from `typography.json`. Line height is not repeated per
 * variant on purpose: the design system requires 120% everywhere, so a single
 * `lineHeight` in the JSON applies to every token.
 */
function buildTypographyTokens(): TypographyTokens {
  return Object.fromEntries(
    Object.entries(typographyConfig.variants).map(([name, variant]) => [
      name,
      {
        font: variant.family as TypographyFontRole,
        size: variant.size,
        weight: variant.weight as TypographyStyle["weight"],
        lineHeight: typographyConfig.lineHeight,
      },
    ]),
  ) as TypographyTokens;
}

const defaultTypography: TypographyTokens = buildTypographyTokens();

export interface Theme {
  label: string;
  font: string;
  fontUrl?: string;
  /** Display / hero font (e.g. Oleo Script). Falls back to `font` when omitted. */
  displayFont?: string;
  /** Section heading font (e.g. Margarine). */
  headingFont?: string;
  /** Body text font (e.g. Cause). */
  bodyFont?: string;
  /** Caption / small text font (e.g. Poppins). */
  captionFont?: string;
  /** Named type styles; sizes are in px and line heights are unitless. */
  typography?: TypographyTokens;
  /**
   * Default color for every typography token (the 2027 guide's "General
   * Black"). Falls back to `semantic.foreground` when omitted.
   */
  typographyColor?: string;
  /** Optional repeating page background configured for the active theme. */
  pageBackground?: {
    image: string;
    size: string;
  };
  /**
   * Optional artwork behind the shared `PageHero`. Year-specific: the 2027
   * garden illustration lives under `/2027_images`, while the reusable
   * content pages pull year-neutral art from `/shared_images` via their own
   * layout instead. Omit to get the plain themed hero.
   */
  pageHeroArt?: string;
  /**
   * Optional artwork used by the themed landing styles in `globals.css`. The
   * paths are run through `withBasePath` in `themeToCssVars`, because CSS
   * `url()` values cannot see the runtime base path on their own.
   */
  themedArt?: ThemedArt;
  brand: BrandTokens;
  semantic: SemanticTokens;
}

export interface ThemedArt {
  /** Parchment map behind the festival clearing. */
  clearingMap: string;
  /** Grass + date divider that wraps the festival clearing. */
  landscapeDivider: string;
  /** Parchment background for the section banners. */
  bannerBackground: string;
  /** Tree canopy art framing the quick links and registration invitation. */
  treeCanopy: string;
}

// -----------------------------------------------------------------------------
// Theme definitions
// -----------------------------------------------------------------------------

export const themes = {
  "2026": {
    label: "2026",
    font: "'General Sans', system-ui, sans-serif",
    brand: {
      bg: "#175b68",
      accent: "#e8804d",
      text: "#fffbe8",
      hover: "#ffcb65",
      surface: "#1f3359",
      subtle: "#ffeec3",
      secondary: "#54ccc9",
    },
    semantic: {
      background: "#175b68",
      foreground: "#fffbe8",
      card: "#ffffff",
      cardForeground: "#334155",
      popover: "#ffeec3",
      popoverForeground: "#e8804d",
      primary: "#e8804d",
      primaryForeground: "#fffbe8",
      secondary: "#54ccc9",
      secondaryForeground: "#ffffff",
      muted: "#1e6f7e",
      mutedForeground: "#8fb5bb", // darkened from #a7c4ca to meet WCAG AA (4.5:1) contrast against #175b68 bg
      accent: "#ffcb65",
      accentForeground: "#1f3359",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "rgba(255, 255, 255, 0.15)",
      input: "rgba(255, 255, 255, 0.15)",
      ring: "#e8804d",
      sidebar: "#ffffff",
      sidebarForeground: "#334155",
      sidebarPrimary: "#e8804d",
      sidebarPrimaryForeground: "#ffffff",
      sidebarAccent: "#ffeec3",
      sidebarAccentForeground: "#1f3359",
      sidebarBorder: "#e2e8f0",
      sidebarRing: "#e8804d",
    },
  },

  "2027": {
    label: "2027",
    fontUrl: typographyConfig.fontUrl,
    font: typographyConfig.families.body.stack,
    displayFont: typographyConfig.families.display.stack,
    headingFont: typographyConfig.families.heading.stack,
    bodyFont: typographyConfig.families.body.stack,
    captionFont: typographyConfig.families.caption.stack,
    typographyColor: palettes.neutral[950],
    pageHeroArt: "/2027_images/landscape_main_art_airashi/background_art.webp",
    pageBackground: {
      image: "/2027_images/new_repeat_background.svg",
      // The SVG is a ~3.1x export of the 500px-wide design tile; render it at design scale.
      size: "500px auto",
    },
    themedArt: {
      clearingMap: "/2027_images/new_themed_homepage_assets/map_background.svg",
      landscapeDivider: "/2027_images/new_themed_homepage_assets/1-divider.svg",
      bannerBackground:
        "/2027_images/new_themed_homepage_assets/sub-section-banner-background.svg",
      treeCanopy: "/2027_images/new_themed_homepage_assets/3-divider.svg",
    },
    typography: defaultTypography,
    // BAH 2027 palette (all 500 / Main) + derived shades for contrast
    // Design: dark green header/footer, pale cream content area, orange accents
    brand: {
      bg: palettes.natureGreen[500], // BAH Nature Green (brand identity)
      accent: palettes.woodyEarth[300], // BAH Woody Earth (CTA / active nav)
      text: "#FFF3F0",
      hover: "#f7c44b", // lighter Sunshine Yellow
      surface: palettes.natureGreen[800], // deeper Nature Green (header / footer bar)
      subtle: "#f3f6e6", // light green tint (soft surfaces)
      secondary: palettes.floralCoral[500], // BAH Floral Coral (logo border)
    },
    semantic: {
      background: "#fdf6e3", // warm pale cream (content area)
      foreground: palettes.neutral[950], // warm near-black body text
      card: "#ffffff",
      cardForeground: palettes.neutral[950],
      popover: "#fbf3e6", // warm cream (Woody Earth tint)
      popoverForeground: palettes.neutral[950],
      primary: palettes.sunshineYellow[500], // BAH Sunshine Yellow
      primaryForeground: "#3a2d05", // dark on yellow (AA)
      secondary: palettes.floralCoral[500], // BAH Floral Coral
      secondaryForeground: "#3f1609", // dark on coral (AA)
      muted: "#f5efe2", // light cream (muted surface on cream bg)
      mutedForeground: "#6b5f55", // warm gray on cream (5.3:1 AA)
      accent: palettes.floralPink[500], // BAH Floral Pink
      accentForeground: "#40212c", // dark plum
      destructive: "#d94848", // accessible red (not in chart)
      border: "rgba(90, 76, 60, 0.18)", // warm neutral
      input: "rgba(90, 76, 60, 0.3)", // warm neutral
      ring: palettes.skyBlue[500], // BAH Sky Blue (focus)
      sidebar: "#ffffff",
      sidebarForeground: "#3a342b",
      sidebarPrimary: palettes.natureGreen[500], // BAH Nature Green
      sidebarPrimaryForeground: "#ffffff",
      sidebarAccent: "#f3f6e6",
      sidebarAccentForeground: "#3a342b",
      sidebarBorder: "#e6e0d6",
      sidebarRing: palettes.skyBlue[500],
    },
  },

  greyscale: {
    label: "Greyscale",
    font: "'General Sans', system-ui, sans-serif",
    brand: {
      bg: "#1a1a1a",
      accent: "#666666",
      text: "#f0f0f0",
      hover: "#999999",
      surface: "#111111",
      subtle: "#e0e0e0",
      secondary: "#888888",
    },
    semantic: {
      background: "#1a1a1a",
      foreground: "#f0f0f0",
      card: "#ffffff",
      cardForeground: "#333333",
      popover: "#e0e0e0",
      popoverForeground: "#333333",
      primary: "#666666",
      primaryForeground: "#f0f0f0",
      secondary: "#888888",
      secondaryForeground: "#ffffff",
      muted: "#2a2a2a",
      mutedForeground: "#aaaaaa",
      accent: "#999999",
      accentForeground: "#0a0a0a",
      destructive: "#ff4444",
      border: "rgba(255, 255, 255, 0.15)",
      input: "rgba(255, 255, 255, 0.15)",
      ring: "#666666",
      sidebar: "#ffffff",
      sidebarForeground: "#333333",
      sidebarPrimary: "#666666",
      sidebarPrimaryForeground: "#ffffff",
      sidebarAccent: "#e0e0e0",
      sidebarAccentForeground: "#0a0a0a",
      sidebarBorder: "#cccccc",
      sidebarRing: "#666666",
    },
  },
} as const satisfies Record<string, Theme>;

export type ThemeKey = keyof typeof themes;

const THEME_KEYS = Object.keys(themes) as ThemeKey[];

/**
 * Validates that a string is a known `ThemeKey`. Returns the typed key or
 * `null`. Used by `lib/site-config.ts` to parse the `SITE_THEME` env var.
 */
export function parseThemeKey(raw: string | undefined): ThemeKey | null {
  if (!raw) return null;
  return (THEME_KEYS as string[]).includes(raw) ? (raw as ThemeKey) : null;
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/**
 * Maps a Theme object to raw CSS custom property entries for injection on
 * `<html style={...}>`. These raw vars (e.g. `--brand-bg`, `--background`)
 * are aliased to Tailwind design tokens (e.g. `--color-brand-bg`,
 * `--color-background`) via the `@theme inline` block in `globals.css`, so
 * changing the active theme here changes every `bg-brand-*` / semantic
 * utility class across the site with no per-component changes needed.
 */
export function themeToCssVars(theme: Theme): Record<string, string> {
  const typographyVars = Object.entries(
    theme.typography ?? defaultTypography,
  ).reduce<Record<string, string>>((vars, [name, style]) => {
    const token = name.replace(
      /[A-Z]/g,
      (letter) => `-${letter.toLowerCase()}`,
    );
    vars[`--type-${token}-font-family`] = `var(--font-${style.font})`;
    vars[`--type-${token}-font-size`] = `${style.size}px`;
    vars[`--type-${token}-font-weight`] = String(style.weight);
    vars[`--type-${token}-line-height`] = String(style.lineHeight);
    return vars;
  }, {});

  return {
    "--page-background-image": theme.pageBackground
      ? `url("${withBasePath(theme.pageBackground.image)}")`
      : "none",
    "--page-background-size": theme.pageBackground?.size ?? "auto",
    "--page-hero-image": theme.pageHeroArt
      ? `url("${withBasePath(theme.pageHeroArt)}")`
      : "none",
    ...(theme.themedArt
      ? {
          "--themed-clearing-map": `url("${withBasePath(theme.themedArt.clearingMap)}")`,
          "--themed-landscape-divider": `url("${withBasePath(theme.themedArt.landscapeDivider)}")`,
          "--themed-banner-background": `url("${withBasePath(theme.themedArt.bannerBackground)}")`,
          "--themed-tree-canopy": `url("${withBasePath(theme.themedArt.treeCanopy)}")`,
        }
      : {}),
    "--brand-bg": theme.brand.bg,
    "--brand-accent": theme.brand.accent,
    "--brand-text": theme.brand.text,
    "--brand-hover": theme.brand.hover,
    "--brand-surface": theme.brand.surface,
    "--brand-subtle": theme.brand.subtle,
    "--brand-secondary": theme.brand.secondary,
    "--background": theme.semantic.background,
    "--foreground": theme.semantic.foreground,
    "--card": theme.semantic.card,
    "--card-foreground": theme.semantic.cardForeground,
    "--popover": theme.semantic.popover,
    "--popover-foreground": theme.semantic.popoverForeground,
    "--primary": theme.semantic.primary,
    "--primary-foreground": theme.semantic.primaryForeground,
    "--secondary": theme.semantic.secondary,
    "--secondary-foreground": theme.semantic.secondaryForeground,
    "--muted": theme.semantic.muted,
    "--muted-foreground": theme.semantic.mutedForeground,
    "--accent": theme.semantic.accent,
    "--accent-foreground": theme.semantic.accentForeground,
    "--destructive": theme.semantic.destructive,
    "--border": theme.semantic.border,
    "--input": theme.semantic.input,
    "--ring": theme.semantic.ring,
    "--sidebar": theme.semantic.sidebar,
    "--sidebar-foreground": theme.semantic.sidebarForeground,
    "--sidebar-primary": theme.semantic.sidebarPrimary,
    "--sidebar-primary-foreground": theme.semantic.sidebarPrimaryForeground,
    "--sidebar-accent": theme.semantic.sidebarAccent,
    "--sidebar-accent-foreground": theme.semantic.sidebarAccentForeground,
    "--sidebar-border": theme.semantic.sidebarBorder,
    "--sidebar-ring": theme.semantic.sidebarRing,
    "--font-theme": theme.font,
    "--font-display": theme.displayFont ?? theme.font,
    "--font-heading": theme.headingFont ?? theme.font,
    "--font-body": theme.bodyFont ?? theme.font,
    "--font-caption": theme.captionFont ?? theme.font,
    "--type-color": theme.typographyColor ?? theme.semantic.foreground,
    ...typographyVars,
  };
}
