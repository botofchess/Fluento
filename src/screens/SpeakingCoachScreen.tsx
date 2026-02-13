import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PremiumCard } from '../components/PremiumCard';
import { appTheme } from '../theme/theme';

const accents = ['British', 'American', 'Indian Neutral', 'Business English'];

export function SpeakingCoachScreen() {
  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="AI Speaking Coach" subtitle="Real-time listening + correction">
        <Text style={styles.meter}>Live Confidence Score: 82 / 100</Text>
        <Text style={styles.body}>Detected fillers: “um” (4), “like” (2) • Hesitation windows: 3</Text>
      </PremiumCard>

      <PremiumCard title="Instant Correction">
        <Text style={styles.body}>You said: “I very like this approach for business growth.”</Text>
        <Text style={styles.body}>Native alternative: “I really like this approach for driving business growth.”</Text>
      </PremiumCard>

      <PremiumCard title="Accent & Mode">
        <View style={styles.chips}>
          {accents.map((accent) => (
            <View key={accent} style={styles.chip}>
              <Text style={styles.chipText}>{accent}</Text>
            </View>
          ))}
        </View>
      </PremiumCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md },
  meter: { color: appTheme.colors.gold, fontWeight: '700', fontSize: 16 },
  body: { color: appTheme.colors.text, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: appTheme.colors.cardElevated
  },
  chipText: { color: appTheme.colors.text }
});
