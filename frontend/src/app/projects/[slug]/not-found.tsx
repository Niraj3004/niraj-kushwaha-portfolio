import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md px-6">
        <p className="text-small font-semibold text-accent uppercase tracking-widest">404</p>
        <h1 className="text-h2 font-display text-ink">Project not found</h1>
        <p className="text-body text-muted">
          This project doesn't exist or may have been moved.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full text-small font-semibold hover:bg-ink/80 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
