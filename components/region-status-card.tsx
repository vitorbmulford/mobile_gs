import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/contexts/theme-context';
import type { RegionStatus } from '@/types/defense-shield';

interface RegionStatusCardProps {
  region: RegionStatus;
}

export function RegionStatusCard({ region }: RegionStatusCardProps) {
  const { theme } = useAppTheme();
  const categoryLabel =
    region.category === 'earth'
      ? 'Terrestre'
      : region.category === 'critical-infrastructure'
        ? 'Infraestrutura critica'
        : 'Espacial';

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}>
      <View style={styles.header}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{region.name}</Text>
        <Text style={[styles.category, { color: theme.colors.secondary }]}>{categoryLabel}</Text>
      </View>
      <Text style={[styles.status, { color: theme.colors.textMuted }]}>{region.status}</Text>

      <View style={styles.metrics}>
        <Metric label="Temperatura" value={`${region.temperature} C`} />
        <Metric label="Umidade" value={`${region.humidity}%`} />
        <Metric label="Indice de risco" value={`${region.riskIndex}/100`} />
      </View>

      <Text style={[styles.summary, { color: theme.colors.textMuted }]}>{region.summary}</Text>
      <Text style={[styles.source, { color: theme.colors.textMuted }]}>
        {region.source} | Atualizado em {region.updatedAt}
      </Text>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.metricCard, { backgroundColor: theme.colors.surfaceStrong }]}>
      <Text style={[styles.metricLabel, { color: theme.colors.textMuted }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 19,
    fontWeight: '800',
  },
  category: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  status: {
    fontSize: 14,
    lineHeight: 20,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    minWidth: 92,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 6,
  },
  summary: {
    fontSize: 14,
    lineHeight: 20,
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
  },
});
