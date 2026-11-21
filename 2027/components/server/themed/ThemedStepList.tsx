import Image from "next/image";
import ThemedCard from "@/components/server/themed/ThemedCard";
import { cn, withBasePath } from "@/lib/utils";

export interface ThemedStep {
  title: string;
  body: string;
  /** Optional photo walking the reader through the step. */
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface ThemedStepListProps {
  steps: readonly ThemedStep[];
  /**
   * `cards` places every step in a card (photo on top when provided);
   * `list` renders a compact numbered list for short instructions.
   */
  variant?: "cards" | "list";
  className?: string;
}

function StepBadge({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="bg-primary text-primary-foreground font-caption inline-grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold"
    >
      {index + 1}
    </span>
  );
}

/**
 * Ordered walkthrough used by the venue guide. The layout is theme-agnostic —
 * numbered badges use the theme's `primary` pair and photos are year-neutral
 * art from `/shared_images`.
 */
export default function ThemedStepList({
  steps,
  variant = "cards",
  className,
}: ThemedStepListProps) {
  if (variant === "list") {
    return (
      <ol className={cn("flex flex-col gap-5", className)}>
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <StepBadge index={index} />
            <div className="space-y-1">
              <h3 className="font-display text-card-foreground text-base leading-tight">
                {step.title}
              </h3>
              <p className="text-card-foreground/80 font-body text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("grid gap-5 sm:grid-cols-2", className)}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <ThemedCard className="flex h-full flex-col overflow-hidden">
            {step.image && (
              <div className="bg-muted relative aspect-[4/3] w-full">
                <Image
                  src={withBasePath(step.image.src)}
                  alt={step.image.alt}
                  width={step.image.width}
                  height={step.image.height}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-center gap-2">
                <StepBadge index={index} />
                <h3 className="font-display text-card-foreground text-base leading-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-card-foreground/80 font-body text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          </ThemedCard>
        </li>
      ))}
    </ol>
  );
}
