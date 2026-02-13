import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PremiumCard } from '../components/PremiumCard';
import { useFluento } from '../state/FluentoContext';
import { appTheme } from '../theme/theme';

const tracks = [
  'Public Speaking Mastery',
  'Business Communication',
  'Debate Champion Program',
  'Interview Cracker',
  'Accent Mastery',
  'Advanced Grammar Ninja'
];

export function AcademyScreen() {
  const { state } = useFluento();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="Elite Communication Academy" subtitle="Structured levels + final AI exam">
        <View style={styles.list}>
          {tracks.map((track) => (
            <Text key={track} style={styles.item}>• {track}</Text>
          ))}
        </View>
      </PremiumCard>

      <PremiumCard title="Psychology Engine" subtitle="Visible growth + discipline loop">
        <Text style={styles.item}>You improved 3.2% this week.</Text>
        <Text style={styles.item}>Current streak: {state.streak} days.</Text>
        <Text style={styles.item}>Grandmaster unlock target: speaking rating 2500.</Text>
      </PremiumCard>

      <PremiumCard title="Monetization Tiers" subtitle="Ultra-premium positioning">
        <Text style={styles.item}>Free: limited daily practice + basic AI correction</Text>
        <Text style={styles.item}>Premium: full speaking, writing, debate, analytics, leaderboards</Text>
        <Text style={styles.item}>Plans: Monthly, Yearly, Lifetime Elite, Student, Corporate</Text>
      </PremiumCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md, paddingBottom: 32 },
  list: { gap: 8 },
  item: { color: appTheme.colors.text, lineHeight: 21 }
});
