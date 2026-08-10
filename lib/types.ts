export type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

export interface Suspect {
  id: string;
  name: string;
  age: number;
  role: string;
  avatar: string;
  motive: string;
  alibi: string;
  statement: string;
}

export interface Evidence {
  id: string;
  name: string;
  icon: string;
  tag: "Physical" | "Digital" | "Witness";
  description: string;
}

export interface TimelineEvent {
  time: string;
  event: string;
}

export interface Case {
  id: string;
  number: number | string;
  title: string;
  difficulty: Difficulty;
  teaser: string;
  locked?: boolean;
  solved?: boolean;
  score?: number;
  victim?: { name: string; role: string };
  location?: string;
  crimeScene?: string;
  suspects?: Suspect[];
  evidence?: Evidence[];
  timeline?: TimelineEvent[];
  culpritId?: string;
  solution?: string;
}
