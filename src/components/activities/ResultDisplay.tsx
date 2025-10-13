import { CheckCircle, XCircle } from 'lucide-react';

interface ResultDisplayProps {
  isCorrect: boolean;
  children: React.ReactNode;
}

export const ResultDisplay = ({ isCorrect, children }: ResultDisplayProps) => {
  return (
    <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-success/10 border-2 border-success/30' : 'bg-destructive/10 border-2 border-destructive/30'}`}>
      <div className="flex items-center justify-center gap-3 mb-4">
        {isCorrect ? (
          <CheckCircle className="w-8 h-8 text-success" />
        ) : (
          <XCircle className="w-8 h-8 text-destructive" />
        )}
        <span className={`text-lg font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
          {isCorrect ? 'Excellent!' : 'Keep trying!'}
        </span>
      </div>
      {children}
    </div>
  );
};
