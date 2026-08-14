"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projectsApi } from "@/lib/api";
import { Plus, Pencil, Trash2, ExternalLink, Star } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await projectsApi.getAll();
      setProjects(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await projectsApi.delete(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      alert("Failed to delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-ink">Projects</h1>
          <p className="text-muted mt-1">{projects.length} total projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-xl text-sm font-semibold hover:bg-ink/80 transition-colors"
        >
          <Plus size={16} /> Add Project
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="py-24 text-center bg-white border border-hairline rounded-2xl">
          <p className="text-muted mb-4">No projects yet.</p>
          <Link href="/admin/projects/new" className="text-accent font-semibold hover:underline">
            Add your first project →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center gap-4 bg-white border border-hairline rounded-2xl p-4 hover:shadow-sm transition-shadow"
            >
              {/* Image thumbnail */}
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface border border-hairline flex-shrink-0">
                {project.images?.[0]?.url ? (
                  <img
                    src={project.images[0].url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted text-xs">
                    No img
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink truncate">{project.title}</span>
                  {project.featured && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full font-medium">
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted truncate mt-0.5">{project.summary}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {project.techTags?.slice(0, 4).map((tag: string) => (
                    <span key={tag} className="px-2 py-0.5 bg-surface text-xs text-muted rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-muted hover:text-ink rounded-lg hover:bg-surface transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <Link
                  href={`/admin/projects/${project._id}`}
                  className="p-2 text-muted hover:text-accent rounded-lg hover:bg-surface transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(project._id)}
                  disabled={deletingId === project._id}
                  className="p-2 text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
