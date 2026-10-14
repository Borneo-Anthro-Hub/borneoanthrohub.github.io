"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

/**
 * Error boundary for the public route group.
 *
 * Same visual treatment as the root error boundary — renders inside the
 * Header / Footer chrome so visitors can still navigate away.
 */
export default function PublicErrorPage({
  error,
  unstable_retry,
}: ErrorPageProps) {
  useEffect(() => {
    console.error("Public error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <span className="border-border text-muted-foreground border px-2 py-1 font-mono text-xs">
        Error
      </span>
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-muted-foreground max-w-md text-sm">
        An unexpected error occurred while loading this page.
      </p>
      <button
        onClick={() => unstable_retry()}
        className="text-brand-accent text-sm font-medium hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
