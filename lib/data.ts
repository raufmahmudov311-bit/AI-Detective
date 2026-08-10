import { Case } from "./types";

export const RANKS = [
  { name: "Rookie", min: 0, color: "#8B96A8", icon: "🟢" },
  { name: "Investigator", min: 300, color: "#C79A3E", icon: "🟡" },
  { name: "Inspector", min: 900, color: "#B0752E", icon: "🟠" },
  { name: "Master Detective", min: 2000, color: "#9C2B22", icon: "🔴" },
  { name: "Legendary Detective", min: 4000, color: "#7A4FB5", icon: "🟣" },
];

export const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#4E7C55",
  Medium: "#C79A3E",
  Hard: "#B0752E",
  Expert: "#9C2B22",
};

export const CASE_001: Case = {
  id: "case-001",
  number: 47,
  title: "Last Call at the Ivory Room",
  difficulty: "Medium",
  teaser:
    "A hotel owner is found dead in his penthouse office. His phone says he called at 23:47. His watch says otherwise.",
  victim: { name: "Damien Cross", role: "Owner, The Ivory Room Hotel" },
  location: "Penthouse Office, The Ivory Room Hotel — 14th Floor",
  crimeScene:
    "Damien Cross was found slumped over his desk at 23:52 by the night porter. The office door was locked from the inside; the porter used a master key. A single cracked whiskey glass sat on the desk, and the wall safe stood open and empty. Damien's phone log shows an outgoing call placed at 23:47. Investigators must determine what really happened between 23:40 and 23:52 — and who is lying about where they were.",
  suspects: [
    {
      id: "elena",
      name: "Elena Voss",
      age: 44,
      role: "Business Partner",
      avatar: "EV",
      motive:
        "Damien was about to sell his shares to a rival group, killing Elena's buyout deal and her decade of work.",
      alibi:
        "Says she was at home when Damien called her at 23:47 to 'talk things through.' No one else can confirm this.",
      statement: "He called me himself, at quarter to midnight. Ask the phone company if you don't believe me.",
    },
    {
      id: "marcus",
      name: "Marcus Reed",
      age: 51,
      role: "Head of Security",
      avatar: "MR",
      motive:
        "Damien had discovered discrepancies in the safe and confronted Marcus earlier that day. A resignation letter was found, torn, in the wastebasket.",
      alibi:
        "Claims he was monitoring the security desk in the basement all evening and never went up to the 14th floor.",
      statement: "I was at my post the entire night. Check the log — I signed in at 20:00 and never left.",
    },
    {
      id: "sofia",
      name: "Sofia Marchetti",
      age: 37,
      role: "Damien's Mistress",
      avatar: "SM",
      motive:
        "Damien had ended their affair that week and threatened to tell her husband if she didn't stay quiet about the hotel's finances.",
      alibi:
        "Admits she visited Damien for drinks earlier in the evening but says she left before 23:30, confirmed by the valet.",
      statement: "Yes, I was there. We had a drink, we argued, I left. The valet brought my car around — ask him.",
    },
    {
      id: "julian",
      name: "Julian Cross",
      age: 29,
      role: "Estranged Son",
      avatar: "JC",
      motive: "Damien had rewritten his will that month, cutting Julian out entirely in favor of a charitable trust.",
      alibi: "Says he was at a restaurant across town until well past midnight, with friends who back his story.",
      statement: "I hadn't spoken to my father in six months. I was at Rosetta's — ask anyone at the table.",
    },
  ],
  evidence: [
    {
      id: "watch",
      name: "Cracked Wristwatch",
      icon: "⌚",
      tag: "Physical",
      description:
        "Damien's wristwatch, found beneath the desk with a shattered face. The hands are frozen at 23:42 — consistent with it being struck during a struggle.",
    },
    {
      id: "phonelog",
      name: "Phone Call Log",
      icon: "📞",
      tag: "Digital",
      description:
        "Damien's phone shows an outgoing call to Elena Voss placed at 23:47 — five minutes after his watch stopped.",
    },
    {
      id: "footage",
      name: "Security Footage Gap",
      icon: "🎥",
      tag: "Digital",
      description:
        "The 14th-floor hallway camera has a ten-minute gap, 23:40–23:50. Camera loops of this length can only be triggered from the security office terminal.",
    },
    {
      id: "letter",
      name: "Torn Resignation Letter",
      icon: "📄",
      tag: "Physical",
      description:
        "A half-burned resignation letter from Marcus Reed, dated that afternoon, found in the office wastebasket — after Damien reportedly confronted him about missing funds.",
    },
    {
      id: "glass",
      name: "Whiskey Glass",
      icon: "🥃",
      tag: "Physical",
      description:
        "A single cracked glass with a lipstick mark matching Sofia Marchetti's shade. Only one glass — no second visitor shared a drink.",
    },
    {
      id: "valet",
      name: "Valet Log",
      icon: "🚗",
      tag: "Witness",
      description: "The valet confirms Sofia Marchetti's car was brought around and left the premises at 23:31.",
    },
  ],
  timeline: [
    { time: "20:00", event: "Marcus Reed signs in at the security desk." },
    { time: "21:15", event: "Sofia Marchetti arrives to see Damien; drinks are poured." },
    { time: "21:40", event: "Damien and Marcus are seen arguing near the elevators about the safe." },
    { time: "23:05", event: "Sofia and Damien are overheard arguing in the office." },
    { time: "23:31", event: "Valet confirms Sofia's car leaves the hotel." },
    { time: "23:40", event: "Security footage on the 14th floor cuts out." },
    { time: "23:42", event: "Damien's watch stops — likely the true moment of the struggle." },
    { time: "23:47", event: "A call is placed from Damien's phone to Elena Voss." },
    { time: "23:50", event: "Security footage resumes." },
    { time: "23:52", event: "Night porter finds Damien and raises the alarm." },
  ],
  culpritId: "marcus",
  solution:
    "The watch fixes the real time of the struggle at 23:42 — five minutes before the call to Elena, which means Damien did not make that call himself. Only the security office can trigger a ten-minute camera loop, and only Marcus was stationed there — with the motive of a confrontation over stolen funds and a resignation he never intended to hand in willingly. He silenced Damien at 23:42, looped the 14th-floor camera to cover his walk up and back, and used Damien's phone to place a call to Elena at 23:47 — muddying the timeline and pointing suspicion elsewhere. Sofia and Elena both had motive, but the valet log and the true time of death clear them. Marcus Reed is the only suspect with the means, the access, and a motive discovered that same day.",
};

