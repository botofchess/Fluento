import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { simulateDebate } from '../ai/fluencyEngine';
import { PremiumCard } from '../components/PremiumCard';
import { scenarios } from '../data/mockData';
import { useFluento } from '../state/FluentoContext';
import { appTheme } from '../theme/theme';

export function SimulatorScreen() {
  const { state, dispatch } = useFluento();
  const [scenario, setScenario] = useState(scenarios[0]);
  const [response, setResponse] = useState('First, I would present the strategic context, then align stakeholders and conclude with measurable outcomes.');
  const [result, setResult] = useState(() => simulateDebate(response, state.ratings.speaking));

  const evaluate = () => {
    const analysis = simulateDebate(response, state.ratings.speaking);
    setResult(analysis);
    dispatch({
      type: 'APPLY_DEBATE_DELTA',
      payload: { eloDelta: analysis.eloDelta, confidence: analysis.confidence, professionalism: analysis.professionalism }
    });
  };

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content}>
      <PremiumCard title="AI Debate & Interview Simulator" subtitle="Pressure-tested confidence training">
        <View style={styles.chips}>
          {scenarios.map((s) => (
            <Pressable key={s} style={[styles.chip, s === scenario && styles.activeChip]} onPress={() => setScenario(s)}>
              <Text style={styles.chipText}>{s}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.current}>Current Scenario: {scenario}</Text>
        <TextInput
          multiline
          value={response}
          onChangeText={setResponse}
          style={styles.input}
          placeholder="Write your spoken response..."
          placeholderTextColor={appTheme.colors.textMuted}
        />
        <Pressable style={styles.button} onPress={evaluate}>
          <Text style={styles.buttonText}>Run AI Simulation</Text>
        </Pressable>
      </PremiumCard>

      <PremiumCard title="Performance Scores" subtitle={`Speaking ELO delta: ${result.eloDelta >= 0 ? '+' : ''}${result.eloDelta}`}>
        <Text style={styles.item}>Confidence: {result.confidence}</Text>
        <Text style={styles.item}>Argument Strength: {result.argumentStrength}</Text>
        <Text style={styles.item}>Vocabulary Sophistication: {result.vocabularySophistication}</Text>
        <Text style={styles.item}>Professionalism: {result.professionalism}</Text>
        <Text style={styles.item}>Coach Summary: {result.summary}</Text>
      </PremiumCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: appTheme.colors.background },
  content: { padding: appTheme.spacing.md, gap: appTheme.spacing.md, paddingBottom: 24 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: appTheme.colors.cardElevated
  },
  activeChip: { borderColor: appTheme.colors.gold },
  chipText: { color: appTheme.colors.text, fontSize: 12 },
  current: { color: appTheme.colors.gold, marginTop: 2 },
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
