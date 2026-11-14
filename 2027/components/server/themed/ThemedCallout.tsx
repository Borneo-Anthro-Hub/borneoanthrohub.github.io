import { cn } from "@/lib/utils";

interface ThemedCalloutProps {
  title?: string;
  tone?: "neutral" | "accent";
  className?: string;
  children: React.ReactNode;
}

/**
 * Small aside for disclaimers and good-to-know notes. Text always sits on the
 * theme's card surface so contrast holds for both light and dark page
 * backgrounds.
 */
export default function ThemedCallout({
  title,
  tone = "neutral",
  className,
  children,
}: ThemedCalloutProps) {
  return (
    <aside
      className={cn(
        "bg-card text-card-foreground border-card-foreground/15 rounded-xl border px-5 py-4",
        tone === "accent" ? "border-brand-accent border-l-4" : "",
        className,
      )}
    >
      {title && (
        <p className="font-caption text-card-foreground mb-1 text-xs font-bold tracking-widest uppercase">
          {title}
        </p>
      )}
      <div className="font-body text-card-foreground/80 text-xs leading-relaxed md:text-sm">
        {children}
      </div>
    </aside>
  );
}
