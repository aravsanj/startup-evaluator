import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Answer, EvaluationItem } from "../types";

interface RadarChartComponentProps {
  answers: Record<string, Answer>;
  items: EvaluationItem[];
}

export function RadarChartComponent({
  answers,
  items,
}: RadarChartComponentProps) {
  const axes: (
    | "Problem Severity"
    | "Market Size"
    | "Founder Fit"
    | "Scalability"
    | "Defensibility"
  )[] = [
    "Problem Severity",
    "Market Size",
    "Founder Fit",
    "Scalability",
    "Defensibility",
  ];

  const data = axes.map((axis) => {
    const relevantItems = items.filter((item) => item.axis === axis);
    const relevantAnswers = relevantItems.map(
      (item) => answers[item.id]?.confidence || 0
    );
    const score =
      relevantAnswers.length > 0
        ? relevantAnswers.reduce((a, b) => a + b, 0) / relevantAnswers.length
        : 0;
    return {
      subject: axis,
      A: score,
      fullMark: 100,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Idea Health"
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  );
}
