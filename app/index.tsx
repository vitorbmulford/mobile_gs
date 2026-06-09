import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, type Href } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { MetricCard } from '@/components/metric-card';
import { OrbitalRadar } from '@/components/orbital-radar';
import { ScreenContainer } from '@/components/screen-container';
import { getRiskToneColor } from '@/constants/theme';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import { useAppTheme } from '@/contexts/theme-context';

export default function HomeScreen() {
  const { theme } = useAppTheme();
  const {
    activeAlerts,
    averageRisk,
    autonomousSystemsActive,
    monitoredAreas,
    criticalAlerts,
    systemStatus,
    threatLevel,
  } = useDefenseShield();

  const latestCriticalAlerts = criticalAlerts.slice(0, 3);
  const threatColor =
    threatLevel === 'Alto'
      ? getRiskToneColor('critical', theme)
      : threatLevel === 'Medio'
        ? getRiskToneColor('medium', theme)
        : getRiskToneColor('low', theme);

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
              Central de Comando
            </Text>
          </View>
          <Text style={[styles.eyebrow, { color: theme.colors.textMuted }]}>
            DefenseShield Orbital Intelligence
          </Text>
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Transformando dados espaciais em inteligencia para proteger o futuro.
        </Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>
          Um painel orbital mobile que centraliza sinais simulados de satelites, IoT, sistemas
          autonomos e monitoramento climatico para respostas rapidas a riscos.
        </Text>

        <View style={styles.quickActions}>
          <Button label="Dashboard executivo" onPress={() => router.push('/dashboard')} />
          <Button
            label="Dashboard ambiental"
            onPress={() => router.push('/environmental-dashboard' as Href)}
            variant="secondary"
          />
          <Button label="Criar simulacao" onPress={() => router.push('/simulation')} variant="ghost" />
        </View>
      </View>

      <OrbitalRadar />

      <View
        style={[
          styles.statusPanel,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}>
        <View style={styles.statusHeader}>
          <Text style={[styles.statusTitle, { color: theme.colors.text }]}>Status do sistema</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${threatColor}22` }]}>
            <Text style={[styles.statusBadgeText, { color: threatColor }]}>{systemStatus}</Text>
          </View>
        </View>
        <View style={styles.statusGrid}>
          <StatusItem label="Nivel de ameaca" value={threatLevel} />
          <StatusItem label="Alertas criticos" value={String(criticalAlerts.length)} />
          <StatusItem label="Regioes monitoradas" value={String(monitoredAreas)} />
          <StatusItem label="Sistemas ativos" value={String(autonomousSystemsActive)} />
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <MetricCard
          helper="Setores protegidos no mapa atual de comando."
          icon="map-marker-radius-outline"
          label="Areas monitoradas"
          value={String(monitoredAreas)}
        />
        <MetricCard
          helper="Incidentes ativos aguardando resposta operacional."
          icon="alert-outline"
          label="Alertas ativos"
          value={String(activeAlerts.length)}
        />
        <MetricCard
          helper="Media de risco entre as regioes sob vigilancia."
          icon="pulse"
          label="Risco medio"
          value={`${averageRisk}/100`}
        />
        <MetricCard
          helper="Drones, rovers e sistemas autonomos em operacao."
          icon="drone"
          label="Sistemas autonomos"
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
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Escopo da missao</Text>
        <Text style={[styles.panelText, { color: theme.colors.textMuted }]}>
          O MVP foca em prevencao de desastres, analise ambiental, infraestrutura critica e
          operacoes futuras em bases espaciais, tudo com dados locais simulados.
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
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Ultimos alertas criticos</Text>
        {latestCriticalAlerts.length > 0 ? (
          latestCriticalAlerts.map((alert) => (
            <View
              key={alert.id}
              style={[
                styles.alertMiniCard,
                {
                  backgroundColor: theme.colors.surfaceStrong,
                  borderColor: theme.colors.border,
                },
              ]}>
              <Text style={[styles.alertMiniTitle, { color: theme.colors.text }]}>{alert.title}</Text>
              <Text style={[styles.alertMiniMeta, { color: theme.colors.textMuted }]}>
                {alert.region} | {alert.timestamp}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.panelText, { color: theme.colors.textMuted }]}>
            Nao ha alertas criticos ativos na simulacao atual.
          </Text>
        )}
      </View>
    </ScreenContainer>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.statusItem, { backgroundColor: theme.colors.surfaceStrong }]}>
      <Text style={[styles.statusLabel, { color: theme.colors.textMuted }]}>{label}</Text>
      <Text style={[styles.statusValue, { color: theme.colors.text }]}>{value}</Text>
    </View>
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
  statusPanel: {
    gap: 14,
    borderRadius: 26,
    borderWidth: 1,
    padding: 18,
  },
  statusHeader: {
    gap: 10,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statusItem: {
    flex: 1,
    minWidth: 130,
    borderRadius: 18,
    padding: 12,
    gap: 6,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '800',
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
  alertMiniCard: {
    gap: 6,
    borderRadius: 18,
    borderWidth: 1,
    padding: 12,
  },
  alertMiniTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  alertMiniMeta: {
    fontSize: 12,
    fontWeight: '600',
  },
});
