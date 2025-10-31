import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { IRREGULAR_VERBS } from '@/data/verbs';
import { IrregularVerb, ActivityResult } from '@/types/game';
import { useActivity } from '@/hooks/useActivity';
import { useShuffledVerbs } from '@/hooks/useShuffledVerbs';
import { ActivityLayout } from './ActivityLayout';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerOptionsGrid } from './AnswerOptionsGrid';
import { ActivityCompletion } from './ActivityCompletion';

interface PastFormQuizProps {
  onComplete: (result: ActivityResult) => void;
  onBack: () => void;
  type: 'past' | 'past-participle';
}

export const PastFormQuiz = ({ onComplete, onBack, type }: PastFormQuizProps) => {
  const { getCurrentVerb, moveToNext, reset } = useShuffledVerbs();
  const [currentVerb, setCurrentVerb] = useState<IrregularVerb | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
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
    questionLimit: 100,
    activityType: type === 'past' ? 'past-form' : 'past-participle',
    timeoutMs: 1500
  });

  const generateQuestion = () => {
    const verb = getCurrentVerb();
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
    moveToNext();
    resetQuestionState();
  };

  useEffect(() => {
    generateQuestion();
  }, [type]);

  const handleAnswerSelect = (selected: string) => {
    setSelectedAnswer(selected);
    const correctAnswer = type === 'past' ? currentVerb?.past : currentVerb?.pastParticiple;
    const correct = selected === correctAnswer;
    handleAnswer(correct);

    const delay = correct ? 1000 : 1800;
    setTimeout(() => {
      if (shouldComplete()) {
        completeActivity(currentVerb?.infinitive || '', correct);
      } else {
        nextQuestion();
        generateQuestion();
      }
    }, delay);
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
        title={`${type === 'past' ? 'Past' : 'Past Participle'} Form Quiz`}
        state={state}
        questionLimit={questionLimit}
        onTryAgain={handleTryAgain}
        onGoHome={handleGoHome}
      />
    );
  }

  const questionText = type === 'past' 
    ? `What is the past tense of "${currentVerb.infinitive}"?`
    : `What is the past participle of "${currentVerb.infinitive}"?`;
  const correctAnswer = type === 'past' ? currentVerb.past : currentVerb.pastParticiple;

  return (
    <ActivityLayout
      title={type === 'past' ? 'Past Tense' : 'Past Participle'}
      onBack={onBack}
      state={state}
      questionLimit={questionLimit}
    >
      <QuestionDisplay>
        <p className="text-xl font-bold text-foreground mb-2">{questionText}</p>
      </QuestionDisplay>

      <AnswerOptionsGrid
        options={options}
        getKey={(_, index) => `${state.questionCount}-${index}`}
        getLabel={(o) => o}
        isCorrectOption={(o) => o === correctAnswer}
        selectedOption={selectedAnswer}
        showResult={state.showResult}
        isSelectionCorrect={state.isCorrect}
        onSelect={handleAnswerSelect}
      />
    </ActivityLayout>
  );
};