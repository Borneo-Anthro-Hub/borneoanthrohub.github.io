import Image from "next/image";
import ThemedCard from "@/components/server/themed/ThemedCard";
import { cn, withBasePath } from "@/lib/utils";

export interface ThemedIconCardProps {
  /** Shared (year-neutral) artwork, e.g. `/shared_images/venue/icon-taxis.svg`. */
  icon?: string;
  iconAlt?: string;
  title: string;
  children: React.ReactNode;
  /** Optional footer content such as quick facts, links, or a status pill. */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Icon + copy card used for transport options, guide categories, and similar
 * "pick one" content on the reusable pages.
 */
export default function ThemedIconCard({
  icon,
  iconAlt = "",
  title,
  children,
  footer,
  className,
}: ThemedIconCardProps) {
  return (
    <ThemedCard className={cn("flex h-full flex-col gap-4 p-6", className)}>
      <div className="flex items-center gap-3">
        {icon && (
          <span className="bg-brand-subtle grid h-12 w-12 shrink-0 place-items-center rounded-full">
            <Image
              src={withBasePath(icon)}
              alt={iconAlt}
              width={42}
              height={42}
              className="h-7 w-7"
            />
          </span>
        )}
        <h3 className="font-display text-card-foreground text-lg leading-tight">
          {title}
        </h3>
      </div>

      <div className="font-body text-card-foreground/80 flex-1 space-y-3 text-sm leading-relaxed">
        {children}
      </div>

      {footer && <div className="mt-auto pt-2">{footer}</div>}
    </ThemedCard>
  );
}
