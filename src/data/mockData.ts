import { ProgressPoint, RatingMetric, VocabularyWord } from '../types';

export const ratings: RatingMetric[] = [
  { label: 'Speaking', value: 1832, delta: 48 },
  { label: 'Writing', value: 1715, delta: 32 },
  { label: 'Vocabulary', value: 1660, delta: 41 },
  { label: 'Grammar', value: 1748, delta: 26 },
  { label: 'Confidence', value: 79, delta: 6 }
];

export const weeklyProgress: ProgressPoint[] = [
  { week: 'W1', value: 65 },
  { week: 'W2', value: 71 },
  { week: 'W3', value: 75 },
  { week: 'W4', value: 81 },
  { week: 'W5', value: 84 },
  { week: 'W6', value: 88 }
];

export const scenarios = [
  'Airport Immigration',
  'Boardroom Negotiation',
  'Public TED-style Speech',
  'High-stakes Job Interview',
  'Podcast Guest Conversation'
];

export const eliteWords: VocabularyWord[] = [
  {
    word: 'Perspicacious',
    level: 'Elite C2+',
    definition: 'Having a ready insight into and understanding of things.',
    examples: [
      'Her perspicacious question transformed the meeting.',
      'A perspicacious manager anticipates market shifts.',
      'He gave a perspicacious critique of the proposal.'
    ],
    synonyms: ['Astute', 'Insightful', 'Shrewd'],
    opposites: ['Obtuse', 'Unaware'],
    usageChallenge: 'Use perspicacious while presenting strategic feedback.',
    memoryTrick: 'Per-spice-cacious: someone who can smell the “spice” in details.'
  },
  {
    word: 'Galvanize',
    level: 'Business',
    definition: 'To shock or excite someone into action.',
    examples: [
      'The CEO speech galvanized the entire team.',
      'Clear milestones galvanize performance.',
      'Her story galvanized public support.'
    ],
    synonyms: ['Motivate', 'Energize', 'Rally'],
    opposites: ['Discourage', 'Demotivate'],
    usageChallenge: 'Use galvanize in a project kickoff speech.',
    memoryTrick: 'Think “electric current” that sparks movement.'
  }
];
