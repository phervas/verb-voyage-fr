import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { IRREGULAR_VERBS } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { CheckCircle, XCircle } from 'lucide-react';

interface MeaningMatchProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
}

const ROUND_SIZE = 10; // first 10 unique verbs per round

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const MeaningMatch = ({ onComplete, onBack }: MeaningMatchProps) => {
  // queue holds a list of verb indices for this round
  const [queue, setQueue] = useState<number[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [options, setOptions] = useState<IrregularVerb[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [score, setScore] = useState(0); // mirrors correctCount for UI

  // initialize queue with 10 unique, shuffled verbs
  useEffect(() => {
    const total = Math.min(ROUND_SIZE, IRREGULAR_VERBS.length);
    const initialQueue = shuffle(IRREGULAR_VERBS.map((_, i) => i)).slice(0, total);
    setQueue(initialQueue);
  }, []);

  // pick distractors and build options whenever current changes
  useEffect(() => {
    if (currentIdx == null) return;
    const correctVerb = IRREGULAR_VERBS[currentIdx];
    const others = IRREGULAR_VERBS.filter((_, i) => i !== currentIdx);
    const distractors = shuffle(others).slice(0, 3);
    setOptions(shuffle([correctVerb, ...distractors]));
  }, [currentIdx]);

  // set current from queue front
  useEffect(() => {
    if (queue.length === 0) {
      // finished round
      if (correctCount > 0) {
        onComplete({
          correct: true,
          verbId: '', // not meaningful at round end
          activityType: 'meaning-match'
        });
      }
      return;
    }
    setCurrentIdx(queue[0]);
    setShowResult(false);
  }, [queue]);

  const handleAnswerSelect = (selected: IrregularVerb) => {
    if (currentIdx == null || showResult) return;

    const correctVerb = IRREGULAR_VERBS[currentIdx];
    const correct = selected.infinitive === correctVerb.infinitive;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      // remove the head of the queue
      setQueue(prev => prev.slice(1));
      setCorrectCount(c => c + 1);
      setScore(s => s + 1);
      // brief feedback then next card will auto-load from queue effect
      setTimeout(() => setShowResult(false), 800);
    } else {
      // move the head to position +2, or to end if near the end
      setQueue(prev => {
        if (prev.length <= 1) return prev; // nothing to reshuffle
        const [head, ...rest] = prev;
        // desired reinsertion index is 2 (i.e., two turns later)
        const insertAt = Math.min(2, rest.length); // if rest length < 2, this becomes end
        const next = [...rest.slice(0, insertAt), head, ...rest.slice(insertAt)];
        return next;
      });
      // brief feedback, then next card will auto-load from queue effect
      setTimeout(() => setShowResult(false), 800);
    }
  };

  if (currentIdx == null || queue.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="game-card p-8 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" onClick={onBack}>← Back</Button>
              <span className="text-sm text-muted-foreground">
                Done | Score: {score}/{Math.min(ROUND_SIZE, IRREGULAR_VERBS.length)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">All done!</h2>
          </div>
        </div>
      </div>
    );
  }

  const currentVerb = IRREGULAR_VERBS[currentIdx];
  const remaining = queue.length;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="game-card p-8 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onBack}>← Back</Button>
            <span className="text-sm text-muted-foreground">
              Remaining: {remaining} | Correct: {correctCount}/{Math.min(ROUND_SIZE, IRREGULAR_VERBS.length)} | Score: {score}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Match the Meaning!</h2>
        </div>

        <div className="mb-8 p-6 bg-primary/10 rounded-2xl">
          <p className="text-2xl font-bold text-primary mb-2">"{currentVerb.french}"</p>
        </div>

        {!showResult ? (
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="h-16 text-lg font-medium game-button"
                onClick={() => handleAnswerSelect(option)}
              >
                {option.infinitive}
              </Button>
            ))}
          </div>
        ) : (
          <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-success/10 border-2 border-success/30' : 'bg-destructive/10 border-2 border-destructive/30'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="w-8 h-8 text-success" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive" />
              )}
              <span className={`text-md font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                {isCorrect ? 'Correct!' : 'Try again!'}
              </span>
            </div>
            <p className="text-2xl mb-4">
              "{currentVerb.french}" = <strong>{currentVerb.infinitive}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};