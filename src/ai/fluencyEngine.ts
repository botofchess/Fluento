import { DebateAnalysis, DailyPlan, SpeakingAnalysis, UserRatings, WritingAnalysis } from '../types';

const fillers = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];

const clamp = (n: number, min = 0, max = 100) => Math.min(max, Math.max(min, n));

function countFillerWords(text: string): Record<string, number> {
  const lowered = text.toLowerCase();
  return fillers.reduce<Record<string, number>>((acc, item) => {
    const regex = new RegExp(`\\b${item.replace(' ', '\\s+')}\\b`, 'gi');
    const count = (lowered.match(regex) || []).length;
    if (count > 0) acc[item] = count;
    return acc;
  }, {});
}

function lexicalDiversity(words: string[]): number {
  if (!words.length) return 0;
  const unique = new Set(words.map((w) => w.toLowerCase())).size;
  return unique / words.length;
}

function calculateEloDelta(score: number, currentRating: number): number {
  const expected = 1 / (1 + 10 ** ((1800 - currentRating) / 400));
  const actual = score / 100;
  const k = currentRating > 2200 ? 16 : 24;
  return Math.round(k * (actual - expected));
}

export function analyzeSpeaking(input: string, currentRating: number): SpeakingAnalysis {
  const words = input.trim().split(/\s+/).filter(Boolean);
  const fillerCounts = countFillerWords(input);
  const fillerTotal = Object.values(fillerCounts).reduce((s, c) => s + c, 0);
  const avgWordLength = words.reduce((s, w) => s + w.length, 0) / Math.max(1, words.length);
  const diversity = lexicalDiversity(words);
  const hesitationCount = Math.max(0, fillerTotal + Math.floor(words.length / 28));

  const pronunciation = clamp(72 + Math.round(avgWordLength * 2) - fillerTotal * 2);
  const grammar = clamp(70 + (/[.!?]$/.test(input.trim()) ? 8 : 0) - fillerTotal * 2);
  const vocabulary = clamp(60 + Math.round(diversity * 40) + Math.round(avgWordLength));
  const confidence = clamp(76 + Math.round(words.length / 10) - hesitationCount * 3);
  const fluency = clamp(Math.round((pronunciation + grammar + vocabulary + confidence) / 4));

  const correction = input
    .replace(/\bi very like\b/gi, 'I really like')
    .replace(/\bmore better\b/gi, 'better')
    .replace(/\bcan able to\b/gi, 'can');

  const nativeAlternative = `${correction.charAt(0).toUpperCase()}${correction.slice(1)} Consider adding one precise business verb.`;

  return {
    fluencyScore: fluency,
    confidenceScore: confidence,
    pronunciationScore: pronunciation,
    grammarScore: grammar,
    vocabularyScore: vocabulary,
    fillerWords: fillerCounts,
    hesitationCount,
    correction,
    nativeAlternative,
    eloDelta: calculateEloDelta(fluency, currentRating)
  };
}

export function analyzeWriting(input: string, currentRating: number): WritingAnalysis {
  const sentences = input.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const words = input.trim().split(/\s+/).filter(Boolean);
  const diversity = lexicalDiversity(words);
  const avgSentenceLen = words.length / Math.max(1, sentences.length);

  const grammarAccuracy = clamp(65 + (/[.!?]$/.test(input.trim()) ? 10 : 0) + Math.round(avgSentenceLen / 2));
  const vocabularyRichness = clamp(58 + Math.round(diversity * 42));
  const sentenceComplexity = clamp(50 + Math.round(avgSentenceLen * 1.8));
  const formality = clamp(60 + (/therefore|moreover|consequently|however/i.test(input) ? 18 : 4));
  const clarity = clamp(55 + Math.round((grammarAccuracy + vocabularyRichness) / 4));
  const overall = Math.round((grammarAccuracy + vocabularyRichness + sentenceComplexity + formality + clarity) / 5);

  const improvement = [
    'Replace generic verbs with precision verbs (e.g., improve → optimize).',
    'Use one contrast connector to elevate argument structure.',
    'Shorten one long sentence to improve executive clarity.'
  ];

  return {
    grammarAccuracy,
    vocabularyRichness,
    sentenceComplexity,
    formality,
    clarity,
    improvement,
    advancedRewrite: `Advanced: ${input} This demonstrates strategic communication maturity.`,
    nativeRewrite: `Native: ${input} It sounds natural, concise, and confident.`,
    eliteRewrite: `Elite: ${input} The argument is nuanced, executive-ready, and rhetorically balanced.`,
    eloDelta: calculateEloDelta(overall, currentRating)
  };
}

export function simulateDebate(response: string, currentRating: number): DebateAnalysis {
  const words = response.trim().split(/\s+/).filter(Boolean);
  const diversity = lexicalDiversity(words);
  const hasStructure = /first|second|therefore|in conclusion|however/i.test(response);
  const confidence = clamp(62 + Math.round(words.length / 3));
  const argumentStrength = clamp(55 + (hasStructure ? 22 : 8));
  const vocabularySophistication = clamp(52 + Math.round(diversity * 45));
  const professionalism = clamp(60 + (/stakeholders|outcome|strategy|impact/i.test(response) ? 20 : 7));
  const total = Math.round((confidence + argumentStrength + vocabularySophistication + professionalism) / 4);

  return {
    confidence,
    argumentStrength,
    vocabularySophistication,
    professionalism,
    eloDelta: calculateEloDelta(total, currentRating),
    summary: hasStructure
      ? 'Strong structure detected. Next level: add one data-backed rebuttal.'
      : 'Good intent. Improve with clearer structure and stronger signposting.'
  };
}

export function generateDailyPlan(ratings: UserRatings): DailyPlan[] {
  const entries = Object.entries(ratings) as [keyof UserRatings, number][];
  const sorted = entries.sort((a, b) => a[1] - b[1]);
  const weakest = sorted[0]?.[0] ?? 'speaking';
  const second = sorted[1]?.[0] ?? 'grammar';

  return [
    {
      focus: `${weakest.toUpperCase()} Calibration`,
      challenge: `Complete one focused ${weakest} drill and score above 78.`,
      estimatedMinutes: 18
    },
    {
      focus: `${second.toUpperCase()} Pressure Practice`,
      challenge: `Run a timed simulation to push ${second} under stress.`,
      estimatedMinutes: 14
    },
    {
      focus: 'Elite Vocabulary Injection',
      challenge: 'Use 3 new C1/C2 words in live speech and writing.',
      estimatedMinutes: 12
    }
  ];
}
