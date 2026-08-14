"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postsApi } from "@/lib/api";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  published: z.boolean().optional(),
});
type PostValues = z.infer<typeof postSchema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-ink uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default function NewPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PostValues>({
    resolver: zodResolver(postSchema),
    defaultValues: { published: false },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setValue("slug", slug);
  };

  const onSubmit = async (data: PostValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      const tags = data.tags?.split(",").map((t) => t.trim()).filter(Boolean) || [];
      await postsApi.create({ ...data, tags });
      router.push("/admin/posts");
    } catch (err: any) {
      setError(err.message || "Failed to create post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="p-2 rounded-xl hover:bg-surface transition-colors text-muted hover:text-ink">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-ink">New Post</h1>
          <p className="text-muted text-sm mt-0.5">Write a new blog post</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white border border-hairline rounded-2xl p-6 space-y-5">
          <Field label="Title" error={errors.title?.message}>
            <input
              {...register("title")}
              onChange={(e) => { register("title").onChange(e); handleTitleChange(e); }}
              placeholder="My First Blog Post"
              className="admin-input"
            />
          </Field>
          <Field label="Slug" error={errors.slug?.message}>
            <input {...register("slug")} placeholder="my-first-blog-post" className="admin-input" />
          </Field>
          <Field label="Excerpt (short summary)" error={errors.excerpt?.message}>
            <input {...register("excerpt")} placeholder="A brief description of this post..." className="admin-input" />
          </Field>
          <Field label="Content (Markdown supported)" error={errors.content?.message}>
            <textarea
              {...register("content")}
              rows={12}
              placeholder="# Heading&#10;&#10;Write your content here..."
              className="admin-input resize-y font-mono text-sm"
            />
          </Field>
          <Field label="Tags (comma-separated)" error={errors.tags?.message}>
            <input {...register("tags")} placeholder="Next.js, React, TypeScript" className="admin-input" />
          </Field>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("published")} className="w-4 h-4 rounded accent-accent" />
            <span className="text-sm text-ink font-medium">Publish immediately (visible on site)</span>
          </label>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-xl font-semibold hover:bg-ink/80 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
            Save Post
          </button>
          <Link href="/admin/posts" className="px-6 py-3 border border-hairline rounded-xl text-sm font-semibold text-muted hover:text-ink transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
