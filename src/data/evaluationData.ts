import type { EvaluationItem, Category } from "../types";

export const evaluationCategories: Category[] = [
  {
    id: "pitfall",
    title: "🚨 Pitfall Analysis",
    description: "Check if your idea falls into common, hard-to-escape traps.",
  },
  {
    id: "deepDive",
    title: "🔍 Core Deep Dive",
    description: "Ask the fundamental questions about your idea's viability.",
  },
  {
    id: "hiddenStrengths",
    title: "💎 Hidden Strengths",
    description: "Identify counter-intuitive advantages your idea might have.",
  },
  {
    id: "origin",
    title: "🌱 Origin & Validation",
    description:
      "Understand the foundation of your idea and its initial validation.",
  },
];

export const evaluationItems: EvaluationItem[] = [
  // Pitfall Analysis
  {
    id: "pitfall-1",
    category: "pitfall",
    title: "Is this a solution in search of a problem?",
    guidance:
      "Avoid starting with a technology (like AI) and then looking for a problem. Does this solve a real, tangible need?",
    axis: "Problem Severity",
  },
  {
    id: "pitfall-2",
    category: "pitfall",
    title: 'Is this a "tar pit idea"?',
    guidance:
      "Some plausible ideas, like planning meetups with friends, are structurally very difficult to implement successfully. Is your idea in a graveyard of failed startups?",
    axis: "Defensibility",
  },
  {
    id: "pitfall-3",
    category: "pitfall",
    title: "Have you considered business viability?",
    guidance:
      "It's not enough for an idea to be cool. Can it be turned into a sustainable, profitable business?",
    axis: "Scalability",
  },
  {
    id: "pitfall-4",
    category: "pitfall",
    title: 'Are you waiting for the "perfect" idea?',
    guidance:
      "No idea is perfect from the start. A good idea is a starting point that will evolve. This is a check on your mindset.",
    axis: "Founder Fit",
  },

  // Core Deep Dive
  {
    id: "deepDive-1",
    category: "deepDive",
    title: "Do you have founder-market fit?",
    guidance:
      "Is your team the right one to work on this idea? Do you have unique insights or skills in this domain?",
    axis: "Founder Fit",
  },
  {
    id: "deepDive-2",
    category: "deepDive",
    title: "How big is the market?",
    guidance:
      "Is the Total Addressable Market (TAM) already large or growing rapidly? A big market allows for mistakes.",
    axis: "Market Size",
  },
  {
    id: "deepDive-3",
    category: "deepDive",
    title: "How acute is the problem?",
    guidance:
      'Is this a "hair on fire" problem (urgent, high-value) or a minor inconvenience? The more acute the problem, the easier it is to sell.',
    axis: "Problem Severity",
  },
  {
    id: "deepDive-4",
    category: "deepDive",
    title: "Do you have competition?",
    guidance:
      "Competition is often a positive sign, indicating a real market exists. Who are they and how will you be different?",
    axis: "Defensibility",
  },
  {
    id: "deepDive-5",
    category: "deepDive",
    title: "Has it only recently become possible or necessary?",
    guidance:
      "Look for ideas enabled by recent changes in technology, regulation, or culture. This creates a window of opportunity.",
    axis: "Defensibility",
  },
  {
    id: "deepDive-6",
    category: "deepDive",
    title: "Is this a scalable business?",
    guidance:
      "Software businesses are typically scalable. Be cautious with service businesses that rely heavily on skilled human labor for growth.",
    axis: "Scalability",
  },

  // Hidden Strengths
  {
    id: "hiddenStrengths-1",
    category: "hiddenStrengths",
    title: "Is this idea hard to get started?",
    guidance:
      "Difficult problems often have less competition. Tackling something complex can be a moat. (e.g., Stripe)",
    axis: "Defensibility",
  },
  {
    id: "hiddenStrengths-2",
    category: "hiddenStrengths",
    title: 'Is this idea in a "boring" space?',
    guidance:
      'Founders often avoid "boring" problems like payroll or HR, which means more opportunity for those who pursue them. (e.g., Gusto)',
    axis: "Market Size",
  },
  {
    id: "hiddenStrengths-3",
    category: "hiddenStrengths",
    title: "Does this idea have existing competitors?",
    guidance:
      "This can be a hidden strength. It validates the market. Can you win by offering a superior user experience or a 10x better product? (e.g., Dropbox)",
    axis: "Market Size",
  },

  // Origin & Validation
  {
    id: "origin-1",
    category: "origin",
    title: "Do you want this personally? Do you know people who want this?",
    guidance:
      "Personal connection or knowing others who need the solution is the first and strongest form of demand validation.",
    axis: "Problem Severity",
  },
  {
    id: "origin-2",
    category: "origin",
    title: "Did this idea come from your team's unique expertise?",
    guidance:
      'Leveraging your team\'s unique skills gives you an automatic "founder-market fit" and an unfair advantage.',
    axis: "Founder Fit",
  },
  {
    id: "origin-3",
    category: "origin",
    title: "Is this an idea you'd want to work on for 10 years?",
    guidance:
      "Startups are a marathon. Even if it seems boring now, can you see it becoming engaging as the business grows?",
    axis: "Founder Fit",
  },
];
