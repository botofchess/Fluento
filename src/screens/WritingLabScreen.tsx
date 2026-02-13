import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { analyzeWriting } from '../ai/fluencyEngine';
import { PremiumCard } from '../components/PremiumCard';
import { useFluento } from '../state/FluentoContext';
import { appTheme } from '../theme/theme';

export function WritingLabScreen() {
  const { state, dispatch } = useFluento();
  const [essay, setEssay] = useState('Technology improve business communication however teams must train in clear writing standards.');
  const [result, setResult] = useState(() => analyzeWriting(essay, state.ratings.writing));

  const evaluate = () => {
    const analysis = analyzeWriting(essay, state.ratings.writing);
    setResult(analysis);
    dispatch({
      type: 'APPLY_WRITING_DELTA',
      payload: {
        eloDelta: analysis.eloDelta,
        grammarGain: Math.round((analysis.grammarAccuracy - 70) / 10),
        vocabGain: Math.round((analysis.vocabularyRichness - 68) / 10)
      }
    });
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="Writing Master Lab" subtitle="Grammar, richness, clarity, and elite rewrites">
        <TextInput
          multiline
          style={styles.input}
          value={essay}
          onChangeText={setEssay}
          placeholder="Write your paragraph..."
          placeholderTextColor={appTheme.colors.textMuted}
        />
        <Pressable onPress={evaluate} style={styles.button}>
          <Text style={styles.buttonText}>Analyze Writing</Text>
        </Pressable>
      </PremiumCard>

      <PremiumCard title="Scores" subtitle={`Writing ELO delta: ${result.eloDelta >= 0 ? '+' : ''}${result.eloDelta}`}>
        <Text style={styles.item}>Grammar Accuracy: {result.grammarAccuracy}%</Text>
        <Text style={styles.item}>Vocabulary Richness: {result.vocabularyRichness}%</Text>
        <Text style={styles.item}>Sentence Complexity: {result.sentenceComplexity}</Text>
        <Text style={styles.item}>Formality: {result.formality}</Text>
        <Text style={styles.item}>Clarity: {result.clarity}</Text>
      </PremiumCard>

      <PremiumCard title="Improvement Suggestions">
        {result.improvement.map((i) => (
          <Text key={i} style={styles.item}>• {i}</Text>
        ))}
      </PremiumCard>

      <PremiumCard title="AI Rewrites">
        <Text style={styles.item}>{result.advancedRewrite}</Text>
        <Text style={styles.item}>{result.nativeRewrite}</Text>
        <Text style={styles.item}>{result.eliteRewrite}</Text>
      </PremiumCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md },
  input: {
    minHeight: 120,
    borderColor: appTheme.colors.border,
    borderWidth: 1,
    borderRadius: appTheme.radius.sm,
    color: appTheme.colors.text,
    padding: appTheme.spacing.sm,
    backgroundColor: appTheme.colors.cardElevated
  },
  button: {
    marginTop: 6,
    backgroundColor: appTheme.colors.primary,
    borderRadius: appTheme.radius.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  buttonText: { color: appTheme.colors.text, fontWeight: '700' },
  item: { color: appTheme.colors.text, lineHeight: 21, marginBottom: 5 }
});
