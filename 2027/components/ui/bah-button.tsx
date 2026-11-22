import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@/lib/utils";
import {
  bahButtonVariants,
  type BahButtonSize,
  type BahButtonVariant,
} from "@/lib/theme/button-tokens";

type ButtonPrimitiveProps = Omit<ButtonPrimitive.Props, "className">;

export interface BahButtonProps extends ButtonPrimitiveProps {
  variant?: BahButtonVariant;
  size?: BahButtonSize;
  /** Optional leading glyph/icon, rendered after the decorative motif. */
  leadingIcon?: React.ReactNode;
  /** Renders the trailing `▸` affordance from the 2027 spec. */
  trailingCaret?: boolean;
  className?: string;
}

/**
 * BAH 2027 pill button for native actions. For navigation, style a Next.js
 * `<Link>` with `themedButtonClasses()` so the element keeps link semantics;
 * the `render` prop is still available when a different element is required.
 */
export function BahButton({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingCaret = false,
  className,
  children,
  type = "button",
  ...props
}: BahButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="bah-button"
      data-variant={variant}
      data-size={size}
      type={type}
      className={cn(bahButtonVariants({ variant, size }), className)}
      {...props}
    >
      {leadingIcon ? (
        <span
          data-icon="inline-start"
          aria-hidden="true"
          className="inline-flex shrink-0 items-center"
        >
          {leadingIcon}
        </span>
      ) : null}
      {children}
      {trailingCaret ? (
        <span
          data-icon="inline-end"
          aria-hidden="true"
          className="text-[0.9em] leading-none"
        >
          ▸
        </span>
      ) : null}
    </ButtonPrimitive>
  );
}

export { bahButtonVariants };
export type { BahButtonSize, BahButtonVariant };
