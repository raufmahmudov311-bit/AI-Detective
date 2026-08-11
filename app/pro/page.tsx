"use client";
import { Crown, Sparkles, Flame, BadgeCheck, TrendingUp, ShieldCheck, Star } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";

export default function ProPage() {
  const features = [
    { icon: Sparkles, text: "Unlimited cases — no daily cap" },
    { icon: Flame, text: "Expert difficulty investigations" },
    { icon: BadgeCheck, text: "Exclusive AI-generated cases" },
    { icon: TrendingUp, text: "Advanced stats & solve-rate breakdowns" },
    { icon: ShieldCheck, text: "No advertisements, ever" },
    { icon: Star, text: "Special detective badges & frame" },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col">
      <TopBar title="AI Detective Pro" backHref="/profile" />
      <div className="flex-1 px-4 pt-5 pb-6">
        <div className="text-center mb-6">
          <Crown size={34} className="mx-auto text-brass mb-2" />
          <h1 className="text-xl text-paper font-display">Investigate without limits</h1>
          <p className="text-sm text-paper-dark mt-1">$4.99 / month · cancel anytime</p>
        </div>

        <div className="bg-paper border border-brass/40 rounded-md p-4 mb-5 space-y-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.3)]">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-sm bg-brass/15 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-[#B0752E]" />
                </div>
                <p className="text-sm text-ink">{f.text}</p>
              </div>
            );
          })}
        </div>

        <button
          disabled
          className="w-full bg-brass/40 text-cork-darker/60 font-bold text-sm py-3.5 rounded-sm cursor-not-allowed"
        >
          Subscriptions coming soon
        </button>
        <p className="text-center text-[11px] text-paper-dark/70 mt-3">
          Pro is in preview. The free experience is fully playable today — full cases, daily investigations, and
          leaderboard included.
        </p>
      </div>
      <BottomNav />
      <div className="h-16" />
    </div>
  );
}

