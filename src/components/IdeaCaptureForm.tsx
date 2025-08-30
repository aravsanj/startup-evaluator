import { useState } from "react";
import type { Idea } from "../types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GradientBorderCard } from "./GradientBorderCard";

interface IdeaCaptureFormProps {
  onIdeaSubmit: (idea: Idea) => void;
}

export function IdeaCaptureForm({ onIdeaSubmit }: IdeaCaptureFormProps) {
  const [name, setName] = useState("");
  const [pitch, setPitch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && pitch) {
      onIdeaSubmit({ name, pitch });
    }
  };

  return (
    <GradientBorderCard className="w-full max-w-lg">
      <form onSubmit={handleSubmit}>
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold">Evaluate Your Startup Idea</h1>
          <p className="text-slate-400">
            Start by defining your core concept. Clarity is the first step to
            success.
          </p>
        </div>
        <div className="space-y-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="idea-name">Idea Name</Label>
            <Input
              id="idea-name"
              placeholder="e.g., Flexport for Latin America"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="idea-pitch">One-Liner Pitch</Label>
            <Textarea
              id="idea-pitch"
              placeholder="A clear, concise sentence describing what you do."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Start Evaluation
        </Button>
      </form>
    </GradientBorderCard>
  );
}
