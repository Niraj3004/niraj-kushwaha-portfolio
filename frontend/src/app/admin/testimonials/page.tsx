"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { testimonialsApi } from "@/lib/api";
import { Plus, Trash2, Quote } from "lucide-react";

const schema = z.object({
  author: z.string().min(1, "Author name is required"),
  role: z.string().min(1, "Role is required"),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  avatar: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});
type Values = z.infer<typeof schema>;

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const fetchTestimonials = () => {
    testimonialsApi.getAll()
      .then((res) => setTestimonials(res.data || []))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const onSubmit = async (data: Values) => {
    setIsSubmitting(true);
    setError("");
    try {
      await testimonialsApi.create(data);
      reset();
      fetchTestimonials();
    } catch (err: any) {
      setError(err.message || "Failed to add testimonial.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    setDeletingId(id);
    try {
      await testimonialsApi.delete(id);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch {
      alert("Failed to delete testimonial.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-ink">Testimonials</h1>
        <p className="text-muted mt-1">Add real testimonials — they show on your homepage automatically once added.</p>
      </div>

      {/* Add form */}
      <div className="bg-white border border-hairline rounded-2xl p-6">
        <h2 className="font-semibold text-ink mb-5">Add Testimonial</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">Author Name</label>
              <input {...register("author")} placeholder="John Doe" className="admin-input" />
              {errors.author && <p className="text-red-500 text-xs">{errors.author.message}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink uppercase tracking-wider">Role</label>
              <input {...register("role")} placeholder="CEO, Example Co." className="admin-input" />
              {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-ink uppercase tracking-wider">Quote</label>
            <textarea {...register("quote")} rows={3} placeholder="Niraj is an excellent developer..." className="admin-input resize-none" />
            {errors.quote && <p className="text-red-500 text-xs">{errors.quote.message}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-ink uppercase tracking-wider">Avatar URL (optional)</label>
            <input {...register("avatar")} type="url" placeholder="https://..." className="admin-input" />
            {errors.avatar && <p className="text-red-500 text-xs">{errors.avatar.message}</p>}
          </div>
          {error && <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-xl text-sm font-semibold hover:bg-ink/80 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={16} />}
            Add Testimonial
          </button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => <div key={i} className="skeleton h-24 w-full rounded-2xl" />)
        ) : testimonials.length === 0 ? (
          <div className="py-16 text-center bg-white border border-hairline rounded-2xl text-muted">
            No testimonials yet. Add your first one above.
          </div>
        ) : (
          testimonials.map((t) => (
            <div key={t._id} className="flex gap-4 bg-white border border-hairline rounded-2xl p-5 hover:shadow-sm transition-shadow">
              <Quote className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-ink italic mb-3">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  {t.avatar && (
                    <img src={t.avatar} alt={t.author} className="w-8 h-8 rounded-full object-cover border border-hairline" />
                  )}
                  <div>
                    <span className="font-semibold text-sm text-ink">{t.author}</span>
                    <span className="text-muted text-sm"> · {t.role}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(t._id)}
                disabled={deletingId === t._id}
                className="p-2 text-muted hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors self-start disabled:opacity-50"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
