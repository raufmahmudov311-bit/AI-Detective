"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search, Fingerprint, Clock, Users, X, ChevronRight, AlertTriangle,
  CheckCircle2, XCircle, Share2,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Chip, Stamp, PinnedPhoto, FolderCard } from "@/components/ui";
import { getCaseById, DIFFICULTY_COLOR, RANKS } from "@/lib/data";
import { Suspect } from "@/lib/types";

type Tab = "scene" | "suspects" | "evidence" | "timeline";

export default function CasePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const c = getCaseById(params.id);

  const [tab, setTab] = useState<Tab>("scene");
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [accuseOpen, setAccuseOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  if (!c || !c.suspects) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-paper font-display text-lg mb-2">File not found</p>
          <p className="text-paper-dark text-sm mb-4">This case doesn&apos;t exist in the archive.</p>
          <button onClick={() => router.push("/cases")} className="text-brass text-sm underline">
            Back to Case Archive
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    const correct = result === c.culpritId;
    const culprit = c.suspects.find((s) => s.id === c.culpritId)!;
    const score = correct ? 82 : 24;
    return (
      <div className="max-w-md mx-auto px-4 pt-6 pb-10">
        <div className="text-center mb-5">
          {correct ? (
            <CheckCircle2 size={40} className="mx-auto text-[#4E7C55] mb-2" />
          ) : (
            <XCircle size={40} className="mx-auto text-blood-bright mb-2" />
          )}
          <h1 className="text-xl text-paper font-display">
            {correct ? "Case Closed. You got it." : "Not quite — case remains open."}
          </h1>
          <p className="text-sm text-paper-dark mt-1">
            The culprit was <span className="text-paper font-semibold">{culprit.name}</span>.
          </p>
        </div>

        <FolderCard tabLabel="Solution" className="mb-4">
          <div className="p-4">
            <p className="text-sm text-ink leading-relaxed">{c.solution}</p>
          </div>
        </FolderCard>

        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="bg-paper border border-ink/15 rounded-sm p-3.5 text-center">
            <p className="text-2xl font-bold text-ink">+{score}</p>
            <p className="text-[10px] text-ink-light mt-0.5">Detective Score</p>
          </div>
          <div className="bg-paper border border-ink/15 rounded-sm p-3.5 text-center">
            <p className="text-2xl font-bold text-ink">{RANKS[1].icon}</p>
            <p className="text-[10px] text-ink-light mt-0.5">Rank: {RANKS[1].name}</p>
          </div>
        </div>

        <div className="bg-[#3A2919] border border-brass/25 rounded-md p-4 mb-5">
          <p className="text-xs text-paper-dark mb-2">Shareable result card</p>
          <div className="border border-brass/20 rounded-sm p-3 bg-black/20">
            <p className="text-[11px] text-brass" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              AI DETECTIVE · CASE №{c.number}
            </p>
            <p className="text-sm text-paper mt-1 font-semibold">
              {correct ? "🕵️ Solved it in one." : "🧩 Stumped this time."}
            </p>
            <p className="text-xs text-paper-dark mt-1">Can you solve &quot;{c.title}&quot;?</p>
          </div>
          <button className="mt-3 w-full bg-brass text-cork-darker font-bold text-sm py-2.5 rounded-sm flex items-center justify-center gap-2">
            <Share2 size={15} /> Share &amp; Challenge a Friend
          </button>
        </div>

        <button onClick={() => router.push("/cases")} className="w-full text-sm text-paper-dark py-2">
          Back to cases
        </button>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "scene", label: "Scene", icon: Search },
    { id: "suspects", label: "Suspects", icon: Users },
    { id: "evidence", label: "Evidence", icon: Fingerprint },
    { id: "timeline", label: "Timeline", icon: Clock },
  ];

  return (
    <div className="max-w-md mx-auto pb-28">
      <TopBar title={`Case №${c.number}`} backHref="/cases" />

      <div className="px-4 pt-4">
        <Chip color={DIFFICULTY_COLOR[c.difficulty]}>{c.difficulty}</Chip>
        <h1 className="text-xl mt-2 text-paper font-display">{c.title}</h1>
        <p className="text-xs text-paper-dark mt-1">{c.location}</p>
      </div>

      <div className="flex gap-1 px-4 mt-4 border-b border-brass/15 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="shrink-0 flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors"
              style={{ borderColor: active ? "#C79A3E" : "transparent", color: active ? "#C79A3E" : "#8A7A62" }}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="px-4 mt-4">
        {tab === "scene" && (
          <div>
            <FolderCard tabLabel="Victim" className="mb-4">
              <div className="p-4">
                <p className="text-sm font-semibold text-ink">{c.victim?.name}</p>
                <p className="text-xs text-ink-light">{c.victim?.role}</p>
              </div>
            </FolderCard>
            <FolderCard tabLabel="Report">
              <div className="p-4">
                <p className="text-sm text-ink leading-relaxed">{c.crimeScene}</p>
              </div>
            </FolderCard>
          </div>
        )}

        {tab === "suspects" && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            {c.suspects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSuspect(s)}
                className="flex flex-col items-center gap-2 pt-3"
              >
                <PinnedPhoto initials={s.avatar} size="lg" />
                <div className="text-center">
                  <p className="text-xs font-semibold text-paper">{s.name}</p>
                  <p className="text-[10px] text-paper-dark">{s.role}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {tab === "evidence" && (
          <div className="grid grid-cols-2 gap-3">
            {c.evidence?.map((e) => (
              <FolderCard key={e.id}>
                <div className="p-3.5 relative">
                  <div
                    className="absolute top-2 right-2 text-[9px] text-ink-light"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {e.tag}
                  </div>
                  <div className="text-2xl mb-2">{e.icon}</div>
                  <p className="text-xs font-semibold text-ink mb-1 leading-snug">{e.name}</p>
                  <p className="text-[11px] text-ink-light leading-relaxed">{e.description}</p>
                </div>
              </FolderCard>
            ))}
          </div>
        )}

        {tab === "timeline" && (
          <div className="relative pl-5">
            <div className="absolute left-1.5 top-1 bottom-1 w-px bg-brass/30" />
            {c.timeline?.map((t, i) => (
              <div key={i} className="relative pb-4">
                <div className="absolute -left-3.5 top-1 w-2.5 h-2.5 rounded-full bg-brass" />
                <p className="text-[11px] text-brass font-semibold" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {t.time}
                </p>
                <p className="text-xs text-paper-dark mt-0.5 leading-relaxed">{t.event}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedSuspect && (
        <div
          className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/70"
          onClick={() => setSelectedSuspect(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <FolderCard tabLabel="Suspect File" className="rounded-b-none sm:rounded-b-md">
              <div className="p-5 max-h-[75vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <PinnedPhoto initials={selectedSuspect.avatar} size="md" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{selectedSuspect.name}</p>
                      <p className="text-xs text-ink-light">
                        {selectedSuspect.role} · Age {selectedSuspect.age}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSuspect(null)} className="text-ink-light">
                    <X size={20} />
                  </button>
                </div>

                <div className="bg-paper-dark/50 border border-ink/10 rounded-sm p-3 mb-3">
                  <p className="text-[10px] tracking-widest text-ink-light mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    STATEMENT
                  </p>
                  <p className="text-sm text-ink italic leading-relaxed">&quot;{selectedSuspect.statement}&quot;</p>
                </div>

                <div className="mb-3">
                  <p className="text-[10px] tracking-widest text-blood-bright mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    POSSIBLE MOTIVE
                  </p>
                  <p className="text-sm text-ink leading-relaxed">{selectedSuspect.motive}</p>
                </div>

                <div>
                  <p className="text-[10px] tracking-widest text-brass mb-1.5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    ALIBI
                  </p>
                  <p className="text-sm text-ink leading-relaxed">{selectedSuspect.alibi}</p>
                </div>
              </div>
            </FolderCard>
          </div>
        </div>
      )}

      {accuseOpen && (
        <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/70" onClick={() => setAccuseOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <FolderCard tabLabel="Accusation" className="rounded-b-none sm:rounded-b-md">
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-ink flex items-center gap-2">
                    <AlertTriangle size={16} className="text-blood-bright" /> Name the culprit
                  </p>
                  <button onClick={() => setAccuseOpen(false)} className="text-ink-light">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-xs text-ink-light mb-4">Choose carefully — this is your one accusation for this case.</p>

                <div className="space-y-2 mb-5">
                  {c.suspects.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPick(s.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-sm border text-left transition-colors"
                      style={
                        pick === s.id
                          ? { borderColor: "#9C2B22", backgroundColor: "#9C2B2214" }
                          : { borderColor: "rgba(42,33,24,0.15)" }
                      }
                    >
                      <div className="w-9 h-9 rounded-sm bg-[#2A2118] flex items-center justify-center text-[11px] font-bold text-brass">
                        {s.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink">{s.name}</p>
                        <p className="text-[11px] text-ink-light">{s.role}</p>
                      </div>
                      {pick === s.id && <CheckCircle2 size={18} className="text-blood-bright" />}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!pick}
                  onClick={() => {
                    setAccuseOpen(false);
                    setResult(pick);
                  }}
                  className="w-full font-bold text-sm py-3 rounded-sm transition-colors disabled:opacity-40 bg-blood-bright text-paper"
                >
                  Submit Accusation
                </button>
              </div>
            </FolderCard>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-0 right-0 px-4 max-w-md mx-auto">
        <button
          onClick={() => setAccuseOpen(true)}
          className="w-full bg-blood-bright text-paper font-bold text-sm py-3.5 rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-black/50 active:scale-[0.98] transition-transform"
        >
          <AlertTriangle size={16} /> Make Your Accusation
        </button>
      </div>
    </div>
  );
}
