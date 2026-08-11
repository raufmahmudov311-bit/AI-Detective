"use client";
import { useState } from "react";
import Link from "next/link";
import { FileText, Lock, ChevronRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Chip } from "@/components/ui";
import { CASE_LIST, DIFFICULTY_COLOR } from "@/lib/data";

export default function CasesPage() {
  const [filter, setFilter] = useState("All");
  const diffs = ["All", "Easy", "Medium", "Hard", "Expert"];
  const filtered = CASE_LIST.filter((c) => filter === "All" || c.difficulty === filter);

  return (
    <PageShell title="Case Archive">
      <div className="px-4 pt-5 pb-6">
        <div className="flex gap-2 overflow-x-auto mb-4 pb-1 -mx-4 px-4">
          {diffs.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors"
              style={
                filter === d
                  ? { borderColor: "#C79A3E", color: "#241B12", backgroundColor: "#C79A3E" }
                  : { borderColor: "rgba(199,154,62,0.3)", color: "#D9CBA6" }
              }
            >
              {d}
            </button>
          ))}
        </div>

        {filtered.map((c) => {
          const color = DIFFICULTY_COLOR[c.difficulty] || "#8A7A62";
          return (
            <Link
              key={c.id}
              href={c.locked ? "/pro" : `/case/${c.id}`}
              className={`relative block bg-paper border border-ink/15 rounded-md rounded-tl-none p-3.5 mb-4 shadow-[0_3px_8px_rgba(0,0,0,0.3)] ${
                c.locked ? "opacity-70" : "active:scale-[0.99]"
              } transition-transform`}
            >
              <div
                className="absolute -top-2.5 left-3 rounded-t-sm px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-ink-light bg-paper-dark border border-ink/15"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Case №{c.number}
              </div>
              <div className="flex gap-3 items-start mt-1">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0 border"
                  style={{ borderColor: `${color}66`, backgroundColor: `${color}20` }}
                >
                  {c.locked ? <Lock size={16} color={color} /> : <FileText size={16} color={color} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <Chip color={color}>{c.difficulty}</Chip>
                    {c.solved && <Chip color="#4E7C55">Solved</Chip>}
                  </div>
                  <p className="text-sm font-semibold text-ink truncate">{c.title}</p>
                  <p className="text-xs text-ink-light mt-1 line-clamp-2">{c.teaser}</p>
                </div>
                {!c.locked && <ChevronRight size={16} className="text-ink-light shrink-0 mt-2" />}
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-14">
            <FileText size={28} className="mx-auto text-paper-dark mb-2" />
            <p className="text-sm text-paper-dark">No cases at this difficulty yet.</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
