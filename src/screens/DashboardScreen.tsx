import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumCard } from '../components/PremiumCard';
import { RatingPill } from '../components/RatingPill';
import { ratings, weeklyProgress } from '../data/mockData';
import { appTheme } from '../theme/theme';

export function DashboardScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <LinearGradient colors={[appTheme.colors.royalBlue, '#0D1C4A']} style={styles.hero}>
        <Text style={styles.badge}>Oxford Elite Mode</Text>
        <Text style={styles.title}>Fluency Rating: 1824</Text>
        <Text style={styles.subtitle}>You improved 3.2% this week. Keep pressure high.</Text>
      </LinearGradient>

      <PremiumCard title="Performance Grid" subtitle="ELO-style language progression">
        <View style={styles.grid}>
          {ratings.map((item) => (
            <RatingPill key={item.label} {...item} />
          ))}
        </View>
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

      <PremiumCard title="Weakest Skill Indicator" subtitle="Priority for tomorrow">
        <Text style={styles.signalText}>Hesitation control in spontaneous speaking (-11 vs benchmark)</Text>
      </PremiumCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md, paddingBottom: 40 },
  hero: { borderRadius: appTheme.radius.lg, padding: appTheme.spacing.lg, gap: 8 },
  badge: {
    color: appTheme.colors.gold,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  title: { color: appTheme.colors.text, fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#D8E0FF', fontSize: 14 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chartRow: { height: 130, flexDirection: 'row', alignItems: 'flex-end', gap: 12 },
  barWrap: { alignItems: 'center', gap: 6 },
  bar: {
    width: 24,
    backgroundColor: appTheme.colors.primary,
    borderRadius: 8
  },
  axisLabel: { color: appTheme.colors.textMuted, fontSize: 12 },
  signalText: { color: appTheme.colors.text, fontSize: 15, lineHeight: 22 }
});
