import { cn } from "@/lib/utils";

const base =
  "font-display inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold tracking-wide uppercase transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";

export function themedButtonClasses(
  variant: "primary" | "outline",
  className?: string,
) {
  return cn(
    base,
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground border",
    className,
  );
}
