"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  MessageSquare,
  Star,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/posts", label: "Blog Posts", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0C10] text-white">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <div>
          <span className="text-lg font-bold font-display tracking-tight">NK Admin</span>
          <p className="text-xs text-white/40 mt-0.5">{user?.email}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/60 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white/60 transition-all mt-1"
        >
          View Public Site ↗
        </Link>
      </div>
    </div>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated && pathname !== "/admin/login") return null;
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F7F7F8] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col h-screen sticky top-0">
        <AdminSidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-64 flex-shrink-0">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar (mobile) */}
        <header className="lg:hidden flex items-center gap-4 px-4 py-4 bg-white border-b border-hairline">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-surface"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold text-ink">NK Admin</span>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
