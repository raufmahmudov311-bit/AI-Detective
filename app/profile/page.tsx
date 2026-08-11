"use client";
import Link from "next/link";
import { Crown, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { RANKS } from "@/lib/data";

export default function ProfilePage() {
  const score = 1240;
  const rankIdx = 2;
  const nextRank = RANKS[rankIdx + 1];
  const prevMin = RANKS[rankIdx].min;
  const progress = nextRank ? Math.min(100, ((score - prevMin) / (nextRank.min - prevMin)) * 100) : 100;

  const badges = [
    { icon: "🕵️", label: "First Case", earned: true },
    { icon: "🔥", label: "3-Day Streak", earned: true },
    { icon: "🧠", label: "No Hints", earned: false },
    { icon: "⚡", label: "Speed Solve", earned: false },
  ];

  return (
    <PageShell title="Profile">
      <div className="px-4 pt-5 pb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-full bg-[#2A2118] border-2 border-brass flex items-center justify-center text-xl">
            {RANKS[rankIdx].icon}
          </div>
          <div>
            <p className="text-base font-semibold text-paper">Detective</p>
            <p className="text-xs text-paper-dark">
              {RANKS[rankIdx].name} · {score.toLocaleString()} pts
            </p>
          </div>
        </div>

        {nextRank && (
          <div className="mb-6">
            <div className="flex justify-between text-[11px] text-paper-dark mb-1">
              <span>{RANKS[rankIdx].name}</span>
              <span>{nextRank.name}</span>
            </div>
            <div className="h-1.5 rounded-full bg-black/30 overflow-hidden">
              <div className="h-full bg-brass rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: "Solved", value: "12" },
            { label: "Accuracy", value: "68%" },
            { label: "Streak", value: "4d" },
          ].map((s) => (
            <div key={s.label} className="bg-paper border border-ink/15 rounded-sm p-3 text-center">
              <p className="text-lg font-bold text-ink">{s.value}</p>
              <p className="text-[10px] text-ink-light mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="text-xs font-semibold text-paper mb-2.5 font-display">Badges</p>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {badges.map((b) => (
            <div
              key={b.label}
              className={`bg-paper border rounded-sm p-2.5 text-center ${
                b.earned ? "border-brass/50" : "border-ink/10 opacity-40"
              }`}
            >
              <div className="text-lg">{b.icon}</div>
              <p className="text-[9px] text-ink-light mt-1 leading-tight">{b.label}</p>
            </div>
          ))}
        </div>

        <Link
          href="/pro"
          className="w-full flex items-center gap-3 bg-[#3A2919] border border-brass/25 rounded-md p-4"
        >
          <Crown size={20} className="text-brass" />
          <div className="flex-1 text-left">
            <p className="text-sm font-semibold text-paper">Unlock AI Detective Pro</p>
            <p className="text-xs text-paper-dark">Exclusive badges, expert cases, no ads</p>
          </div>
          <ChevronRight size={16} className="text-paper-dark" />
        </Link>
      </div>
    </PageShell>
  );
}
