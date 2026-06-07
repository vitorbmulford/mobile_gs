import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { getRiskToneColor, getRiskToneLabel } from '@/constants/theme';
import { useAppTheme } from '@/contexts/theme-context';
import type { AlertItem } from '@/types/defense-shield';

interface AlertCardProps {
  alert: AlertItem;
  onResolve?: () => void;
}

export function AlertCard({ alert, onResolve }: AlertCardProps) {
  const { theme } = useAppTheme();
  const accent = getRiskToneColor(alert.riskLevel, theme);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          opacity: alert.resolved ? 0.72 : 1,
        },
      ]}>
      <View style={styles.rowBetween}>
        <View style={[styles.badge, { backgroundColor: `${accent}22` }]}>
          <Text style={[styles.badgeText, { color: accent }]}>
            {getRiskToneLabel(alert.riskLevel)}
          </Text>
        </View>
        <Text style={[styles.timestamp, { color: theme.colors.textMuted }]}>{alert.timestamp}</Text>
      </View>

      <Text style={[styles.title, { color: theme.colors.text }]}>{alert.title}</Text>
      <Text style={[styles.meta, { color: theme.colors.textMuted }]}>
        {alert.eventType} | {alert.region} | {alert.source}
      </Text>
      <Text style={[styles.description, { color: theme.colors.textMuted }]}>{alert.description}</Text>
      <Text style={[styles.recommendation, { color: theme.colors.text }]}>
        Recommended action: {alert.recommendation}
      </Text>

      <View style={styles.footer}>
        <Text style={[styles.origin, { color: theme.colors.textMuted }]}>
          {alert.origin === 'simulation' ? 'Simulation event' : 'Mock orbital feed'}
        </Text>
        {alert.resolved ? (
          <View style={[styles.done, { backgroundColor: theme.colors.chip }]}>
            <Text style={[styles.doneLabel, { color: theme.colors.secondary }]}>Resolved</Text>
          </View>
        ) : (
          <Button label="Mark as resolved" onPress={onResolve} variant="secondary" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  meta: {
    fontSize: 13,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  recommendation: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
  footer: {
    gap: 10,
  },
  origin: {
    fontSize: 12,
  },
  done: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  doneLabel: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
