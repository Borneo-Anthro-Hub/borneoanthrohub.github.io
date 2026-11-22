import ThemedCard from "@/components/server/themed/ThemedCard";
import { cn } from "@/lib/utils";

interface ThemedCalloutProps {
  title?: string;
  tone?: "neutral" | "accent";
  className?: string;
  children: React.ReactNode;
}

/**
 * Slim paper card for disclaimers and good-to-know notes. It shares the
 * themed card surface so callouts sit naturally beside icon cards.
 */
export default function ThemedCallout({
  title,
  tone = "neutral",
  className,
  children,
}: ThemedCalloutProps) {
  const isAccent = tone === "accent";

  return (
    <ThemedCard as="aside" className={cn("p-6", className)}>
      <div className="flex flex-col gap-2">
        {title && (
          <p
            className={cn(
              "font-caption flex items-center gap-2 text-xs font-bold tracking-widest uppercase",
              isAccent ? "text-brand-surface" : "text-card-foreground/70",
            )}
          >
            {isAccent && (
              <span
                aria-hidden="true"
                className="bg-brand-surface h-1 w-3 shrink-0 rounded-full"
              />
            )}
            {title}
          </p>
        )}
        <div className="font-body text-card-foreground/80 space-y-2 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </ThemedCard>
  );
}
