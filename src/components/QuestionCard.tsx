import type { Answer, EvaluationItem } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Slider } from "./ui/slider";

interface QuestionCardProps {
  item: EvaluationItem;
  answer: Answer;
  onAnswerChange: (answer: Answer) => void;
}

export function QuestionCard({
  item,
  answer,
  onAnswerChange,
}: QuestionCardProps) {
  const handleConfidenceChange = (value: number[]) => {
    onAnswerChange({ ...answer, confidence: value[0] });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.guidance}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor={`notes-${item.id}`}>
            My Thoughts & Justification
          </Label>
          <Textarea
            id={`notes-${item.id}`}
            placeholder="Based on my research..."
            value={answer.notes}
            onChange={(e) =>
              onAnswerChange({ ...answer, notes: e.target.value })
            }
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`actions-${item.id}`}>
            What do I need to find out?
          </Label>
          <Textarea
            id={`actions-${item.id}`}
            placeholder="e.g., Research market size reports, talk to 5 potential customers..."
            value={answer.actionItems}
            onChange={(e) =>
              onAnswerChange({ ...answer, actionItems: e.target.value })
            }
            rows={3}
          />
        </div>
        <div className="space-y-4">
          <Label>Confidence Level: {answer.confidence}%</Label>
          <Slider
            value={[answer.confidence]}
            onValueChange={handleConfidenceChange}
            max={100}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}
