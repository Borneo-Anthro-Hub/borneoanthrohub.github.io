import { cn } from "@/lib/utils";
import {
  bahButtonVariants,
  type BahButtonSize,
  type BahButtonVariant,
} from "./button-tokens";

export interface ThemedButtonOptions {
  size?: BahButtonSize;
  className?: string;
}

/**
 * Class helper for elements that cannot render the `BahButton` component
 * (e.g. Next.js `<Link>`). The `bahPrimary` / `bahSecondary` variants include
 * the decorative motif via the `.bah-button-motif` component class, so this
 * helper keeps parity with the component.
 */
export function themedButtonClasses(
  variant: BahButtonVariant = "primary",
  { size, className }: ThemedButtonOptions = {},
) {
  return cn(bahButtonVariants({ variant, size, className }));
}

export type { BahButtonSize, BahButtonVariant };
