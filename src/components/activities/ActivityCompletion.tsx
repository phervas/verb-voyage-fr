import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { ActivityState } from '@/hooks/useActivity';

interface ActivityCompletionProps {
  title: string;
  state: ActivityState;
  questionLimit: number;
  onTryAgain: () => void;
  onGoHome: () => void;
}

export const ActivityCompletion = ({ 
  title, 
  state, 
  questionLimit, 
  onTryAgain, 
  onGoHome 
}: ActivityCompletionProps) => {
  const percentage = Math.round((state.score / questionLimit) * 100);
  const isPerfect = state.score === questionLimit;
  const isGood = percentage >= 70;

  const getMessage = () => {
    if (isPerfect) return "Perfect! 🎉";
    if (isGood) return "Great job! 👏";
    return "Keep practicing! 💪";
  };

  const getColor = () => {
    if (isPerfect) return "text-success";
    if (isGood) return "text-primary";
    return "text-warning";
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="game-card p-8 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-4">
            <Trophy className={`w-16 h-16 ${getColor()}`} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">{title} Complete!</h2>
          <p className={`text-2xl font-bold mb-4 ${getColor()}`}>
            {getMessage()}
          </p>
        </div>

        <div className="mb-8 p-6 bg-primary/10 rounded-2xl">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{state.score}</p>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{percentage}%</p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={onGoHome}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
          <Button 
            onClick={onTryAgain}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};
