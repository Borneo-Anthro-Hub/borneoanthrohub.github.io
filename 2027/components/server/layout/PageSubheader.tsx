/* ------------------------------------------------------------------ */
/*  Yellow pill badge                                                  */
/* ------------------------------------------------------------------ */
function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-brand-accent text-primary-foreground font-caption inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-wide uppercase">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  PageSubheader — slim branded bar below the main nav.              */
/*  Accepts eyebrow + title + optional description or children.       */
/* ------------------------------------------------------------------ */
interface PageSubheaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageSubheader({
  eyebrow,
  title,
  description,
  children,
}: PageSubheaderProps) {
  return (
    <section className="bg-brand-surface px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
        <PillBadge>{eyebrow}</PillBadge>
        <h1 className="font-display text-3xl text-white md:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="text-brand-text/70 font-body text-sm">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
