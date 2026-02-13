import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumCard } from '../components/PremiumCard';
import { RatingPill } from '../components/RatingPill';
import { leaderboard, weeklyProgress } from '../data/mockData';
import { useFluento } from '../state/FluentoContext';
import { appTheme } from '../theme/theme';

export function DashboardScreen() {
  const { state } = useFluento();
  const ratings = [
    { label: 'Speaking' as const, value: state.ratings.speaking, delta: 0 },
    { label: 'Writing' as const, value: state.ratings.writing, delta: 0 },
    { label: 'Vocabulary' as const, value: state.ratings.vocabulary, delta: 0 },
    { label: 'Grammar' as const, value: state.ratings.grammar, delta: 0 },
    { label: 'Confidence' as const, value: state.ratings.confidence, delta: 0 }
  ];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <LinearGradient colors={[appTheme.colors.royalBlue, '#0D1C4A']} style={styles.hero}>
        <Text style={styles.badge}>Oxford Elite Mode</Text>
        <Text style={styles.title}>Fluency Rating: {state.ratings.speaking}</Text>
        <Text style={styles.subtitle}>Streak {state.streak} days • Words Mastered {state.wordsMastered}</Text>
      </LinearGradient>

      <PremiumCard title="Performance Grid" subtitle="Live ELO-style progression">
        <View style={styles.grid}>
          {ratings.map((item) => (
            <RatingPill key={item.label} {...item} />
          ))}
        </View>
      </PremiumCard>

      <PremiumCard title="Advanced Analytics" subtitle="Growth intelligence">
        <Text style={styles.metric}>Speaking speed: {state.speakingSpeedWpm} WPM</Text>
        <Text style={styles.metric}>Hesitation reduction: {state.hesitationReduction}%</Text>
      </PremiumCard>

      <PremiumCard title="Daily AI Plan" subtitle="Generated from your weakest metrics">
        {state.dailyPlan.map((plan) => (
          <View key={plan.focus} style={styles.planItem}>
            <Text style={styles.planTitle}>{plan.focus}</Text>
            <Text style={styles.planText}>{plan.challenge}</Text>
          </View>
        ))}
      </PremiumCard>

      <PremiumCard title="Weekly Improvement Graph" subtitle="Compared against national average">
        <View style={styles.chartRow}>
          {weeklyProgress.map((point) => (
            <View key={point.week} style={styles.barWrap}>
              <View style={[styles.bar, { height: point.value * 1.2 }]} />
              <Text style={styles.axisLabel}>{point.week}</Text>
            </View>
          ))}
        </View>
      </PremiumCard>

      <PremiumCard title="Global Leaderboard" subtitle="Chess-style language ranking">
        {leaderboard.map((entry) => (
          <Text key={`${entry.rank}-${entry.user}`} style={styles.metric}>
            #{entry.rank} {entry.user} · {entry.country} · {entry.rating}
          </Text>
        ))}
      </PremiumCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md, paddingBottom: 40 },
  hero: { borderRadius: appTheme.radius.lg, padding: appTheme.spacing.lg, gap: 8 },
  badge: { color: appTheme.colors.gold, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  title: { color: appTheme.colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#D8E0FF', fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metric: { color: appTheme.colors.text, marginBottom: 6 },
  planItem: { marginBottom: 10 },
  planTitle: { color: appTheme.colors.gold, fontWeight: '700' },
  planText: { color: appTheme.colors.textMuted },
  chartRow: { height: 130, flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  barWrap: { alignItems: 'center', gap: 6 },
  bar: { width: 24, backgroundColor: appTheme.colors.primary, borderRadius: 8 },
  axisLabel: { color: appTheme.colors.textMuted, fontSize: 12 }
});
