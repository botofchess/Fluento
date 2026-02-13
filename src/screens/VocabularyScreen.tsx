import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { PremiumCard } from '../components/PremiumCard';
import { eliteWords } from '../data/mockData';
import { useFluento } from '../state/FluentoContext';
import { appTheme } from '../theme/theme';

export function VocabularyScreen() {
  const { state, dispatch } = useFluento();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="Elite Vocabulary Builder" subtitle={`Words mastered: ${state.wordsMastered}`}>
        <Text style={styles.meta}>Smart spaced repetition and speech-injection challenges.</Text>
      </PremiumCard>
      {eliteWords.map((word) => (
        <PremiumCard key={word.word} title={word.word} subtitle={`${word.level} · Spaced Repetition Ready`}>
          <Text style={styles.definition}>{word.definition}</Text>
          <Text style={styles.meta}>Synonyms: {word.synonyms.join(', ')}</Text>
          <Text style={styles.meta}>Opposites: {word.opposites.join(', ')}</Text>
          <Text style={styles.challenge}>Challenge: {word.usageChallenge}</Text>
          <Text style={styles.trick}>Memory Trick: {word.memoryTrick}</Text>
          <Pressable style={styles.button} onPress={() => dispatch({ type: 'MASTER_WORD', payload: { count: 1 } })}>
            <Text style={styles.buttonText}>Mark as mastered</Text>
          </Pressable>
        </PremiumCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md, paddingBottom: 22 },
  definition: { color: appTheme.colors.text, fontSize: 15, lineHeight: 22 },
  meta: { color: appTheme.colors.textMuted },
  challenge: { color: appTheme.colors.gold, fontWeight: '600' },
  trick: { color: appTheme.colors.primary },
  button: {
    marginTop: 5,
    backgroundColor: appTheme.colors.cardElevated,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: appTheme.radius.sm,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  buttonText: { color: appTheme.colors.text, fontWeight: '600' }
});
