import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IRREGULAR_VERBS } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface PastFormQuizProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
  type: 'past' | 'past-participle';
}

export const PastFormQuiz = ({ onComplete, onBack, type }: PastFormQuizProps) => {
  const [currentVerb, setCurrentVerb] = useState<IrregularVerb | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const generateQuestion = () => {
    const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
    const correctAnswer = type === 'past' ? verb.past : verb.pastParticiple;
    
    // Generate wrong options from other verbs
    const otherAnswers = IRREGULAR_VERBS
      .filter(v => v.infinitive !== verb.infinitive)
      .map(v => type === 'past' ? v.past : v.pastParticiple)
      .filter(answer => answer !== correctAnswer);
    
    const wrongOptions = [...new Set(otherAnswers)].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
    
    setCurrentVerb(verb);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [type]);

  const handleAnswerSelect = (selected: string) => {
    setSelectedAnswer(selected);
    const correctAnswer = type === 'past' ? currentVerb?.past : currentVerb?.pastParticiple;
    const correct = selected === correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onComplete({
        correct,
        verbId: currentVerb?.infinitive || '',
        activityType: type === 'past' ? 'past-form' : 'past-participle'
      });
    }, 1500);
  };

  const nextQuestion = () => {
    generateQuestion();
  };

  if (!currentVerb) return null;

  const questionText = type === 'past' 
    ? `What is the past tense of "${currentVerb.infinitive}"?`
    : `What is the past participle of "${currentVerb.infinitive}"?`;

  const correctAnswer = type === 'past' ? currentVerb.past : currentVerb.pastParticiple;

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
          <h2 className="text-2xl font-bold text-primary mb-2">
            {type === 'past' ? 'Past Tense Quiz' : 'Past Participle Quiz'}
          </h2>
          <p className="text-muted-foreground">Choose the correct form!</p>
        </div>

        <div className="mb-8 p-6 bg-accent/10 rounded-2xl">
          <p className="text-xl font-bold text-foreground mb-2">{questionText}</p>
          <p className="text-sm text-muted-foreground">"{currentVerb.french}"</p>
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
                {option}
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
              <span className={`text-2xl font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                {isCorrect ? 'Excellent!' : 'Try again!'}
              </span>
            </div>
            
            <p className="text-lg mb-4">
              <strong>{currentVerb.infinitive}</strong> → <strong>{correctAnswer}</strong>
            </p>
            
            {!isCorrect && (
              <p className="text-muted-foreground mb-4">
                You selected: <strong>{selectedAnswer}</strong>
              </p>
            )}
            
            <Button 
              onClick={nextQuestion}
              className="mt-4"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Next Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};