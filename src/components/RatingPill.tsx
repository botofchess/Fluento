import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appTheme } from '../theme/theme';

type Props = {
  label: string;
  value: number;
  delta: number;
};

export function RatingPill({ label, value, delta }: Props) {
  return (
    <View style={styles.pill}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={[styles.delta, delta >= 0 ? styles.up : styles.down]}>
        {delta >= 0 ? '+' : ''}
        {delta}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    minWidth: 92,
    backgroundColor: appTheme.colors.cardElevated,
    borderRadius: appTheme.radius.sm,
    padding: appTheme.spacing.sm,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    gap: 4
  },
  label: {
    color: appTheme.colors.textMuted,
    fontSize: 12
  },
  value: {
    color: appTheme.colors.text,
    fontSize: 18,
    fontWeight: '700'
  },
  delta: {
    fontSize: 12,
    fontWeight: '600'
  },
  up: {
    color: appTheme.colors.success
  },
  down: {
    color: appTheme.colors.danger
  }
});
