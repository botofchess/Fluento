import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { analyzeSpeaking } from '../ai/fluencyEngine';
import { PremiumCard } from '../components/PremiumCard';
import { useFluento } from '../state/FluentoContext';
import { appTheme } from '../theme/theme';

const accents = ['British', 'American', 'Indian Neutral', 'Business English'];

export function SpeakingCoachScreen() {
  const { state, dispatch } = useFluento();
  const [text, setText] = useState('I very like this approach for business growth because it is more better.');
  const [accent, setAccent] = useState('Business English');
  const [result, setResult] = useState(() => analyzeSpeaking(text, state.ratings.speaking));

  const runAnalysis = () => {
    const analysis = analyzeSpeaking(text, state.ratings.speaking);
    setResult(analysis);
    dispatch({
      type: 'APPLY_SPEAKING_DELTA',
      payload: { eloDelta: analysis.eloDelta, confidenceScore: analysis.confidenceScore }
    });
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="AI Speaking Coach" subtitle="Real-time style analysis + instant correction">
        <Text style={styles.meter}>Mode: {accent} • Fluency {result.fluencyScore}/100 • Δ{result.eloDelta}</Text>
        <TextInput
          multiline
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Paste transcript or type what you said..."
          placeholderTextColor={appTheme.colors.textMuted}
        />
        <Pressable style={styles.button} onPress={runAnalysis}>
          <Text style={styles.buttonText}>Analyze Speaking</Text>
        </Pressable>
      </PremiumCard>

      <PremiumCard title="Analysis Signals">
        <Text style={styles.body}>Confidence: {result.confidenceScore}</Text>
        <Text style={styles.body}>Pronunciation: {result.pronunciationScore}</Text>
        <Text style={styles.body}>Grammar: {result.grammarScore}</Text>
        <Text style={styles.body}>Vocabulary: {result.vocabularyScore}</Text>
        <Text style={styles.body}>Hesitation windows: {result.hesitationCount}</Text>
        <Text style={styles.body}>Fillers: {JSON.stringify(result.fillerWords)}</Text>
      </PremiumCard>

      <PremiumCard title="Instant Correction">
        <Text style={styles.body}>Correction: {result.correction}</Text>
        <Text style={styles.body}>Native alternative: {result.nativeAlternative}</Text>
      </PremiumCard>

      <PremiumCard title="Accent & Mode">
        <View style={styles.chips}>
          {accents.map((item) => (
            <Pressable key={item} style={[styles.chip, accent === item && styles.activeChip]} onPress={() => setAccent(item)}>
              <Text style={styles.chipText}>{item}</Text>
            </Pressable>
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
  input: {
    minHeight: 110,
    borderColor: appTheme.colors.border,
    borderWidth: 1,
    borderRadius: appTheme.radius.sm,
    color: appTheme.colors.text,
    padding: appTheme.spacing.sm,
    backgroundColor: appTheme.colors.cardElevated
  },
  button: {
    marginTop: 4,
    backgroundColor: appTheme.colors.primary,
    borderRadius: appTheme.radius.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  buttonText: { color: appTheme.colors.text, fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: appTheme.colors.cardElevated
  },
  activeChip: { borderColor: appTheme.colors.gold },
  chipText: { color: appTheme.colors.text }
});
