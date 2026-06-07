import React from 'react';
import { StyleSheet, View } from 'react-native';

import { DashboardSwitcher } from '@/components/dashboard-switcher';
import { ChartSection } from '@/components/chart-section';
import { MetricCard } from '@/components/metric-card';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import {
  environmentalIndicatorsMock,
  environmentalRankingMock,
  environmentalTrendMock,
  regionalRiskMock,
} from '@/data/riskMetrics.mock';

export default function EnvironmentalDashboardScreen() {
  const {
    averageTemperature,
    averageHumidity,
    wildfireIndex,
    floodIndex,
    regions,
  } = useDefenseShield();

  const topRegion = [...regions].sort((a, b) => b.riskIndex - a.riskIndex)[0];

  return (
    <ScreenContainer
      eyebrow="Comando ambiental"
      subtitle="Monitoramento climatico e territorial com foco em pressao ambiental, sinais de desastre e areas mais expostas."
      title="Dashboard Ambiental">
      <DashboardSwitcher active="environmental" />

      <View style={styles.grid}>
        <MetricCard
          helper="Temperatura media entre todos os setores monitorados."
          icon="thermometer"
          label="Temperatura media"
          value={`${averageTemperature} C`}
        />
        <MetricCard
          helper="Umidade media capturada pelos feeds ambientais simulados."
          icon="water-percent"
          label="Umidade media"
          value={`${averageHumidity}%`}
        />
        <MetricCard
          helper="Sinal composto de risco de queimadas baseado na inteligencia orbital."
          icon="fire-alert"
          label="Indice de queimadas"
          value={`${wildfireIndex}/100`}
        />
        <MetricCard
          helper="Sinal composto de pressao para enchentes baseado no monitoramento climatico."
          icon="waves-arrow-up"
          label="Indice de enchentes"
          value={`${floodIndex}/100`}
        />
        <MetricCard
          helper="Area com maior risco no mapa ambiental monitorado."
          icon="map-search-outline"
          label="Regiao mais critica"
          value={topRegion.name}
        />
      </View>

      <ChartSection
        data={regionalRiskMock}
        subtitle="Comparacao direta da exposicao ambiental e operacional entre as regioes monitoradas."
        title="Comparacao de risco por regiao"
        variant="distribution"
      />

      <ChartSection
        data={environmentalTrendMock}
        subtitle="Tendencia de estresse ambiental e pressao climatica ao longo da semana."
        title="Tendencia ambiental"
        variant="line"
      />

      <ChartSection
        data={environmentalRankingMock}
        subtitle="Ranking das areas monitoradas do maior para o menor risco combinado."
        title="Ranking das areas monitoradas"
        variant="distribution"
      />

      <ChartSection
        data={environmentalIndicatorsMock}
        subtitle="Indicadores ambientais inspirados em analise satelital e sensoriamento remoto."
        title="Indicadores ambientais"
        variant="bars"
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
