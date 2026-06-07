import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DashboardSwitcher } from '@/components/dashboard-switcher';
import { ChartSection } from '@/components/chart-section';
import { MetricCard } from '@/components/metric-card';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import {
  alertsByTypeMock,
  incidentTrendMock,
  riskTrendMock,
} from '@/data/riskMetrics.mock';

export default function DashboardScreen() {
  const {
    activeAlerts,
    resolvedAlerts,
    averageRisk,
    autonomousSystemsActive,
  } = useDefenseShield();

  return (
    <ScreenContainer
      eyebrow="Comando executivo"
      subtitle="Visao rapida para tomada de decisao com volume de incidentes, exposicao atual e prontidao operacional."
      title="Dashboard Executivo">
      <DashboardSwitcher active="executive" />

      <View style={styles.grid}>
        <MetricCard
          helper="Ocorrencias ainda abertas no fluxo de comando."
          icon="alert-outline"
          label="Alertas ativos"
          value={String(activeAlerts.length)}
        />
        <MetricCard
          helper="Alertas encerrados e persistidos localmente."
          icon="check-decagram-outline"
          label="Alertas resolvidos"
          value={String(resolvedAlerts.length)}
        />
        <MetricCard
          helper="Indice geral considerando todas as regioes monitoradas."
          icon="chart-line"
          label="Risco medio"
          value={`${averageRisk}/100`}
        />
        <MetricCard
          helper="Drones, rovers e agentes autonomos em operacao."
          icon="robot-industrial"
          label="Sistemas autonomos"
          value={String(autonomousSystemsActive)}
        />
      </View>

      <ChartSection
        data={alertsByTypeMock}
        subtitle="Distribuicao de alertas por categoria para priorizacao imediata."
        title="Alertas por tipo"
        variant="bars"
      />

      <ChartSection
        data={riskTrendMock}
        subtitle="Evolucao temporal do risco geral nos ultimos dias operacionais."
        title="Evolucao do risco"
        variant="line"
      />

      <ChartSection
        data={incidentTrendMock}
        subtitle="Tendencia da quantidade de incidentes nos ultimos dias monitorados."
        title="Evolucao de incidentes"
        variant="line"
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
