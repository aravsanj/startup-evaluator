import { useRef, useCallback } from "react";
import { toPng } from "html-to-image";
import type { Idea, Answer, EvaluationItem } from "../types";
import { RadarChartComponent } from "./RadarChartComponent";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { GradientBorderCard } from "./GradientBorderCard";

interface ReportProps {
  idea: Idea;
  answers: Record<string, Answer>;
  items: EvaluationItem[];
  onBackToDashboard: () => void;
}

export function Report({
  idea,
  answers,
  items,
  onBackToDashboard,
}: ReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  const sortedAnswers = Object.values(answers).sort(
    (a, b) => b.confidence - a.confidence
  );
  const strengths = sortedAnswers.slice(0, 5);
  const weaknesses = sortedAnswers.slice(-5).reverse();
  const actionItems = Object.values(answers)
    .map((a) => a.actionItems)
    .filter(Boolean);

  const handleDownloadImage = useCallback(() => {
    if (reportRef.current === null) {
      return;
    }
    toPng(reportRef.current, { cacheBust: true, backgroundColor: "#020024" })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${idea.name.replace(/ /g, "_")}_report.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error(err);
      });
  }, [reportRef, idea.name]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-8">
      <div ref={reportRef} className="p-8 bg-[#070707] space-y-8 rounded-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Evaluation Report: {idea.name}</h1>
          <p className="text-lg text-slate-300 mt-2">{idea.pitch}</p>
        </div>
        <GradientBorderCard>
          <h2 className="text-xl font-semibold">Final Idea Health</h2>
          <RadarChartComponent answers={answers} items={items} />
        </GradientBorderCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GradientBorderCard>
            <h2 className="text-xl font-semibold mb-4">Top Strengths</h2>
            <ul className="space-y-2 list-disc list-outside pl-5">
              {strengths.map((answer) => (
                <li key={answer.itemId}>
                  {items.find((i) => i.id === answer.itemId)?.title} (
                  {answer.confidence}%)
                </li>
              ))}
            </ul>
          </GradientBorderCard>
          <GradientBorderCard>
            <h2 className="text-xl font-semibold mb-4">
              Top Risks / Weaknesses
            </h2>
            <ul className="space-y-2 list-disc list-outside pl-5">
              {weaknesses.map((answer) => (
                <li key={answer.itemId}>
                  {items.find((i) => i.id === answer.itemId)?.title} (
                  {answer.confidence}%)
                </li>
              ))}
            </ul>
          </GradientBorderCard>
        </div>
        <GradientBorderCard>
          <h2 className="text-xl font-semibold mb-4">
            Consolidated Action Plan
          </h2>
          <ul className="space-y-2 list-disc list-outside pl-5">
            {actionItems.length > 0 ? (
              actionItems.map((action, index) => <li key={index}>{action}</li>)
            ) : (
              <p>No action items were recorded.</p>
            )}
          </ul>
        </GradientBorderCard>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          onClick={onBackToDashboard}
          variant="outline"
          className="cursor-pointer"
        >
          Back to Dashboard
        </Button>
        <Button onClick={handleDownloadImage} className="cursor-pointer">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
}
