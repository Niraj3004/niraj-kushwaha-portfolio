"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { postsApi } from "@/lib/api";
import { Plus, Pencil, Trash2, Globe, EyeOff } from "lucide-react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    postsApi.getAll()
      .then((res) => setPosts(res.data || []))
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await postsApi.delete(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-ink">Blog Posts</h1>
          <p className="text-muted mt-1">{posts.length} total posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-xl text-sm font-semibold hover:bg-ink/80 transition-colors"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-20 w-full rounded-2xl" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="py-24 text-center bg-white border border-hairline rounded-2xl">
          <p className="text-muted mb-4">No blog posts yet.</p>
          <Link href="/admin/posts/new" className="text-accent font-semibold hover:underline">
            Write your first post →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex items-center gap-4 bg-white border border-hairline rounded-2xl p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-ink truncate">{post.title}</span>
                  <span className={`flex items-center gap-1 px-2 py-0.5 text-xs rounded-full font-medium ${
                    post.published
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {post.published ? <><Globe size={10} /> Published</> : <><EyeOff size={10} /> Draft</>}
                  </span>
                </div>
                <p className="text-sm text-muted mt-0.5 truncate">{post.excerpt || post.content?.substring(0, 100)}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/admin/posts/${post._id}`}
                  className="p-2 text-muted hover:text-accent rounded-lg hover:bg-surface transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={deletingId === post._id}
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
