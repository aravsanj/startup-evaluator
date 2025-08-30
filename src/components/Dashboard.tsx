import type { Idea, Answer, Category, EvaluationItem } from "../types";
import { RadarChartComponent } from "./RadarChartComponent";
import { Button } from "./ui/button";

import { GradientBorderCard } from "./GradientBorderCard";

interface DashboardProps {
  idea: Idea;
  answers: Record<string, Answer>;
  categories: Category[];
  items: EvaluationItem[];
  onStartEvaluation: (categoryId: string) => void;
  onShowReport: () => void;
}

export function Dashboard({
  idea,
  answers,
  categories,
  items,
  onStartEvaluation,
  onShowReport,
}: DashboardProps) {
  const completedCount = Object.values(answers).filter(
    (a) => a.notes.length > 0
  ).length;
  const totalCount = items.length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{idea.name}</h1>
        <p className="text-xl text-muted-foreground mt-2">{idea.pitch}</p>
      </div>

      <GradientBorderCard>
        <h2 className="text-xl font-semibold mb-2">Idea Health Snapshot</h2>
        <p className="text-slate-400 mb-4">
          A visual summary of your idea's strengths and weaknesses.
        </p>
        <RadarChartComponent answers={answers} items={items} />
      </GradientBorderCard>

      <div>
        <h2 className="text-2xl font-bold mb-4">Evaluation Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const categoryItems = items.filter(
              (item) => item.category === category.id
            );
            const completedInCategory = categoryItems.filter(
              (item) => answers[item.id]?.notes.length > 0
            ).length;
            const isComplete = completedInCategory === categoryItems.length;

            return (
              <GradientBorderCard key={category.id}>
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-slate-400 flex-grow mt-1">
                    {category.description}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-sm font-medium ${
                        isComplete ? "text-green-400" : "text-slate-400"
                      }`}
                    >
                      {completedInCategory} / {categoryItems.length} Completed
                    </span>
                    <Button
                      onClick={() => onStartEvaluation(category.id)}
                      className="cursor-pointer"
                    >
                      {isComplete ? "Review" : "Start"}
                    </Button>
                  </div>
                </div>
              </GradientBorderCard>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={onShowReport}
          disabled={completedCount < totalCount}
        >
          Generate Final Report
        </Button>
        {completedCount < totalCount && (
          <p className="text-sm text-muted-foreground mt-2">
            Complete all modules to generate the report.
          </p>
        )}
      </div>
    </div>
  );
}
