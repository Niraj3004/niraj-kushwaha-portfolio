"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { homepageApi } from "@/lib/api";
import { Save, Plus, Trash2, GripVertical, Image as ImageIcon } from "lucide-react";

export default function HomepageEditor() {
  const [activeTab, setActiveTab] = useState<"hero" | "about" | "skills" | "timeline" | "services">("hero");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      hero: { badge: "", headline: "", subheadline: "", description: "" },
      about: { bioParagraph1: "", bioParagraph2: "", stats: [], photoUrl: "" },
      skills: [],
      timeline: [],
      services: []
    } as any
  });

  const { fields: statFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "about.stats" });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: timelineFields, append: appendTimeline, remove: removeTimeline } = useFieldArray({ control, name: "timeline" });
  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control, name: "services" });

  useEffect(() => {
    homepageApi.get().then((res) => {
      const d = res.data;
      reset({
        hero: d.hero || {},
        about: { ...d.about, photoUrl: d.about?.photo },
        skills: d.skills || [],
        timeline: d.timeline || [],
        services: d.services || []
      });
      setIsLoading(false);
    });
  }, [reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // We stringify the sections for the backend
      formData.append("hero", JSON.stringify(data.hero));
      formData.append("about", JSON.stringify({ ...data.about, photo: data.about.photoUrl }));
      formData.append("skills", JSON.stringify(data.skills));
      formData.append("timeline", JSON.stringify(data.timeline));
      formData.append("services", JSON.stringify(data.services));

      const fileInput = document.getElementById("photo-upload") as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append("photo", fileInput.files[0]);
      }

      await homepageApi.update(formData);
      alert("Homepage updated successfully!");
    } catch (e) {
      alert("Failed to update homepage");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="skeleton h-64 rounded-2xl" />;

  const tabs = [
    { id: "hero", label: "Hero Section" },
    { id: "about", label: "About Me" },
    { id: "skills", label: "Skills" },
    { id: "timeline", label: "Experience" },
    { id: "services", label: "Services" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-ink">Homepage Editor</h1>
          <p className="text-muted mt-1">Manage all the content on your main portfolio page.</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-ink text-white rounded-xl text-sm font-semibold hover:bg-ink/80 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
          Publish Changes
        </button>
      </div>

      <div className="flex space-x-2 border-b border-hairline overflow-x-auto pb-px">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id ? "border-accent text-accent" : "border-transparent text-muted hover:text-ink hover:border-hairline"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-hairline rounded-2xl p-6">
        {activeTab === "hero" && (
          <div className="space-y-5">
            <Field label="Availability Badge">
              <input {...register("hero.badge")} className="admin-input" placeholder="Available for new projects" />
            </Field>
            <Field label="Main Headline (Part 1)">
              <input {...register("hero.headline")} className="admin-input" placeholder="Crafting digital experiences that" />
            </Field>
            <Field label="Main Headline (Part 2)">
              <input {...register("hero.subheadline")} className="admin-input" placeholder="inspire and perform." />
            </Field>
            <Field label="Description (Subheading)">
              <textarea {...register("hero.description")} rows={3} className="admin-input resize-none" />
            </Field>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Bio Paragraph 1">
                <textarea {...register("about.bioParagraph1")} rows={6} className="admin-input resize-none" />
              </Field>
              <Field label="Bio Paragraph 2">
                <textarea {...register("about.bioParagraph2")} rows={6} className="admin-input resize-none" />
              </Field>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-ink uppercase tracking-wider">Profile Photo</label>
              <div className="flex items-center gap-4">
                {watch("about.photoUrl") && (
                  <img src={watch("about.photoUrl")} alt="Current" className="w-16 h-16 rounded-xl object-cover border border-hairline" />
                )}
                <div className="flex-1">
                  <input type="file" id="photo-upload" accept="image/*" className="admin-input py-2 cursor-pointer" />
                  <p className="text-xs text-muted mt-1">Upload a new profile photo (replaces current)</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-hairline">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider">Stats Bar</label>
                <button type="button" onClick={() => appendStat({ value: "", label: "", isNumber: false })} className="text-xs text-accent font-semibold hover:underline">
                  + Add Stat
                </button>
              </div>
              <div className="space-y-3">
                {statFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3 bg-surface p-3 rounded-xl">
                    <input {...register(`about.stats.${index}.value`)} placeholder="Value (e.g. 4+ or dot)" className="admin-input py-2 w-1/3" />
                    <input {...register(`about.stats.${index}.label`)} placeholder="Label (e.g. Projects Shipped)" className="admin-input py-2 w-1/2" />
                    <label className="flex items-center gap-2 text-xs">
                      <input type="checkbox" {...register(`about.stats.${index}.isNumber`)} className="rounded accent-accent" /> Num?
                    </label>
                    <button type="button" onClick={() => removeStat(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg ml-auto"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="space-y-4">
            <button type="button" onClick={() => appendSkill({ category: "", items: [] })} className="flex items-center gap-2 px-4 py-2 bg-ink text-white rounded-xl text-sm font-semibold mb-4">
              <Plus size={16}/> Add Category
            </button>
            {skillFields.map((field, index) => (
              <div key={field.id} className="bg-surface p-4 border border-hairline rounded-2xl relative">
                <button type="button" onClick={() => removeSkill(index)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                <div className="w-3/4 mb-4">
                  <Field label="Category Name">
                    <input {...register(`skills.${index}.category`)} placeholder="e.g. Frontend" className="admin-input bg-white" />
                  </Field>
                </div>
                <Field label="Skills (comma separated)">
                  <input
                    value={(watch(`skills.${index}.items`) || []).join(", ")}
                    onChange={(e) => {
                      const arr = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                      setValue(`skills.${index}.items`, arr as any);
                    }}
                    placeholder="React, Next.js, Tailwind" 
                    className="admin-input bg-white" 
                  />
                </Field>
              </div>
            ))}
          </div>
        )}

        {activeTab === "timeline" && (
          <div className="space-y-4">
            <button type="button" onClick={() => appendTimeline({ year: "", title: "", subtitle: "", description: "" })} className="flex items-center gap-2 px-4 py-2 bg-ink text-white rounded-xl text-sm font-semibold mb-4">
              <Plus size={16}/> Add Timeline Event
            </button>
            {timelineFields.map((field, index) => (
              <div key={field.id} className="bg-surface p-4 border border-hairline rounded-2xl relative">
                <button type="button" onClick={() => removeTimeline(index)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                  <Field label="Year/Date"><input {...register(`timeline.${index}.year`)} className="admin-input bg-white" placeholder="2024" /></Field>
                  <Field label="Title"><input {...register(`timeline.${index}.title`)} className="admin-input bg-white" placeholder="Full-Stack Dev" /></Field>
                  <Field label="Subtitle"><input {...register(`timeline.${index}.subtitle`)} className="admin-input bg-white" placeholder="Company Name" /></Field>
                </div>
                <div className="mt-4">
                  <Field label="Description"><textarea {...register(`timeline.${index}.description`)} rows={2} className="admin-input bg-white resize-none" /></Field>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="space-y-4">
            <button type="button" onClick={() => appendService({ title: "", description: "", icon: "globe" })} className="flex items-center gap-2 px-4 py-2 bg-ink text-white rounded-xl text-sm font-semibold mb-4">
              <Plus size={16}/> Add Service
            </button>
            {serviceFields.map((field, index) => (
              <div key={field.id} className="bg-surface p-4 border border-hairline rounded-2xl relative grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-3">
                  <Field label="Icon name">
                    <select {...register(`services.${index}.icon`)} className="admin-input bg-white py-2.5">
                      <option value="globe">Globe (Web)</option>
                      <option value="smartphone">Smartphone (Mobile)</option>
                      <option value="bot">Bot (AI)</option>
                      <option value="code">Code (API)</option>
                      <option value="database">Database (Backend)</option>
                    </select>
                  </Field>
                </div>
                <div className="md:col-span-8 space-y-4">
                  <Field label="Title"><input {...register(`services.${index}.title`)} className="admin-input bg-white" /></Field>
                  <Field label="Description"><textarea {...register(`services.${index}.description`)} rows={2} className="admin-input bg-white resize-none" /></Field>
                </div>
                <button type="button" onClick={() => removeService(index)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-ink uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
