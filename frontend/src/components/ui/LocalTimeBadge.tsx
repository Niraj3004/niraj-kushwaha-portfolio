"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export const LocalTimeBadge = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Set initial time
    const updateTime = () => {
      const now = new Date();
      // Format time in Nepal timezone (NPT, UTC+5:45)
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'Asia/Kathmandu',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-ink/5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-0.5 cursor-default relative overflow-hidden">
      {/* Availability Pulsing Dot */}
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      
      {/* Location */}
      <span className="text-xs font-semibold text-ink/80 uppercase tracking-wider">
        Kathmandu, NP
      </span>
      
      <div className="w-[1px] h-3 bg-ink/20 rounded-full"></div>
      
      {/* Time */}
      <div className="flex items-center gap-1.5 text-ink/70">
        <Clock size={12} className="opacity-70" />
        <span className="text-xs font-medium tabular-nums min-w-[55px]">
          {time || "..."}
        </span>
      </div>
    </div>
  );
};
