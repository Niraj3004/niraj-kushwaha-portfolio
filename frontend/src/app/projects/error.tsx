"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md px-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 border border-red-100">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-h3 font-display text-ink">Something went wrong</h2>
        <p className="text-body text-muted">
          We had trouble loading the projects. Please try again.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-ink text-white rounded-full text-small font-semibold hover:bg-ink/80 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-hairline rounded-full text-small font-semibold text-muted hover:text-ink hover:border-ink transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
