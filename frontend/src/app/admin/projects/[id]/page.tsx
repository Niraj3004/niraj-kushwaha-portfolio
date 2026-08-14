"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { projectsApi } from "@/lib/api";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  description: z.string().optional(),
  techTags: z.string().optional(),
  liveLink: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  githubLink: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  role: z.string().optional(),
  featured: z.boolean().optional(),
});
type ProjectValues = z.infer<typeof projectSchema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-ink uppercase tracking-wider">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    projectsApi.getById(id)
      .then((res) => {
        const p = res.data;
        reset({
          title: p.title,
          slug: p.slug,
          summary: p.summary,
          description: p.description || "",
          techTags: p.techTags?.join(", ") || "",
          liveLink: p.liveLink || "",
          githubLink: p.githubLink || "",
          role: p.role || "",
          featured: p.featured || false,
        });
      })
      .catch(() => setError("Failed to load project."))
      .finally(() => setIsLoading(false));
  }, [id, reset]);

  const onSubmit = async (data: ProjectValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("summary", data.summary);
      if (data.description) formData.append("description", data.description);
      if (data.liveLink) formData.append("liveLink", data.liveLink);
      if (data.githubLink) formData.append("githubLink", data.githubLink);
      if (data.role) formData.append("role", data.role);
      formData.append("featured", String(data.featured ?? false));
      const tags = data.techTags?.split(",").map((t) => t.trim()).filter(Boolean) || [];
      tags.forEach((tag) => formData.append("techTags[]", tag));

      const fileInput = document.getElementById("image-upload") as HTMLInputElement;
      if (fileInput?.files) {
        Array.from(fileInput.files).forEach((file) => {
          formData.append("images", file);
        });
      }

      await projectsApi.update(id, formData);
      router.push("/admin/projects");
    } catch (err: any) {
      setError(err.message || "Failed to update project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="skeleton h-64 rounded-2xl" />;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 rounded-xl hover:bg-surface transition-colors text-muted hover:text-ink">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-display text-ink">Edit Project</h1>
          <p className="text-muted text-sm mt-0.5">Update project details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white border border-hairline rounded-2xl p-6 space-y-5">
          <Field label="Title" error={errors.title?.message}>
            <input {...register("title")} className="admin-input" />
          </Field>
          <Field label="Slug" error={errors.slug?.message}>
            <input {...register("slug")} className="admin-input" />
          </Field>
          <Field label="Summary" error={errors.summary?.message}>
            <input {...register("summary")} className="admin-input" />
          </Field>
          <Field label="Description" error={errors.description?.message}>
            <textarea {...register("description")} rows={5} className="admin-input resize-none" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Role" error={errors.role?.message}>
              <input {...register("role")} className="admin-input" />
            </Field>
            <Field label="Tech Tags (comma-separated)" error={errors.techTags?.message}>
              <input {...register("techTags")} className="admin-input" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Live Link" error={errors.liveLink?.message}>
              <input {...register("liveLink")} type="url" className="admin-input" />
            </Field>
            <Field label="GitHub Link" error={errors.githubLink?.message}>
              <input {...register("githubLink")} type="url" className="admin-input" />
            </Field>
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" {...register("featured")} className="w-4 h-4 rounded accent-accent" />
            <span className="text-sm text-ink font-medium">Mark as featured on homepage</span>
          </label>

          <Field label="Add New Images" error="">
            <input
              type="file"
              multiple
              accept="image/*"
              id="image-upload"
              className="admin-input py-2 cursor-pointer"
            />
            <p className="text-xs text-muted mt-1">Upload new images to replace existing ones</p>
          </Field>
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
            Update Project
          </button>
          <Link href="/admin/projects" className="px-6 py-3 border border-hairline rounded-xl text-sm font-semibold text-muted hover:text-ink transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
