interface ComingSoonProps {
  emoji: string;
  message: string;
}

export default function ComingSoon({ emoji, message }: ComingSoonProps) {
  return (
    <section className="px-4 py-12 md:px-8">
      <div
        className="border-border mx-auto flex max-w-md flex-col items-center justify-center gap-3 border border-dashed p-10 text-center"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 12px)",
        }}
      >
        <span className="bg-background px-3 text-4xl">{emoji}</span>
        <p className="bg-background text-muted-foreground px-3 text-sm italic">
          {message}
        </p>
      </div>
    </section>
  );
}
