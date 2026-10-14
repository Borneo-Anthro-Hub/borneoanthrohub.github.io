import { cn } from "@/lib/utils";

type PageContainerSize = "sm" | "default" | "lg" | "xl" | "full";

const sizeClasses: Record<PageContainerSize, string> = {
  sm: "max-w-2xl",
  default: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "",
};

interface PageContainerProps {
  /** Controls the max-width. @default "default" */
  size?: PageContainerSize;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared width-constraining wrapper for page-level content.
 *
 * All pages use the same set of widths via the `size` prop so the site feels
 * consistent.  Pages that need an exception (e.g. a full-bleed gallery) can
 * pass `size="full"` or override `className`.
 *
 * @example
 * // Standard page content
 * <PageContainer>
 *   <h1>About Us</h1>
 *   <p>...</p>
 * </PageContainer>
 *
 * @example
 * // Wider layout for a dashboard
 * <PageContainer size="lg">
 *   <DashboardGrid />
 * </PageContainer>
 */
export default function PageContainer({
  size = "default",
  className,
  children,
}: PageContainerProps) {
  return (
    <div className={cn("mx-auto w-full", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
