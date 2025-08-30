export type AppState = "capture" | "dashboard" | "evaluating" | "report";
export type Axis =
  | "Problem Severity"
  | "Market Size"
  | "Founder Fit"
  | "Scalability"
  | "Defensibility";

export interface Idea {
  name: string;
  pitch: string;
}

export interface Answer {
  itemId: string;
  notes: string;
  actionItems: string;
  confidence: number;
}

export interface EvaluationItem {
  id: string;
  category: string;
  title: string;
  guidance: string;
  axis: Axis;
}

export interface Category {
  id: string;
  title: string;
  description: string;
}
