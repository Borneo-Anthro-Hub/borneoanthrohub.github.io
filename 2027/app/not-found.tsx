import Link from "next/link";

/**
 * Root 404 page.
 *
 * Rendered when `notFound()` is called inside a route segment that does not
 * have its own `not-found.tsx` — e.g. when `requireFeature` blocks a route.
 */
export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <span className="border-border text-muted-foreground border px-2 py-1 font-mono text-xs">
        404
      </span>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        The page you&rsquo;re looking for doesn&rsquo;t exist or isn&rsquo;t
        available right now. It may be enabled in a later phase of the website
        lifecycle.
      </p>
      <Link
        href="/"
        className="text-brand-accent text-sm font-medium hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
}
