import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { appTheme } from '../theme/theme';

type Props = {
  title: string;
  subtitle?: string;
  rightContent?: ReactNode;
  children: ReactNode;
};

export function PremiumCard({ title, subtitle, rightContent, children }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightContent}
      </View>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: appTheme.colors.card,
    borderRadius: appTheme.radius.md,
    padding: appTheme.spacing.md,
    borderWidth: 1,
    borderColor: appTheme.colors.border,
    gap: appTheme.spacing.sm
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: appTheme.colors.text,
    fontSize: 17,
    fontWeight: '700'
  },
  subtitle: {
    color: appTheme.colors.textMuted,
    marginTop: 2
  }
});
