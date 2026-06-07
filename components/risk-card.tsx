import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getRiskToneColor } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';
import type { RiskStatusMetric } from '@/types/defense-shield';

export function RiskCard({ count, description, label, tone }: RiskStatusMetric) {
  const { theme } = useAppTheme();
  const accent = getRiskToneColor(tone, theme);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}>
      <View style={[styles.bar, { backgroundColor: accent }]} />
      <Text style={[styles.count, { color: theme.colors.text }]}>{count}</Text>
      <Text style={[styles.label, { color: accent }]}>{label}</Text>
      <Text style={[styles.description, { color: theme.colors.textMuted }]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    gap: 8,
    borderRadius: 22,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 18,
  },
  bar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
  },
  count: {
    fontSize: 30,
    fontWeight: '800',
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
