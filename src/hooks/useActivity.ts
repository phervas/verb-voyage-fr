import { useState, useEffect, useCallback } from 'react';
import { ActivityResult, ActivityType } from '@/types/game';

export interface ActivityConfig {
  questionLimit: number;
  activityType: ActivityType;
  timeoutMs?: number; // Optional timeout between questions in milliseconds
}

export interface ActivityState {
  questionCount: number;
  score: number;
  showResult: boolean;
  isCorrect: boolean;
  isCompleted: boolean;
}

export const useActivity = (config: ActivityConfig) => {
  const [state, setState] = useState<ActivityState>({
    questionCount: 1,
    score: 0,
    showResult: false,
    isCorrect: false,
    isCompleted: false
  });

  // Default timeout is 3000ms if not specified
  const timeoutMs = config.timeoutMs ?? 3000;

  const resetQuestionState = useCallback(() => {
    setState(prev => ({
      ...prev,
      showResult: false,
      isCorrect: false,
      isCompleted: false
    }));
  }, []);

  const resetActivity = useCallback(() => {
    setState({
      questionCount: 1,
      score: 0,
      showResult: false,
      isCorrect: false,
      isCompleted: false
    });
  }, []);

  const handleAnswer = useCallback((correct: boolean) => {
    setState(prev => ({
      ...prev,
      isCorrect: correct,
      showResult: true,
      score: correct ? prev.score + 1 : prev.score
    }));
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      questionCount: prev.questionCount + 1,
      showResult: false,
      isCorrect: false
    }));
  }, []);

  const completeActivity = useCallback((verbId: string, correct: boolean) => {
    setState(prev => ({
      ...prev,
      isCompleted: true
    }));
    
    const result: ActivityResult = {
      correct,
      verbId,
      activityType: config.activityType
    };
    return result;
  }, [config.activityType]);

  const shouldComplete = useCallback(() => {
    return state.questionCount >= config.questionLimit;
  }, [state.questionCount, config.questionLimit]);

  return {
    state,
    resetQuestionState,
    resetActivity,
    handleAnswer,
    nextQuestion,
    completeActivity,
    shouldComplete,
    questionLimit: config.questionLimit,
    timeoutMs
  };
};
