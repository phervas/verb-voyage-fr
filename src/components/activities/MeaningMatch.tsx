import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IRREGULAR_VERBS } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface MeaningMatchProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
}

export const MeaningMatch = ({ onComplete, onBack }: MeaningMatchProps) => {
  const [currentVerb, setCurrentVerb] = useState<IrregularVerb | null>(null);
  const [options, setOptions] = useState<IrregularVerb[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<IrregularVerb | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
    const otherVerbs = IRREGULAR_VERBS.filter(v => v.infinitive !== verb.infinitive);
    const wrongOptions = otherVerbs.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [verb, ...wrongOptions].sort(() => 0.5 - Math.random());
    
    setCurrentVerb(verb);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswerSelect = (selected: IrregularVerb) => {
    setSelectedAnswer(selected);
    const correct = selected.infinitive === currentVerb?.infinitive;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (questionCount >= 5) {
        onComplete({
          correct,
          verbId: currentVerb?.infinitive || '',
          activityType: 'meaning-match'
        });
      } else {
        nextQuestion();
      }
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (questionCount >= 5) {
      onComplete({
        correct: isCorrect,
        verbId: currentVerb?.infinitive || '',
        activityType: 'meaning-match'
      });
    } else {
      nextQuestion();
    }
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
          <h2 className="text-2xl font-bold text-primary mb-2">Match the Meaning!</h2>
        </div>

        <div className="mb-8 p-6 bg-primary/10 rounded-2xl">
          <p className="text-2xl font-bold text-primary mb-2">"{currentVerb.french}"</p>
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
                {option.infinitive}
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
                {isCorrect ? 'Correct!' : 'Try again!'}
              </span>
            </div>
            
            <p className="text-lg mb-4">
              "{currentVerb.french}" = <strong>{currentVerb.infinitive}</strong>
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={handleNextQuestion}
                size="sm"
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {questionCount >= 5 ? 'Finish Challenge' : 'Next'}
              </Button>
    
            </div>
          </div>
        )}
      </div>
    </div>
  );
};