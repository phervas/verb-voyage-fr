export interface IrregularVerb {
  infinitive: string;
  past: string;
  pastParticiple: string;
  french: string;
}

export interface GameProgress {
  verbId: string;
  correctAnswers: number;
  totalAttempts: number;
  mastered: boolean;
}

export interface ActivityResult {
  correct: boolean;
  verbId: string;
  activityType: ActivityType;
}

export type ActivityType = 
  | 'meaning-match'
  | 'past-form'
  | 'past-participle'
  | 'fill-blank'
  | 'french-match'
  | 'memory-practice';

export interface GameStats {
  totalScore: number;
  verbsMastered: number;
  totalVerbs: number;
  currentStreak: number;
  bestStreak: number;
}