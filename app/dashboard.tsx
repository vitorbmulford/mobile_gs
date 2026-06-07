import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ChartSection } from '@/components/chart-section';
import { RiskCard } from '@/components/risk-card';
import { ScreenContainer } from '@/components/screen-container';
import {
  alertsByTypeMock,
  regionalRiskMock,
  riskStatusMock,
  riskTrendMock,
} from '@/data/riskMetrics.mock';

export default function DashboardScreen() {
  return (
    <ScreenContainer
      eyebrow="Orbital analytics"
      subtitle="Simulated intelligence for alert classification, regional exposure, and risk trend monitoring."
      title="Risk Dashboard">
      <ChartSection
        data={alertsByTypeMock}
        subtitle="Wildfire, flood, operational, and climate anomaly events."
        title="Alerts by type"
        variant="bars"
      />

      <ChartSection
        data={regionalRiskMock}
        subtitle="Regional exposure based on combined orbital, climate, and sensor inputs."
        title="Risk by region"
        variant="distribution"
      />

      <ChartSection
        data={riskTrendMock}
        subtitle="Risk evolution over the last operational days."
        title="Seven-day risk trend"
        variant="line"
      />

      <View style={styles.grid}>
        {riskStatusMock.map((metric) => (
          <RiskCard key={metric.label} {...metric} />
        ))}
      </View>
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
