"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { projectsApi, postsApi, testimonialsApi, contactApi } from "@/lib/api";
import {
  FolderKanban,
  Star,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface Stats {
  projects: number;
  testimonials: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, testimonials, messages] = await Promise.allSettled([
          projectsApi.getAll(),
          testimonialsApi.getAll(),
          contactApi.getAll(),
        ]);
        setStats({
          projects: projects.status === "fulfilled" ? (projects.value.data?.length ?? 0) : 0,
          testimonials: testimonials.status === "fulfilled" ? (testimonials.value.data?.length ?? 0) : 0,
          messages: messages.status === "fulfilled" ? (messages.value.data?.length ?? 0) : 0,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const STAT_CARDS = [
    {
      label: "Projects",
      value: stats?.projects,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "bg-violet-500",
      light: "bg-violet-50",
    },
    {
      label: "Testimonials",
      value: stats?.testimonials,
      icon: Star,
      href: "/admin/testimonials",
      color: "bg-amber-500",
      light: "bg-amber-50",
    },
    {
      label: "Messages",
      value: stats?.messages,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-emerald-500",
      light: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-ink">Dashboard</h1>
        <p className="text-muted mt-1">Welcome back. Here's an overview of your portfolio content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {STAT_CARDS.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl p-5 border border-hairline hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-xl ${card.light} flex items-center justify-center mb-4`}>
              <card.icon className={`w-5 h-5 ${card.color.replace("bg-", "text-")}`} />
            </div>
            <div className="text-3xl font-bold font-display text-ink mb-1">
              {isLoading ? (
                <div className="skeleton h-8 w-12 rounded" />
              ) : (
                card.value ?? 0
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">{card.label}</span>
              <ArrowRight size={14} className="text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base font-semibold text-ink mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: "/admin/projects/new", label: "Add New Project", icon: FolderKanban },
            { href: "/admin/testimonials", label: "Manage Testimonials", icon: Star },
            { href: "/admin/messages", label: "View Messages", icon: MessageSquare },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 p-4 bg-white border border-hairline rounded-2xl hover:border-accent hover:shadow-sm transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <action.icon size={18} className="text-muted group-hover:text-accent transition-colors" />
              </div>
              <span className="font-medium text-ink">{action.label}</span>
              <ArrowRight size={16} className="ml-auto text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
