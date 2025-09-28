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

    setTimeout(() => {
      onComplete({
        correct,
        verbId: currentVerb?.infinitive || '',
        activityType: 'fill-blank'
      });
    }, 2000);
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  if (!currentVerb) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="game-card p-8 text-center">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-4"
          >
            ← Back to Activities
          </Button>
          <h2 className="text-2xl font-bold text-primary mb-2">Fill in the Blank</h2>
          <p className="text-muted-foreground">Complete the sentence with the correct verb form!</p>
        </div>

        <div className="mb-8 p-6 bg-secondary/10 rounded-2xl">
          <p className="text-lg mb-4">
            <strong>Verb:</strong> {currentVerb.infinitive} ({currentVerb.french})
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Use the <strong>{formType === 'past' ? 'past tense' : 'past participle'}</strong> form:
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
                {isCorrect ? 'Perfect!' : 'Not quite!'}
              </span>
            </div>
            
            <p className="text-lg mb-2">
              Correct answer: <strong>{correctAnswer}</strong>
            </p>
            
            {!isCorrect && (
              <p className="text-muted-foreground mb-4">
                Your answer: <strong>{userAnswer}</strong>
              </p>
            )}

            <p className="text-sm text-muted-foreground mb-4">
              Complete sentence: {sentence.replace('_____', correctAnswer)}
            </p>
            
            <Button 
              onClick={nextQuestion}
              className="mt-4"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Next Sentence
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};