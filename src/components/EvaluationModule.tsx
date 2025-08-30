import { useState, useEffect } from "react";
import type { Answer, EvaluationItem } from "../types";
import { QuestionCard } from "./QuestionCard";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface EvaluationModuleProps {
  items: EvaluationItem[];
  answers: Record<string, Answer>;
  isOpen: boolean;
  onUpdateAnswer: (answer: Answer) => void;
  onComplete: () => void;
}

export function EvaluationModule({
  items,
  answers,
  isOpen,
  onUpdateAnswer,
  onComplete,
}: EvaluationModuleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [items]);

  const currentItem = items[currentIndex];
  if (!currentItem) return null;

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progressValue = ((currentIndex + 1) / items.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onComplete}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 ">
        <DialogHeader>
          <DialogTitle>Evaluating: {currentItem.category}</DialogTitle>
          <p className="text-sm  pt-2">
            Question {currentIndex + 1} of {items.length}
          </p>
          <Progress value={progressValue} className="mt-2" />
        </DialogHeader>
        <div className="space-y-6 py-4">
          <QuestionCard
            item={currentItem}
            answer={answers[currentItem.id]}
            onAnswerChange={onUpdateAnswer}
          />
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentIndex === items.length - 1
                ? "Finish & Close"
                : "Next Question"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
