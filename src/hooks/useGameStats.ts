import { useState, useEffect } from 'react';
import { GameStats, GameProgress, ActivityResult } from '@/types/game';
import { IRREGULAR_VERBS } from '@/data/verbs';

const STORAGE_KEY = 'english-verb-game-stats';

export const useGameStats = () => {
  const [stats, setStats] = useState<GameStats>({
    totalScore: 0,
    verbsMastered: 0,
    totalVerbs: IRREGULAR_VERBS.length,
    currentStreak: 0,
    bestStreak: 0
  });

  const [progress, setProgress] = useState<Record<string, GameProgress>>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setStats(parsed.stats);
        setProgress(parsed.progress);
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever stats or progress change
  useEffect(() => {
    const dataToSave = { stats, progress };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [stats, progress]);

  const updateProgress = (result: ActivityResult) => {
    setProgress(prev => {
      const verbProgress = prev[result.verbId] || {
        verbId: result.verbId,
        correctAnswers: 0,
        totalAttempts: 0,
        mastered: false
      };

      const newProgress = {
        ...verbProgress,
        totalAttempts: verbProgress.totalAttempts + 1,
        correctAnswers: result.correct ? verbProgress.correctAnswers + 1 : verbProgress.correctAnswers
      };

      // Consider mastered if 3+ correct answers out of last 4 attempts (75% success rate)
      newProgress.mastered = newProgress.correctAnswers >= 3 && 
                           newProgress.correctAnswers / newProgress.totalAttempts >= 0.75;

      return {
        ...prev,
        [result.verbId]: newProgress
      };
    });

    setStats(prev => {
      const newStreak = result.correct ? prev.currentStreak + 1 : 0;
      const masteredCount = Object.values(progress).filter(p => p.mastered).length;
      
      return {
        ...prev,
        totalScore: prev.totalScore + (result.correct ? 10 : 0),
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        verbsMastered: masteredCount
      };
    });
  };

  const resetStats = () => {
    const initialStats = {
      totalScore: 0,
      verbsMastered: 0,
      totalVerbs: IRREGULAR_VERBS.length,
      currentStreak: 0,
      bestStreak: 0
    };
    setStats(initialStats);
    setProgress({});
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    stats,
    progress,
    updateProgress,
    resetStats
  };
};