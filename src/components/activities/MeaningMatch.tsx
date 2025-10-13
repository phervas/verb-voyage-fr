import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IRREGULAR_VERBS } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { useActivity } from '@/hooks/useActivity';
import { useShuffledVerbs } from '@/hooks/useShuffledVerbs';
import { ActivityLayout } from './ActivityLayout';
import { QuestionDisplay } from './QuestionDisplay';
import { ResultDisplay } from './ResultDisplay';
import { ActivityCompletion } from './ActivityCompletion';

interface MeaningMatchProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
}

export const MeaningMatch = ({ onComplete, onBack }: MeaningMatchProps) => {
  const { getCurrentVerb, moveToNext, reset } = useShuffledVerbs();
  const [currentVerb, setCurrentVerb] = useState<IrregularVerb | null>(null);
  const [options, setOptions] = useState<IrregularVerb[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<IrregularVerb | null>(null);
  
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
    questionLimit: 50,
    activityType: 'meaning-match',
    timeoutMs: 1500 // 1.8 seconds instead of default 3 seconds
  });

  const generateQuestion = () => {
    const verb = getCurrentVerb();
    const otherVerbs = IRREGULAR_VERBS.filter(v => v.infinitive !== verb.infinitive);
    const wrongOptions = otherVerbs.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [verb, ...wrongOptions].sort(() => 0.5 - Math.random());
    
    setCurrentVerb(verb);
    setOptions(allOptions);
    setSelectedAnswer(null);
    moveToNext();
    resetQuestionState();
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswerSelect = (selected: IrregularVerb) => {
    setSelectedAnswer(selected);
    const correct = selected.infinitive === currentVerb?.infinitive;
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
    setSelectedAnswer(null);
    setCurrentVerb(null);
    setOptions([]);
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
        title="Match the Meaning"
        state={state}
        questionLimit={questionLimit}
        onTryAgain={handleTryAgain}
        onGoHome={handleGoHome}
      />
    );
  }

  return (
    <ActivityLayout
      title="Match the Meaning!"
      onBack={onBack}
      state={state}
      questionLimit={questionLimit}
    >
      <QuestionDisplay className="bg-primary/10">
        <p className="text-2xl font-bold text-primary mb-2">"{currentVerb.french}"</p>
      </QuestionDisplay>

      {!state.showResult ? (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <Button
              key={`${state.questionCount}-${index}`}                
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
        <ResultDisplay isCorrect={state.isCorrect}>
          <p className="text-2xl mb-4">
            "{currentVerb.french}" = <strong>{currentVerb.infinitive}</strong>
          </p>
        </ResultDisplay>
      )}
    </ActivityLayout>
  );
};