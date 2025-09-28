import { Trophy, Star, Target } from 'lucide-react';
import { GameStats } from '@/types/game';

interface GameHeaderProps {
  stats: GameStats;
}

export const GameHeader = ({ stats }: GameHeaderProps) => {
  const progressPercentage = (stats.verbsMastered / stats.totalVerbs) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="game-card p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              🎯 English Verb Quest
            </h1>
            <p className="text-muted-foreground text-lg">
              Master irregular verbs with fun activities!
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center game-card p-4 bg-primary/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary text-xl">{stats.totalScore}</span>
              </div>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            
            <div className="text-center game-card p-4 bg-success/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="w-5 h-5 text-success" />
                <span className="font-bold text-success text-xl">{stats.currentStreak}</span>
              </div>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
            
            <div className="text-center game-card p-4 bg-accent/10">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Target className="w-5 h-5 text-accent" />
                <span className="font-bold text-accent text-xl">{stats.verbsMastered}/{stats.totalVerbs}</span>
              </div>
              <p className="text-xs text-muted-foreground">Mastered</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-primary-glow h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};