import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PremiumCard } from '../components/PremiumCard';
import { scenarios } from '../data/mockData';
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
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="Elite Communication Academy" subtitle="Structured levels + final AI exam">
        <View style={styles.list}>
          {tracks.map((track) => (
            <Text key={track} style={styles.item}>• {track}</Text>
          ))}
        </View>
      </PremiumCard>

      <PremiumCard title="Real-Life Scenario Engine" subtitle="Difficulty adapts to your weak signals">
        <View style={styles.list}>
          {scenarios.map((scenario) => (
            <Text key={scenario} style={styles.item}>• {scenario}</Text>
          ))}
        </View>
      </PremiumCard>

      <PremiumCard title="Monetization Tiers" subtitle="Ultra-premium positioning">
        <Text style={styles.item}>Free: limited daily sessions + basic correction</Text>
        <Text style={styles.item}>Premium: unlimited AI labs + leaderboards + analytics</Text>
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
