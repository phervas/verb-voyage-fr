import { Button } from '@/components/ui/button';
import { ActivityState } from '@/hooks/useActivity';

interface ActivityLayoutProps {
  title: string;
  onBack: () => void;
  state: ActivityState;
  questionLimit: number;
  children: React.ReactNode;
}

export const ActivityLayout = ({ 
  title, 
  onBack, 
  state, 
  questionLimit, 
  children 
}: ActivityLayoutProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="game-card p-8 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onBack}>← Back</Button>
            <span className="text-sm text-muted-foreground">
              Question {state.questionCount}/{questionLimit} | Score: {state.score}/{questionLimit}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};
