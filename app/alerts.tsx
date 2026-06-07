import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AlertCard } from '@/components/alert-card';
import { FilterChip } from '@/components/filter-chip';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import { useAppTheme } from '@/contexts/theme-context';

type AlertFilter = 'all' | 'active' | 'resolved';

export default function AlertsScreen() {
  const { theme } = useAppTheme();
  const { alerts, markAlertResolved } = useDefenseShield();
  const [filter, setFilter] = useState<AlertFilter>('all');

  const filteredAlerts = useMemo(() => {
    if (filter === 'active') {
      return alerts.filter((alert) => !alert.resolved);
    }

    if (filter === 'resolved') {
      return alerts.filter((alert) => alert.resolved);
    }

    return alerts;
  }, [alerts, filter]);

  return (
    <ScreenContainer
      eyebrow="Incident feed"
      subtitle="Resolve alerts and keep the command center synchronized through AsyncStorage."
      title="Alerts">
      <View style={styles.filters}>
        <FilterChip label="All" onPress={() => setFilter('all')} selected={filter === 'all'} />
        <FilterChip
          label="Active"
          onPress={() => setFilter('active')}
          selected={filter === 'active'}
        />
        <FilterChip
          label="Resolved"
          onPress={() => setFilter('resolved')}
          selected={filter === 'resolved'}
        />
      </View>

      <View
        style={[
          styles.summary,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          {filteredAlerts.length} alerts in the current filter
        </Text>
        <Text style={[styles.summaryText, { color: theme.colors.textMuted }]}>
          Each resolved item is persisted locally so the operational state survives app reloads.
        </Text>
      </View>

      <View style={styles.list}>
        {filteredAlerts.map((alert) => (
          <AlertCard
            alert={alert}
            key={alert.id}
            onResolve={() => markAlertResolved(alert.id)}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  summary: {
    gap: 8,
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 21,
  },
  list: {
    gap: 14,
  },
});
