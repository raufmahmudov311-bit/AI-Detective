"use client";
import Link from "next/link";
import { ChevronLeft, Crown, Fingerprint } from "lucide-react";

export function TopBar({ title, backHref }: { title?: string; backHref?: string }) {
  return (
    <div className="sticky top-0 z-30 backdrop-blur-md bg-cork-darker/90 border-b border-brass/15">
      <div className="flex items-center justify-between px-4 h-14 max-w-md mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          {backHref ? (
            <Link href={backHref} className="p-1 -ml-1 text-paper-dark hover:text-paper transition-colors">
              <ChevronLeft size={22} />
            </Link>
          ) : (
            <Fingerprint size={20} className="text-brass shrink-0" />
          )}
          <span className="truncate text-[15px] tracking-wide text-paper font-display">
            {title || "AI DETECTIVE"}
          </span>
        </div>
        <Link
          href="/pro"
          className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-md border border-brass/40 text-brass hover:bg-brass/10 transition-colors shrink-0"
        >
          <Crown size={13} /> PRO
        </Link>
      </div>
    </div>
  );
}
