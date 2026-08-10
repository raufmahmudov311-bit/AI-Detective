"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, Fingerprint, TrendingUp } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Chip } from "@/components/ui";
import { CASE_001, DIFFICULTY_COLOR } from "@/lib/data";

function useMidnightCountdown() {
  const [left, setLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(now);
      next.setHours(24, 0, 0, 0);
      const diff = next.getTime() - now.getTime();
      const h = Math.floor(diff / 3.6e6);
      const m = Math.floor((diff % 3.6e6) / 6e4);
      const s = Math.floor((diff % 6e4) / 1000);
      setLeft(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export default function DailyPage() {
  const countdown = useMidnightCountdown();
  const c = CASE_001;

  return (
    <PageShell title="Daily Case">
      <div className="px-4 pt-5 pb-6">
        <div className="text-center mb-5">
          <p className="text-[11px] tracking-[0.2em] text-brass" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            DAILY CASE
          </p>
          <p className="text-3xl mt-1 text-paper font-display">Case №{c.number}</p>
          <p className="text-xs text-paper-dark mt-1">Next case unlocks in {countdown}</p>
        </div>

        <div className="bg-paper border border-ink/15 rounded-md p-4 mb-4 shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
          <Chip color={DIFFICULTY_COLOR[c.difficulty]}>{c.difficulty}</Chip>
          <h2 className="text-xl mt-2.5 text-ink font-display">{c.title}</h2>
          <p className="text-sm text-ink-light mt-2 leading-relaxed">{c.teaser}</p>
          <div className="flex items-center gap-4 mt-3.5 pt-3.5 border-t border-ink/10 text-[11px] text-ink-light">
            <span className="flex items-center gap-1">
              <Users size={13} /> {c.suspects?.length} suspects
            </span>
            <span className="flex items-center gap-1">
              <Fingerprint size={13} /> {c.evidence?.length} evidence
            </span>
          </div>
          <Link
            href={`/case/${c.id}`}
            className="mt-4 w-full block text-center bg-blood-bright text-paper font-bold text-sm py-3 rounded-sm active:scale-[0.98] transition-transform"
          >
            Begin Investigation
          </Link>
        </div>

        <div className="bg-paper border border-ink/15 rounded-md p-4">
          <p className="text-xs font-semibold text-ink mb-3 flex items-center gap-1.5">
            <TrendingUp size={14} className="text-blood-bright" /> Global Results — Today
          </p>
          <div className="space-y-2.5">
            {[
              { label: "Solved correctly", pct: 41 },
              { label: "Wrong culprit", pct: 37 },
              { label: "Still investigating", pct: 22 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-[11px] text-ink-light mb-1">
                  <span>{row.label}</span>
                  <span>{row.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-ink/10 overflow-hidden">
                  <div className="h-full bg-blood-bright/70 rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-ink-light/70 mt-3">12,480 detectives have opened this case.</p>
        </div>
      </div>
    </PageShell>
  );
}