export const CASE_LIST: Case[] = [
  { ...CASE_001, locked: false },
  {
    id: "case-002",
    number: 46,
    title: "The Understudy",
    difficulty: "Easy",
    teaser: "A rising star never made it to opening night.",
    locked: false,
    solved: true,
    score: 82,
  },
  {
    id: "case-003",
    number: 45,
    title: "Silence at Pier 9",
    difficulty: "Hard",
    teaser: "A dockworker, a missing shipment, and four alibis that don't add up.",
    locked: false,
    solved: false,
  },
  {
    id: "case-004",
    number: 44,
    title: "The Glasshouse Gala",
    difficulty: "Hard",
    teaser: "A charity gala turns fatal before the final toast.",
    locked: false,
    solved: true,
    score: 64,
  },
  {
    id: "case-005",
    number: "PRO",
    title: "Expert: The Locked Ledger",
    difficulty: "Expert",
    teaser: "Exclusive to AI Detective Pro. Six suspects. No easy answers.",
    locked: true,
  },
  {
    id: "case-006",
    number: "PRO",
    title: "Expert: The Vanishing Witness",
    difficulty: "Expert",
    teaser: "Exclusive to AI Detective Pro. The key witness disappeared too.",
    locked: true,
  },
];

export function getCaseById(id: string): Case | undefined {
  return CASE_LIST.find((c) => c.id === id);
}

export const LEADERBOARD = [
  { name: "N. Okafor", score: 4820, rank: "Legendary Detective" },
  { name: "R. Castillo", score: 4110, rank: "Legendary Detective" },
  { name: "T. Halvorsen", score: 3760, rank: "Master Detective" },
  { name: "M. Ibsen", score: 3390, rank: "Master Detective" },
  { name: "A. Farouk", score: 2950, rank: "Master Detective" },
  { name: "You", score: 1240, rank: "Inspector", isYou: true },
].sort((a, b) => b.score - a.score);
