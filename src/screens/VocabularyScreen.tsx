import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PremiumCard } from '../components/PremiumCard';
import { eliteWords } from '../data/mockData';
import { appTheme } from '../theme/theme';

export function VocabularyScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      {eliteWords.map((word) => (
        <PremiumCard key={word.word} title={word.word} subtitle={`${word.level} · Spaced Repetition Ready`}>
          <Text style={styles.definition}>{word.definition}</Text>
          <Text style={styles.meta}>Synonyms: {word.synonyms.join(', ')}</Text>
          <Text style={styles.meta}>Opposites: {word.opposites.join(', ')}</Text>
          <Text style={styles.challenge}>Challenge: {word.usageChallenge}</Text>
          <Text style={styles.trick}>Memory Trick: {word.memoryTrick}</Text>
        </PremiumCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md },
  definition: { color: appTheme.colors.text, fontSize: 15, lineHeight: 22 },
  meta: { color: appTheme.colors.textMuted },
  challenge: { color: appTheme.colors.gold, fontWeight: '600' },
  trick: { color: appTheme.colors.primary }
});
