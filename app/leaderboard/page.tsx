"use client";
import { PageShell } from "@/components/PageShell";
import { LEADERBOARD } from "@/lib/data";

export default function LeaderboardPage() {
  return (
    <PageShell title="Leaderboard">
      <div className="px-4 pt-5 pb-6">
        <h1 className="text-lg text-paper mb-1 font-display">Leaderboard</h1>
        <p className="text-xs text-paper-dark mb-4">This week&apos;s top detectives</p>
        <div className="space-y-2">
          {LEADERBOARD.map((p, i) => (
            <div
              key={p.name}
              className="flex items-center gap-3 p-3 rounded-md border"
              style={
                (p as any).isYou
                  ? { borderColor: "#C79A3E77", backgroundColor: "#C79A3E1A" }
                  : { borderColor: "rgba(199,154,62,0.15)", backgroundColor: "#EDE3CC" }
              }
            >
              <span
                className="w-6 text-center text-sm font-bold"
                style={{ color: i === 0 ? "#C79A3E" : i === 1 ? "#5C4E3E" : i === 2 ? "#B0752E" : "#8A7A62" }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: (p as any).isYou ? "#241B12" : "#2A2118" }}
                >
                  {p.name}
                </p>
                <p className="text-[11px]" style={{ color: (p as any).isYou ? "#4A3423" : "#5C4E3E" }}>
                  {p.rank}
                </p>
              </div>
              <p className="text-sm font-bold" style={{ color: "#9C2B22" }}>
                {p.score.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
