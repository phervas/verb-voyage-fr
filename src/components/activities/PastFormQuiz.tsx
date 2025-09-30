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
  const [questionCount, setQuestionCount] = useState(1);
  const [score, setScore] = useState(0);

  const generateQuestion = () => {
    const verb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
    const correctAnswer = type === 'past' ? verb.past : verb.pastParticiple;
    
    // Generate more challenging wrong options
    const wrongOptions = [];
    
    // Add the infinitive form as a common mistake
    wrongOptions.push(verb.infinitive);
    
    // Add similar-sounding forms from other verbs
    const similarOptions = IRREGULAR_VERBS
      .filter(v => v.infinitive !== verb.infinitive)
      .map(v => type === 'past' ? v.past : v.pastParticiple)
      .filter(answer => answer !== correctAnswer && answer.length >= correctAnswer.length - 1 && answer.length <= correctAnswer.length + 1);
    
    wrongOptions.push(...similarOptions.slice(0, 2));
    
    // Fill with random options if needed
    while (wrongOptions.length < 3) {
      const randomVerb = IRREGULAR_VERBS[Math.floor(Math.random() * IRREGULAR_VERBS.length)];
      const randomForm = type === 'past' ? randomVerb.past : randomVerb.pastParticiple;
      if (!wrongOptions.includes(randomForm) && randomForm !== correctAnswer) {
        wrongOptions.push(randomForm);
      }
    }
    
    const allOptions = [correctAnswer, ...wrongOptions.slice(0, 3)].sort(() => 0.5 - Math.random());
    
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
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (questionCount >= 10) {
        onComplete({
          correct,
          verbId: currentVerb?.infinitive || '',
          activityType: type === 'past' ? 'past-form' : 'past-participle'
        });
      } else {
        nextQuestion();
      }
    }, 3000);
  };

  const handleNextQuestion = () => {
    if (questionCount >= 10) {
      onComplete({
        correct: isCorrect,
        verbId: currentVerb?.infinitive || '',
        activityType: type === 'past' ? 'past-form' : 'past-participle'
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

  const questionText = type === 'past' 
    ? `What is the past tense of "${currentVerb.infinitive}"?`
    : `What is the past participle of "${currentVerb.infinitive}"?`;

  const correctAnswer = type === 'past' ? currentVerb.past : currentVerb.pastParticiple;

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="game-card p-8 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" onClick={onBack}>← Back</Button>
            <span className="text-sm text-muted-foreground">Question {questionCount}/10 | Score: {score}/10</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            {type === 'past' ? 'Past Tense' : 'Past Participle'}
          </h2>
        </div>

        <div className="mb-8 p-6 bg-accent/10 rounded-2xl">
          <p className="text-xl font-bold text-foreground mb-2">{questionText}</p>
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
          <div className={`p-6 rounded-lg ${isCorrect ? 'bg-success/10 border-2 border-success/30' : 'bg-destructive/10 border-2 border-destructive/30'}`}>
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
            
            <p className="text-2xl mb-4">
              <strong>{currentVerb.infinitive}</strong> → <strong>{correctAnswer}</strong>
            </p>
            
          </div>
        )}
      </div>
    </div>
  );
};