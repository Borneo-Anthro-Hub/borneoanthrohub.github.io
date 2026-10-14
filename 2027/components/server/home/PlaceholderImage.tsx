/**
 * Diagonal-line placeholder image. Used wherever we need a visual placeholder
 * before real assets are available (venue photo, GoH headshots, etc.).
 */
export default function PlaceholderImage({
  className = "",
  aspectRatio = "16/9",
  label,
}: {
  className?: string;
  aspectRatio?: string;
  label?: string;
}) {
  return (
    <div
      className={`bg-muted flex items-center justify-center overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <svg
        className="text-muted-foreground/25 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="diagonal-hash"
            patternUnits="userSpaceOnUse"
            width="16"
            height="16"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="16"
              stroke="currentColor"
              strokeWidth="2"
            />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#diagonal-hash)" />
      </svg>
      {label && (
        <span className="text-muted-foreground/50 absolute font-mono text-xs">
          {label}
        </span>
      )}
    </div>
  );
}
