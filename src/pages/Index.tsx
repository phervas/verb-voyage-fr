import { useState } from 'react';
import { GameHeader } from '@/components/GameHeader';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { MeaningMatch } from '@/components/activities/MeaningMatch';
import { PastFormQuiz } from '@/components/activities/PastFormQuiz';
import { FillBlankActivity } from '@/components/activities/FillBlankActivity';
import { useGameStats } from '@/hooks/useGameStats';
import { ActivityType, ActivityResult } from '@/types/game';
import { 
  BookOpen, 
  Clock, 
  Edit3, 
  Languages, 
  Brain,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentActivity, setCurrentActivity] = useState<ActivityType | null>(null);
  const { stats, updateProgress, resetStats } = useGameStats();
  const { toast } = useToast();

  const handleActivityComplete = (result: ActivityResult) => {
    updateProgress(result);
    
    if (result.correct) {
      toast({
        title: "Excellent! 🎉",
        description: `You earned 10 points! Keep it up!`,
        duration: 2000,
      });
    } else {
      toast({
        title: "Keep trying! 💪",
        description: "Practice makes perfect!",
        duration: 2000,
      });
    }
    
    // Return to main menu after a short delay
    setTimeout(() => {
      setCurrentActivity(null);
    }, 1000);
  };

  const activities = [
    {
      id: 'meaning-match' as ActivityType,
      title: 'Meaning Match',
      description: 'Match French meanings to English verbs',
      icon: <Languages />,
      difficulty: 'easy' as const,
    },
    {
      id: 'past-form' as ActivityType,
      title: 'Past Tense Quiz',
      description: 'Choose the correct past tense form',
      icon: <Clock />,
      difficulty: 'medium' as const,
    },
    {
      id: 'past-participle' as ActivityType,
      title: 'Past Participle Quiz',
      description: 'Select the right past participle',
      icon: <BookOpen />,
      difficulty: 'medium' as const,
    },
    {
      id: 'fill-blank' as ActivityType,
      title: 'Fill the Blank',
      description: 'Complete sentences with correct verb forms',
      icon: <Edit3 />,
      difficulty: 'hard' as const,
    }
  ];

  if (currentActivity === 'meaning-match') {
    return (
      <div className="min-h-screen p-4">
        <MeaningMatch 
          key="meaning-match"
          onComplete={handleActivityComplete}
          onBack={() => setCurrentActivity(null)}
        />
      </div>
    );
  }

  if (currentActivity === 'past-form') {
    return (
      <div className="min-h-screen p-4">
        <PastFormQuiz 
          key="past-form"
          type="past"
          onComplete={handleActivityComplete}
          onBack={() => setCurrentActivity(null)}
        />
      </div>
    );
  }

  if (currentActivity === 'past-participle') {
    return (
      <div className="min-h-screen p-4">
        <PastFormQuiz 
          key="past-participle"
          type="past-participle"
          onComplete={handleActivityComplete}
          onBack={() => setCurrentActivity(null)}
        />
      </div>
    );
  }

  if (currentActivity === 'fill-blank') {
    return (
      <div className="min-h-screen p-4">
        <FillBlankActivity 
          key="fill-blank"
          onComplete={handleActivityComplete}
          onBack={() => setCurrentActivity(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <GameHeader stats={stats} />
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            🎮 Choose Your Challenge
          </h2>
          <p className="text-lg text-muted-foreground">
            Select an activity to practice irregular verbs and earn points!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              description={activity.description}
              icon={activity.icon}
              difficulty={activity.difficulty}
              onClick={() => setCurrentActivity(activity.id)}
            />
          ))}
        </div>

        {stats.totalScore > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={resetStats}
              className="text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Progress
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;