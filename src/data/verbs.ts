import { IrregularVerb } from '@/types/game';

export const IRREGULAR_VERBS: IrregularVerb[] = [
  {
    infinitive: 'leave',
    past: 'left',
    pastParticiple: 'left',
    french: 'quitter, partir'
  },
  {
    infinitive: 'lend',
    past: 'lent',
    pastParticiple: 'lent',
    french: 'prêter (donner un coup de main / prêter une oreille attentive)'
  },
  {
    infinitive: 'let',
    past: 'let',
    pastParticiple: 'let',
    french: 'permettre ; laisser (laisser tomber)'
  },
  {
    infinitive: 'lie',
    past: 'lay',
    pastParticiple: 'lain',
    french: 's\'allonger'
  },
  {
    infinitive: 'lose',
    past: 'lost',
    pastParticiple: 'lost',
    french: 'perdre'
  },
  {
    infinitive: 'make',
    past: 'made',
    pastParticiple: 'made',
    french: 'faire, fabriquer'
  },
  {
    infinitive: 'mean',
    past: 'meant',
    pastParticiple: 'meant',
    french: 'vouloir dire'
  },
  {
    infinitive: 'meet',
    past: 'met',
    pastParticiple: 'met',
    french: 'rencontrer'
  },
  {
    infinitive: 'pay',
    past: 'paid',
    pastParticiple: 'paid',
    french: 'payer'
  },
  {
    infinitive: 'put',
    past: 'put',
    pastParticiple: 'put',
    french: 'mettre'
  }
];

export const SAMPLE_SENTENCES = {
  leave: ['She _____ school early today.', 'They _____ for Paris yesterday.'],
  lend: ['Can you _____ me your pen?', 'He _____ his friend some money.'],
  let: ['Please _____ me help you.', 'She _____ the dog outside.'],
  lie: ['I need to _____ down for a while.', 'The cat _____ on the sofa.'],
  lose: ['Don\'t _____ your keys!', 'He _____ the game yesterday.'],
  make: ['Let\'s _____ a cake together.', 'She _____ a beautiful drawing.'],
  mean: ['What does this word _____?', 'I didn\'t _____ to hurt you.'],
  meet: ['Nice to _____ you!', 'We _____ at the park last week.'],
  pay: ['I need to _____ for this book.', 'She _____ the bill yesterday.'],
  put: ['Please _____ your books away.', 'He _____ the keys on the table.']
};