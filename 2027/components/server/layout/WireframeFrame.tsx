interface WireframeFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Adds small corner-bracket marks around its children, giving boxed content
 * (hero, cards, forms) a tidy "wireframe annotation" look.
 */
export default function WireframeFrame({
  children,
  className = "",
}: WireframeFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <span className="border-border pointer-events-none absolute -top-px -left-px h-3 w-3 border-t border-l" />
      <span className="border-border pointer-events-none absolute -top-px -right-px h-3 w-3 border-t border-r" />
      <span className="border-border pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b border-l" />
      <span className="border-border pointer-events-none absolute -right-px -bottom-px h-3 w-3 border-r border-b" />
      {children}
    </div>
  );
}
