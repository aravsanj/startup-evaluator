import { useState, useMemo } from "react";
import type { AppState, Idea, Answer } from "./types";
import { evaluationItems, evaluationCategories } from "./data/evaluationData";
import { IdeaCaptureForm } from "./components/IdeaCaptureForm";
import { Dashboard } from "./components/Dashboard";
import { EvaluationModule } from "./components/EvaluationModule";
import { Report } from "./components/Report";

function App() {
  const [appState, setAppState] = useState<AppState>("capture");
  const [idea, setIdea] = useState<Idea | null>(null);
  const [answers, setAnswers] = useState<Record<string, Answer>>(() => {
    const initialAnswers: Record<string, Answer> = {};
    evaluationItems.forEach((item) => {
      initialAnswers[item.id] = {
        itemId: item.id,
        notes: "",
        actionItems: "",
        confidence: 50,
      };
    });
    return initialAnswers;
  });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIdeaSubmit = (submittedIdea: Idea) => {
    setIdea(submittedIdea);
    setAppState("dashboard");
  };

  const handleUpdateAnswer = (answer: Answer) => {
    setAnswers((prev) => ({ ...prev, [answer.itemId]: answer }));
  };

  const handleStartEvaluation = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleEvaluationComplete = () => {
    setActiveCategory(null);
    setIsModalOpen(false);
  };

  const activeItems = useMemo(() => {
    return evaluationItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const renderContent = () => {
    switch (appState) {
      case "capture":
        return (
          <div className="flex items-center justify-center min-h-screen">
            <IdeaCaptureForm onIdeaSubmit={handleIdeaSubmit} />
          </div>
        );
      case "dashboard":
        return (
          idea && (
            <Dashboard
              idea={idea}
              answers={answers}
              categories={evaluationCategories}
              items={evaluationItems}
              onStartEvaluation={handleStartEvaluation}
              onShowReport={() => setAppState("report")}
            />
          )
        );
      case "report":
        return (
          idea && (
            <Report
              idea={idea}
              answers={answers}
              items={evaluationItems}
              onBackToDashboard={() => setAppState("dashboard")}
            />
          )
        );
      default:
        return (
          <div className="flex items-center justify-center min-h-screen">
            <IdeaCaptureForm onIdeaSubmit={handleIdeaSubmit} />
          </div>
        );
    }
  };

  return (
    <main className="relative min-h-screen p-4 bg-slate-950 overflow-hidden">
      <style>{`
        @keyframes animate-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: animate-gradient 5s ease infinite;
        }
      `}</style>

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/40 rounded-full filter blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/40 rounded-full filter blur-3xl opacity-60 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10">
        {renderContent()}
        {activeItems.length > 0 && (
          <EvaluationModule
            items={activeItems}
            answers={answers}
            onUpdateAnswer={handleUpdateAnswer}
            onComplete={handleEvaluationComplete}
            isOpen={isModalOpen}
          />
        )}
      </div>
    </main>
  );
}

export default App;
