"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, ChevronRight, Crown, FileText, Lock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Stamp, Chip } from "@/components/ui";
import { CASE_LIST, DIFFICULTY_COLOR } from "@/lib/data";
import { Case } from "@/lib/types";

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

function CaseRow({ c }: { c: Case }) {
  const color = DIFFICULTY_COLOR[c.difficulty] || "#8A7A62";
  return (
    <Link
      href={c.locked ? "/pro" : `/case/${c.id}`}
      className={`relative block bg-paper border border-ink/15 rounded-md rounded-tl-none p-3.5 mb-3 flex gap-3 items-start shadow-[0_3px_8px_rgba(0,0,0,0.3)] transition-transform ${
        c.locked ? "opacity-70" : "active:scale-[0.99]"
      }`}
    >
      <div
        className="absolute -top-2.5 left-3 rounded-t-sm px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-ink-light bg-paper-dark border border-ink/15"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        Case №{c.number}
      </div>
      <div
        className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border mt-1"
        style={{ borderColor: `${color}66`, backgroundColor: `${color}20` }}
      >
        {c.locked ? <Lock size={16} color={color} /> : <FileText size={16} color={color} />}
      </div>
      <div className="min-w-0 flex-1 mt-1">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <Chip color={color}>{c.difficulty}</Chip>
          {c.solved && <Chip color="#4E7C55">Solved</Chip>}
        </div>
        <p className="text-sm font-semibold text-ink truncate">{c.title}</p>
      </div>
      {!c.locked && <ChevronRight size={16} className="text-ink-light shrink-0 mt-2" />}
    </Link>
  );
}

export default function HomePage() {
  const countdown = useMidnightCountdown();
  const daily = CASE_LIST[0];

  return (
    <PageShell>
      <div className="px-4 pt-5 pb-6">
        {/* Corkboard hero */}
        <div className="relative rounded-md border border-brass/25 p-5 mb-6 bg-[#463421] shadow-[0_6px_20px_rgba(0,0,0,0.4)] torn-edge">
          <div className="tape -top-2 left-6 -rotate-6" />
          <div className="tape -top-2 right-6 rotate-3" />
          <Stamp>Case Open</Stamp>
          <h1 className="text-2xl leading-tight mt-3 text-paper font-display">
            Someone was murdered.
            <br />
            You&apos;re the only one who can find out who.
          </h1>
          <p className="text-paper-dark text-sm mt-3 leading-relaxed">
            Study the evidence. Question the suspects. Trust nothing you&apos;re told outright.
          </p>
          <Link
            href={`/case/${daily.id}`}
            className="mt-4 w-full bg-brass text-cork-darker font-bold text-sm py-3 rounded-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Play size={16} fill="#241B12" /> Open Today&apos;s Case
          </Link>
          <p
            className="text-center text-[10px] text-paper-dark/70 mt-2 tracking-wider"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            NEXT CASE IN {countdown}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { label: "Cases Solved", value: "12" },
            { label: "Accuracy", value: "68%" },
            { label: "Detective Score", value: "1,240" },
          ].map((s) => (
            <div key={s.label} className="bg-paper border border-ink/15 rounded-sm p-3 text-center">
              <p className="text-lg font-bold text-ink">{s.value}</p>
              <p className="text-[10px] text-ink-light mt-0.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-paper tracking-wide font-display">Open Case Files</h2>
          <Link href="/cases" className="text-[11px] text-brass flex items-center gap-0.5">
            All cases <ChevronRight size={13} />
          </Link>
        </div>
        {CASE_LIST.filter((c) => !c.locked)
          .slice(0, 3)
          .map((c) => (
            <CaseRow key={c.id} c={c} />
          ))}

        <Link
          href="/pro"
          className="mt-4 block bg-[#3A2919] border border-brass/25 rounded-md p-4 flex items-center gap-3"
        >
          <Crown size={22} className="text-brass shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-paper">Go Pro</p>
            <p className="text-xs text-paper-dark">Unlimited cases, expert difficulty, no ads.</p>
          </div>
          <span className="text-xs font-semibold text-brass shrink-0">View</span>
        </Link>
      </div>
    </PageShell>
  );
}
