"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

/**
 * Root-level error boundary.
 *
 * Renders when the root layout itself crashes — must include its own
 * `<html>` and `<body>` tags because it replaces the entire layout tree.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col items-center justify-center gap-4 bg-neutral-50 p-8 text-center font-sans text-neutral-900">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-sm text-neutral-500">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => unstable_retry()}
          className="rounded border border-neutral-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-neutral-100"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
