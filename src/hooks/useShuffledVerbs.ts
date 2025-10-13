import { useState } from 'react';
import { IRREGULAR_VERBS } from '@/data/verbs';
import { shuffle } from '@/lib/utils';

export const useShuffledVerbs = () => {
  const [shuffledVerbs, setShuffledVerbs] = useState(() => shuffle(IRREGULAR_VERBS));
  const [verbIndex, setVerbIndex] = useState(0);

  const getCurrentVerb = () => shuffledVerbs[verbIndex];
  
  const moveToNext = () => {
    setVerbIndex(prev => prev + 1);
  };
  
  const reset = () => {
    setShuffledVerbs(shuffle(IRREGULAR_VERBS));
    setVerbIndex(0);
  };

  return { getCurrentVerb, moveToNext, reset };
};

