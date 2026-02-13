export type RatingMetric = {
  label: string;
  value: number;
  delta: number;
};

export type ProgressPoint = {
  week: string;
  value: number;
};

export type VocabularyWord = {
  word: string;
  level: 'Business' | 'Debate' | 'Academic' | 'Casual' | 'Elite C2+';
  definition: string;
  examples: string[];
  synonyms: string[];
  opposites: string[];
  usageChallenge: string;
  memoryTrick: string;
};
