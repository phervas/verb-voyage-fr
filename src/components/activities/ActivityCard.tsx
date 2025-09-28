import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ActivityCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  className?: string;
}

export const ActivityCard = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  difficulty = 'easy',
  completed = false,
  className 
}: ActivityCardProps) => {
  const difficultyColors = {
    easy: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    hard: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  return (
    <div 
      className={cn(
        "game-card p-6 cursor-pointer group",
        "hover:scale-105 transition-all duration-300",
        completed && "ring-2 ring-success/30 bg-success/5",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            {completed && <span className="text-success text-lg">✓</span>}
          </div>
          
          <p className="text-muted-foreground mb-3">{description}</p>
          
          <div className="flex items-center justify-between">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border",
              difficultyColors[difficulty]
            )}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            
            <div className="text-primary font-medium group-hover:translate-x-1 transition-transform duration-300">
              Play →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};