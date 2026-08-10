"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home as HomeIcon, Flame, FileText, Trophy, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/daily", label: "Daily", icon: Flame },
  { href: "/cases", label: "Cases", icon: FileText },
  { href: "/leaderboard", label: "Ranks", icon: Trophy },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-cork-darker/95 backdrop-blur-md border-t border-brass/15">
      <div className="max-w-md mx-auto grid grid-cols-5">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className="flex flex-col items-center justify-center gap-1 py-2.5 transition-colors"
            >
              <Icon size={19} strokeWidth={active ? 2.4 : 1.8} color={active ? "#C79A3E" : "#8A7A62"} />
              <span
                className="text-[10px] tracking-wide"
                style={{ color: active ? "#C79A3E" : "#8A7A62", fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
