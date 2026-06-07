import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { MetricCard } from '@/components/metric-card';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import { useAppTheme } from '@/contexts/theme-context';

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const { activeAlerts, averageRisk, autonomousSystemsActive, monitoredAreas } = useDefenseShield();

  return (
    <ScreenContainer contentContainerStyle={styles.container}>
      <View
        style={[
          styles.heroCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}>
        <View style={styles.heroTop}>
          <View style={[styles.heroBadge, { backgroundColor: theme.colors.chip }]}>
            <MaterialCommunityIcons
              color={theme.colors.secondary}
              name="shield-star-outline"
              size={18}
            />
            <Text style={[styles.heroBadgeText, { color: theme.colors.secondary }]}>
              Command Center
            </Text>
          </View>
          <Text style={[styles.eyebrow, { color: theme.colors.textMuted }]}>
            DefenseShield Orbital Intelligence
          </Text>
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Transforming space data into intelligence to protect the future.
        </Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>
          A mobile orbital dashboard that centralizes simulated satellite feeds, IoT signals,
          autonomous systems, and climate monitoring for fast risk response.
        </Text>

        <View style={styles.quickActions}>
          <Button label="Open dashboard" onPress={() => router.push('/dashboard')} />
          <Button
            label="Create simulation"
            onPress={() => router.push('/simulation')}
            variant="ghost"
          />
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard
          helper="Protected sectors in the current command map."
          icon="map-marker-radius-outline"
          label="Areas monitored"
          value={String(monitoredAreas)}
        />
        <MetricCard
          helper="Live incidents waiting for operator response."
          icon="alert-outline"
          label="Active alerts"
          value={String(activeAlerts.length)}
        />
        <MetricCard
          helper="Average risk score across regions under watch."
          icon="pulse"
          label="Average risk"
          value={`${averageRisk}/100`}
        />
        <MetricCard
          helper="Drones, rovers, and autonomous systems online."
          icon="drone"
          label="Autonomous systems"
          value={String(autonomousSystemsActive)}
        />
      </View>

      <View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}>
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Mission scope</Text>
        <Text style={[styles.panelText, { color: theme.colors.textMuted }]}>
          The MVP focuses on disaster prevention, environmental analysis, critical infrastructure,
          and future space-base operations, all simulated with structured local data.
        </Text>
      </View>

      <View
        style={[
          styles.panel,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}>
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Primary routes</Text>
        <Text style={[styles.panelText, { color: theme.colors.textMuted }]}>
          Dashboard for charts, Alerts for incident workflow, Monitoring for regions, Simulation for
          form input, and Settings for theme and project details.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  heroCard: {
    gap: 16,
    borderRadius: 30,
    borderWidth: 1,
    padding: 22,
  },
  heroTop: {
    gap: 10,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 40,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
  },
  quickActions: {
    gap: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  panel: {
    gap: 10,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  panelText: {
    fontSize: 14,
    lineHeight: 21,
  },
});
