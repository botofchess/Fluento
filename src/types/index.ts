export type RatingMetric = {
  label: 'Speaking' | 'Writing' | 'Vocabulary' | 'Grammar' | 'Confidence';
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

export type SpeakingAnalysis = {
  fluencyScore: number;
  confidenceScore: number;
  pronunciationScore: number;
  grammarScore: number;
  vocabularyScore: number;
  fillerWords: Record<string, number>;
  hesitationCount: number;
  correction: string;
  nativeAlternative: string;
  eloDelta: number;
};

export type WritingAnalysis = {
  grammarAccuracy: number;
  vocabularyRichness: number;
  sentenceComplexity: number;
  formality: number;
  clarity: number;
  improvement: string[];
  advancedRewrite: string;
  nativeRewrite: string;
  eliteRewrite: string;
  eloDelta: number;
};

export type DebateAnalysis = {
  confidence: number;
  argumentStrength: number;
  vocabularySophistication: number;
  professionalism: number;
  eloDelta: number;
  summary: string;
};

export type UserRatings = {
  speaking: number;
  writing: number;
  vocabulary: number;
  grammar: number;
  confidence: number;
};

export type DailyPlan = {
  focus: string;
  challenge: string;
  estimatedMinutes: number;
};
