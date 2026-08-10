"use client";
import React from "react";

/** Rotated rubber-stamp label, e.g. TOP SECRET / CASE CLOSED */
export function Stamp({
  children,
  color = "#9C2B22",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-block border-[3px] rounded-sm px-2.5 py-1 uppercase tracking-[0.15em] text-[10px] font-bold -rotate-6 select-none ${className}`}
      style={{ color, borderColor: color, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {children}
    </div>
  );
}

/** Small rounded label chip used for difficulty / evidence tags */
export function Chip({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm"
      style={{ color, backgroundColor: `${color}22`, fontFamily: "'IBM Plex Mono', monospace" }}
    >
      {children}
    </span>
  );
}

/** A small pin dot used to "pin" a card to the board */
export function Pushpin({ color = "#9C2B22" }: { color?: string }) {
  return (
    <span
      className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full shadow-md z-10"
      style={{
        background: `radial-gradient(circle at 35% 30%, ${color}dd, ${color}99 60%, #00000055)`,
        border: "1px solid rgba(0,0,0,0.4)",
      }}
    />
  );
}

/** Manila folder-tab styled card — the recurring "case file" motif */
export function FolderCard({
  children,
  className = "",
  tabLabel,
}: {
  children: React.ReactNode;
  className?: string;
  tabLabel?: string;
}) {
  return (
    <div className="relative">
      {tabLabel && (
        <div
          className="absolute -top-3 left-4 bg-paper-dark border border-ink/20 rounded-t-md px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest text-ink-light"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {tabLabel}
        </div>
      )}
      <div
        className={`bg-paper border border-ink/15 rounded-md rounded-tl-none shadow-[0_3px_10px_rgba(0,0,0,0.35)] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/** A photo pinned to the corkboard, torn-edge card feel */
export function PinnedPhoto({
  initials,
  size = "md",
  ringColor = "#C79A3E",
}: {
  initials: string;
  size?: "sm" | "md" | "lg";
  ringColor?: string;
}) {
  const dims = size === "lg" ? "w-16 h-16 text-lg" : size === "sm" ? "w-9 h-9 text-[10px]" : "w-12 h-12 text-sm";
  return (
    <div className="relative inline-block">
      <Pushpin color={ringColor} />
      <div
        className={`${dims} rounded-sm bg-[#2A2118] border-2 flex items-center justify-center font-bold text-paper rotate-[-2deg] shadow-md`}
        style={{ borderColor: ringColor }}
      >
        {initials}
      </div>
    </div>
  );
}
