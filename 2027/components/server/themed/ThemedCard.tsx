import { cn } from "@/lib/utils";

interface ThemedCardProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Surface used by the reusable content-page layouts. Colors come from the
 * active theme's card tokens, so yearly themes restyle every card without
 * touching page content.
 */
export default function ThemedCard({
  id,
  className,
  children,
}: ThemedCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "themed-card bg-card text-card-foreground border-card-foreground/15 rounded-2xl border shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
