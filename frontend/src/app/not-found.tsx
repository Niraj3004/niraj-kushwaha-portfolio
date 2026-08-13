import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-lg px-6">
        <p className="text-small font-semibold text-accent uppercase tracking-widest">404</p>
        <h1 className="text-display font-display text-ink">Page not found.</h1>
        <p className="text-h3 text-muted font-sans font-normal">
          Looks like this page doesn't exist. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="px-8 py-4 bg-ink text-white rounded-full text-body font-semibold hover:bg-ink/80 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="px-8 py-4 border border-hairline rounded-full text-body font-semibold text-muted hover:text-ink hover:border-ink transition-colors"
          >
            View Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
