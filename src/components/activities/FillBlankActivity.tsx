import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SAMPLE_SENTENCES } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { useActivity } from '@/hooks/useActivity';
import { useShuffledVerbs } from '@/hooks/useShuffledVerbs';
import { ActivityLayout } from './ActivityLayout';
import { QuestionDisplay } from './QuestionDisplay';
import { ResultDisplay } from './ResultDisplay';
import { ActivityCompletion } from './ActivityCompletion';

interface FillBlankActivityProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
}

export const FillBlankActivity = ({ onComplete, onBack }: FillBlankActivityProps) => {
  const { getCurrentVerb, moveToNext, reset } = useShuffledVerbs();
  const [currentVerb, setCurrentVerb] = useState<IrregularVerb | null>(null);
  const [sentence, setSentence] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [formType, setFormType] = useState<'past' | 'past-participle'>('past');
  
  const {
    state,
    resetQuestionState,
    resetActivity,
    handleAnswer,
    nextQuestion,
    completeActivity,
    shouldComplete,
    questionLimit,
    timeoutMs
  } = useActivity({
    questionLimit: 62,
    activityType: 'fill-blank',
    timeoutMs: 1500
  });

  const generateQuestion = () => {
    const verb = getCurrentVerb();
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
    moveToNext();
    resetQuestionState();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    handleAnswer(correct);

    setTimeout(() => {
      if (shouldComplete()) {
        completeActivity(currentVerb?.infinitive || '', correct);
      } else {
        nextQuestion();
        generateQuestion();
      }
    }, timeoutMs);
  };

  const handleTryAgain = () => {
    resetActivity();
    setUserAnswer('');
    setCorrectAnswer('');
    setCurrentVerb(null);
    setFormType('past');
    reset();
    generateQuestion();
  };

  const handleGoHome = () => {
    const result = completeActivity(currentVerb?.infinitive || '', state.isCorrect);
    onComplete(result);
  };

  if (!currentVerb) return null;

  if (state.isCompleted) {
    return (
      <ActivityCompletion
        title="Fill in the Blank"
        state={state}
        questionLimit={questionLimit}
        onTryAgain={handleTryAgain}
        onGoHome={handleGoHome}
      />
    );
  }

  return (
    <ActivityLayout
      title="Fill the Blank"
      onBack={onBack}
      state={state}
      questionLimit={questionLimit}
    >
      <QuestionDisplay className="bg-secondary/10">
        <p className="text-lg mb-4">
          <strong>{currentVerb.infinitive}</strong> ({formType === 'past' ? 'past tense' : 'past participle'})
        </p>
        <p className="text-xl font-medium text-foreground">
          {sentence}
        </p>
      </QuestionDisplay>

      {!state.showResult ? (
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
        <ResultDisplay isCorrect={state.isCorrect}>
          <p className="text-2xl mb-4">
            Answer: <strong>{correctAnswer}</strong>
          </p>
          <p className="text-2xl text-muted-foreground mb-4">
            {sentence.replace('_____', correctAnswer)}
          </p>
        </ResultDisplay>
      )}
    </ActivityLayout>
  );
};