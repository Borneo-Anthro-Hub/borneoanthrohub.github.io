// =============================================================================
// BAH 2027 COLOR PALETTES
// =============================================================================
// Single source of truth for the BAH 2027 color scales. The values here are
// injected as raw CSS custom properties on <html> (see `paletteToCssVars`),
// then aliased to Tailwind color tokens in `app/globals.css`
// (`--color-nature-green-500` -> `bg-nature-green-500`, etc.).
//
// Components must use the Tailwind token classes (or the `--palette-*` vars)
// instead of raw hex values, so a palette tweak only touches this file.
// =============================================================================

export const COLOR_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export type ColorStep = (typeof COLOR_STEPS)[number];
export type ColorScale = Record<ColorStep, string>;

export const palettes = {
  natureGreen: {
    50: "#F3F8DA",
    100: "#E2ECB7",
    200: "#C9E090",
    300: "#A1C678",
    400: "#87B259",
    500: "#70A33C",
    600: "#4F873C",
    700: "#3B6F2D",
    800: "#225226",
    900: "#163D20",
    950: "#092413",
  },
  sunshineYellow: {
    50: "#FFF9E1",
    100: "#FFF0B7",
    200: "#FDE279",
    300: "#FED23E",
    400: "#FFC734",
    500: "#F5B426",
    600: "#D79C18",
    700: "#AE7E10",
    800: "#825D0D",
    900: "#573D0C",
    950: "#2F2104",
  },
  floralPink: {
    50: "#FFF3F7",
    100: "#FEE3EA",
    200: "#FFD1DE",
    300: "#FEBECF",
    400: "#FEB1C5",
    500: "#FFA7BF",
    600: "#F28AA5",
    700: "#D96E88",
    800: "#A44F66",
    900: "#723545",
    950: "#3B1A23",
  },
  floralCoral: {
    50: "#FEF3EF",
    100: "#FFE2DA",
    200: "#FFC7B8",
    300: "#FEA994",
    400: "#FE9580",
    500: "#FF836D",
    600: "#DC6551",
    700: "#B34F3F",
    800: "#843A2F",
    900: "#58261F",
    950: "#301410",
  },
  skyBlue: {
    50: "#E6F1F7",
    100: "#B6E5F5",
    200: "#7CD5F7",
    300: "#65C6F0",
    400: "#4EB9E5",
    500: "#41ACE0",
    600: "#3092C3",
    700: "#23759D",
    800: "#1C597A",
    900: "#103D52",
    950: "#08202C",
  },
  woodyEarth: {
    50: "#FAF5EF",
    100: "#F3E2D0",
    200: "#E6C9A5",
    300: "#DDB488",
    400: "#D3A77A",
    500: "#CCA073",
    600: "#B88357",
    700: "#93613C",
    800: "#6C4A2E",
    900: "#4A311B",
    950: "#25180F",
  },
  neutral: {
    50: "#F9F3E7",
    100: "#F2E6D6",
    200: "#E5D9CB",
    300: "#D4C8BC",
    400: "#BEB4AA",
    500: "#A79D94",
    600: "#8C8279",
    700: "#6F665D",
    800: "#544D47",
    900: "#38332F",
    950: "#1E1A17",
  },
} as const satisfies Record<string, ColorScale>;

export type PaletteName = keyof typeof palettes;

/**
 * One-off state colors from the button spec that do not belong to a
 * 50-950 scale. They still live here so components never hardcode hex.
 */
export const stateColors = {
  accentDisabled: "#C5D1C7",
  bahSecondaryDisabled: "#FAF8F2",
} as const;

const paletteCssName = (name: string) =>
  name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/**
 * Raw palette vars injected on `<html>` (e.g. `--palette-nature-green-500`).
 * `app/globals.css` aliases these to Tailwind's `--color-*` namespace.
 */
export function paletteToCssVars(): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [name, scale] of Object.entries(palettes)) {
    for (const step of COLOR_STEPS) {
      vars[`--palette-${paletteCssName(name)}-${step}`] = scale[step];
    }
  }

  vars["--palette-bah-accent-disabled"] = stateColors.accentDisabled;
  vars["--palette-bah-secondary-disabled"] = stateColors.bahSecondaryDisabled;

  return vars;
}
