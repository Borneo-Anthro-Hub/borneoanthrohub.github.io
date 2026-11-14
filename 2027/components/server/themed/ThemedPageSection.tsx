import PageContainer from "@/components/server/layout/PageContainer";
import { cn } from "@/lib/utils";

interface ThemedPageSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  children: React.ReactNode;
}

/**
 * Content section for the reusable (non-dynamic) pages — venue, BAHjet Guide,
 * clans enrollment, and any future page whose copy only changes between
 * years.
 *
 * Every color and font comes from the active theme's tokens (`primary`,
 * `foreground`, `font-heading`, ...), so a new yearly theme restyles the page
 * without editing this file or the page content.
 */
export default function ThemedPageSection({
  id,
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  children,
}: ThemedPageSectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead);

  return (
    <section
      id={id}
      className={cn(
        "bg-background scroll-mt-20 px-4 py-12 md:px-8 md:py-16",
        className,
      )}
    >
      <PageContainer size="lg">
        {hasHeader && (
          <header
            className={cn(
              "mb-8 flex flex-col gap-3",
              align === "center" ? "items-center text-center" : "items-start",
            )}
          >
            {eyebrow && (
              <span className="bg-primary text-primary-foreground font-caption inline-flex rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="font-heading text-foreground text-2xl leading-tight md:text-3xl">
                {title}
              </h2>
            )}
            {lead && (
              <p className="text-foreground/75 font-body max-w-3xl text-sm leading-relaxed md:text-base">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </PageContainer>
    </section>
  );
}
