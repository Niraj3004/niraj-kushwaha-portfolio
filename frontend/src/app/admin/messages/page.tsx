"use client";

import { useEffect, useState } from "react";
import { contactApi } from "@/lib/api";
import { Mail, Calendar, User } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    contactApi.getAll()
      .then((res) => {
        const data = res.data || [];
        setMessages(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-ink">Messages</h1>
        <p className="text-muted mt-1">{messages.length} total messages from your contact form</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-16 rounded-2xl" />
          ))}
        </div>
      ) : messages.length === 0 ? (
        <div className="py-24 text-center bg-white border border-hairline rounded-2xl text-muted">
          No messages yet. They'll appear here when someone fills your contact form.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Message list */}
          <div className="lg:col-span-4 space-y-2">
            {messages.map((msg) => (
              <button
                key={msg._id}
                onClick={() => setSelected(msg)}
                className={`w-full text-left p-4 rounded-2xl border transition-all ${
                  selected?._id === msg._id
                    ? "border-accent bg-accent/5"
                    : "border-hairline bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <User size={14} className="text-muted" />
                  <span className="font-semibold text-sm text-ink truncate">{msg.name}</span>
                </div>
                <p className="text-xs text-muted truncate">{msg.message}</p>
                <p className="text-xs text-muted/60 mt-1">
                  {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </button>
            ))}
          </div>

          {/* Message detail */}
          <div className="lg:col-span-8">
            {selected ? (
              <div className="bg-white border border-hairline rounded-2xl p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-ink">{selected.name}</h2>
                    <a href={`mailto:${selected.email}`} className="flex items-center gap-1.5 text-sm text-accent hover:underline mt-1">
                      <Mail size={14} /> {selected.email}
                    </a>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-muted bg-surface px-3 py-1.5 rounded-full">
                    <Calendar size={12} />
                    {new Date(selected.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="p-5 bg-surface rounded-xl border border-hairline">
                  <p className="text-body text-ink leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Re: Your message&body=Hi ${selected.name},%0A%0A`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-xl text-sm font-semibold hover:bg-ink/80 transition-colors"
                >
                  <Mail size={16} /> Reply via Email
                </a>
              </div>
            ) : (
              <div className="bg-white border border-hairline rounded-2xl p-12 text-center text-muted">
                Select a message to view it
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
