import { ProgressPoint, VocabularyWord } from '../types';

export const weeklyProgress: ProgressPoint[] = [
  { week: 'W1', value: 65 },
  { week: 'W2', value: 71 },
  { week: 'W3', value: 75 },
  { week: 'W4', value: 81 },
  { week: 'W5', value: 84 },
  { week: 'W6', value: 88 }
];

export const leaderboard = [
  { rank: 1, user: 'A. Mercer', country: 'UK', rating: 2476 },
  { rank: 2, user: 'K. Patel', country: 'IN', rating: 2418 },
  { rank: 3, user: 'J. Rivera', country: 'US', rating: 2391 },
  { rank: 17, user: 'You', country: 'Global', rating: 1824 }
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
