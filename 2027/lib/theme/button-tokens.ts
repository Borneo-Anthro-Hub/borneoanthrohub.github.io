// =============================================================================
// BAH 2027 BUTTON TOKENS
// =============================================================================
// Structured variant/state map for the BAH 2027 button system. Every state
// references a palette token (`bg-floral-coral-500`, `text-woody-earth-700`,
// …) — never a raw hex value — so re-theming only requires changing
// `lib/theme/palettes.ts`.
//
// The classes are written as complete strings (not interpolated) so Tailwind's
// scanner can see them.
// =============================================================================

import { cva, type VariantProps } from "class-variance-authority";

export type ButtonState = "default" | "hover" | "focused" | "disabled";

export interface ButtonStateTokens {
  /** Resting appearance. */
  default: string;
  /** `:hover` (and group-hover where a motif also changes). */
  hover: string;
  /** `:focus-visible` — the accessible keyboard focus ring/state. */
  focused: string;
  /** Native `:disabled` plus `aria-disabled` for link-rendered buttons. */
  disabled: string;
}

export const buttonStateTokens = {
  primary: {
    default: "bg-floral-coral-500 text-white",
    hover: "hover:bg-floral-coral-600",
    focused: "focus-visible:ring-floral-coral-200",
    disabled:
      "disabled:bg-floral-coral-100 disabled:text-white aria-disabled:bg-floral-coral-100 aria-disabled:text-white",
  },
  secondary: {
    default: "bg-floral-coral-100 text-floral-coral-700",
    hover: "hover:bg-floral-coral-400 hover:text-white",
    focused: "focus-visible:ring-floral-coral-500",
    disabled:
      "disabled:bg-floral-coral-50 disabled:text-floral-coral-300 aria-disabled:bg-floral-coral-50 aria-disabled:text-floral-coral-300",
  },
  links: {
    default: "bg-transparent text-woody-earth-700",
    hover: "hover:bg-transparent hover:text-woody-earth-900",
    focused: "focus-visible:ring-woody-earth-200",
    disabled:
      "disabled:bg-transparent disabled:text-neutral-300 aria-disabled:bg-transparent aria-disabled:text-neutral-300",
  },
  accent: {
    default: "bg-nature-green-800 text-white",
    hover: "hover:bg-nature-green-950",
    focused:
      "focus-visible:bg-nature-green-900 focus-visible:ring-nature-green-300",
    disabled:
      "disabled:bg-bah-accent-disabled disabled:text-white aria-disabled:bg-bah-accent-disabled aria-disabled:text-white",
  },
  bahPrimary: {
    default:
      "bah-button-motif bg-nature-green-700 text-white [--bah-button-motif-color:var(--palette-nature-green-200)]",
    hover:
      "hover:bg-nature-green-950 hover:[--bah-button-motif-color:var(--palette-nature-green-400)]",
    focused:
      "focus-visible:bg-nature-green-800 focus-visible:ring-nature-green-300 focus-visible:[--bah-button-motif-color:var(--palette-nature-green-300)]",
    disabled:
      "disabled:bg-bah-accent-disabled disabled:text-white disabled:[--bah-button-motif-color:var(--palette-nature-green-100)] aria-disabled:bg-bah-accent-disabled aria-disabled:text-white aria-disabled:[--bah-button-motif-color:var(--palette-nature-green-100)]",
  },
  bahSecondary: {
    default:
      "bah-button-motif bg-sunshine-yellow-50 text-neutral-950 shadow-md shadow-neutral-950/10 [--bah-button-motif-color:var(--palette-nature-green-500)]",
    hover:
      "hover:bg-sunshine-yellow-100 hover:[--bah-button-motif-color:var(--palette-nature-green-600)]",
    focused:
      "focus-visible:bg-sunshine-yellow-200 focus-visible:ring-sunshine-yellow-500",
    disabled:
      "disabled:bg-bah-secondary-disabled disabled:text-neutral-400 disabled:shadow-none disabled:[--bah-button-motif-color:var(--palette-neutral-300)] aria-disabled:bg-bah-secondary-disabled aria-disabled:text-neutral-400 aria-disabled:shadow-none aria-disabled:[--bah-button-motif-color:var(--palette-neutral-300)]",
  },
} as const satisfies Record<string, ButtonStateTokens>;

const stateClasses = (tokens: ButtonStateTokens) =>
  [tokens.default, tokens.hover, tokens.focused, tokens.disabled].join(" ");

const buttonBase =
  "group/button font-display relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-0 whitespace-nowrap uppercase tracking-wide transition-[background-color,color,box-shadow,transform] duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export const bahButtonVariants = cva(buttonBase, {
  variants: {
    variant: {
      primary: stateClasses(buttonStateTokens.primary),
      secondary: stateClasses(buttonStateTokens.secondary),
      links: stateClasses(buttonStateTokens.links),
      accent: stateClasses(buttonStateTokens.accent),
      bahPrimary: stateClasses(buttonStateTokens.bahPrimary),
      bahSecondary: stateClasses(buttonStateTokens.bahSecondary),
    },
    size: {
      sm: "min-h-9 gap-1.5 px-4 py-1.5 text-xs",
      md: "min-h-11 gap-2 px-6 py-2.5 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type BahButtonVariant = NonNullable<
  VariantProps<typeof bahButtonVariants>["variant"]
>;
export type BahButtonSize = NonNullable<
  VariantProps<typeof bahButtonVariants>["size"]
>;
