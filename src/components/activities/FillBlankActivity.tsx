import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IRREGULAR_VERBS, SAMPLE_SENTENCES } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface FillBlankActivityProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
}

export const FillBlankActivity = ({ onComplete, onBack }: FillBlankActivityProps) => {
  const [currentVerb, setCurrentVerb] = useState<IrregularVerb | null>(null);
  const [sentence, setSentence] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [formType, setFormType] = useState<'past' | 'past-participle'>('past');
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
    const verbKey = verb.infinitive as keyof typeof SAMPLE_SENTENCES;
    const sentences = SAMPLE_SENTENCES[verbKey] || [`Please _____ me know.`, `She _____ it yesterday.`];
    const selectedSentence = sentences[Math.floor(Math.random() * sentences.length)];
    
    // Randomly choose between past and past participle
    const useFormType = Math.random() > 0.5 ? 'past' : 'past-participle';
    const answer = useFormType === 'past' ? verb.past : verb.pastParticiple;
    
    setCurrentVerb(verb);
    setSentence(selectedSentence);
    setCorrectAnswer(answer);
    setFormType(useFormType);
    setUserAnswer('');
    setShowResult(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (questionCount >= 5) {
        onComplete({
          correct,
          verbId: currentVerb?.infinitive || '',
          activityType: 'fill-blank'
        });
      } else {
        nextQuestion();
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setQuestionCount(questionCount + 1);
    generateQuestion();
  };

  if (!currentVerb) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="game-card p-8 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onBack}>← Back</Button>
            <span className="text-sm text-muted-foreground">Question {questionCount}/5 | Score: {score}/5</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Fill the Blank</h2>
        </div>

        <div className="mb-8 p-6 bg-secondary/10 rounded-2xl">
          <p className="text-lg mb-4">
            <strong>{currentVerb.infinitive}</strong> ({formType === 'past' ? 'past tense' : 'past participle'})
          </p>
          <p className="text-xl font-medium text-foreground">
            {sentence}
          </p>
        </div>

        {!showResult ? (
          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="text-center text-lg h-12"
              onKeyPress={(e) => e.key === 'Enter' && userAnswer.trim() && handleSubmit()}
            />
            <Button 
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              size="lg"
              className="w-full"
            >
              Check Answer
            </Button>
          </div>
        ) : (
          <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-success/10 border-2 border-success/30' : 'bg-destructive/10 border-2 border-destructive/30'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="w-8 h-8 text-success" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive" />
              )}
              <span className={`text-2xl font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                {isCorrect ? 'Perfect!' : 'Try again!'}
              </span>
            </div>
            
            <p className="text-lg mb-2">
              Answer: <strong>{correctAnswer}</strong>
            </p>

            <p className="text-sm text-muted-foreground mb-4">
              {sentence.replace('_____', correctAnswer)}
            </p>
            
            {questionCount < 5 && (
              <p className="text-sm text-muted-foreground">Next question in 1.5 seconds...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};